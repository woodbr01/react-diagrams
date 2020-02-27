import * as _ from "lodash";
import { PortModel } from "../../src/models/PortModel";
import { DiagramEngine } from "../../src/DiagramEngine";
import { LinkModel } from "../../src/models/LinkModel";
import {DefaultLinkModel} from "../../src/defaults/models/DefaultLinkModel";

export class FieldPortModel extends PortModel {
	in: boolean;
	label: string;
	links: { [id: string]: DefaultLinkModel };

	constructor(isInput: boolean, name: string, label: string = null, id?: string) {
		super(name, "default", id);
		this.in = isInput;
		this.label = label || name;
	}

	deSerialize(object, engine: DiagramEngine) {
		super.deSerialize(object, engine);
		this.in = object.in;
		this.label = object.label;
	}

	serialize() {
		return _.merge(super.serialize(), {
			in: this.in,
			label: this.label
		});
	}

	link(port: PortModel): LinkModel {
		let link = this.createLinkModel();
		link.setSourcePort(this);
		link.setTargetPort(port);
		return link;
	}

	canLinkToPort(port: PortModel): boolean {
		if (port instanceof FieldPortModel) {
			return this.in !== port.in;
		}
		return true;
	}

	createLinkModel(): LinkModel {
		let link = super.createLinkModel();
		return link || new DefaultLinkModel();
	}
}
