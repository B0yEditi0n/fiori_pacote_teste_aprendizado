sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/m/MessageToast", 
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], (
    Controller, 
    MessageToast, 
    JSONModel, 
    ResourceModel
)=>{
    "use strict";
    return Controller.extend("ui5.walkthrough.controller.App", {
        // eventos dos componentes
        onPressButton(){
            alert("Hello, World!")
            MessageToast.show("Super Star FOX!!!!!!")
        },

        // Evento de Tela da Aplicação
        onInit(){
            this.getView().setModel( new JSONModel({
                recipient : {
                    name: "antanie lairiverter da silva"
                }
            }) )

            const translated = new ResourceModel({ bundleName: "ui5.walkthrough.i18n.i18n" });

            this.getView().setModel(
                translated,
                "traducao"
            )

        }
    })
}); 