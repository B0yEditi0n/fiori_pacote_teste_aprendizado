import Table from "sap/ui/table/Table";
import OverflowToolbar from "sap/m/OverflowToolbar";
import Column from "sap/ui/table/Column";
import Label from "sap/m/Label";
import Text from "sap/m/Text";
import Input from "sap/m/Input";
import Button from "sap/m/Button";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import Event from "sap/ui/base/Event";
import CheckBox from "sap/m/CheckBox";
import { InputType } from "sap/m/library";
import Model from "sap/ui/model/Model";
import HBox from "sap/m/HBox";
import Control from "sap/ui/core/Control";

import Connection from 'dhconsulting/fiori/model/connections/connections';
import "dhconsulting/fiori/custom/lib/xlsx.min";

type tyDataResponseValue = [{
    [key: string | string]: string | number | boolean | Date | null
}];
type tyDataResponse = {
    "@odata.context": string,
    "@odata.metadataEtag": string,
    value: tyDataResponseValue
};

class clDinamicTable{
    static _oObject: clDinamicTable;

    private _metaData = {}
    
    boolMakeded = false;
    oTableGrid: Table;
    oColumnTable: Column[] = [];

    // Buffer do que deverá ser repassado 
    // pra edição criação ou remoção
    oCacheDataEdit = {
        create: [] as object[],
        edit: [] as object[],
        delete: [] as object [],
    }

    /**
     * Controle interno de dados
     */
    sNamespace: string;
    sPath: string;
    oDataStorage : Model;
    rgBkDataStorage : []


    destroy(){
        this.sNamespace = "";
        this.rgBkDataStorage = [];
    }

    /**
     * eventos da ToolBar
     */
        
    _editTable(oEvent: Event){
        // Evento de click para edição databela
        const oObjectRef = this;//clDinamicTable._oObject;
        // Backup
        if(!this.oDataStorage.getProperty(this.sPath).length){
            return;
        }
        this.rgBkDataStorage = structuredClone(this.oDataStorage.getProperty(this.sPath))
        
        this.setEditOrVisible(true)

        // esconde botões padrão
        this._oBtnEdit.setVisible(false);
        this._oBtnExcel.setVisible(false);

        // Botões que irão aparecer
        this._oBtnConfirm.setVisible(true);
        this._oBtnCancel.setVisible(true);
    }

    async _excelBtn(oEvent: Event){
        // @ts-ignore
        const oXlsx = (XLSX as any ) ;        
        const oObjectRef = clDinamicTable._oObject;

        const workbook = oXlsx.utils.book_new();
        const worksheet = oXlsx.utils.json_to_sheet(this.oDataStorage.getProperty(this.sPath));
        oXlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        oXlsx.writeFile(workbook, `${new Date()}.xlsx`);
    }
    _restoreToDisplay(){
        this.setEditOrVisible(false)
        
        // devolve os botões padrão
        this._oBtnEdit.setVisible(true);
        this._oBtnExcel.setVisible(true);

        // esconde novamento os Botões que irão aparecer
        this._oBtnConfirm.setVisible(false);
        this._oBtnCancel.setVisible(false);
    }

    _saveTable(oEvent: Event){
        // Evento de click para Confirmação da Edição
       this._restoreToDisplay()
    }

    _cancelTable(oEvent: Event){
        // Evento de click para Cancelamento da Edição
        this._restoreToDisplay();
        // @ts-ignore
        oEvent.oSource.getModel(this.sNamespace).setProperty(
            this.sPath, 
            structuredClone(this.rgBkDataStorage)
        )
        this.rgBkDataStorage = []
    }

    /**
     * Botões da ToolBar
     */
    _oBtnEdit: Button;
    _oBtnExcel: Button;
    _oBtnConfirm: Button;
    _oBtnCancel: Button;

    toolBarIncluse(){

        this._oBtnEdit = new Button({
            icon: "sap-icon://edit",
            id: "btnEdit",
            tooltip: "Editar Registros",
            press: this._editTable.bind(this)
        });

        this._oBtnExcel = new Button({
            icon: "sap-icon://excel-attachment",
            id: "btnExcel",
            tooltip: "Gerar Excel",
            press: this._excelBtn.bind(this)
        });

        this._oBtnConfirm = new Button('cancelSave', {
            tooltip: "Save",
            icon: "sap-icon://save",
            type: "Accept",
            press: this._saveTable.bind(this),
            visible: false
        });

        this._oBtnCancel = new Button('cancelButton', {
            tooltip: "Cancel",
            icon: "sap-icon://decline",
            type: "Reject",
            press: this._cancelTable.bind(this),
            visible: false
        }) 

        return [
            new ToolbarSpacer(),
            this._oBtnEdit,
            this._oBtnExcel,

            // Botões em Edição
            this._oBtnConfirm,
            this._oBtnCancel
        ]
    }

