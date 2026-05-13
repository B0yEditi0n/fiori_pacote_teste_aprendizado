sap.ui.define(["sap/ui/core/mvc/Controller", "dhconsulting/fiori/customComponents/dinamicTable"], function (Controller, __dinamicTable) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const dinamicTable = _interopRequireDefault(__dinamicTable); // import FilterBar from "sap/ui/mdc/FilterBar"
  /*
      Toda a Documentação Relacionada a esse Teste está contida Aqui
      https://api.sap.com/api/API_LOGBR_NOTAFISCAL_SRV/overview
      URL Base do Raise
      https://sap.dhconsulting.com.br/
  
      https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/A_BR_NFDocument
  */
  const TableResult = Controller.extend("webapp.controller.TableResult", {
    onInit: function _onInit() {},
    onAfterRendering: function _onAfterRendering() {
      const oModelFilter = this.getOwnerComponent().getModel("TABLE_RESULT");
      if (oModelFilter) {
        console.log(oModelFilter.getData());
        const oHbox = this.getView()?.byId("replace_at_tableResult");
        oHbox.addItem(dinamicTable(oModelFilter.getData(), "TABLE_RESULT", "/value/"));
      }
    }
  });
  ;
  return TableResult;
});
//# sourceMappingURL=TableResult-dbg.controller.js.map
