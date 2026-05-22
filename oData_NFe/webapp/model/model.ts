import JSONModel from 'sap/ui/model/json/JSONModel'
import Device from 'sap/ui/Device'
import Time from 'sap/ui/model/type/Time';

import { tFilter } from 'dhconsulting/fiori/model/connections/connections';
import Connection from 'dhconsulting/fiori/model/connections/connections';

const createDeviceModel = ()=>{
    const oModel = new JSONModel(Device);
    oModel.setDefaultBindingMode('OneWay');

    return oModel;
}

const getFilterData = async (sModule: string, rgCondFilter: tFilter[])=>{
    const oConnecet = await new Connection().init();
    return await oConnecet.getUrlData(sModule, undefined, rgCondFilter);
}

export { 
    createDeviceModel, 
    getFilterData, 
}