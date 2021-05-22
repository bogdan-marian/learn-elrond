#!/bin/bash
SNIPETS="contract.snipets.sh"
WASM_FILE="e05-crowdfunding.wasm"
PEM_FILE="test-net-user.pem"

THIS_DIR=$(pwd)
SOURCE_DIR="${THIS_DIR}/scripts/contract"
TARGET_DIR="${HOME}/contract"

mkdir -p "${TARGET_DIR}/output"
mkdir -p "${TARGET_DIR}/security"

cp "${SOURCE_DIR}/${SNIPETS}" "${TARGET_DIR}/${SNIPETS}"
cp "${SOURCE_DIR}/output/${WASM_FILE}" "${TARGET_DIR}/output/${WASM_FILE}"
cp "${THIS_DIR}/scripts/security/${PEM_FILE}" "${TARGET_DIR}/security/${PEM_FILE}"

echo Enjoy your conding session