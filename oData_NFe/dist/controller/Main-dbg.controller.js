sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/ui/model/json/JSONModel", "sap/ui/core/UIComponent", "sap/ui/model/Filter", "dhconsulting/fiori/model/model"], function (Controller, MessageBox, JSONModel, UIComponent, Filter, __dhconsulting_fiori_model_model) {
  "use strict";

  const getFilterData = __dhconsulting_fiori_model_model["getFilterData"];
  const Main = Controller.extend("webapp.controller.Main", {
    onInit: function _onInit() {},
    onPressLogin: function _onPressLogin(oEvent) {
      const oModelSapUi5 = this.getView()?.getModel("NFe_API");

      // UIComponent.getRouterFor(this).navTo("RouterTableResult")
    },
    runFilterPress: function _runFilterPress(oEvent) {
      if (!this.getView().byId("Main_FiltroID--filter--bukrs").getConditions().length) {
        MessageBox.error("Prencher valor da empresa");
        return undefined;
      }
      ;
      const filters = this.getView().byId("Main_FiltroID");
      const rgConditions = this.getView().byId("Main_FiltroID").getFilterItems();
      const rgCondFilter = [];
      const sParansCond = [];
      for (let i = 0; i < rgConditions.length; i++) {
        const oCond = rgConditions[i];
        const c = rgConditions[i].getConditions();
        for (let j = 0; j < c.length; j++) {
          sParansCond.push(new Filter({
            path: oCond.getPropertyKey(),
            operator: c[j].operator,
            value1: c[j].values[0],
            value2: c[j].values[1] || 0
          }));
          rgCondFilter.push({
            key: oCond.getPropertyKey(),
            operator: c[j].operator.toLowerCase(),
            value1: c[j].values[0],
            value2: c[j].values[1] || 0
          });
        }
      }
      const oData = this.getView()?.getModel("NFe_API");
      // const oContextBinding = oData.bindContext("/Doc", /*oContext*/ undefined, {$$updateGroupId : "mainFilterNfe"});

      // // const oBindList = oData.bindList("Note", oContextBinding.getBoundContext());
      // const oBindList = oData.bindList(
      //     '/Doc',                                     // PATH
      //     new Context(oData, oData.getServiceUrl()),  // Context
      //     [],                                         // Sort
      //     sParansCond,                                // Filters
      //     // Parans
      //     {
      //         // Não tem documentação (achamos debugando)
      //         // tem que ser server pois ele valida, mas pede você passar
      //         "$$operationMode": "Server"   
      //     }
      // )

      //
      // TESTE DO FETCH
      //

      const oDataFetchApi = getFilterData(oData.getServiceUrl(), rgCondFilter).then(data => {
        this.getOwnerComponent()?.setModel(new JSONModel(data), "TABLE_RESULT");
        UIComponent.getRouterFor(this).navTo("RouterTableResult");
      });
      // 
    }
  });
  ;
  return Main;
});
//# sourceMappingURL=Main-dbg.controller.js.map
