import Controller from "sap/ui/core/mvc/Controller";
// import MessageToast from "sap/m/MessageToast";
// import Input from "sap/m/Input";
import Model from "sap/ui/model/Model";
import JSONModel from "sap/ui/model/json/JSONModel";
import Event from "sap/ui/base/Event";
import UIComponent from "sap/ui/core/UIComponent";
import ODataModel from "sap/ui/model/odata/v2/ODataModel"

import FilterBar from "sap/ui/mdc/FilterBar"

// import ODataModelV4 from "sap/ui/model/odata/v4/ODataModel"

export default class Main extends Controller{
    onInit() {
    };

    onPressLogin(oEvent: Event){
        const oModelSapUi5 = this.getView()?.getModel("NFe_API")
        
        
        // UIComponent.getRouterFor(this).navTo("RouterTableResult")
        
    }
    onBtnSearchPress(oEvent: Event){
        const filters = this.getView()!.byId("Main_FiltroID") as FilterBar;

        const oConditions = (this.getView()!.byId("Main_FiltroID") as FilterBar).getFilterItems();
        
        const sParansCond = []
        for(let i = 0; i < oConditions.length; i++){            
            const oCond = oConditions[i];
            sParansCond.push(JSON.stringify(oCond.getConditions(), "\t", 4));
			
            (this.getView()!.getModel()! as Model)
            // .setProperty("/conditionsText", jsonConditions);
        }
        debugger;
    };
};