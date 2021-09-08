import * as React from "react";
import { NeopixelNodeModel } from "./NeopixelNodeModel";
import { NeopixelNodeWidget } from "./NeopixelNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export class NeopixelNodeFactory extends AbstractReactFactory<
  NeopixelNodeModel,
  DiagramEngine
> {
  constructor() {
    super("neopixel-node");
  }

  generateModel(initialConfig) {
    return new NeopixelNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <NeopixelNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}
