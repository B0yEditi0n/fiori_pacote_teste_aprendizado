import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

const Component = UIComponent.extend("dhconsulting.fiori.Component", {
    metadata: {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        manifest: "json"
    },
    
    init() {
        UIComponent.prototype.init.apply(this);
    }
});

export default Component