import * as React from "react";
import { FieldPortModel } from "./FieldPortModel";
import { PortWidget } from "../../src/widgets/PortWidget";
import { BaseWidget, BaseWidgetProps } from "../../src/widgets/BaseWidget";

export interface FieldPortLabelProps extends BaseWidgetProps {
	model: FieldPortModel;
}

export interface FieldPortLabelState {}

/**
 * @author Dylan Vorster
 */
export class FieldPortLabel extends BaseWidget<FieldPortLabelProps, FieldPortLabelState> {
	constructor(props) {
		super("srd-field-port", props);
	}

	getClassName() {
		return super.getClassName() + (this.props.model.in ? this.bem("--in") : this.bem("--out"));
	}

	render() {
		var port = <PortWidget node={this.props.model.getParent()} name={this.props.model.name} />;
		var label = <div className="name">{this.props.model.label}</div>;

		return (
			<div {...this.getProps()}>
				<select>
					<option>one</option>
					<option>two</option>
					<option>three</option>
				</select>
				<input/>
				{this.props.model.in ? port : label}
				{this.props.model.in ? label : port}
			</div>
		);
	}
}
