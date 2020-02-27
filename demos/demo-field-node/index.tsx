// import {
// 	DiagramEngine,
// 	DiagramModel,
// 	DefaultNodeModel,
// 	LinkModel,
// 	FieldPortModel,
// 	DiagramWidget
// } from "storm-react-diagrams";
import {DiagramEngine} from "../../src/DiagramEngine";
import * as React from "react";

// import the custom models
import { FieldNodeModel } from "./FieldNodeModel";
import {DiagramModel} from "../../src/models/DiagramModel";
import {DiagramWidget} from "../../src/widgets/DiagramWidget";
import {FieldLinkModel} from "./FieldLinkModel";
import {SimplePortFactory} from "../demo-custom-node1/SimplePortFactory";
import {FieldPortModel} from "./FieldPortModel";
import {FieldNodeFactory} from "./FieldNodeFactory";

/**
 * @Author Dylan Vorster
 */
export default () => {
	//1) setup the diagram engine
	var engine = new DiagramEngine();
	engine.installDefaultFactories();
	engine.registerPortFactory(new SimplePortFactory("field", config => new FieldPortModel()));
	engine.registerNodeFactory(new FieldNodeFactory());

	//2) setup the diagram model
	var model = new DiagramModel();

	//3-A) create a default node
	var node1 = new FieldNodeModel("Original", "rgb(0,192,255)");
	let port1 = node1.addOutPort("Field1");
	let port3 = node1.addOutPort("Field2");
	node1.setPosition(100, 100);

	//3-B) create another default node
	var node2 = new FieldNodeModel("Modified", "rgb(192,255,0)");
	let port2 = node2.addInPort("Field1");
	let port4 = node2.addInPort("Field2");
	node2.setPosition(400, 100);

	// link the ports
	let link1 = port1.link(port2);
	let link2 = port3.link(port4);
	// (link1 as FieldLinkModel).addLabel("Hello World!");

	//4) add the models to the root graph
	model.addAll(node1, node2, link1, link2);

	//5) load model into engine
	engine.setDiagramModel(model);

	//6) render the diagram!
	return <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />;
};
