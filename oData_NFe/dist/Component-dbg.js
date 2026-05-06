sap.ui.define(["sap/ui/core/UIComponent", "dhconsulting/fiori/model/model"], function (UIComponent, __dhconsulting_fiori_model_model) {
  "use strict";

  // Import Model Device
  const createDeviceModel = __dhconsulting_fiori_model_model["createDeviceModel"];
  /**
   * @namespace dhconsulting.fiori
   */
  const Component = UIComponent.extend("dhconsulting.fiori.Component", {
    metadata: {
      manifest: "json",
      interfaces: ["sap.ui.core.IAsyncContentCreation"]
    },
    init: function _init() {
      UIComponent.prototype.init.call(this);

      // // Autenticação (Temporario)
      // this.setModel(new JSONModel({
      //     serviceUrl: "https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/",
      //     serviceUrlParams:{
      //         Authorization: "Basic Sk9BQjpEaDIwMjZAQEBA"                
      //     }
      // }), "auth_nfe")

      createDeviceModel();
      const oRoute = this.getRouter();
      oRoute.initialize();

      // rota inicial
      oRoute.navTo("RouteMainPage");
    }
  });
  ;
  return Component;
});
//# sourceMappingURL=Component-dbg.js.map
