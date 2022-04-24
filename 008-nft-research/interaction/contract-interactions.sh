PROJECT="${PWD}"
DEPLOY_TRANSACTION=$(erdpy data load --key=deployTransaction-devnet)
CURRENT_ENV="not-set"
MY_LOGS="interaction-logs"

setEnvDevnet() {
  cp -f erdpy.data-storage-devnet.json erdpy.data-storage.json
  CURRENT_ENV="devnet"
  PEM_FILE="${PROJECT}/../../../wallets/users/devnet_owner_wallet.pem"
  ADDRESS=$(erdpy data load --key=address-devnet)
  PROXY=https://devnet-gateway.elrond.com
  CHAINID=D
  ENV_LOGS="devnet"
  COLLECTION_ID="CHESOUT-not-set-yet"
  COLLECTION_ID_HEX=$(echo -n ${COLLECTION_ID} | xxd -p)
}

deploy() {
  erdpy --verbose contract deploy --project=${PROJECT} --recall-nonce --pem=${PEM_FILE} \
    --gas-limit=4000000 --send --outfile="${MY_LOGS}/deploy-${ENV_LOGS}.json" \
    --proxy=${PROXY} --chain=${CHAINID} || return

  TRANSACTION=$(erdpy data parse --file="${MY_LOGS}/deploy-${ENV_LOGS}.json" --expression="data['emitted_tx']['hash']")
  ADDRESS=$(erdpy data parse --file="${MY_LOGS}/deploy-${ENV_LOGS}.json" --expression="data['emitted_tx']['address']")

  erdpy data store --key=address-devnet --value=${ADDRESS}
  erdpy data store --key=deployTransaction-devnet --value=${TRANSACTION}

  echo ""
  echo "Smart contract address: ${ADDRESS}"
}
