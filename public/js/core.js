/**
 * Created by k33g_org on 13/06/15.
 */
this.App = {};

// namespaces
(function(app) {

  app.models = {};
  app.collections = {};

  /* === messages broker === */
  app.broker = {
    observables: [],
    observe: function (observable) {
      this.observables.push(observable);
      return this;
    },
    emit: function (message, data) {
      this.observables.forEach(function (observable) {
        observable.trigger(message, data)
      })
      return this;
    }
  };


  return app;

})(this.App);