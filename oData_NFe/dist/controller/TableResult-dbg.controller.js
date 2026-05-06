sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  // import FilterBar from "sap/ui/mdc/FilterBar"
  /*
      Toda a Documentação Relacionada a esse Teste está contida Aqui
      https://api.sap.com/api/API_LOGBR_NOTAFISCAL_SRV/overview
      URL Base do Raise
      https://sap.dhconsulting.com.br/
  
      https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/A_BR_NFDocument
  */
  const TableResult = Controller.extend("webapp.controller.TableResult", {
    onInit: function _onInit() {},
    onFiltersChanged: function _onFiltersChanged(oEvent) {
      const oConditions = this.getView().byId("Main_FiltroID").getConditions();
    },
    onBtnSearchPress: function _onBtnSearchPress() {
      debugger;
      // Faz uma busca
      // const oModel_Nfe = new ODataModel({
      //     {
      //     serviceUrl: "http://local.dhconsulting.com.br:3000/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/",
      //     headers: {
      //         "Authorization": (this.getView()?.getModel("loginInputData") as Model),
      //     }
      // })
    }
  });
  ;
  return TableResult;
});
//# sourceMappingURL=TableResult-dbg.controller.js.map
