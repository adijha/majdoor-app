import React, {useContext, useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-elements';
import Spacer from '../components/Spacer';
import ToggleLanguage from '../components/ToggleLanguage';
import ShowError from '../components/ShowError';
import {Context as LanguageContext} from '../context/LanguageContext';
import {Context as AuthContext} from '../context/AuthContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {navigate} from '../navigationRef';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const LoginScreen = () => {
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState(null);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(null);
  const {update_uid} = useContext(AuthContext);
  const {state, toggleLanguage} = useContext(LanguageContext);
  const {text, iconContainerStyle, iconStyle, otpContainer} = styles;
  const {language} = state;

  const validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(`+91${number}`);
  };

  const handleSendCode = () => {
    setError(null);
    // Request to send OTP
    if (validatePhoneNumber()) {
      auth()
        .signInWithPhoneNumber(`+91${number}`)
        .then((confirmResult) => {
          setConfirm(confirmResult);
        })
        .catch((error) => {
          console.error(error);
          setError(language ? 'कुछ गलत हो गया' : 'Something went wrong');
        });
    } else {
      setError(
        language ? 'कृपया मोबाइल नंबर Sahi dale' : 'Invalid Mobile Number',
      );
    }
  };

  const handleVerifyCode = () => {
    setError(null);
    // Request for OTP verification
    if (code.length == 6) {
      confirm
        .confirm(code)
        .then(async (user) => {
          update_uid(user.user.uid, user.user.phoneNumber);
          const userAvailable = await firestore()
            .collection('users')
            .doc(user.user.uid)
            .get();
          if (userAvailable.data()) {
            navigate('Share', {
              userData: {
                number: userAvailable.data().phoneNumber,
                address: userAvailable.data().city,
                pincode: userAvailable.data().pinCode,
                name: userAvailable.data().name,
                skill: userAvailable.data().skill,
              },
            });
          } else {
            navigate('Form');
          }

          console.log('==>', user.user.phoneNumber, user.user.uid);
        })
        .catch((error) => {
          console.error(error);
          setError(language ? 'कुछ गलत हो गया' : 'Something went wrong');
        });
    } else {
      setError(
        language
          ? 'अवैध कोड, पुन: प्रयास करें'
          : 'Invalid code, Please try again',
      );
    }
  };

  // async function signInWithPhoneNumber(phoneNumber) {
  //   if (!phoneNumber)
  //     return setError(
  //       language ? 'कृपया मोबाइल नंबर दर्ज करें' : 'Please Enter Mobile Number',
  //     );
  //   try {
  //     setError(null);
  //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //     setConfirm(confirmation);
  //   } catch (error) {
  //     console.log({error});
  //     setError(language ? 'कुछ गलत हो गया' : 'Something went wrong');
  //   }
  // }

  // async function confirmCode() {
  //   if (!code)
  //     return setError(language ? 'कृपया कोड दर्ज करें' : 'Please Enter Code');
  //   try {
  //     setError(null);
  //     await confirm.confirm(code);
  //     // navigate('mainFlow'); //todo
  //   } catch (error) {
  //     console.log({error});
  //     setError(
  //       language
  //         ? 'अवैध कोड, पुन: प्रयास करें'
  //         : 'Invalid code, Please try again',
  //     );
  //   }
  // }

  if (!confirm) {
    return (
      <View>
        <ToggleLanguage language={language} toggleLanguage={toggleLanguage} />
        <Spacer>
          <Text style={text} h2>
            {' '}
            {language ? 'पुष्टीकरण' : 'Confirmation '}{' '}
          </Text>
        </Spacer>

        <Text style={text}>
          {' '}
          {language ? 'अपना मोबाइल नंबर दर्ज करें' : 'Enter Your Mobile Number'}
        </Text>
        <Spacer />

        <Spacer>
          <TextInput
            style={styles.input}
            autoFocus={true}
            keyboardType={'numeric'}
            maxLength={10}
            placeholder={language ? 'मोबाइल नंबर' : 'Mobile Number'}
            underlineColorAndroid="transparent"
            value={number}
            onChangeText={(text) => setNumber(text)}
          />
        </Spacer>
        {error ? <ShowError errMsg={error} /> : null}

        <View style={iconContainerStyle}>
          <TouchableOpacity
            // onPress={() => signInWithPhoneNumber(number)}
            onPress={handleSendCode}
            activeOpacity={0.7}>
            <Icon
              style={iconStyle}
              type="feather"
              color="white"
              size={50}
              name="arrow-right"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View>
      <ToggleLanguage language={language} toggleLanguage={toggleLanguage} />
      <Spacer>
        <Text style={text} h2>
          {' '}
          {language ? 'पुष्टीकरण' : 'Confirmation '}{' '}
        </Text>
      </Spacer>
      <Text style={text}> {language ? 'OTP दर्ज करें' : 'Enter OTP'}</Text>

      <View style={otpContainer}>
        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(text) => setCode(text)}
        />
      </View>

      {error ? <ShowError errMsg={error} /> : null}

      <View style={iconContainerStyle}>
        {/* <TouchableOpacity onPress={() => confirmCode()} activeOpacity={0.7}> */}
        <TouchableOpacity onPress={handleVerifyCode} activeOpacity={0.7}>
          <Icon
            style={iconStyle}
            type="feather"
            color="white"
            size={50}
            name="arrow-right"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    textAlign: 'center',
  },
  input: {
    // textAlign: 'left',
    // borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 60,
    fontSize: 20,
    paddingLeft: 30,
    // borderBottomWidth: 0,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    paddingTop: 15,
  },
  iconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    marginTop: 250,
    backgroundColor: '#18434D',
    borderRadius: 50,
    paddingTop: 15,
    height: 80,
    width: 80,
    textAlign: 'center',
  },

  otpContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -50,
  },
  borderStyleBase: {
    width: 35,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#18434D',
  },

  underlineStyleBase: {
    borderRadius: 50,
    width: 50,
    height: 50,
    color: 'black',
    fontSize: 20,
    backgroundColor: 'white',
  },

  underlineStyleHighLighted: {
    borderColor: '#18434D',
    backgroundColor: 'white',
  },
});

LoginScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default LoginScreen;
