import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.css";
import createEngine, {
  DefaultLinkModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import { HttpEndpointNodeFactory } from "./http-endpoint-node/HttpEndpointNodeFactory";
import { NeopixelNodeFactory } from "./neopixel-node/NeopixelNodeFactory";
import { HttpEndpointNodeModel } from "./http-endpoint-node/HttpEndpointNodeModel";
import { NeopixelNodeModel } from "./neopixel-node/NeopixelNodeModel";
import { BodyWidget } from "./BodyWidget";

// create an instance of the engine
const engine = createEngine();

// register the two engines
engine.getNodeFactories().registerFactory(new HttpEndpointNodeFactory() as any);
engine.getNodeFactories().registerFactory(new NeopixelNodeFactory());

// create a diagram model
const model = new DiagramModel();

//####################################################
// now create two nodes of each type, and connect them

const input = new HttpEndpointNodeModel({ value: 15 });
input.setPosition(50, 50);

const neopixel = new NeopixelNodeModel({ r: 240, g: 140, b: 220 });
neopixel.setPosition(200, 50);

const link1 = new DefaultLinkModel();
link1.setSourcePort(input.getPort("out"));
link1.setTargetPort(neopixel.getPort("r"));

model.addAll(input, neopixel, link1);

var str = JSON.stringify(model.serialize());
console.log(model.serialize());
console.log(str);
//####################################################

// install the model into the engine
engine.setModel(model);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <BodyWidget engine={engine} />,
    document.querySelector("#application")
  );
});
