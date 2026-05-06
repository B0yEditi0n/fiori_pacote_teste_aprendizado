import XMLView from "sap/ui/core/mvc/XMLView"

XMLView.create({
    id: "xmlMain",
    viewName: "dhconsulting.fiori.view.App"
}).then((oView: XMLView)=>{
    oView.placeAt("content")
});