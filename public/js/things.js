/**
 * Created by k33g_org on 13/06/15.
 */

(function (app) {
  app.models.Thing = Backbone.Model.extend({
    urlRoot:"/things"
  });

  app.collections.Things = Backbone.Collection.extend({
    model: app.models.Thing,
    url: "/things"
  });

  return app;

}(App));