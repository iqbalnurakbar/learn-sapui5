sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"],
  (UIComponent, JSONModel) => {
    "use strict";

    return UIComponent.extend("com.iqbal.app.Component", {
      metadata: {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        manifest: "json",
      },

      init() {
        // call the init function of the parent
        UIComponent.prototype.init.apply(this, arguments);

        // set data model
        const oData = {
          recipient: {
            name: "Iqbal",
          },
        };
        const oModel = new JSONModel(oData);
        this.setModel(oModel);
      },
    });
  }
);
