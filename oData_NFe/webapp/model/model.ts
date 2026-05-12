import JSONModel from 'sap/ui/model/json/JSONModel'
import Device from 'sap/ui/Device'
import Time from 'sap/ui/model/type/Time';


import Table from "sap/ui/table/Table";
import Column from "sap/ui/table/Column";
import Label from "sap/m/Label";
import Text from "sap/m/Text";

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
        { method: "GET" }
    )

    const oResponse = await fetch(oRequestData)

    return await oResponse.json();    
}
type tyDataResponse = {
    "@odata.context": string,
    "@odata.metadataEtag": string,
    value: [{
        [key: string | string]: string |number | boolean |Time | null
    }]
}



const dinamicTable = (oData: tyDataResponse, namespace="TABLE_RESULT", path="/value/")=>{
    /* monta de forma dinamica uma tabela do tipo Grid */

    const oTable = new Table("", {
        rows: {
            path: `${namespace}>${path}`
        },
        threshold: 15,
        enableBusyIndicator: true,
        selectionMode: "MultiToggle"
    })

    const rgColumns = Object.keys(oData["value"][0])
    for(let i=0; i<rgColumns.length; i++){
        const sKeyColumn = rgColumns[i]

        oTable.insertColumn(new Column({
            autoResizable: true,
                width: "11rem",
                label: new Label({ 
                    text: sKeyColumn
                }),
                template: new Text({
                    text: `{${namespace }>${sKeyColumn}}`,
                    wrapping: false
                })
            }

        ), i)
    }

    return oTable;
}

export { 
    createDeviceModel, 
    getFilterData, 
    fnConvertOFilterToHeader, 
    dinamicTable }