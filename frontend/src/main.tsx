import * as React from "react";
import * as ReactDOM from "react-dom";
import "./main.css";
import createEngine, {
  DefaultLinkModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import { HttpEndpointNodeFactory } from "./http-endpoint-node/HttpEndpointNodeFactory";
import { NeopixelNodeFactory } from "./neopixel-node/NeopixelNodeFactory";
import { BodyWidget } from "./BodyWidget";

// create an instance of the engine
const engine = createEngine();

// register the two engines
engine.getNodeFactories().registerFactory(new HttpEndpointNodeFactory() as any);
engine.getNodeFactories().registerFactory(new NeopixelNodeFactory());

// create a diagram model
const model = new DiagramModel();

let savedFlow = localStorage.getItem("currentFlow");
if (savedFlow !== null) {
  model.deserializeModel(JSON.parse(savedFlow), engine);
}

let saveModel = function (e) {
  console.log(e);
  return localStorage.setItem("currentFlow", JSON.stringify(model.serialize()));
};

model.registerListener({
  nodesUpdated: saveModel,
  linksUpdated: saveModel,
  lockChanged: saveModel,
  entityRemoved: saveModel,
  selectionChanged: saveModel,
});

// install the model into the engine
engine.setModel(model);

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <BodyWidget engine={engine} />,
    document.querySelector("#application")
  );
});
