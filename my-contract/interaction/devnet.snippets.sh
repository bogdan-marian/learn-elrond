PROJECT="${PWD}"
ALICE="${PROJECT}/wallets/users/alice.pem"
BOGDAN="${PROJECT}/wallets/users/testnet-bogdan.pem"
ADDRESS=$(erdpy data load --key=address-devnet)
DEPLOY_TRANSACTION=$(erdpy data load --key=deployTransaction-devnet)
PROXY=https://devnet-gateway.elrond.com
CHAINID=D
MY_LOGS="interaction-logs"

GAS_LIMIT="60000000"
GAS_SMALL="50000000"
DEPLOY_GAS="65000000"
BUY_GAS="10000000"

MINT_COST_VAL=$(echo '0.05*(10^18)' | bc)
MINT_COST=$(echo $MINT_COST_VAL | awk -F "." '{print $1}')
TOKEN_NAME="TEST001xToken"
TOKEN_NAME_HEX=$(echo -n ${TOKEN_NAME} | xxd -p)
TOKEN_REVERSE=$(xxd -r -p <<<"$TOKEN_NAME_HEX")
TOKEN_TICKER="TEST001"
TOKEN_TICKER_HEX=$(echo -n ${TOKEN_TICKER} | xxd -p)
ISSUE_TOKEN_ARGUMENTS="0x${TOKEN_NAME_HEX} 0x${TOKEN_TICKER_HEX}"

deploy() {
  erdpy --verbose contract deploy --project=${PROJECT} --recall-nonce --pem=${ALICE} \
    --gas-limit=${DEPLOY_GAS} --send --outfile="${MY_LOGS}/deploy-devnet.interaction.json" \
    --proxy=${PROXY} --chain=${CHAINID} || return

  TRANSACTION=$(erdpy data parse --file="${MY_LOGS}/deploy-devnet.interaction.json" --expression="data['emitted_tx']['hash']")
  ADDRESS=$(erdpy data parse --file="${MY_LOGS}/deploy-devnet.interaction.json" --expression="data['emitted_tx']['address']")

  erdpy data store --key=address-devnet --value=${ADDRESS}
  erdpy data store --key=deployTransaction-devnet --value=${TRANSACTION}

  echo ""
  echo "Smart contract address: ${ADDRESS}"
}

issueToken() {
  erdpy --verbose contract call ${ADDRESS} --recall-nonce --pem=${ALICE} --gas-limit=${GAS_LIMIT} \
    --function="issueToken" \
    --value ${MINT_COST} \
    --arguments ${ISSUE_TOKEN_ARGUMENTS} \
    --proxy=${PROXY} --chain=${CHAINID} --send \
    --outfile="${MY_LOGS}/issueToken.json"
}