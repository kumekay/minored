import * as React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams';

export class HttpEndpointNodeWidget extends React.Component {
	render() {
		return (
			<div className="custom-node">
				<PortWidget engine={this.props.engine} port={this.props.node.getPort('out')}>
					<div className="circle-port" />
				</PortWidget>
				<div className="endpoint">{ this.props.node.endpoint }</div>
			</div>
		);
	}
}
