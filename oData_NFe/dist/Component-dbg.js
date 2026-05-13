sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/resource/ResourceModel", "dhconsulting/fiori/model/model"], function (UIComponent, ResourceModel, __dhconsulting_fiori_model_model) {
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
      createDeviceModel();
      const oRoute = this.getRouter();
      oRoute.initialize();

      // Set Languade
      const i18nModel = new ResourceModel({
        bundleName: "dhconsulting.fiori.i18n.i18n"
      });
      this.setModel(i18nModel, "i18n");

      // rota inicial
      oRoute.navTo("RouteMainPage");
    }
  });
  ;
  return Component;
});
//# sourceMappingURL=Component-dbg.js.map
