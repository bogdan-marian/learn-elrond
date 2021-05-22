# learn-elrond

## how do you deploy smart contracts at massive scale (part 4)

- [ ] intro
- [ ] explain the problem
- [ ] current dev efforts
- [ ] demo
- [ ] how does it work intro
  - [ ] java api code
  - [ ] docker file and deploy snippet
  - [ ] the PROJECT env value
- [ ] initial attempt

## run snippets

```bash
# build java
cd e02-crowdfunding-api
./gradlew build
cd ..
# set env project id (very useful if you deploy on google cloud)
export PROJECT_ID=my-sand-box
docker build -t gcr.io/${PROJECT_ID}/crowdfunding:v1 .
docker run -p 8080:8080 gcr.io/${PROJECT_ID}/crowdfunding:v1
docker run -it gcr.io/${PROJECT_ID}/crowdfunding:v1 /bin/bash
```

[swagger api tool](https://api-docs.elrond.com/)

## question: How to deploy a contract from React

Is possible to use the web wallet to sign also deployment transactions?

I'm still struggling with figuring out how to deploy a contract using React.
The examples from here in case of the web wallet to not cover this particular use case.
https://github.com/ElrondNetwork/elrond-sdk/blob/development/erdjs/src/smartcontracts/smartContract.dev.net.spec.ts

- In React web in order to read a binary file and not be modified on deploy you place the file in the `/public` folder. (I still do not know how to do this with react native)
- The provide tests only show how to load the wasm code and deploy the contract using the "fs" library. The fs library is not available in the browser so I have loaded the contract by using the web and hard coding temporary the contract served by the '/public' folder.
- What I get in response from testnet-wallet.elrond.com is a `413 (Request Entity Too large)

The request url
https://testnet-wallet.elrond.com/hook/transaction?receiver=erd1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq6gq4hu&value=0&gasLimit=3000000&gasPrice=1000000000&data=0061736d0100000001601160047f7f7f7f0060027f7f017f600 etc etc ..... @0100&callbackUrl=http://localhost:3000/deploy

This is the current commit that shows what I tried to do. https://github.com/bogdan-marian/learn-elrond/commit/cc47f03cfa67dfc9267da4c04e2630cf38f35e30

If you want to test the project ans checkout I'm trying to do

```
git clone git@github.com:bogdan-marian/learn-elrond.git
git@github.com:bogdan-marian/learn-elrond.git
git checkout 003-question-deploy-smart-contrac
yarn install
yarn start
# Open Test-Net Wallet
# Deploy new contract
# Deploy contract
# You get the 413 Error
```

Thank you for any feedback.

## Learn to code for Elrond (part 2)

- [ ] add close wallet button
- [ ] add denominate components
- [ ] add contract code
- [ ] check the contract balance
- [ ] check using test-net that all works
  - [ ] something was wrong with ALICE

This is part two of my journey of learning how to code for Elrond

Support me:
Maiar Herotag: @bogdanoloeriu
Referral link: https://get.maiar.com/referral/u9sk4wrnt0

Git repo: https://github.com/bogdan-marian/learn-elrond
Git start commit: bf6db8222c7be885bd766a0647408e8b4b317ee8
Git end commit: beeaf907596eb37a2f3f604cc4e6ba3cee247f74

Audio
Over You - Atch https://soundcloud.com/atch-music
Creative Commons — Attribution 3.0 Unported — CC BY 3.0
Free Download / Stream: http://bit.ly/_over-you
Music promoted by Audio Library https://youtu.be/rlBuOflkHSk

-- Contents of this video --------
00:00 - Intro
01:19 - Close the wallet
06:14 - Deal with eslint (BigInt not defined)
08:53 - Denominate the wallet balance
15:00 - Add the contract interaction code
21:38 - Discovering that bite code is part of contract response
23:00 - Minor refactoring
26:28 - Check contract balance
30:00 - Testing (Alice does not like me)
34:00 - Thank you for watching

## part 3

Learn to code for Elrond (part 3)

This is part three of my journey of learning how to code for Elrond. The format is way more condensed and also very exciting. This is where you will learn how to send funds.

Support me:
Maiar Herotag: @bogdanoloeriu
Referral link: https://get.maiar.com/referral/u9sk4wrnt0

Git project: https://github.com/bogdan-marian/learn-elrond
Git start commit: b48a2108ba694fbd4c4d1537b377a6823226ace4
Git end commit: 199f01076f8e9a0f9d2877680700ff1c96213759
Git sow diff: https://github.com/bogdan-marian/learn-elrond/compare/b48a2108ba694fbd4c4d1537b377a6823226ace4..199f01076f8e9a0f9d2877680700ff1c96213759

Audio
Over You - Atch https://soundcloud.com/atch-music
Creative Commons — Attribution 3.0 Unported — CC BY 3.0
Free Download / Stream: http://bit.ly/_over-you
Music promoted by Audio Library https://youtu.be/rlBuOflkHSk

-- Contents of this video --------
00:00 - Intro
00:30 - Demo  
02:26 - React part
05:03 - How to send funds
11:57 - Thank you for watching

### audio

https://www.youtube.com/watch?v=AYH71Q6i_uY&list=PLPcexzYkOpPwelvlPQSqge9vSwExWFiEm&index=15

### my wallet addresses

- test-net-chessout: `erd1ytfzuxqna50rush9g9r8rfmxv9dyzetq2my4dfq8w0t4cv4lngvsd5us2n`
- test-net-bogdan: `erd1mhhnd3ux2duwc9824dhelherdj3gvzn04erdw29l8cyr5z8fpa7quda68z`
- test-net-user: `erd1f740t3vah0mg9qmv28q3lfwkj593nnma34q9jevzs30pa0sku4cqnjj2mk`
- contract-address: `erd1qqqqqqqqqqqqqpgq3wltgm6g8n6telq3wz2apgjqcydladdtu4cq3ch0l0`

## Learn to code for Elrond (part 1)

- setup workspace:
  - use setup workspace command
  - use crowd funding template
  - run the
  - use the react template: https://github.com/ElrondNetwork/starter-dapp

## the hard part (hacking our way through)

I have some notes for create react app but that is it.

## log and snippets

### setting up a new react project

```bash
npx create-react-app e02-crowdfunding-web-app
```

What to remove

- App.css
- index.css
- logo
- App.test.js
  From App.js
- Just live a single div
  From index.js
- remove idex.css reference

Better theam

- Add chakra-ui
- customize theme
- dark theme

```javascript
const theme = extendTHeme({
  config: {
    initialColorMode: "dark",
  },
});
```

## elrond API notes

Take a look at:

https://docs.elrond.com/integrators/querying-the-blockchain/

https://api-docs.elrond.com/
