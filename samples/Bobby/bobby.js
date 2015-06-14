/*
- dans le répetoire NodeJS : npm install
- le répertoire NodeJS contient l'ensemble des librairies nécessaires
*/

var Cylon = require('cylon');

var config = require('./config.js')
  , mqttClientId = "bobby"
  , mqttServer = config.mqttServer + "?clientId=" + mqttClientId
  , topicForPublication = "hello-bobby"
  , kind = "robot"
  , name = "bobby"
  , remark = "Bob le Robot"
  , unit = "RivieraDev";

var sleep = require('../NodeJS/node_modules/sleep')

var gopigo   = require('../NodeJS/gopigo')

console.log('Bobby is ready!')

gopigo.init({
  debug: true,
  reset: true,
  minVoltage: 5.5,
  sensors: {
  },
  onInit: function callback() {
    console.log('GoPiGo Ready!')

    var Bobby = {
      reset: function() {
        gopigo.reset();
      },
      leftLedOn: function() {
        gopigo.led_on(gopigo.LED_L_PIN, function onLedOn(res) {
          console.log('Led left on::'+res)
        })
      },
      leftLedOff: function() {
        gopigo.led_off(gopigo.LED_L_PIN, function onLedOff(res) {
          console.log('Led left off::'+res)
        })
      },
      rightLedOn: function() {
        gopigo.led_on(gopigo.LED_R_PIN, function onLedOn(res) {
          console.log('Led right on::'+res)
        })
      },
      rightLedOff: function() {
        gopigo.led_off(gopigo.LED_R_PIN, function onLedOff(res) {
          console.log('Led right off::'+res)
        })
      },
      moveForward: function() {
        gopigo.forward(function onTestComplete(res) {
          console.log('Moving forward::' + res)
        }, false)
      },
      moveBackward: function() {
        gopigo.backward(function onTestComplete(res) {
          console.log('Moving backward::' + res)
        }, false)
      },
      turnLeft: function() {
        gopigo.left(function onTestComplete(res) {
          console.log('Turning left::' + res)
        })
      },
      turnRight: function() {
        gopigo.right(function onTestComplete(res) {
          console.log('Turning right::' + res)
        })
      },
      stop: function() {
        gopigo.stop(function onTestComplete(res) {
          console.log('Stop::' + res)
        })
      }
    };


    Cylon.robot({
      connections: {
        server: {adaptor: 'mqtt', host: mqttServer}
      },

      work: function (my) {

        // explain woh am I

        my.server.publish('informations', JSON.stringify({
          name      : name,
          kind      : kind,
          remark    : remark,
          unit      : unit,
          publishOn : topicForPublication
        }));

        my.server.subscribe('infos/grove/nest');
        my.server.subscribe('bobby/+');

        my.server.on('message', function (topic, data) {

          data = JSON.parse(data);

          if (topic == "infos/grove/nest") {
            console.log(data);
            if(data.distance <5) {
              Bobby.moveBackward();
              sleep.sleep(3);
              Bobby.stop();
            }
          }

          if (topic == "bobby/right") {
            Bobby.turnRight();
            sleep.sleep(1)
          }

          if (topic == "bobby/left") {
            Bobby.turnLeft();
            sleep.sleep(1)
          }

          if (topic == "bobby/forward") {
            Bobby.moveForward();
            sleep.sleep(1)
          }

          if (topic == "bobby/backward") {
            Bobby.moveBackward();
            sleep.sleep(1)
          }

          if (topic == "bobby/stop") {
            Bobby.stop();
            sleep.sleep(1)
          }

        });
      }
    }).start();
    
  },
  onLowVoltage: function callback(res) {
    console.log('GoPiGo has detected a low voltage ('+res+' V). You probably shut down the system securely in order to avoid issues.')
  },
  onError: function(err) {
    console.log('Something went wrong')
    console.log(err)
  }
})





