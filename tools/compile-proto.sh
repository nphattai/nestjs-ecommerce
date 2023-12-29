#!/bin/sh

for App in 'user' ; do
  protoc \
    --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_opt=nestJs=true \
    --ts_proto_out=./libs/api/grpc/$App/src ./proto/$App/*.proto \
    --experimental_allow_proto3_optional;
done;

for FILE in ./libs/api/grpc/*/src/proto/**/*.ts; do
  echo "Remove protobufPackage and GOOGLE_PROTOBUF_PACKAGE_NAME for $FILE"
  grep -v '^export const protobufPackage' "$FILE" > tmp_file && mv tmp_file "$FILE";
  grep -v '^export const GOOGLE_PROTOBUF_PACKAGE_NAME' "$FILE" > tmp_file && mv tmp_file "$FILE";
done;

prettier --write ./libs/api/grpc/*/src/proto;
