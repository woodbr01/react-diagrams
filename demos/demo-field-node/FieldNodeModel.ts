import { FieldPortModel } from "./FieldPortModel";
import * as _ from "lodash";

import { NodeModel, NodeModelListener } from "../../src/models/NodeModel";
import { Toolkit } from "../../src/Toolkit";
import { DiagramEngine } from "../../src/DiagramEngine";

/**
 * @author Dylan Vorster
 */
export class FieldNodeModel extends NodeModel<NodeModelListener> {
	name: string;
	color: string;
	ports: { [s: string]: FieldPortModel };

	constructor(name: string = "Untitled", color: string = "rgb(0,192,255)") {
		super("field");
		this.name = name;
		this.color = color;
	}

	addInPort(label: string): FieldPortModel {
		return this.addPort(new FieldPortModel(true, Toolkit.UID(), label));
	}

	addOutPort(label: string): FieldPortModel {
		return this.addPort(new FieldPortModel(false, Toolkit.UID(), label));
	}

	deSerialize(object, engine: DiagramEngine) {
		super.deSerialize(object, engine);
		this.name = object.name;
		this.color = object.color;
	}

	serialize() {
		return _.merge(super.serialize(), {
			name: this.name,
			color: this.color
		});
	}

	getInPorts(): FieldPortModel[] {
		return _.filter(this.ports, portModel => {
			return portModel.in;
		});
	}

	getOutPorts(): FieldPortModel[] {
		return _.filter(this.ports, portModel => {
			return !portModel.in;
		});
	}
}
