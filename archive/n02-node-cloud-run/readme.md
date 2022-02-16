# google docker cloud run and node

## some links

[node server side](https://shiffman.net/a2z/server-node/#:~:text=%E2%80%A2-,Node.,in%20a%20file%20called%20hello.)
[google cloud run](https://codelabs.developers.google.com/codelabs/cloud-run-hello#0)
[elrond rest](https://docs.elrond.com/sdk-and-tools/rest-api/rest-api/#proxy-api-vs-observer-api)
[ts-node-dev](https://github.com/wclr/ts-node-dev)
[good javascript query snippets](https://elrondnetwork.github.io/elrond-sdk-docs/erdjs/latest/#creating-value-transfer-transactions)
[interact with the smart contract](https://www.julian.io/articles/elrond-erdjs.html)
[elrond express api](https://github.com/ElrondNetwork/express-api)

## query the blockchain

```text
Martin Wagner | CIO | Knights of Cathena, [14.02.22 21:20]
[In reply to Bogdan Oloeriu]
Unless you want to make more than 50 request per minute in which case you would get rate limited by the public gateway, yes :)
In that case you would either have to use bware labs api or setup your own observer squad :)
```

## outdated ts interaction file

```text
Martin Wagner | CIO | Knights of Cathena, [14.02.22 23:31]
Use the UserSigner to replace the BackendSigner
https://github.com/ElrondNetwork/elrond-sdk-erdjs/blob/bdec7b5fb1335dba3311d721681f35a16f1f4f5a/src/walletcore/userSigner.ts#L18

Martin Wagner | CIO | Knights of Cathena, [14.02.22 23:32]
And Argument is a bit more tricky since it was split into several files, but there is BytesValue.fromUtf8 now and stuff like new BigUintValue() to replace it :)
```

## actual log

```bash
gcloud auth login
GOOGLE_CLOUD_PROJECT="mysandbox-v3"
gcloud config set project ${GOOGLE_CLOUD_PROJECT}
gcloud config set compute/zone europe-west1-b
gcloud services enable run.googleapis.com

mkdir n02-node-cloud-run
cd n02-node-cloud-run
npm init
npm install express

gcloud builds submit --tag gcr.io/$GOOGLE_CLOUD_PROJECT/helloworld
gcloud container images list
gcloud auth configure-docker

# run the container
docker run -d -p 8080:8080 gcr.io/$GOOGLE_CLOUD_PROJECT/helloworld

# deploy
gcloud run deploy helloworld \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/helloworld \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated

# clean everything up
gcloud container images delete gcr.io/$GOOGLE_CLOUD_PROJECT/helloworld

# delete cloud run instance
gcloud run services delete helloworld \
  --platform managed \
  --region europe-west1
```

# nodemon

```bash
cd n02-node-cloud-run/
npm install --save-dev nodemon
node_modules/nodemon/bin/nodemon.js index.js

npm install --save-dev fs

yarn add @elrondnetwork/erdjs
yarn add ts-node
yarn add typescript
yarn add ts-node-dev --dev

node_modules/ts-node-dev/lib/bin.js index.ts

```

# kill running processes

[kill running processes](https://stackoverflow.com/questions/9346211/how-to-kill-a-process-on-a-port-on-ubuntu)

```bash
sudo kill -9 `sudo lsof -t -i:8080`
```

# run elrond tests
```bash
npm install mocha
```
