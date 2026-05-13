sap.ui.define(["sap/m/SegmentedButton", "sap/ui/mdc/condition/Condition", "sap/ui/mdc/enums/ConditionValidated", "sap/ui/mdc/enums/OperatorName", "sap/ui/mdc/condition/FilterOperatorUtil"], function (SegmentedButton, Condition, ConditionValidated, OperatorName, FilterOperatorUtil) {
  "use strict";

  /**
   * @namespace dhconsulting.fiori.customComponents
   */
  const CustomMultselectOptions = SegmentedButton.extend("dhconsulting.fiori.customComponents.CustomMultselectOptions", {
    // Definição do Renderer
    renderer: sap.m.SegmentedButtonRenderer,
    // Definição do Metadata usando a nova sintaxe de objeto estático
    metadata: {
      properties: {
        conditions: {
          type: "object[]",
          group: "Data",
          defaultValue: [],
          bindable: true
        },
        enabled: {
          type: "boolean",
          group: "Behavior",
          defaultValue: true
        }
      },
      aggregations: {
        items: {
          type: "sap.m.SegmentedButtonItem",
          multiple: true,
          singularName: "item",
          bindable: true
        }
      },
      events: {
        change: {
          parameters: {
            value: {
              type: "string"
            }
          }
        }
      },
      defaultProperty: "conditions"
    },
    init: function _init() {
      SegmentedButton.prototype.init.call(this);
      this._oManagedObjectModel = new sap.ui.model.base.ManagedObjectModel(this);
      this._oObserver = new sap.ui.base.ManagedObjectObserver(this._observeChanges.bind(this));
      this._oObserver.observe(this, {
        properties: ["conditions"]
      });
      this.attachSelectionChange(this._handleSelectionChange.bind(this));
    },
    clone: function _clone(sIdSuffix, aLocalIdentifiers) {
      this.detachSelectionChange(this._handleSelectionChange.bind(this));
      const oClone = SegmentedButton.prototype.clone.call(this, sIdSuffix, aLocalIdentifiers);
      this.attachSelectionChange(this._handleSelectionChange.bind(this));
      return oClone;
    },
    _observeChanges: function _observeChanges(oChanges) {
      if (oChanges.name === "conditions") {
        const aConditions = oChanges.current;
        if (aConditions && aConditions[0]) {
          this.setSelectedKey(aConditions[0].values[0]);
        }
      }
    },
    _handleSelectionChange: function _handleSelectionChange(oEvent) {
      const oSegmentedButtonItem = oEvent.getParameter("item");
      const sSelectedId = oSegmentedButtonItem.getKey();

      // Criando a condição MDC seguindo as boas práticas de tipagem
      const oCondition = Condition.createCondition(OperatorName.EQ, [sSelectedId], undefined, undefined, ConditionValidated.NotValidated);

      // Verifica se a condição está vazia (utilidade do FilterOperatorUtil)
      FilterOperatorUtil.checkConditionsEmpty([oCondition]);

      // Atualiza a propriedade e dispara o evento de mudança
      this.setProperty("conditions", [oCondition]);
      this.fireEvent("change", {
        value: sSelectedId
      });
    },
    // Getter/Setter tipados para o TypeScript reconhecer as propriedades do metadata
    getConditions: function _getConditions() {
      return this.getProperty("conditions");
    },
    setConditions: function _setConditions(aConditions) {
      this.setProperty("conditions", aConditions);
      return this;
    }
  });
  return CustomMultselectOptions;
});
//# sourceMappingURL=MultselectOptions-dbg.js.map