    /**
     * Evento principal de criação da tabela dinamica
     */

    init(oData: Model, namespace="TABLE_RESULT", path="/value/", edit=false){
        clDinamicTable._oObject = this;

        /* monta de forma dinamica uma tabela do tipo Grid */

        // Armazena dados para controle de edição
        this.oDataStorage = oData;
        this.sNamespace = namespace;
        this.sPath = path;

        this.oTableGrid = new Table("", {
            rows: {
                path: `${namespace}>${path}`
            },
            threshold: 15,
            enableBusyIndicator: true,
            selectionMode: "MultiToggle"
        })

        // Botão Customizado
        this.oTableGrid.insertExtension(
            new OverflowToolbar("", {
            style: "Clear",
            content: (this.toolBarIncluse()),
        }), 0);

        if(this.oDataStorage.getProperty(path)){
            this.makeColumns(edit)
        }

        this.boolMakeded = true;
        return this.oTableGrid;
    
    }

    setEditOrVisible(boolEditable = false){
        debugger;
        const rgColumnsEdit = (this.oTableGrid.getColumns())

        for (let nIndex = 0; nIndex < rgColumnsEdit.length; nIndex++) {
            const oColumn = rgColumnsEdit[nIndex];
            const bIsPrimaryKey = oColumn.data("isPrimaryKey");
            // Caso ele seja chave primaria ele não a marca como editável
            if (bIsPrimaryKey) {
                continue; 
            }

            const oContent = oColumn.getTemplate() as Control;

            if(oContent.isA("sap.m.HBox")){
                // Input
                const oInput = (oContent as HBox).getItems()[0];
                const oText = (oContent as HBox).getItems()[1];

                oInput.setVisible(boolEditable)
                oText.setVisible(!boolEditable)                
            }else if((oContent as Control).isA("sap.m.CheckBox")){
                (oContent as CheckBox).setVisible(boolEditable);
            }

            rgColumnsEdit[nIndex].setTemplate(oContent);
        }
    }

    makeColumns(editable: boolean = false){
        // Checa se o campo é Chave
        const rgKey = (Connection.oConfig as any)[this.sNamespace]["GET"]["DEFAULT_KEY"]

        const checkPerType = (sType: String, sKeyColumn: String, editable: boolean)=>{
            let sTypeEdit: InputType;
            switch (sType) {
                case "Number":
                    sTypeEdit = InputType.Number;
                    break;
                case "String":
                default:
                    sTypeEdit = InputType.Text;
                    break;
            }
            
            if(sType == "Boolean"){
                return new CheckBox({
                    editable: editable,
                    enabled: true,
                    selected: `{${this.sNamespace }>${sKeyColumn}}`
                });
            }

            // if(editable){
                return new HBox({
                    items: [
                        new Input({
                            value: `{${this.sNamespace }>${sKeyColumn}}`,
                            type: (sTypeEdit as InputType),
                            visible: editable
                        }),

                        new Text({
                            text: `{${this.sNamespace }>${sKeyColumn}}`,
                            wrapping: false,
                            visible: !editable
                        })
                    ]
                })
           
        }

        const rgColumns = Object.keys((this.oDataStorage as Model).getProperty(this.sPath)[0])
        for(let i=0; i<rgColumns.length; i++){
            const sKeyColumn = rgColumns[i]
            const anyValue = (this.oDataStorage).getProperty(this.sPath)[0][sKeyColumn]
            const sType = (anyValue != null) ? anyValue!.constructor.name : "String"

            const bIsKey = rgKey.indexOf(sKeyColumn) >= 0

            const oNewColumn = new Column({
            autoResizable: true,
                width: "8rem",
                label: new Label({ 
                    text: `{i18n>${sKeyColumn}}`
                    // text: `${sKeyColumn}`
                }),
                // ele esteja na coluna ele o marca 
                // como não editável
                template: checkPerType(sType, sKeyColumn, bIsKey ? false : editable)
            });
            oNewColumn.data("isPrimaryKey", bIsKey);
        
            this.oTableGrid.insertColumn(oNewColumn, i);
      
        }
    }

}

export default clDinamicTable

