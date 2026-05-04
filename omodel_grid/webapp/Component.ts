import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";
import XMLView from "sap/ui/core/mvc/XMLView";

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

        this.setModel(
            new JSONModel({
                "CountSweets": "2",
                "SweetsSupplier": [
                    {
                        "ID": "0",
                        "Name": "Sweet Magic",
                        "Address": {
                            "Street": "Sivarao Street",
                            "City": "Vijayawada",
                            "State": "Andhra Pradesh",
                            "ZipCode": "521456",
                            "Country": "INDIA"
                        }
                    },
                    {
                        "ID": "1",
                        "Name": "Aanjaneya Sweets",
                        "Address": {
                            "Street": "Bhavanipuram",
                            "City": "Vijayawada",
                            "State": "Andhra Pradesh",
                            "ZipCode": "521456",
                            "Country": "INDIA"
                        }
                    },
                    {
                        "ID": "2",
                        "Name": "Rio de janeiro, Sim é outro pais isso",
                        "Address": {
                            "Street": "Casa da Balas",
                            "City": "Tiroteio Inifinito",
                            "State": "Melhor não chegar perto",
                            "ZipCode": "69",
                            "Country": "quase brasil"
                        }
                    }
                ]
            })
        );
        const oRote = this.getRouter();
        oRote.initialize();
        oRote.navTo("RouteMain");
    };
};