import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";
import Log from "sap/base/Log";

/**
 * @namespace dhconsulting.fiori
 */
export default class Component extends UIComponent {
    public static metadata = {
        manifest: "json",
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
    };
    
    public init(): void{
        super.init();

        // // Autenticação (Temporario)
        // this.setModel(new JSONModel({
        //     serviceUrl: "https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/",
        //     serviceUrlParams:{
        //         Authorization: "Basic Sk9BQjpEaDIwMjZAQEBA"                
        //     }
        // }), "auth_nfe")

        const oRoute = this.getRouter();
        oRoute.initialize()

        // rota inicial
        oRoute.navTo("RouteLoginPage")
    };
};
