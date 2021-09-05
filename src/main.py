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

    def set_color(self, r=0, g=0, b=0):
        self.pixel[0] = (r, g, b)
        self.pixel.write()


async def connect_wifi(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        wlan.connect(ssid, password)
        while not wlan.isconnected():
            asyncio.sleep_ms(10)


async def main():
    pixel = Pixel(config.PIXEL_PIN)
    pixel.set_color(b=15)
    await connect_wifi(config.WIFI_SSID, config.WIFI_PASS)
    pixel.set_color(g=15)


try:
    asyncio.run(main())
except (KeyboardInterrupt, Exception) as e:
    sys.print_exception(e)
finally:
    asyncio.stop()
