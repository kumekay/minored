import * as React from "react";
import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { NeopixelNodeModel } from "./neopixel-node/NeopixelNodeModel";
import { HttpEndpointNodeModel } from "./http-endpoint-node/HttpEndpointNodeModel";

export interface BodyWidgetProps {
  engine: DiagramEngine;
}
export class BodyWidget extends React.Component<BodyWidgetProps> {
  model: DiagramModel;

  constructor(props) {
    super(props);

    this.model = props.engine.getModel();

    this.handleSend = this.handleSend.bind(this);
    this.handleAddHttpEndpoint = this.handleAddHttpEndpoint.bind(this);
    this.handleAddNeopixel = this.handleAddNeopixel.bind(this);
  }

  handleSend(event) {
    console.log(this.model.serialize());
  }

  handleAddHttpEndpoint(event) {
    const node = new HttpEndpointNodeModel({ endpoint: "/input" });
    this.model.addAll(node);
    this.props.engine.repaintCanvas();
  }

  handleAddNeopixel(event) {
    const node = new NeopixelNodeModel({ r: 240, g: 140, b: 220 });
    this.model.addAll(node);
    this.props.engine.repaintCanvas();
  }

  render() {
    return (
      <div className="diagram-container">
        <div className="control-panel">
          <div className="button" onClick={this.handleSend}>
            Send
          </div>
          <div className="button" onClick={this.handleAddHttpEndpoint}>
            Add Http Endpoint
          </div>
          <div className="button" onClick={this.handleAddNeopixel}>
            Add Neopixel
          </div>
        </div>
        <CanvasWidget
          className="diagram-sub-container"
          engine={this.props.engine}
        ></CanvasWidget>
      </div>
    );
  }
}
