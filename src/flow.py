try:
    import uasyncio as asyncio
except ImportError:
    import asyncio

from random import randrange


class Output:
    def __init__(self, uid, name, links=None):
        self.name = name
        self.uid = uid

        if links is None:
            links = []
        self.links = links


class Inlet:
    def __init__(self, uid, name):
        self.name = name
        self.uid = uid


class BaseNode:
    def __init__(self, uid, inlets=None, outputs=None, **kwargs):
        self.uid = uid
        self.active = False

        if inlets is None:
            inlets = {}
        self.inlets = inlets

        if outputs is None:
            outputs = {}
        self.outputs = outputs

    async def send_message(self, message, links):
        for link in links:
            asyncio.create_task(link[1].on_message({link[0]: message}))

    async def processor(self):
        pass

    async def on_message(self, message):
        pass


# class HttpEndpointNode(BaseNode):
#     def __init__(self, *args, value=None, endpoint="/test", **kwargs):
#         super().__init__(*args, **kwargs)
#         self.active = True
#         self.value = value
#         self.endpoing = endpoint

#     async def processor(self):
#         while True:
#             await asyncio.sleep(3)
#             await self.send_message(randrange(255))


class RandomNode(BaseNode):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.active = True

    async def processor(self):
        while True:
            await asyncio.sleep(3)
            new_message = randrange(255)
            print("sent", new_message)
            links = list(self.outputs.values())[0].links
            await self.send_message(new_message, links)


class NeopixelNode(BaseNode):
    def __init__(self, *args, r=0, g=0, b=0, **kwargs):
        super().__init__(*args, **kwargs)
        self.r = r
        self.g = g
        self.b = b

    async def on_message(self, message):
        print("received", message)
        for k, v in message.items():
            setattr(self, k, v)
        print(self.r, self.g, self.b)


KNOWN_NODES = {
    "neopixel-node": NeopixelNode,
    "http-endpoint-node": RandomNode,
}


def unit_by_uid(units, uid):
    for unit in units.values():
        if unit.uid == uid:
            return unit


async def load(flow):
    nodes = {}
    # find layers with nodes
    node_layers = (
        layer for layer in flow["layers"] if layer["type"] == "diagram-nodes"
    )
    for layer in node_layers:
        for uid, node in layer["models"].items():
            klass = KNOWN_NODES[node["type"]]
            outputs = {}
            inlets = {}
            for port in node["ports"]:
                if port["in"]:
                    inlets[port["label"]] = Inlet(port["id"], port["label"])
                else:
                    outputs[port["label"]] = Output(port["id"], port["label"])
            nodes[uid] = klass(uid, outputs=outputs, inlets=inlets, **node)

    # Link all ports
    link_layers = (
        layer for layer in flow["layers"] if layer["type"] == "diagram-links"
    )

    for layer in link_layers:
        for link in layer["models"].values():
            source = unit_by_uid(nodes, link["source"])
            output = unit_by_uid(source.outputs, link["sourcePort"])
            target = unit_by_uid(nodes, link["target"])
            link = (
                unit_by_uid(target.inlets, link["targetPort"]).name,
                target,
            )
            output.links.append(link)

    # Start processing
    for node in nodes.values():
        if node.active:
            asyncio.create_task(node.processor())

    return nodes
