import JSONModel from 'sap/ui/model/json/JSONModel'
import Device from 'sap/ui/Device'
import Model from 'sap/ui/model/Model';

const createDeviceModel = ()=>{
    const oModel = new JSONModel(Device);
    oModel.setDefaultBindingMode('OneWay');

    return oModel;
}

export { createDeviceModel }