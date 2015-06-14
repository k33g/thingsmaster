/**
 * License
 * broker is available under the terms of the MIT-License.
 * Copyright 2015-2016, Philippe Charrière & Laurent Huet
 */

var config = require('./config.js')
  , mosca = require('mosca')
  , express = require('express')
  , http = require('http')
  , bodyParser = require('body-parser')
  , socketIo = require('socket.io')
  , app = express()
  , httpPort = config.httpPort
  , socketPort = config.socketPort
  , mqttSettings = {port: config.mqttPort}
  , io  = socketIo.listen(socketPort)
  , mqttBroker = new mosca.Server(mqttSettings)
  , redis = require("redis")
  , redisClient = redis.createClient();

/*=== Redis ===*/
redisClient.on("error", function (err) {
  console.log("Redis Error: " + err);
});

/*=== Express ===*/
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/*=== SocketIO ===*/
io.sockets.on('connection', function (socket) {

  socket.on('to-mqtt-broker', function(data){
    var ObjectData = JSON.parse(data);
    console.log('to-mqtt-broker: ', ObjectData);
    var message4Broker;

    if (ObjectData.message.consigne >0) {
      console.log("--- consigne ---", ObjectData.message.consigne);
      message4Broker = {
        topic: ObjectData.topic,
        payload: ObjectData.message.consigne.toString(),
        qos: 0, // 0, 1, or 2
        retain: false // or true
      };
    } else {
      message4Broker = {
        topic: ObjectData.topic,
        payload: JSON.stringify(ObjectData.message), // or a Buffer
        qos: 0, // 0, 1, or 2
        retain: false // or true
      };
    }

    console.log("message4Broker", message4Broker)
    mqttBroker.publish(message4Broker, function() {});
  });

});

/*=== Mosca ===*/
mqttBroker.on('clientConnected', function(client) {
  //console.log('client connected', client);
  console.log('client connected', client.id);

  io.sockets.emit("clientConnected", {
    client: client.id
  });

  redisClient.hset("things", client.id, JSON.stringify({
    id: client.id,
    status: "connected",
    informations:null,
    subscriptions:[],
    lastMqttMessage:null
  }));

});

// When a message is received
mqttBroker.on('published', function(packet, client) {

  if(packet.cmd=="publish") {

    var informations2String = packet.payload.toString().replace(/\0/g,"");
    var informations = JSON.parse(informations2String)

    //var informations = JSON.parse(packet.payload.toString())

    //console.log("publish:", "["+client.id+"]", informations.name, informations.kind, informations.value || informations.y)

    console.log("publish:", "["+client.id+"]", informations);

    io.sockets.emit("mqtt", { // socket topic ?
      clientId: client.id,
      topic: packet.topic,
      message: packet.payload.toString()
    });

    var clientInformations = {
      id: client.id,
      informations: informations,
      subscriptions:[]
    }
    clientInformations.status = "connected"; //filter

    redisClient.hset("things", client.id, JSON.stringify(clientInformations));
  }
});

// When a client subscribes to a topic
mqttBroker.on('subscribed', function(topic, client) {
  console.log('subscribed : ', topic);

  redisClient.hget("things", client.id, function(err, reply) {
    var data = JSON.parse(reply);
    data.subscriptions.push(topic);
    redisClient.hset("things", client.id, JSON.stringify(data));
  });

  io.sockets.emit("subscribed", {
    clientId: client.id,
    topic: topic
  });

});

mqttBroker.on('unsubscribed', function(topic, client) {
  console.log('unsubscribed : ', topic);
  io.sockets.emit("unsubscribed", {
    clientId: client.id,
    topic: topic
  });

  redisClient.hget("things", client.id, function(err, reply) {
    var data = JSON.parse(reply);
    var index = data.subscriptions.indexOf(topic)
    if (index > -1) {
      data.subscriptions.splice(index, 1);
    }
    redisClient.hset("things", client.id, JSON.stringify(data));
  });

});

mqttBroker.on('clientDisconnecting', function(client) {
  console.log('clientDisconnecting : ', client.id);
});

mqttBroker.on('clientDisconnected', function(client) {
  console.log('clientDisconnected : ', client.id);

  io.sockets.emit("clientDisconnected", {
    clientId: client.id
  });

  redisClient.hget("things", client.id, function(err, reply) {
    var data = JSON.parse(reply);
    data.status = "disconnected";
    data.subscriptions = [];
    redisClient.hset("things", client.id, JSON.stringify(data));
  });

});


app.get("/things", function(req, res) {
  var things = [];
  redisClient.hgetall("things", function (err, redisThings) {
    if(err) { console.log(err) }
    for(var thingKey in redisThings) {
      things.push(JSON.parse(redisThings[thingKey]));
    }
    res.send(things.filter(function(thing) {
      return thing.status == "connected";
    }));
    //redisClient.quit();
  });

});

app.get("/things/:id", function (req, res) {
  redisClient.hget("things", req.params["id"], function(err, reply) {
    var thing = JSON.parse(reply);
    res.send(thing);
  });
});

app.get("/things/name/:name", function (req, res) {});

mqttBroker.on('ready', setup);

// When the mqtt broker is ready
function setup() {

  redisClient.del("things");

  console.log("------------------ MQTT Demo ------------------")
  console.log(" by @k33g_org for RivieraDev 2015")
  console.log("-----------------------------------------------")
  console.log(' - Mosca mqttBroker listening on ' + mqttSettings.port)
  app.listen(httpPort);
  console.log(" - Express listening on " + httpPort);
  console.log(" - Socket.io listening on " + socketPort);
  console.log("-----------------------------------------------")
}

