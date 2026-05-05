sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  /*
      Toda a Documentação Relacionada a esse Teste está contida Aqui
      https://api.sap.com/api/API_LOGBR_NOTAFISCAL_SRV/overview
      URL Base do Raise
      https://sap.dhconsulting.com.br/
  
      https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/A_BR_NFDocument
  */
  const MainFilter = Controller.extend("webapp.controller.MainFilter", {
    onInit: function _onInit() {
      debugger;
      // this.getView()?.setModel(new JSONModel({

      // }), "auth")

      // const modelNfe: Model = this.getView()?.getModel("auth_nfe")!;
      //     const oModel_Nfe = new ODataModel({
      //         serviceUrl: "https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/",
      //         headers:{
      //             Authorization: "Basic Sk9BQjpEaDIwMjZAQEBA"                
      //         }
      //     });
      //     const oMetadata = oModel_Nfe.getServiceMetadata();
    }
  });
  ;
  return MainFilter;
});
//# sourceMappingURL=MainFilter-dbg.controller.js.map
