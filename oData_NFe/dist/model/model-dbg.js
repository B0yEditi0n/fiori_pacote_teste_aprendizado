sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/Device"], function (JSONModel, Device) {
  "use strict";

  const createDeviceModel = () => {
    const oModel = new JSONModel(Device);
    oModel.setDefaultBindingMode('OneWay');
    return oModel;
  };
  var __exports = {
    __esModule: true
  };
  __exports.createDeviceModel = createDeviceModel;
  return __exports;
});
//# sourceMappingURL=model-dbg.js.map
