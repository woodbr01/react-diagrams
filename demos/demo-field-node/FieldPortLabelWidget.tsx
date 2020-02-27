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
				{this.props.model.in ? port : label}
				<select>
					<option>STRING</option>
					<option>INTEGER</option>
					<option>DOUBLE</option>
				</select>
				<input placeholder={"`Size"}/>
				{this.props.model.in ? label : port}
			</div>
		);
	}
}
