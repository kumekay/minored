import { DefaultPortModel, NodeModel } from "@projectstorm/react-diagrams";

/**
 * Example of a custom model using pure javascript
 */
export class HttpEndpointNodeModel extends NodeModel {
  constructor(options = {}) {
    super({
      ...options,
      type: "http-endpoint-node",
    });
    this.endpoint = options.endpoint || "/in";
    this.addPort(
      new DefaultPortModel({
        in: false,
        name: "out",
      })
    );
  }

  serialize() {
    return {
      ...super.serialize(),
      endpoint: this.endpoint,
    };
  }

  deserialize(ob, engine) {
    super.deserialize(ob, engine);
    this.endpoint = ob.data.endpoint;
  }
}
