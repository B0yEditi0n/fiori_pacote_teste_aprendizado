import SegmentedButton from "sap/m/SegmentedButton";
// import SegmentedButtonRenderer from "sap/m/SegmentedButtonRenderer";
// import ManagedObjectModel from "sap/ui/model/base/ManagedObjectModel";
// import ManagedObjectObserver from "sap/ui/base/ManagedObjectObserver";
import Condition from "sap/ui/mdc/condition/Condition";
import ConditionValidated from "sap/ui/mdc/enums/ConditionValidated";
import OperatorName from "sap/ui/mdc/enums/OperatorName";
import FilterOperatorUtil from "sap/ui/mdc/condition/FilterOperatorUtil";
import { MetadataOptions } from "sap/ui/core/Element";
import { SegmentedButton$SelectionChangeEvent } from "sap/m/SegmentedButton";

/**
 * @namespace dhconsulting.fiori.customComponents
 */
export default class CustomMultselectOptions extends SegmentedButton {
    
    // Definição do Metadata usando a nova sintaxe de objeto estático
    public static readonly metadata: MetadataOptions = {
        properties: {
            conditions: { type: "object[]", group: "Data", defaultValue: [], bindable: true },
            enabled: { type: "boolean", group: "Behavior", defaultValue: true }
        },
        aggregations: {
            items: { type: "sap.m.SegmentedButtonItem", multiple: true, singularName: "item", bindable: true }
        },
        events: {
            change: {
                parameters: {
                    value: { type: "string" }
                }
            }
        },
        defaultProperty: "conditions"
    };

    // Definição do Renderer
    public static renderer = (sap.m as any)!.SegmentedButtonRenderer;

    private _oManagedObjectModel: any;
    private _oObserver: any;

    public init(): void {
        super.init();

		this._oManagedObjectModel = new ( sap.ui.model as any )!.base.ManagedObjectModel(this);
        this._oObserver = new ( sap.ui as any )!.base.ManagedObjectObserver(this._observeChanges.bind(this));
        this._oObserver.observe(this, {
            properties: ["conditions"]
        });

        this.attachSelectionChange(this._handleSelectionChange.bind(this));
    }

    public clone(sIdSuffix?: string, aLocalIdentifiers?: string[]): this{
        this.detachSelectionChange(this._handleSelectionChange.bind(this));
        const oClone = super.clone(sIdSuffix, aLocalIdentifiers) as CustomMultselectOptions;
        this.attachSelectionChange(this._handleSelectionChange.bind(this));
        return oClone as this;
    }

    private _observeChanges(oChanges: any): void {
        if (oChanges.name === "conditions") {
            const aConditions = oChanges.current as any[];
            if (aConditions && aConditions[0]) {
                this.setSelectedKey(aConditions[0].values[0]);
            }
        }
    }

    private _handleSelectionChange(oEvent: SegmentedButton$SelectionChangeEvent): void {
        const oSegmentedButtonItem: any = oEvent.getParameter("item");
        const sSelectedId = oSegmentedButtonItem.getKey();

        // Criando a condição MDC seguindo as boas práticas de tipagem
        const oCondition = Condition.createCondition(
            OperatorName.EQ, 
            [sSelectedId], 
            undefined as any,
            undefined as any, 
            ConditionValidated.NotValidated
        );

        // Verifica se a condição está vazia (utilidade do FilterOperatorUtil)
        (FilterOperatorUtil as any).checkConditionsEmpty([oCondition]);
        
        // Atualiza a propriedade e dispara o evento de mudança
        this.setProperty("conditions", [oCondition]);
        this.fireEvent("change", { value: sSelectedId });
    }

    // Getter/Setter tipados para o TypeScript reconhecer as propriedades do metadata
    public getConditions(): object[] {
        return this.getProperty("conditions");
    }

    public setConditions(aConditions: object[]): this {
        this.setProperty("conditions", aConditions);
        return this;
    }
}