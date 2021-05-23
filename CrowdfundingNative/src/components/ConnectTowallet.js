import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {ScreenContainer} from './ScreenContainer';
import {AuthContext} from '../utils/standardcontext';
import DocumentPicker from 'react-native-document-picker';
//import RNFetchBlob from 'rn-fetch-blob'
import * as RNFS from 'react-native-fs';

export const ConnectToWallet = ({navigation}) => {
  const {signIn, updateWalletCredentials} = React.useContext(AuthContext);
  const [keyFileObject, setKeyFileObject] = useState(null);
  const [keyFileName, setKeyFileName] = useState(null);
  const [keyFilePassword, setKeyFilePassword] = React.useState(null);

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      //console.log('res : ' + JSON.stringify(res));
      //console.log('URI : ' + res.uri);
      //console.log('Type : ' + res.type);
      //console.log('File Name : ' + res.name);
      //console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      //setKeyFileObject(res);

      /* const fs = RNFetchBlob.fs;
      let content = fs.readFile(res.uri, 'utf8');
      console.log("content ", content); */
      setKeyFileName(res.name);

      RNFS.readFile(res.uri, 'ascii').then(content => {
        let jsonContent = JSON.parse(content);
        setKeyFileObject(jsonContent);
      });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  function disableOpenWallet() {
    if (
      keyFileObject !== null &&
      keyFilePassword !== null &&
      keyFilePassword !== ''
    ) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <ScreenContainer>
      <Text>Load key file</Text>
      <Text>{keyFileName}</Text>
      {/* <Button title="Sign In" onPress={() => signIn()}/> */}
      <TextInput
        secureTextEntry={true}
        onChangeText={setKeyFilePassword}
        placeholder="password"
      />

      <Button title="Load test key file" onPress={() => selectOneFile()} />
      <Button
        title="Open wallet"
        disabled={disableOpenWallet()}
        onPress={() =>
          updateWalletCredentials({
            keyFileObject,
            keyFilePassword,
          })
        }
      />
    </ScreenContainer>
  );
};
