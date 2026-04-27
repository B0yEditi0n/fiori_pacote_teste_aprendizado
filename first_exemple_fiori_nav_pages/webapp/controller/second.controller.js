sap.ui.define(["sap/ui/core/mvc/Controller"],function(Controller){
	"use strict";
	return Controller.extend("ui5.walkthrough.controller.second",{
		onNavPress(){
			const oApp = sap.ui.getCore().byId("appView").byId("app");
			oApp.back();
		}             
		
	});
	
});