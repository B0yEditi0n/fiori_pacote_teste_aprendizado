sap.ui.define(["sap/ui/table/Table", "sap/m/OverflowToolbar", "sap/ui/table/Column", "sap/m/Label", "sap/m/Text", "sap/m/Input", "sap/m/Button", "sap/m/ToolbarSpacer"], function (Table, OverflowToolbar, Column, Label, Text, Input, Button, ToolbarSpacer) {
  "use strict";

  const dinamicTable = (oData, namespace = "TABLE_RESULT", path = "/value/") => {
    /* monta de forma dinamica uma tabela do tipo Grid */

    const oTable = new Table("", {
      rows: {
        path: `${namespace}>${path}`
      },
      threshold: 15,
      enableBusyIndicator: true,
      selectionMode: "MultiToggle"
    });

    // Botão Customizado
    const oOverflow = new OverflowToolbar("", {
      style: "Clear",
      content: [new ToolbarSpacer(), new Input({
        width: "10rem"
      }), new Button({
        icon: "sap-icon://edit",
        id: "btnEdit",
        tooltip: "Editar Registros"
      }), new Button({
        icon: "sap-icon://excel-attachment",
        id: "btnExcel",
        tooltip: "Gerar Excel"
      })]
    });
    oTable.insertExtension(oOverflow, 0);
    const rgColumns = Object.keys(oData["value"][0]);
    for (let i = 0; i < rgColumns.length; i++) {
      const sKeyColumn = rgColumns[i];
      oTable.insertColumn(new Column({
        autoResizable: true,
        width: "11rem",
        label: new Label({
          text: `{i18n>${sKeyColumn}}`
        }),
        template: new Text({
          text: `{${namespace}>${sKeyColumn}}`,
          wrapping: false
        })
      }), i);
    }
    return oTable;
  };
  return dinamicTable;
});
//# sourceMappingURL=dinamicTable-dbg.js.map
