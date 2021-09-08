import { DefaultPortModel, NodeModel } from '@projectstorm/react-diagrams';

/**
 * Example of a custom model using pure javascript
 */
export class HttpEndpointNodeModel extends NodeModel {
	constructor(options = {}) {
		super({
			...options,
			type: 'http-endpoint-node'
		});
		this.value = options.value || {};
		this.addPort(
			new DefaultPortModel({
				in: false,
				name: 'out'
			})
		);
	}

	serialize() {
		return {
			...super.serialize(),
			value: this.value
		};
	}

	deserialize(ob, engine) {
		super.deserialize(ob, engine);
		this.value = ob.value;
	}
}
