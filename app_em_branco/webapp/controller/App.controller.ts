import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";

Controller.extend("dhconsulting.fiori.controller.App", {
    onInit() {
        MessageToast.show('Messagem de deu certo')
    },
});