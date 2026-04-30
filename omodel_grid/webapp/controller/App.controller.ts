import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace dhconsulting.fiori.controller
 */

export default class App extends Controller {
    public onInit(): void{        
    };

    public onListItemPress(oEvent: any): void {
        const oItem = oEvent.getSource();
        const sId = oItem.getBindingContext().getProperty("ID");

        const oRouter = UIComponent.getRouterFor(this);

        oRouter.navTo("RouteDetails", {
            supplierId: sId
        });

    }
};