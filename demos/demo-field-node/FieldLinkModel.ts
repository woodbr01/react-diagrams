/**
 * @author Dylan Vorster
 */
import { LinkModel, LinkModelListener } from "../../src/models/LinkModel";
import { BaseEvent } from "../../src/BaseEntity";
import * as _ from "lodash";
import { PointModel } from "../../src/models/PointModel";
import { DiagramEngine } from "../../src/DiagramEngine";
import { FieldLabelModel } from "./FieldLabelModel";
import { LabelModel } from "../../src/models/LabelModel";

export interface FieldLinkModelListener extends LinkModelListener {
	colorChanged?(event: BaseEvent<FieldLinkModel> & { color: null | string }): void;

	widthChanged?(event: BaseEvent<FieldLinkModel> & { width: 0 | number }): void;
}

export class FieldLinkModel extends LinkModel<FieldLinkModelListener> {
	width: number;
	color: string;
	curvyness: number;

	constructor(type: string = "field") {
		super(type);
		this.color = "rgba(255,255,255,0.5)";
		this.width = 3;
		this.curvyness = 50;
	}

	serialize() {
		return _.merge(super.serialize(), {
			width: this.width,
			color: this.color,
			curvyness: this.curvyness
		});
	}

	deSerialize(ob, engine: DiagramEngine) {
		super.deSerialize(ob, engine);
		this.color = ob.color;
		this.width = ob.width;
		this.curvyness = ob.curvyness;
	}

	addLabel(label: LabelModel | string) {
		if (label instanceof LabelModel) {
			return super.addLabel(label);
		}
		let labelOb = new FieldLabelModel();
		labelOb.setLabel(label);
		return super.addLabel(labelOb);
	}

	setWidth(width: number) {
		this.width = width;
		this.iterateListeners((listener: FieldLinkModelListener, event: BaseEvent) => {
			if (listener.widthChanged) {
				listener.widthChanged({ ...event, width: width });
			}
		});
	}

	setColor(color: string) {
		this.color = color;
		this.iterateListeners((listener: FieldLinkModelListener, event: BaseEvent) => {
			if (listener.colorChanged) {
				listener.colorChanged({ ...event, color: color });
			}
		});
	}
}
