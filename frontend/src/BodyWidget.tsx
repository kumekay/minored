import * as React from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";

export interface BodyWidgetProps {
  engine: DiagramEngine;
}
export class BodyWidget extends React.Component<BodyWidgetProps> {
  render() {
    return (
      <div className="diagram-container">
        <div className="control-panel">
          <div className="button">Send</div>
        </div>
        <CanvasWidget
          className="diagram-sub-container"
          engine={this.props.engine}
        ></CanvasWidget>
      </div>
    );
  }
}
