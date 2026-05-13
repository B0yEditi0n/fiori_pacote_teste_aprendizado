sap.ui.define(["sap/ui/model/json/JSONModel", "sap/ui/Device"], function (JSONModel, Device) {
  "use strict";

  const createDeviceModel = () => {
    const oModel = new JSONModel(Device);
    oModel.setDefaultBindingMode('OneWay');
    return oModel;
  };
  // convert filter into request Header

  const fnConvertOFilterToHeader = rgFilter => {
    const fnConvertFieldType = anyField => {
      switch (anyField.constructor.name) {
        case "Date":
          return anyField.toISOString().split('T')[0];
          break;
        case 'Number':
        default:
          return `'${anyField}'`;
          break;
      }
    };
    let sReturn = '';
    for (let nIndex = 0; nIndex < rgFilter.length; nIndex++) {
      const oFilter = rgFilter[nIndex];
      if (sReturn) {
        sReturn += ' and ';
      }
      switch (oFilter.operator.toUpperCase()) {
        case "BT":
          sReturn += `${oFilter.key} gt ${fnConvertFieldType(oFilter.value1)} and ${oFilter.key} lt ${fnConvertFieldType(oFilter.value2)}`;
          break;
        default:
          sReturn += `${oFilter.key} ${oFilter.operator} ${fnConvertFieldType(oFilter.value1)}`;
          break;
      }
    }
    return '?' + new URLSearchParams({
      $filter: sReturn,
      $top: '10'
    }).toString();
  };
  const getFilterData = async (sServiceUrl, rgCondFilter) => {
    const oRequestData = new Request(`${sServiceUrl}Doc${fnConvertOFilterToHeader(rgCondFilter)}`, {
      method: "GET"
    });
    const oResponse = await fetch(oRequestData);
    return await oResponse.json();
  };
  var __exports = {
    __esModule: true
  };
  __exports.createDeviceModel = createDeviceModel;
  __exports.getFilterData = getFilterData;
  __exports.fnConvertOFilterToHeader = fnConvertOFilterToHeader;
  return __exports;
});
//# sourceMappingURL=model-dbg.js.map
