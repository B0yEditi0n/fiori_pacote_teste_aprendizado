import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import Event from "sap/ui/base/Event";
import ManagedObject from "sap/ui/base/ManagedObject";
import ObjectListItem from "sap/m/ObjectListItem";

/**
 * @namespace dhconsulting.fiori.controller
 */

export default class App extends Controller {
    public onInit(): void{        
    };
    public onListItemPress(oEvent: Event): void {
        const sId = (oEvent as any).getSource().getBindingContext().getProperty("ID") 
        UIComponent.getRouterFor(this).navTo("RouteDetails", {
            ID_Detalhe: sId
        });

    }
};