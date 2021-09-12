import sys
import asyncio
import json

sys.path.append("../src")

import flow


async def main():
    with open("flow.json", "r") as file:
        data = json.loads(file.read())

    print(await flow.load(data))

    # Keep alive
    while True:
        await asyncio.sleep(1)


asyncio.run(main())
