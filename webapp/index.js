sap.ui.define(["sap/ui/core/mvc/XMLView"], (XMLView) => {
  "use strict";

  XMLView.create({
    viewName: "com.iqbal.app.view.App",
  }).then((oView) => oView.placeAt("content"));
});
