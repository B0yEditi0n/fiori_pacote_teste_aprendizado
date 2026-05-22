import Controller from "sap/ui/core/mvc/Controller";
// import ODataModel from "sap/ui/model/odata/v4/ODataModel"
// import Model from "sap/ui/model/Model";
// import JSONModel from "sap/ui/model/json/JSONModel";
// import FilterBar from "sap/ui/mdc/FilterBar"
// import Log from "sap/base/Log";
import UIComponent from "sap/ui/core/UIComponent";

import dinamicTable from "dhconsulting/fiori/custom/dinamicTable"

// import FilterBar from "sap/ui/mdc/FilterBar"

/*
    Toda a Documentação Relacionada a esse Teste está contida Aqui
    https://api.sap.com/api/API_LOGBR_NOTAFISCAL_SRV/overview
    URL Base do Raise
    https://sap.dhconsulting.com.br/

    https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/A_BR_NFDocument
*/

export default class TableResult extends Controller{
    _publicClass = new dinamicTable();

    public onInit(): void{ 
        const oRouter = UIComponent.getRouterFor(this);

        // Callback toda vez que rota é chamada
        oRouter.getRoute("RouterTableResult")!.attachMatched(this._onRouteMatchedSelect, this);
        // oRouter.getRoute("RouterTableEdit")!.attachPatternMatched(this._onRouteMatchedEdit, this);

    }

    private async _onRouteMatchedSelect(oEvent: any){
        const sModule = oEvent.getParameters().arguments["modulo"]
        const oModelFilter = this.getOwnerComponent()!.getModel(sModule);
        // oModelFilter.then((result)=>{
            if(!this._publicClass.boolMakeded){    
                // Primeira instancia        
                const oHbox =(this.getView()?.byId("replace_at_tableResult") as any)
                oHbox.addItem(
                    this._publicClass.init(
                        oModelFilter!,
                        sModule,
                        "/value/"
                    )
                )
            }else{
                if(oModelFilter!.getProperty('/value/')){
                    this._publicClass.oDataStorage = oModelFilter!;
                    this._publicClass.makeColumns()
                }

            }
        // })
        
    };

    private _onRouteMatchedEdit(): void{
        // const oModelFilter = this.getOwnerComponent()!.getModel("TABLE_RESULT")
        // if(oModelFilter && dinamicTable.boolMaked == false){            
        //     const oHbox =(this.getView()?.byId("replace_at_tableResult") as any)
        //     oHbox.removeAll()
        //     oHbox.addItem(
        //         new dinamicTable().init(
        //             "TABLE_RESULT",
        //             "/value/",
        //             true // Editável
        //         )
        //     )

        // }
    }
};