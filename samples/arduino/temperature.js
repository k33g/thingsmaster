// babel-node
import j5 from 'johnny-five';

let board = new j5.Board();

board.on("ready", () => {

  let redLed = new j5.Led(13)
    , blueLed = new j5.Led(9)
    , yellowLed = new j5.Led(2);

  let temperature = new j5.Temperature({
    controller: "TMP36",
    pin: "A0"
  });

  temperature.on("change", (err, data) => {
    
    console.log("celsius: %d", data.celsius);

    var T = 25;

    if (data.celsius > T) {
      yellowLed.strobe();
    }
    if (data.celsius > T+1) {
      blueLed.strobe();
    }
    if (data.celsius > T+2) {
      redLed.strobe();
    }

    if (data.celsius < T) {
      yellowLed.stop().off();
    }
    if (data.celsius < T+1) {
      blueLed.stop().off();
    }
    if (data.celsius < T+2) {
      redLed.stop().off();
    }

  });

});