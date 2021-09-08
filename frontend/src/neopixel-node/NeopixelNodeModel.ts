import { NodeModel, DefaultPortModel } from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";

export interface NeopixelNodeModelOptions extends BaseModelOptions {
  r?: number;
  g?: number;
  b?: number;
}

export class NeopixelNodeModel extends NodeModel {
  r: number;
  g: number;
  b: number;

  constructor(options: NeopixelNodeModelOptions = {}) {
    super({
      ...options,
      type: "neopixel-node",
    });
    this.r = options.r || 0;
    this.g = options.g || 0;
    this.b = options.b || 0;

    // setup an in and out port
    this.addPort(
      new DefaultPortModel({
        in: true,
        name: "r",
      })
    );
    this.addPort(
      new DefaultPortModel({
        in: true,
        name: "g",
      })
    );
    this.addPort(
      new DefaultPortModel({
        in: true,
        name: "b",
      })
    );
  }

  serialize() {
    return {
      ...super.serialize(),
      r: this.r,
      g: this.g,
      b: this.b,
    };
  }

  deserialize(event): void {
    super.deserialize(event);
    this.r = event.data.r;
    this.g = event.data.g;
    this.b = event.data.b;
  }
}
