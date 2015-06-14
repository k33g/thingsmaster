// Model of Thing

/**
 * thing-model broker is available under the terms of the MIT-License.
 * Copyright 2015-2016, Philippe Charrière & Laurent Huet
 */
var Cylon = require('cylon')
  , config = require('./config.js')
  , mqttServer = config.mqttServer;

/*--- Thing ---*/
Cylon.robot({
  connections: {
    server: { adaptor: 'mqtt', host: mqttServer}
  },

  work: function(my) {

    var name      = "BigConnectedThing"
      , kind      = "grovenest"
      , remark    = "I'm a big connected thing"
      , unit      = "N/A"
      , publishOn = "/hello-from-grove-nest";

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

    my.server.subscribe('hello/grove/nest'); // listen to yo topic

    my.server.on('message', function (topic, data) {
      console.log("+++ Consigne +++")
      console.log(data)
    });

    every((1).seconds(), function() {
      var message = {
          name        : name
        , kind        : kind
        , remark      : remark
        , unit        : unit
        , publishOn   : publishOn
        , time        : Date.now()
        , temperature : Math.floor(Math.random() * 60)
        , humidity    : Math.floor(Math.random() * 100)
        , distance    : Math.floor(Math.random() * 20)
      }
      my.server.publish(publishOn, JSON.stringify(message));
    });

  }

}).start();
