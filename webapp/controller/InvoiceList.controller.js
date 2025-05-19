sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
  ],
  (Controller, JSONModel, Filter, FilterOperator, MessageToast) => {
    "use strict";

    return Controller.extend("com.iqbal.app.controller.InvoiceList", {
      onInit() {
        const oViewModel = new JSONModel({
          currency: "EUR",
        });
        this.getView().setModel(oViewModel, "view");
      },

      onFilterInvoice(oEvent) {
        const aFilter = [];
        const sQuery = oEvent.getParameter("query");
        if (sQuery) {
          const aFilters = [
            new Filter({
              path: "ProductName",
              operator: FilterOperator.Contains,
              value1: sQuery,
            }),
          ];

          // Only add quantity filter if the query is numeric
          if (!isNaN(parseFloat(sQuery)) && isFinite(sQuery)) {
            aFilters.push(
              new Filter({
                path: "Quantity",
                operator: FilterOperator.EQ,
                value1: parseFloat(sQuery),
              })
            );
          }

          aFilter.push(
            new Filter({
              filters: aFilters,
              or: true,
            })
          );
        }

        const oList = this.byId("invoiceList");
        const oBinding = oList.getBinding("items");
        oBinding.filter(aFilter);
      },

      onLoadLocal() {
        this._clearFilter();
        const oModel = this.getOwnerComponent().getModel("invoice");
        if (oModel) {
          this.getView().setModel(oModel, "invoice");
          MessageToast.show("Local data loaded successfully!");
        }
      },

      onLoadRemote() {
        this._clearFilter();
        const oModel = this.getOwnerComponent().getModel("invoiceOdata");
        if (oModel) {
          if (oModel.getMetadata()) {
            // Metadata already loaded, directly set the model
            this.getView().setModel(oModel, "invoice");
            MessageToast.show("Remote data loaded successfully!");
          } else {
            // Metadata not loaded yet, attach the event
            oModel.attachMetadataLoaded(() => {
              this.getView().setModel(oModel, "invoice");
              MessageToast.show("Remote data loaded successfully!");
            });
          }
        }
      },

      _clearFilter() {
        const oList = this.byId("invoiceList");
        if (oList) {
          const oBinding = oList.getBinding("items");
          if (oBinding) {
            oBinding.filter([]);
          }
        }
        const oSearchField = this.byId("SearchField");
        if (oSearchField) {
          oSearchField.setValue("");
        }
      },
    });
  }
);
