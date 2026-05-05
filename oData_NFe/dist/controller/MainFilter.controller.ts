import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import ODataModel from "sap/ui/model/odata/v2/ODataModel"
import Model from "sap/ui/model/Model";
import JSONModel from "sap/ui/model/json/JSONModel";

/*
    Toda a Documentação Relacionada a esse Teste está contida Aqui
    https://api.sap.com/api/API_LOGBR_NOTAFISCAL_SRV/overview
    URL Base do Raise
    https://sap.dhconsulting.com.br/

    https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/A_BR_NFDocument
*/

export default class MainFilter extends Controller{
    onInit() {
        debugger
        // this.getView()?.setModel(new JSONModel({

        // }), "auth")

        // const modelNfe: Model = this.getView()?.getModel("auth_nfe")!;
    //     const oModel_Nfe = new ODataModel({
    //         serviceUrl: "https://sap.dhconsulting.com.br/sap/opu/odata/sap/API_LOGBR_NOTAFISCAL_SRV/",
    //         headers:{
    //             Authorization: "Basic Sk9BQjpEaDIwMjZAQEBA"                
    //         }
    //     });
    //     const oMetadata = oModel_Nfe.getServiceMetadata();
    }
};