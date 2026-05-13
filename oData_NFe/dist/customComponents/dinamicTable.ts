import Table from "sap/ui/table/Table";
import OverflowToolbar from "sap/m/OverflowToolbar";
import Column from "sap/ui/table/Column";
import Label from "sap/m/Label";
import Text from "sap/m/Text";
import Input from "sap/m/Input";
import Button from "sap/m/Button";
import ToolbarSpacer from "sap/m/ToolbarSpacer";

type tyDataResponse = {
    "@odata.context": string,
    "@odata.metadataEtag": string,
    value: [{
        [key: string | string]: string | number | boolean | Date | null
    }]
}

const dinamicTable = (oData: tyDataResponse, namespace="TABLE_RESULT", path="/value/")=>{
    /* monta de forma dinamica uma tabela do tipo Grid */
    
    const oTable = new Table("", {
        rows: {
            path: `${namespace}>${path}`
        },
        threshold: 15,
        enableBusyIndicator: true,
        selectionMode: "MultiToggle"
    })

    // Botão Customizado
    const oOverflow = new OverflowToolbar("", {
        style: "Clear",
        content: [
            new ToolbarSpacer(),
            new Input({ width: "10rem" }),
            new Button({
                icon: "sap-icon://edit",
                id: "btnEdit",
                tooltip: "Editar Registros"
            }),
            new Button({
                icon: "sap-icon://excel-attachment",
                id: "btnExcel",
                tooltip: "Gerar Excel"
            })
        ]
    })
    oTable.insertExtension(oOverflow, 0);

    const rgColumns = Object.keys(oData["value"][0])
    for(let i=0; i<rgColumns.length; i++){
        const sKeyColumn = rgColumns[i]

        oTable.insertColumn(new Column({
            autoResizable: true,
                width: "11rem",
                label: new Label({ 
                    text: `{i18n>${sKeyColumn}}`
                }),
                template: new Text({
                    text: `{${namespace }>${sKeyColumn}}`,
                    wrapping: false
                })
            }

        ), i)
    }

    return oTable;
}

export default dinamicTable
