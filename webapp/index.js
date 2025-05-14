sap.ui.define(["sap/ui/core/ComponentContainer"], (ComponentContainer) => {
  "use strict";

  new ComponentContainer({
    name: "com.iqbal.app",
    settings: {
      id: "walkthrough",
    },
    async: true,
  }).placeAt("content");
});
