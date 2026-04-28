sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";
	return Controller.extend("dhconsulting.fiori.controller.App", {
        onInit(){
            const imgDHLogo = sap.ui.require.toUrl("dhconsulting/fiori/assesents/dh-logo.jpeg");

            this.getView().setModel(new JSONModel({
			// 	imageWidth:  Device.system.phone ? "5em" : "10em",
			 	imgLogo: imgDHLogo
		    }), "img"); // Define o "img" como namespace para esse conjunto de dados

            // // this.getView().setModel(oImgModel, "img");
        }
        
	});
})