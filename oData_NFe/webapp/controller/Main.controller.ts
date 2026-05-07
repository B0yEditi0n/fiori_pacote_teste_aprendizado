import Controller from "sap/ui/core/mvc/Controller";
import MessageBox from "sap/m/MessageBox";
// import Input from "sap/m/Input";
import Model from "sap/ui/model/Model";
import JSONModel from "sap/ui/model/json/JSONModel";
import Event from "sap/ui/base/Event";
import UIComponent from "sap/ui/core/UIComponent";
import ODataModel from "sap/ui/model/odata/v4/ODataModel"

import FilterBar from "sap/ui/mdc/FilterBar"
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";

// data get
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
import ODataPropertyBinding from "sap/ui/model/odata/v4/ODataPropertyBinding";

// import ODataModelV4 from "sap/ui/model/odata/v4/ODataModel"

export default class Main extends Controller{
    onInit() {
    };

    onPressLogin(oEvent: Event){
        const oModelSapUi5 = this.getView()?.getModel("NFe_API")
        
        
        // UIComponent.getRouterFor(this).navTo("RouterTableResult")
        
    }
    runFilterPress(oEvent: Event){
        const makeFilter = (
            key : string, 
            filterList: Array<object>
        ) : String=>{
            return ''
        }

        debugger

        if((this.getView()!.byId("Main_FiltroID--filter--bukrs") as FilterBar).getConditions()){
            MessageBox.error("Prencher valor da empresa")
            return undefined;
        };       

        const filters = this.getView()!.byId("Main_FiltroID") as FilterBar;

        const oConditions = (this.getView()!.byId("Main_FiltroID") as FilterBar).getFilterItems();
        
        const sParansCond = []
        for(let i = 0; i < oConditions.length; i++){            
            const oCond = oConditions[i];
            sParansCond.push(
                makeFilter(oCond.getPropertyKey(), oCond.getConditions())
            )
        }
        // new ODataContextBinding()

        (this.getView()?.getModel("NFe_API") as ODataModel).bindList(
            '/doc',
            
        )


    };

};