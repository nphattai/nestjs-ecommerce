#!/bin/sh
APP="$1"
APP_PATH=./apps/"$1"
NODE_MODULE_PATH=../../node_modules

if [ "$APP" = "shared" ] ; then
  APP_PATH=./libs/domain/shared
  NODE_MODULE_PATH=../../../node_modules
fi

cd $APP_PATH || exit
ts-node -P ./tsconfig.json \
        -O '{"module": "commonjs", "experimentalDecorators": true}' \
        -r tsconfig-paths/register \
        -r dotenv/config "$NODE_MODULE_PATH"/typeorm/cli.js  \
        migration:revert \
          -d src/adapter/storage/typeorm/data-source.ts  \
