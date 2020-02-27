import { FieldNodeModel } from "./FieldNodeModel";
import * as React from "react";
import { FieldNodeWidget } from "./FieldNodeWidget";
import { DiagramEngine } from "../../src/DiagramEngine";
import { AbstractNodeFactory } from "../../src/factories/AbstractNodeFactory";
/**
 * @author Dylan Vorster
 */
export class FieldNodeFactory extends AbstractNodeFactory<FieldNodeModel> {
	constructor() {
		super("field");
	}

	generateReactWidget(diagramEngine: DiagramEngine, node: FieldNodeModel): JSX.Element {
		return React.createElement(FieldNodeWidget, {
			node: node,
			diagramEngine: diagramEngine
		});
	}

	getNewInstance(initialConfig?: any): FieldNodeModel {
		return new FieldNodeModel();
	}
}
