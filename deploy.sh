#! /bin/bash

set -e

BOARD=${BOARD:-u0}
echo "Selected serial port: ${BOARD}"

pushd frontend > /dev/null
# Build frontend
NODE_ENV=production node_modules/.bin/webpack
# copy frontend to the board
echo "Frontend size: $( du -h dist/index.html )"
pipenv run mpremote ${BOARD} cp ./dist/index.html :index.html
popd > /dev/null

# copy sources
pipenv run mpremote ${BOARD} cp -r ./src/ :

