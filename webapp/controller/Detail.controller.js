sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
  ],
  (Controller, History, MessageToast) => {
    "use strict";

    return Controller.extend("com.iqbal.app.controller.Detail", {
      onInit() {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("detail")
          .attachPatternMatched(this.onObjectMatched, this);
      },

      onObjectMatched(oEvent) {
        const isRemote = this.getOwnerComponent()
          .getModel("view")
          .getProperty("/isRemoteData");

        const sPath = window.decodeURIComponent(
          oEvent.getParameter("arguments").invoicePath
        );

        const oModel = this.getOwnerComponent().getModel(
          isRemote ? "invoiceOdata" : "invoice"
        );
        this.getView().setModel(oModel, "invoice");

        this.getView().bindElement({
          path: "/" + sPath,
          model: "invoice",
        });
      },

      onNavBack() {
        const oHistory = History.getInstance();
        const sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("overview", {}, true);
        }
      },

      onRatingChange(oEvent) {
        const fValue = oEvent.getParameter("value");
        const oResourceBundle = this.getView()
          .getModel("i18n")
          .getResourceBundle();

        MessageToast.show(
          oResourceBundle.getText("ratingConfirmation", [fValue])
        );
      },
    });
  }
);
