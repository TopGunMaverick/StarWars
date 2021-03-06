// @flow
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import FullScreenSpinnerHOC from '../hoc/FullScreenSpinnerHOC';
import DismissKeyboardHOC from '../hoc/DismissKeyboardHOC';
import KeyboardAwareHOC from '../hoc/KeyboardAwareHOC';
import Toast from 'react-native-simple-toast';

const DismissKeyboardView = DismissKeyboardHOC(View);
const FullSCreenSpinnerAndDismissKeyboardView = FullScreenSpinnerHOC(
  DismissKeyboardView
);

const KeyboardAwareImage = KeyboardAwareHOC(Image);
const KeyboardAwareView = KeyboardAwareHOC(View);

export default class Login extends Component {
  state = {
    logging: false
  };
  // This call is for test assignment only
  async callLoginAPI() {
    this.setState({ logging: true });
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });

    Toast.show("SIGN IN success", Toast.SHORT);
    this.setState({ logging: false });
    Actions.movies();
  }
  render() {
    return (

      <FullSCreenSpinnerAndDismissKeyboardView
        spinner={this.state.logging}
        style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <KeyboardAwareView
            style={{
              flex: 1,
              marginBottom: 40
            }}
            styleDuringKeyboardShow={{ marginBottom: 10 }}
          >
            <KeyboardAwareImage
              resizeMode="contain"
              style={[
                {
                  height: '100%',
                  width: '100%'
                }
              ]}
              styleDuringKeyboardShow={{ opacity: 0.5 }}
              source={require('../images/img_login/gembul.png')}
            />
          </KeyboardAwareView>
          <TextInput placeholder="Username" style={[styles.textInput]} />
          <TextInput
            placeholder="Password"
            style={[styles.textInput, { marginVertical: 20 }]}
          />

          <TouchableOpacity
            onPress={() => {
              this.callLoginAPI();
            }}
            style={[styles.button]}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
              SIGN IN
          </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>


      </FullSCreenSpinnerAndDismissKeyboardView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 26,
    paddingBottom: 18
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  textInput: {
    height: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ECF0F3',
    paddingHorizontal: 19
  },
  button: {
    height: 60,
    borderRadius: 3,
    backgroundColor: '#11B8FF',
    justifyContent: 'center',
    alignItems: 'center'
  }
});