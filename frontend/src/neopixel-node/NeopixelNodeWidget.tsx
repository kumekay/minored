import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { NeopixelNodeModel } from "./NeopixelNodeModel";

export interface NeopixelNodeWidgetProps {
  node: NeopixelNodeModel;
  engine: DiagramEngine;
}

export interface NeopixelNodeWidgetState {}

export class NeopixelNodeWidget extends React.Component<
  NeopixelNodeWidgetProps,
  NeopixelNodeWidgetState
> {
  constructor(props: NeopixelNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="custom-node neopixel-node">
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("r")}
        >
          <div className="circle-port red" />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("g")}
        >
          <div className="circle-port green" />
        </PortWidget>
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("b")}
        >
          <div className="circle-port blue" />
        </PortWidget>
      </div>
    );
  }
}
