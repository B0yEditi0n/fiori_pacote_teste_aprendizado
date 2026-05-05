sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/odata/v2/ODataModel"], function (Controller, JSONModel, ODataModel) {
  "use strict";

  const Login = Controller.extend("webapp.controller.Login", {
    onInit: function _onInit() {},
    onPressLogin: function _onPressLogin(oEvent) {
      debugger;
      const oCurrentView = this.getView();
      // const userLogin = (oCurrentView.byId("userInput") as Input).getValue()
      // const passwordLogin = (oCurrentView.byId("passwordInput") as Input).getValue()
      const userLogin = 'JOAB';
      const passwordLogin = "Dh2026@@@@";

      // Guarda no Model essas informações
      oCurrentView.setModel(new JSONModel({
        "user": userLogin,
        "password": passwordLogin
      }), "loginInputData");
      const sBase64 = btoa(`${userLogin}:${passwordLogin}`);
      const oModel_Nfe = new ODataModel({
        serviceUrl: "https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/",
        headers: {
          "Authorization": `Basic ${sBase64}`,
          "Access-Control-Allow-Origin": "*"
        }
      });
      const oHeader = oModel_Nfe.getHeaders();
      oModel_Nfe.getServiceMetadata();
    }
  });
  ;
  return Login;
});
//# sourceMappingURL=Login-dbg.controller.js.map
