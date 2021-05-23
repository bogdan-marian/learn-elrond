# just notes

```bash
npx react-native start
npx react-native run-android

yarn react-native start
yarn react-native run-android

yarn add @elrondnetwork/elrond-core-js
# https://aboutreact.com/file-picker-in-react-native/
yarn add react-native-document-picker

# https://stackoverflow.com/questions/65882109/unable-to-read-file-contents-in-react-native-0-59
yarn add rn-fetch-blob
yarn add react-native-fs

# first try crypto
yarn add react-native-crypto
yarn add react-native-randombytes
yarn react-native link react-native-randombytes
yarn add tradle/rn-nodeify
./node_modules/.bin/rn-nodeify --hack --install

# second try crypto
yarn add react-native-crypto-js


```

[hints to fix crypto problem:](https://medium.com/hackernoon/using-core-node-js-modules-in-react-native-apps-64acd4d07140)
Is a long way to do the crypto bundle yourself but if you install the react-native-crypto package and just alias the native NodeJS crypto module with the react-native one then will work.

