import ComponentContainer from "sap/ui/core/ComponentContainer";
import XMLView from "sap/ui/core/mvc/XMLView";

new ComponentContainer({
    id: "container",
    name: "dhconsulting.fiori",
    settings: {
        id: "fiori"
    },
    autoPrefixId: true,
    async: false
}).placeAt("content");

// XMLView.create({
//     "viewName": "dhconsulting.fiori.view.App"
// }).then(
//     (oView) => oView.placeAt("content")
// )