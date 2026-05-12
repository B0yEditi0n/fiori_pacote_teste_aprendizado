import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v4/ODataModel"
import Model from "sap/ui/model/Model";
import JSONModel from "sap/ui/model/json/JSONModel";
import FilterBar from "sap/ui/mdc/FilterBar"
import Log from "sap/base/Log";


import { dinamicTable } from "dhconsulting/fiori/model/model"

// import FilterBar from "sap/ui/mdc/FilterBar"

/*
    Toda a Documentação Relacionada a esse Teste está contida Aqui
    https://api.sap.com/api/API_LOGBR_NOTAFISCAL_SRV/overview
    URL Base do Raise
    https://sap.dhconsulting.com.br/

    https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/A_BR_NFDocument
*/

export default class TableResult extends Controller{
    public onInit(): void {
        const oModelFilter = this.getOwnerComponent()!.getModel("TABLE_RESULT")
        if(oModelFilter){
            console.log(( oModelFilter as any).getData());
            
            const oHbox =(this.getView()?.byId("replace_at_tableResult") as any)
            oHbox.addItem(
                dinamicTable(
                    ( oModelFilter as any).getData(), 
                    "TABLE_RESULT",
                    "/value/"
                )
            )

        }
        
    };
   /* public onFiltersChanged(oEvent: Event): void{
        // const oConditions = (this.getView()!.byId("Main_FiltroID") as FilterBar).getConditions();
    };
    public onBtnSearchPress(): void{
        debugger
        // Faz uma busca
        // const oModel_Nfe = new ODataModel({
        //     {
        //     serviceUrl: "http://local.dhconsulting.com.br:3000/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/",
        //     headers: {
        //         "Authorization": (this.getView()?.getModel("loginInputData") as Model),
        //     }
        // })
    }*/
};