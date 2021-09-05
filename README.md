# minored

Browser based flow editor backed by micropython.

## Use

- This demo assumes you have connected to ESP32
- Rename `src/config_example.py` to `src/config.py` and update credentials.
- Copy all files to your board (flashed with micropython 1.15+ in advance) with `mpremote u0 cp src/* :`

## Development

This project uses [micropy-cli](https://github.com/BradenM/micropy-cli) for proper lint of micropython standard library and requires

```
micropy stubs add esp32-micropython-1.15.0
```

To be installed first for proper vscode support
