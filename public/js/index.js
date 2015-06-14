/**
 * Created by k33g_org on 13/06/15.
 */

(function (app) {

  riot.mount("mqtt-socket-io", {
    broker: app.broker
  });

  riot.mount("http-things-grid", {
    broker: app.broker,
    Things: app.collections.Things,
    Thing: app.models.Thing
  });

}(App));