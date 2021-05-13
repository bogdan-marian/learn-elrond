# learn-elrond

- demo 

## the simple part
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
  config:{
    initialColorMode: 'dark'
  }
})
```

## elrond API notes


Take a look at:

https://docs.elrond.com/integrators/querying-the-blockchain/

https://api-docs.elrond.com/


### my wallet addresses

- test-net-chessout: `erd1ytfzuxqna50rush9g9r8rfmxv9dyzetq2my4dfq8w0t4cv4lngvsd5us2n`
- test-net-bogdan: `erd1mhhnd3ux2duwc9824dhelherdj3gvzn04erdw29l8cyr5z8fpa7quda68z`
- test-net-user: `erd1f740t3vah0mg9qmv28q3lfwkj593nnma34q9jevzs30pa0sku4cqnjj2mk`
- contract-address: `erd1qqqqqqqqqqqqqpgqy3ewcgq5et7kaprnrjrvpdv6qwkedss6d8sstpw07p`



## 002 learn elrond part 2

- [ ] add close wallet button
