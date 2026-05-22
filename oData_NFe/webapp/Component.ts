import UIComponent from "sap/ui/core/UIComponent";

// Translate
import ResourceModel from "sap/ui/model/resource/ResourceModel";

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

        // Set Languade
        const i18nModel = new ResourceModel({
            bundleName: "dhconsulting.fiori.i18n.i18n"
        });
        this.setModel(i18nModel, "i18n");

        // rota inicial
        oRoute.navTo("RouteMainPage")
    };
};
