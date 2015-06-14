// Model of Thing

/**
 * fake-sphero broker is available under the terms of the MIT-License.
 * Copyright 2015-2016, Philippe Charrière & Laurent Huet
 */
var Cylon = require('cylon')
  , config = require('./config.js')
  , mqttClientId = "sensor01"
  , mqttServer = config.mqttServer + "?clientId=" + mqttClientId
  , topicForPublication = "hello-sphero"
  , mqttClientName = 'fake-sphero'
  , kind = "sphero"
  , remark = "This is a thing"
  , unit = "n/a"
  , helper = require('./sphero-helper.js');

var direction = 0;
var speed = 100;

// clientId fixé pour éviter une génération aléatoire à chaque connexion
var mqttServer= 'mqtt://localhost:1883?clientId=sphero_k33g_org';

var colors = require('colors')

Cylon.robot({
  connections: {
    server: { adaptor: 'mqtt', host: mqttServer }
  },

  sphero: {
    roll: function(speed, rotation) {
      console.log("roll", speed, rotation)
    },
    setRGB: function(color) {
      console.log("setRGB", color)
    }
  },

  currentColor: null,

  setColor: function(my, color) {

    my.currentColor = color;
    my.sphero.setRGB(color);

    console.log("my.currentColor"[color], color[color])

  },

  work: function(my) {

/*    my.server.subscribe('hi-sphero'); // listen to hi-sphero topic
    my.server.subscribe('move-sphero');
    my.server.subscribe('color-sphero');
*/
	
    // Subscribe to all topic like /sphero/*
    my.server.subscribe('/sphero/+');

    my.server.on('message', function (topic, data) {

      console.log("Message", topic, data)

      data = JSON.parse(data)

      console.log("data", data)

      if(data.clientId == my.server.additionalOpts.clientId) {

        if (topic == "/sphero/hi-sphero") {
          if(data.color) {
            my.setColor(my, data.color);
          } else {
            my.setColor(my, helper.randomColor());
          }

          if (data.speed && data.heading) {
            my.sphero.roll(data.speed, data.heading);
          }
        }

        if (topic == "/sphero/move-sphero") {
          if (!data.speed) {data.speed=0;}
          if (!data.angle) {data.angle=0;}
          my.sphero.roll(data.speed, data.angle);
        }

	// Message JSON type attendu : {"clientId": "sphero_k33g_org", "colorName": "green"}
        if (topic == "/sphero/color-sphero") {
          if (!data.colorName) {data.colorName="green";}
          //my.setColor(my, helper.color(data.colorName));
          my.setColor(my, data.colorName);
        }
      }



    });

    my.sphero.roll(5, Math.floor(Math.random() * 360));
    //my.setColor(my, helper.color("green"));
    my.setColor(my, "green");


    every((1).seconds(), function() {
      var message = {
        name      : mqttClientName,
        kind      : kind,
        remark    : remark,
        unit      : unit,
        publishOn : topicForPublication,
        time: Date.now(),
        locator: [
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 100),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 60)
        ],
        color: my.currentColor
      }
      my.server.publish(topicForPublication, JSON.stringify(message));
    });

  }

}).start();
