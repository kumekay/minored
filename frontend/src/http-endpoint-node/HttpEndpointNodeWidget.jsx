import * as React from "react";
import { PortWidget } from "@projectstorm/react-diagrams";

export class HttpEndpointNodeWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { endpoint: props.node.endpoint };

    this.handleEndpointChange = this.handleEndpointChange.bind(this);
  }

  handleEndpointChange(event) {
    this.setState({ endpoint: event.target.value });
    this.props.node.endpoint = event.target.value;
  }

  render() {
    return (
      <div className="custom-node http-endpoint-node">
        <PortWidget
          engine={this.props.engine}
          port={this.props.node.getPort("out")}
        >
          <div className="circle-port" />
        </PortWidget>
        <div className="endpoint">
          <input
            type="text"
            value={this.state.endpoint}
            onChange={this.handleEndpointChange}
          />
        </div>
      </div>
    );
  }
}
