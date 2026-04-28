sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

	return Controller.extend("dhconsulting.fiori.controller.App", {
		onPress() {
			MessageToast.show("Hello App!");
		}
	});
})