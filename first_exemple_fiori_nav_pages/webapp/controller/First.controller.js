sap.ui.define([
	"sap/ui/core/mvc/XMLView",
	"sap/ui/core/mvc/Controller"
], function(
	XMLView,
	Controller
){
	"use strict";
	return Controller.extend("ui5.walkthrough.controller.First", {
		onListItemPress(oEvent){
			// const oApp = sap.ui.getCore().byId("appView");
			const oApp = sap.ui.getCore().byId("appView").byId("app");

            const oAppview = sap.ui.getCore().byId("appView");
			const oDetailPageId = oAppview.byId("detailPageId");
			const sPageId = oDetailPageId.getId();
			const oPage = oApp.getPage(sPageId);
			
			const oContext = oEvent.getSource().getBindingContext();
			oPage.setBindingContext(oContext);
			oApp.to(sPageId);


		},
		toLowerCase(sValue){
			const sString = String(sValue);
			return sString.toLowerCase();
		}
	});
});