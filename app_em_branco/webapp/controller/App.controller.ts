import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";

export default class App extends Controller{
    public onInit(){
        MessageToast.show('Messagem de deu certo')
    };
};