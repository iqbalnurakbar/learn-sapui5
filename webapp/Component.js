sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
  ],
  (UIComponent, JSONModel, ResourceModel) => {
    "use strict";

    return UIComponent.extend("com.iqbal.app.Component", {
      metadata: {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        rootView: {
          viewName: "com.iqbal.app.view.App",
          type: "XML",
          id: "app",
        },
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

        // set i18n model
        const i18nModel = new ResourceModel({
          bundleName: "com.iqbal.app.i18n.i18n",
        });
        this.setModel(i18nModel, "i18n");
      },
    });
  }
);
