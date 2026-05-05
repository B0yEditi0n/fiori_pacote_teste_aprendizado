import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import Input from "sap/m/Input";
import Model from "sap/ui/model/Model";
import JSONModel from "sap/ui/model/json/JSONModel";
import Event from "sap/ui/base/Event";

import ODataModel from "sap/ui/model/odata/v2/ODataModel"

export default class Login extends Controller{
    onInit() {
    };

    onPressLogin(oEvent: Event){
        debugger;
        const oCurrentView = this.getView()!;
        // const userLogin = (oCurrentView.byId("userInput") as Input).getValue()
        // const passwordLogin = (oCurrentView.byId("passwordInput") as Input).getValue()
        const userLogin = 'JOAB';
        const passwordLogin ="Dh2026@@@@";

        // Guarda no Model essas informações
        oCurrentView.setModel(new JSONModel({
            "user": userLogin,
            "password": passwordLogin
        }), "loginInputData")

        const sBase64 = btoa(`${userLogin}:${passwordLogin}`);

        const oModel_Nfe = new ODataModel({
            serviceUrl: "https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/",
            headers: {
                "Authorization": `Basic ${sBase64}`,
                "Access-Control-Allow-Origin": "*"
            }
        });
        
        const oHeader = oModel_Nfe.getHeaders()

        oModel_Nfe.getServiceMetadata()
        
    }
};