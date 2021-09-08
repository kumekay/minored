import * as React from 'react';
import { HttpEndpointNodeModel } from './HttpEndpointNodeModel';
import { HttpEndpointNodeWidget } from './HttpEndpointNodeWidget';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';

export class HttpEndpointNodeFactory extends AbstractReactFactory {
	constructor() {
		super('http-endpoint-node');
	}

	generateModel(event) {
		return new HttpEndpointNodeModel();
	}

	generateReactWidget(event) {
		return <HttpEndpointNodeWidget engine={this.engine} node={event.model} />;
	}
}
