// Model of Thing

/**
 * thing-model broker is available under the terms of the MIT-License.
 * Copyright 2015-2016, Philippe Charrière & Laurent Huet
 */
var Cylon = require('cylon')
  , config = require('./config.js')
  , mqttServer = config.mqttServer;

/*--- first Thing ---*/
Cylon.robot({
  connections: {
    server: { adaptor: 'mqtt', host: mqttServer+ "?clientId=" + "thing_01"}
  },

  work: function(my) {
    var name      = "Thing 1"
      , kind      = "text"
      , remark    = "This is the Thing One"
      , unit      = "N/A"
      , publishOn = "/hello-all-from-thing-1";

    // explain woh am I
    /*
     kind: kind of component to display
     publishOn: topic for publication
     */
    my.server.publish('informations', JSON.stringify({
        name      : name
      , kind      : kind
      , remark    : remark
      , unit      : unit
      , publishOn : publishOn
    }));

    my.server.subscribe('yo'); // listen to yo topic

    my.server.on('message', function (topic, data) {
      //foo
    });

    every((1).seconds(), function() {
      var message = {
          name      : name
        , kind      : kind
        , remark    : remark
        , unit      : unit
        , publishOn : publishOn
        , time: Date.now()
        , value: ["Yo!", "Hi!", "Hello!"][Math.floor(Math.random()*3)]
      }
      my.server.publish(publishOn, JSON.stringify(message));
    });

  }
}).start();

/*--- second Thing ---*/
Cylon.robot({
  connections: {
    server: { adaptor: 'mqtt', host: mqttServer+ "?clientId=" + "thing_02"}
  },

  work: function(my) {
    var name      = "Thing 2"
      , kind      = "text"
      , remark    = "This is the Thing Two"
      , unit      = "N/A"
      , publishOn = "/hello-all-from-thing-2";

    // explain woh am I
    /*
     kind: kind of component to display
     publishOn: topic for publication
     */
    my.server.publish('informations', JSON.stringify({
        name      : name
      , kind      : kind
      , remark    : remark
      , unit      : unit
      , publishOn : publishOn
    }));

    my.server.subscribe('yo'); // listen to yo topic

    my.server.on('message', function (topic, data) {
      //foo
    });

    every((1).seconds(), function() {
      var message = {
          name      : name
        , kind      : kind
        , remark    : remark
        , unit      : unit
        , publishOn : publishOn
        , time: Date.now()
        , value: ["Riri", "Fifi", "Loulou"][Math.floor(Math.random()*3)]
      }
      my.server.publish(publishOn, JSON.stringify(message));
    });

  }
}).start();

Cylon.robot({
  connections: {
    server: { adaptor: 'mqtt', host: mqttServer}
  },

  work: function(my) {

    var name      = my.server.additionalOpts.clientId
      , kind      = "text"
      , remark    = "This is the Thing One"
      , unit      = "N/A"
      , publishOn = "/hello-all-from-thing-"+my.server.additionalOpts.clientId;

    // explain woh am I
    /*
     kind: kind of component to display
     publishOn: topic for publication
     */
    my.server.publish('informations', JSON.stringify({
      name      : name
      , kind      : kind
      , remark    : remark
      , unit      : unit
      , publishOn : publishOn
    }));

    my.server.subscribe('yo'); // listen to yo topic

    my.server.on('message', function (topic, data) {
      //foo
    });

    every((1).seconds(), function() {
      var message = {
        name      : name
        , kind      : kind
        , remark    : remark
        , unit      : unit
        , publishOn : publishOn
        , time: Date.now()
        , value: ["Wonder Woman", "Iron Man", "Spiderman", "Batman", "Superman"][Math.floor(Math.random()*5)]
      }
      my.server.publish(publishOn, JSON.stringify(message));
    });

  }
}).start();