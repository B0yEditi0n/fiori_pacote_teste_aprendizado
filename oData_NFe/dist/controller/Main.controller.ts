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
import FilterField from "sap/ui/mdc/FilterField";
import FilterOperator from "sap/ui/model/FilterOperator";

// data get
import Context from "sap/ui/model/Context";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
import ODataPropertyBinding from "sap/ui/model/odata/v4/ODataPropertyBinding";

import { getFilterData } from "dhconsulting/fiori/model/model"

export default class Main extends Controller{
    onInit() { };

    onPressLogin(oEvent: Event){
        const oModelSapUi5 = this.getView()?.getModel("NFe_API")
        
        
        // UIComponent.getRouterFor(this).navTo("RouterTableResult")
        
    }
    runFilterPress(oEvent: Event){
        if(!(this.getView()!.byId("Main_FiltroID--filter--bukrs") as FilterBar)
            .getConditions().length){
            MessageBox.error("Prencher valor da empresa")
            return undefined;
        };       

        const filters = this.getView()!.byId("Main_FiltroID") as FilterBar;

        const rgConditions = (this.getView()!.byId("Main_FiltroID") as FilterBar).getFilterItems();
        const rgCondFilter = [];
        
        const sParansCond = []
        for(let i = 0; i < rgConditions.length; i++){            
            const oCond = rgConditions[i];
            const c: any = rgConditions[i].getConditions();
            for(let j=0; j< c.length; j++){
                 sParansCond.push(
                    new Filter({
                        path: oCond.getPropertyKey(),
                        operator: c[j].operator,
                        value1: c[j].values[0],
                        value2: c[j].values[1] || 0
                    }),                    
                )
                rgCondFilter.push({
                    key: oCond.getPropertyKey(),
                    operator: c[j].operator.toLowerCase(),
                    value1: c[j].values[0],
                    value2: c[j].values[1] || 0
                })
            }
           
        }
        
        const oData = this.getView()?.getModel("NFe_API") as ODataModel;
        // const oContextBinding = oData.bindContext("/Doc", /*oContext*/ undefined, {$$updateGroupId : "mainFilterNfe"});

        // // const oBindList = oData.bindList("Note", oContextBinding.getBoundContext());
        // const oBindList = oData.bindList(
        //     '/Doc',                                     // PATH
        //     new Context(oData, oData.getServiceUrl()),  // Context
        //     [],                                         // Sort
        //     sParansCond,                                // Filters
        //     // Parans
        //     {
        //         // Não tem documentação (achamos debugando)
        //         // tem que ser server pois ele valida, mas pede você passar
        //         "$$operationMode": "Server"   
        //     }
        // )

        //
        // TESTE DO FETCH
        //

        const oDataFetchApi = getFilterData(oData.getServiceUrl(), rgCondFilter).then(
            (data: any)=>{
                this.getOwnerComponent()?.setModel(new JSONModel(data), "TABLE_RESULT");
                UIComponent.getRouterFor(this).navTo("RouterTableResult")
            }
        )        
        // 
        
    };

};