import JSONModel from 'sap/ui/model/json/JSONModel'
import Device from 'sap/ui/Device'
import Model from 'sap/ui/model/Model';
import ODataModel from "sap/ui/model/odata/v4/ODataModel"

const createDeviceModel = ()=>{
    const oModel = new JSONModel(Device);
    oModel.setDefaultBindingMode('OneWay');

    return oModel;
}
// convert filter into request Header
type tFilter = {key:string, operator:string, value1:any, value2:any};


const fnConvertOFilterToHeader = (rgFilter: tFilter[]) : string =>{
    const fnConvertFieldType = (anyField: any)=>{
        switch(anyField.constructor.name){
            case("Date"):
                return anyField.toISOString().split('T')[0]
                break;
            case('Number'):

            default:
                return `'${anyField}'`
                break;                        
        }
        
    }

    let sReturn = '';
    for (let nIndex = 0; nIndex < rgFilter.length; nIndex++) {
        const oFilter = rgFilter[nIndex];
        
        if(sReturn){
            sReturn += ' and '
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
    }).toString()
}   
const getFilterData = async (sServiceUrl: string, rgCondFilter: tFilter[])=>{
    const oRequestData = new Request(
        `${sServiceUrl}Doc${fnConvertOFilterToHeader(rgCondFilter)}`, 
        {
            method: "GET"
        }
    )
    return await fetch(oRequestData);
}

export { createDeviceModel, getFilterData, fnConvertOFilterToHeader }