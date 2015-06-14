var Cylon = require('cylon');

console.log("Please wait ...")
after((8).seconds(), function() {
  console.log("... Ignition!")

  var config = require('./config.js')
    , mqttClientId = "sphero_k33g_org"
    , mqttServer = config.mqttServer + "?clientId=" + mqttClientId
    , topicForPublication = "hello-sphero"
    , kind = "sphero"
    , name = "my-ball"
    , remark = "my little robot"
    , unit = "RivieraDev2015"
    , helper = require('./sphero-helper.js');

  var direction = 0;
  var speed = 100;

  var colors = require('colors')

  Cylon.robot({
    connections: {
      sphero: {adaptor: 'sphero', port: config.spheroPort("rpi")},
      server: {adaptor: 'mqtt', host: mqttServer}
    },
    devices: {
      sphero: {driver: 'sphero'}
    },

    currentColor: null,

    setColor: function(my, color) {
      my.currentColor = color;
      my.sphero.setRGB(color);
    },

    work: function (my) {

      // Subscribe to all topics like /sphero/*
      my.server.subscribe('/sphero/+');

      // start sphero
      my.sphero.roll(5, Math.floor(Math.random() * 360));
      my.setColor(my, helper.color("green"));
      // sphero is started

      after((1).seconds(), function () {
        console.log("Setting up Streaming data ...");

        var opts = {n: 200, m: 1, pcnt: 0};
        my.sphero.setDataStreaming(["locator", "accelOne", "velocity"], opts);
        my.sphero.setBackLED(192);
        my.setColor(my, helper.color("purple"));
        my.sphero.stop();
      });


      my.server.on('message', function (topic, data) {

        console.log("Message", topic, data)

        data = JSON.parse(data)

        console.log("data", data)

        if(data.clientId == my.server.additionalOpts.clientId) {

          if (topic == "/sphero/move-sphero") {
            if (!data.speed) {data.speed=0;}
            if (!data.angle) {data.angle=0;}
            my.sphero.roll(data.speed, data.angle);
          }

          if (topic == "/sphero/color-sphero") {
            if (!data.colorName) {data.colorName="green";}
            my.setColor(my, helper.color(data.colorName));
          }

        }

      });

      my.sphero.on("data", function (data) {

        var message = {
          name: name,
          kind: kind,
          remark: remark,
          unit: unit,
          publishOn: topicForPublication,
          time: Date.now(),
          locator: data,
          color: my.currentColor
        };

        my.server.publish(topicForPublication, JSON.stringify(message));

      });

    }

  }).start();

});
// /dev/tty.Sphero-RRY-AMP-SPP
//'/dev/rfcomm0'
