import Table from "sap/ui/table/Table";
import OverflowToolbar from "sap/m/OverflowToolbar";
import Column from "sap/ui/table/Column";
import Label from "sap/m/Label";
import Text from "sap/m/Text";
import Input from "sap/m/Input";
import Button from "sap/m/Button";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import Event from "sap/ui/base/Event";
import deepExtend from 'sap/base/util/deepExtend';
import UIComponent from "sap/ui/core/UIComponent";
import CheckBox from "sap/m/CheckBox";
import { InputType } from "sap/m/library";

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
    oDataStorage : tyDataResponse | {}  = {};
    oBkDataStorage : object


    destroy(){
        this.sNamespace = "";
        this.oDataStorage = {};
        this.oBkDataStorage = {};
    }

    /**
     * eventos da ToolBar
     */
        
    _editTable(oEvent: Event){
        // Evento de click para edição databela
        const oObjectRef = clDinamicTable._oObject;
        // Backup
        if(!( oObjectRef.oDataStorage as tyDataResponse ).value.length){
            return;
        }
        oObjectRef.oBkDataStorage = deepExtend([], ( oObjectRef.oDataStorage as tyDataResponse ).value);
        oObjectRef.oTableGrid.destroyColumns();
        oObjectRef.makeColumns(true)
    }

    _excelBtn(oEvent: Event){

    }

    _cancelTable(oEvent: Event){
        // Evento de click para edição databela
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
            //press: this._excelBtn
        });

        this._oBtnConfirm = new Button('cancelSave', {
            tooltip: "Save",
            icon: "sap-icon://save",
            type: "Accept",
            // press: this._saveTable,
            visible: false
        });

        this._oBtnCancel = new Button('cancelButton', {
            tooltip: "Cancel",
            icon: "sap-icon://decline",
            type: "Reject",
            // press: this._cancelTable,
            visible: false
        }) 

        return [
            new ToolbarSpacer(),
            new Input({ width: "10rem" }),
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

    init(oData: tyDataResponse, namespace="TABLE_RESULT", path="/value/"){
        /* monta de forma dinamica uma tabela do tipo Grid */

        // Armazena dados para controle de edição
        this.oDataStorage = oData || {};
        this.sNamespace = namespace;
        
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

        if((this.oDataStorage as tyDataResponse)["value"]){
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

        const rgColumns = Object.keys((this.oDataStorage as tyDataResponse)["value"][0])
        for(let i=0; i<rgColumns.length; i++){
            const sKeyColumn = rgColumns[i]
            const anyValue = (this.oDataStorage as tyDataResponse)["value"][0][sKeyColumn]
            const sType = (anyValue != null) ? anyValue!.constructor.name : "String"

            this.oTableGrid.insertColumn(new Column({
            autoResizable: true,
                width: "8rem",
                label: new Label({ 
                    text: `{i18n>${sKeyColumn}}`
                }),
                template: checkPerType(sType, sKeyColumn,editable)
            }

        ), i)
      
        }
    }

}

export default clDinamicTable

