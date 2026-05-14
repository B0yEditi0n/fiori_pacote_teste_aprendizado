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
    
    oTableGrid: Table;
    oColumnTable: Column[] = [];

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
        const oObjectRef = clDinamicTable._oObject;
        // Backup
        if(!oObjectRef.oDataStorage.getProperty(oObjectRef.sPath).length){
            return;
        }
        oObjectRef.rgBkDataStorage = structuredClone(oObjectRef.oDataStorage.getProperty(oObjectRef.sPath))
        oObjectRef.oTableGrid.destroyColumns();
        oObjectRef.makeColumns(true)

        // esconde botões padrão
        oObjectRef._oBtnEdit.setVisible(false);
        oObjectRef._oBtnExcel.setVisible(false);

        // Botões que irão aparecer
        oObjectRef._oBtnConfirm.setVisible(true);
        oObjectRef._oBtnCancel.setVisible(true);
    }

    async _excelBtn(oEvent: Event){
        if(typeof XLSX == "undefined"){
            // @ts-ignore
            await import("dhconsulting/fiori/customComponents/lib/xlsx.min");
        }

        const oXlsx = (XLSX as any ) ;        
        const oObjectRef = clDinamicTable._oObject;

        const workbook = oXlsx.utils.book_new();
        const worksheet = oXlsx.utils.json_to_sheet(oObjectRef.oDataStorage.getProperty(oObjectRef.sPath));
        oXlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        oXlsx.writeFile(workbook, `${new Date()}.xlsx`);
    }
    _restoreToDisplay(){
        this.makeColumns(false)
        
        // devolve os botões padrão
        this._oBtnEdit.setVisible(true);
        this._oBtnExcel.setVisible(true);

        // esconde novamento os Botões que irão aparecer
        this._oBtnConfirm.setVisible(false);
        this._oBtnCancel.setVisible(false);
    }

    _saveTable(oEvent: Event){
        // Evento de click para Confirmação da Edição
       clDinamicTable._oObject._restoreToDisplay()
    }

    _cancelTable(oEvent: Event){
        // Evento de click para Cancelamento da Edição
        clDinamicTable._oObject._restoreToDisplay();
        debugger;
        // @ts-ignore
        this.getModel("TABLE_RESULT").setProperty(
            clDinamicTable._oObject.sPath, 
            structuredClone(clDinamicTable._oObject.rgBkDataStorage)
        )
        clDinamicTable._oObject.rgBkDataStorage = []
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
            press: this._editTable
        });

        this._oBtnExcel = new Button({
            icon: "sap-icon://excel-attachment",
            id: "btnExcel",
            tooltip: "Gerar Excel",
            press: this._excelBtn
        });

        this._oBtnConfirm = new Button('cancelSave', {
            tooltip: "Save",
            icon: "sap-icon://save",
            type: "Accept",
            press: this._saveTable,
            visible: false
        });

        this._oBtnCancel = new Button('cancelButton', {
            tooltip: "Cancel",
            icon: "sap-icon://decline",
            type: "Reject",
            press: this._cancelTable,
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

    init(oData: Model, namespace="TABLE_RESULT", path="/value/"){
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
            this.makeColumns()
        }

        clDinamicTable._oObject = this;

        return this.oTableGrid;
    }

    makeColumns(editable: boolean = false){
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

            if(editable){
                return new Input({
                    value: `{${this.sNamespace }>${sKeyColumn}}`,
                    type: (sTypeEdit as InputType)
                })        
            }else{
                 return new Text({
                    text: `{${this.sNamespace }>${sKeyColumn}}`,
                    wrapping: false
                });
            }
           
        }

        const rgColumns = Object.keys((this.oDataStorage as Model).getProperty(this.sPath)[0])
        for(let i=0; i<rgColumns.length; i++){
            const sKeyColumn = rgColumns[i]
            const anyValue = (this.oDataStorage).getProperty(this.sPath)[0][sKeyColumn]
            const sType = (anyValue != null) ? anyValue!.constructor.name : "String"

            this.oTableGrid.insertColumn(new Column({
            autoResizable: true,
                width: "8rem",
                label: new Label({ 
                    // text: `{i18n>${sKeyColumn}}`
                    text: `${sKeyColumn}`
                }),
                template: checkPerType(sType, sKeyColumn,editable)
            }

        ), i)
      
        }
    }

}

export default clDinamicTable

