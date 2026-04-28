sap.ui.define([
    "sap/ui/core/mvc/XMLView"
], (XMLView)=>{
    "use strict";
    XMLView.create({
        id: "xmlMain",
        viewName: "dhconsulting.fiori.view.App"
    }).then((oView)=>{
        oView.placeAt("content")
    })

});