import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

// Import Model Device
import { createDeviceModel } from "dhconsulting/fiori/model/model"

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

        createDeviceModel()

        const oRoute = this.getRouter();
        oRoute.initialize()

        // rota inicial
        oRoute.navTo("RouteMainPage")
    };
};
