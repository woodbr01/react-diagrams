import { LabelModel } from "../../src/models/LabelModel";
import * as _ from "lodash";
import { DiagramEngine } from "../../src/DiagramEngine";

export class FieldLabelModel extends LabelModel {
	label: string;

	constructor() {
		super("field");
		this.offsetY = -23;
	}

	setLabel(label: string) {
		this.label = label;
	}

	deSerialize(ob, engine: DiagramEngine) {
		super.deSerialize(ob, engine);
		this.label = ob.label;
	}

	serialize() {
		return _.merge(super.serialize(), {
			label: this.label
		});
	}
}
