import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import Event from "sap/ui/base/Event";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace dhconsulting.fiori.controller
 */

export default class App extends Controller {
    public onInit(): void{
        const oRouter = UIComponent.getRouterFor(this)
        .getRoute("RouteDetails")
        ?.attachPatternMatched(this.onObjectMatched, this)
    };
    onObjectMatched(oEvent: Route$PatternMatchedEvent): void {
        // Captura o ID
        const sId = (oEvent.getParameter("arguments") as {ID_Detalhe: string}).ID_Detalhe;
        const mData = ( this.getView()?.getModel() as any).getData().SweetsSupplier[sId].Address
        

        this.getView()?.setModel(new JSONModel([mData]), "itens")

        // this.getView()?.setModel(new JSONModel(aListaData), "list")
        // Define ele naview
        // this.getView()?.bindElement({
        //     model: "",
        //     path: `/SweetsSupplier/${sId}`
        // })

    };
    public onNavBack(): void{
        UIComponent.getRouterFor(this).navTo("RouteMain")
    }
};