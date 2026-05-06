sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  // import ODataModelV4 from "sap/ui/model/odata/v4/ODataModel"
  const Main = Controller.extend("webapp.controller.Main", {
    onInit: function _onInit() {},
    onPressLogin: function _onPressLogin(oEvent) {
      const oModelSapUi5 = this.getView()?.getModel("NFe_API");

      // UIComponent.getRouterFor(this).navTo("RouterTableResult")
    },
    onBtnSearchPress: function _onBtnSearchPress(oEvent) {
      const filters = this.getView().byId("Main_FiltroID");
      const oConditions = this.getView().byId("Main_FiltroID").getFilterItems();
      const sParansCond = [];
      for (let i = 0; i < oConditions.length; i++) {
        const oCond = oConditions[i];
        sParansCond.push(JSON.stringify(oCond.getConditions(), "\t", 4));
        this.getView().getModel();
        // .setProperty("/conditionsText", jsonConditions);
      }
      debugger;
    }
  });
  ;
  return Main;
});
//# sourceMappingURL=Main-dbg.controller.js.map
