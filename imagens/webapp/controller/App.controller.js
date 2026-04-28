sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/Image",
], (Controller, JSONModel, MessageToast, Image) => {
    "use strict";
	return Controller.extend("dhconsulting.fiori.controller.App", {
        onInit(){
            const imgDHLogo = sap.ui.require.toUrl("dhconsulting/fiori/assesents/dh-logo.jpeg");

            this.getView().setModel(new JSONModel({
			// 	imageWidth:  Device.system.phone ? "5em" : "10em",
			 	imgLogo: imgDHLogo
		    }), "img"); // Define o "img" como namespace para esse conjunto de dados

            // // this.getView().setModel(oImgModel, "img");

            // Teste de Inclusão Dinamica
            const oImage = new Image();
            const oHbox = this.byId("hbox_content");
            oImage.setSrc(sap.ui.require.toUrl("dhconsulting/fiori/assesents/dhlogoAlternativa.png"))
            oHbox.addItem(oImage)
        },

        onPressImage(){
            // Click 
            MessageToast.show('Mensagem Muito Longa de imagem Pressionada')
        },
        onLoadImage(){
            // Ao carregar imagem (Evento de inicialização)
            MessageToast.show('Mensagem Muito Longa de imagem Carregada')
        },
        onErrorImage(){
            // Caso a URL ou o conteudo não seja uma imagem.
            MessageToast.show('Deu Ruim')
        },
        onTapImage(){
            MessageToast.show('Tap image')
        }
        
	});
})