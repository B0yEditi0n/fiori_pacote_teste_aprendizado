import Controller from "sap/ui/core/mvc/Controller";
import MessageBox from "sap/m/MessageBox";
// import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";
import Event from "sap/ui/base/Event";
import UIComponent from "sap/ui/core/UIComponent";

import FilterBar from "sap/ui/mdc/FilterBar"
import Filter from "sap/ui/model/Filter";

import { getFilterData } from 'dhconsulting/fiori/model/model';

export default class Main extends Controller{
    onInit() {};

    onPressLogin(oEvent: Event){
        // const oModelSapUi5 = this.getView()?.getModel("NFe_API")
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
            for(let j=0;j<c.length; j++){
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

        const sModulo = "NFE";
        
        //const oData = this.getView()?.getModel("NFe_API") as ODataModel;

        const oDataFetchApi = getFilterData(sModulo, rgCondFilter).then(
            (data: any)=>{
                this.getOwnerComponent()?.setModel(new JSONModel(data), sModulo);
                UIComponent.getRouterFor(this).navTo("RouterTableResult", { modulo: sModulo })
            }
        )        
                
    };

};