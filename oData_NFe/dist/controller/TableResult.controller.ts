import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel"
import Model from "sap/ui/model/Model";
import JSONModel from "sap/ui/model/json/JSONModel";
import FilterBar from "sap/ui/mdc/FilterBar"

// import FilterBar from "sap/ui/mdc/FilterBar"

/*
    Toda a Documentação Relacionada a esse Teste está contida Aqui
    https://api.sap.com/api/API_LOGBR_NOTAFISCAL_SRV/overview
    URL Base do Raise
    https://sap.dhconsulting.com.br/

    https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/A_BR_NFDocument
*/

export default class TableResult extends Controller{
    onInit() {

    };
    onFiltersChanged(oEvent: Event){
        const oConditions = (this.getView()!.byId("Main_FiltroID") as FilterBar).getConditions();
    };
    onBtnSearchPress(){
        debugger
        // Faz uma busca
        // const oModel_Nfe = new ODataModel({
        //     {
        //     serviceUrl: "http://local.dhconsulting.com.br:3000/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/",
        //     headers: {
        //         "Authorization": (this.getView()?.getModel("loginInputData") as Model),
        //     }
        // })
    }
};