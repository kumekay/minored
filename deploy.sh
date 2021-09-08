#! /bin/bash

set -e

BOARD=u0

# Build frontend
pushd frontend
NODE_ENV=production node_modules/.bin/webpack
# copy frontend to the board
echo "Frontend size: $( du -h dist/index.html )"
pipenv run mpremote ${BOARD} cp ./dist/index.html :index.html
popd

# copy sources
pipenv run mpremote ${BOARD} cp -r ./src/ :

