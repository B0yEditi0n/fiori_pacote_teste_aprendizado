sap.ui.define([ 
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/json/JSONModel"
], async (
    XMLView,
    JSONModel
)=>{
    "use strict"
    // XMLView.create({
    //     "viewName": "ui5.walkthrough.view.App"
    // }).then((oView)=>{
    //     oView.placeAt("content")
    // })

    const oModel = new JSONModel({
        "CountSweets": "2",
        "SweetsSupplier": [
            {
                "ID": "01",
                "Name": "Sweet Magic",
                "Address": {
                    "Street": "Sivarao Street",
                    "City": "Vijayawada",
                    "State": "Andhra Pradesh",
                    "ZipCode": "521456",
                    "Country": "INDIA"
                }
            },
            {
                "ID": "02",
                "Name": "Super Cidade Não-Indiana",
                "Address": {
                    "Street": "Bhavanipuram",
                    "City": "lisbA",
                    "State": "Andhra Pradesh",
                    "ZipCode": "521456",
                    "Country": "Brasil"
                }
            }
        ]
    })
    
    XMLView.create({ 
        id: "appView",
        viewName:"ui5.walkthrough.view.App",
    }).then((oview)=>{
        oview.setModel(oModel);
        oview.byId("app").placeAt("content");
    })
     
})