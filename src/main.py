import gc
import sys

import neopixel
import network
import uasyncio as asyncio
from machine import Pin

import config

gc.collect()


class Pixel:
    def __init__(self, pin):
        self._pin = Pin(pin, Pin.OUT)
        self.pixel = neopixel.NeoPixel(self._pin, 1)
        self._color = (0, 0, 0)
        self.set_color(*self._color)
        self._blinking = None

    def set_color(self, r=0, g=0, b=0):
        self._color = (r, g, b)
        self.pixel[0] = self._color
        self.pixel.write()

    def stop_blink(self):
        if self._blinking:
            self._blinking.cancel()
            self._blinking = None

    async def _blinking_coro(self, cycle_ms):
        while True:
            original_color = self._color
            self.set_color(0, 0, 0)
            await asyncio.sleep_ms(cycle_ms // 2)
            self.set_color(*original_color)
            await asyncio.sleep_ms(cycle_ms // 2)

    def blink(self, cycle_ms=200):
        loop = asyncio.get_event_loop()
        self._blinking = loop.create_task(self._blinking_coro(cycle_ms))


async def connect_wifi(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        wlan.connect(ssid, password)
        while not wlan.isconnected():
            await asyncio.sleep_ms(10)


async def main():
    pixel = Pixel(config.PIXEL_PIN)
    pixel.blink()
    pixel.set_color(b=15)
    await connect_wifi(config.WIFI_SSID, config.WIFI_PASS)
    pixel.stop_blink()
    pixel.set_color(g=15)

    while True:
        await asyncio.sleep_ms(10)


try:
    asyncio.run(main())
except (KeyboardInterrupt, Exception) as e:
    sys.print_exception(e)
finally:
    asyncio.new_event_loop()