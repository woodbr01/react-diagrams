import * as React from "react";
import * as _ from "lodash";
import { FieldNodeModel } from "./FieldNodeModel";
import { FieldPortLabel } from "./FieldPortLabelWidget";
import { DiagramEngine } from "../../src/DiagramEngine";
import { BaseWidget, BaseWidgetProps } from "../../src/widgets/BaseWidget";

export interface FieldNodeProps extends BaseWidgetProps {
	node: FieldNodeModel;
	diagramEngine: DiagramEngine;
}

export interface FieldNodeState {}

/**
 * @author Dylan Vorster
 */
export class FieldNodeWidget extends BaseWidget<FieldNodeProps, FieldNodeState> {
	constructor(props: FieldNodeProps) {
		super("srd-field-node", props);
		this.state = {};
	}

	generatePort(port) {
		return <FieldPortLabel model={port} key={port.id} />;
	}

	render() {
		return (
			<div {...this.getProps()} style={{ background: this.props.node.color }}>
				<div className={this.bem("__title")}>
					<div className={this.bem("__name")}>{this.props.node.name}</div>
				</div>
				<div className={this.bem("__ports")}>
					<div className={this.bem("__in")}>
						{_.map(this.props.node.getInPorts(), this.generatePort.bind(this))}
					</div>
					<div className={this.bem("__out")}>
						{_.map(this.props.node.getOutPorts(), this.generatePort.bind(this))}
					</div>
				</div>
			</div>
		);
	}
}
