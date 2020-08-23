import React, {useState, useContext, useEffect} from 'react';
import {Input, Button, Text} from 'react-native-elements';
import {
  StyleSheet,
  ScrollView,
  View,
  Switch,
  //  StatusBar
} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spacer from '../components/Spacer';
import firestore from '@react-native-firebase/firestore';
import {Context as AuthContext} from '../context/AuthContext';
import ShowError from '../components/ShowError';
import {navigate} from '../navigationRef';

const AuthForm = ({language, toggleLanguage}) => {
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [addressState, setAddressState] = useState(null);
  const [skill, setSkill] = useState(null);
  const [experience, setExperience] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [companyAddress, setCompanyAddress] = useState(null);
  const [companyCity, setCompanyCity] = useState(null);
  const [companyState, setCompanyState] = useState(null);
  const [companyPincode, setCompanyPincode] = useState(null);

  const {state} = useContext(AuthContext);
  const {uid, phoneNumber} = state;

  const {
    inputStyle,
    headerStyle,
    inputContainerStyle,
    Container,
    body,
    labelStyle,
    errorStyle,
    buttonContainerStyle,
    buttonTitleStyle,
    jobDescription,
  } = styles;

  const getUser = async () => {
    const userAvailable = await firestore()
      .collection('users')
      .doc(user.user.uid)
      .get();
    console.log(userAvailable.data());
  };

  useEffect(() => {
    //  getUser()
  }, []);

  const createUserDatabase = (data) => {
    firestore()
      .doc(`users/${uid}`)
      .set(data)
      .then(() => {
        console.log('data saved');
      })
      .catch((error) => console.log('Error when creating new data', error));
  };

  const onSubmit = async () => {
    if (
      uid &&
      phoneNumber &&
      name &&
      age &&
      gender &&
      address &&
      city &&
      addressState &&
      skill &&
      experience &&
      pincode &&
      companyName &&
      companyAddress &&
      companyCity &&
      companyState &&
      companyPincode
    ) {
      const data = {
        uid,
        phoneNumber,
        name,
        age,
        gender,
        address,
        city,
        addressState,
        skill,
        experience,
        pincode,
        companyName,
        companyAddress,
        companyCity,
        companyState,
        companyPincode,
      };
      await createUserDatabase(data);
      setError(null);
      navigate('Share', {data: {name, number: phoneNumber, address, pincode}});
    } else {
      console.log({uid});
      console.log({phoneNumber});
      console.log({name});
      console.log({age});
      console.log({gender});
      console.log({address});
      console.log({city});
      console.log({addressState});
      console.log({skill});
      console.log({experience});
      console.log({pincode});
      console.log({companyName});
      console.log({companyAddress});
      console.log({companyCity});
      console.log({companyState});
      console.log({companyPincode});
      setError('Please enter all the field');
    }
  };

  return (
    <>
      <ScrollView style={Container}>
        {/* <StatusBar backgroundColor="#1B73E8" /> */}
        <Text style={headerStyle} h4>
          {language
            ? 'कृपया, नीचे दिया गया फॉर्म भरें'
            : 'Please Enter the form below'}
        </Text>
        <View style={body}>
          <Spacer>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={language ? '#1B73E8' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleLanguage}
              value={language}
            />
            <Input
              label={language ? 'पूरा नाम' : 'Full Name'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
              placeholder={language ? 'नाम यहाँ लिखें' : 'Enter name here'}
            />
            <Input
              label={language ? 'आयु' : 'Age'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              value={age}
              placeholder={language ? 'आयु यहाँ लिखें' : 'Enter age here'}
              onChangeText={setAge}
            />
            <Input
              label={language ? 'लिंग' : 'Gender'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="words"
              autoCorrect={false}
              value={gender}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setGender}
            />
            <Input
              label={language ? 'घर का पता' : 'Home Address'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="words"
              autoCorrect={false}
              value={address}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setAddress}
            />

            <Input
              label={language ? 'शहर या जिले का नाम' : 'City or Distict Name'}
              value={city}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="words"
              autoCorrect={false}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setCity}
            />
            <Input
              label={language ? 'राज्य' : 'State'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="words"
              autoCorrect={false}
              value={addressState}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setAddressState}
            />

            <Input
              label={language ? 'पिन कोड' : 'Pincode'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              value={pincode}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setPincode}
            />

            <Text style={jobDescription} h4>
              {language ? 'नौकरी विवरण' : 'Job Description'}
            </Text>

            <Input
              label={language ? 'कंपनी का नाम' : 'Company Name'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="words"
              autoCorrect={false}
              value={companyName}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setCompanyName}
            />

            <Input
              label={language ? 'अपने कौशल को लिखें' : 'Write your Skill'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="words"
              autoCorrect={false}
              value={skill}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setSkill}
            />

            <Input
              label={language ? 'वर्ष में अनुभव' : 'Experience in year'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              value={experience}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setExperience}
            />

            <Input
              label={language ? 'कंपनी का पता' : 'Company Address'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="words"
              autoCorrect={false}
              value={companyAddress}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setCompanyAddress}
            />

            <Input
              label={language ? 'शहर या जिले का नाम' : 'City or Distict Name'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="words"
              autoCorrect={false}
              value={companyCity}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setCompanyCity}
            />

            <Input
              label={language ? 'राज्य' : 'State'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="words"
              autoCorrect={false}
              value={companyState}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setCompanyState}
            />

            <Input
              label={language ? 'पिन कोड' : 'Pincode'}
              inputStyle={inputStyle}
              labelStyle={labelStyle}
              inputContainerStyle={inputContainerStyle}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              value={companyPincode}
              placeholder={language ? 'यहाँ लिखें' : 'Enter here'}
              onChangeText={setCompanyPincode}
            />
          </Spacer>
          <View style={errorStyle}>
            {error ? <ShowError errMsg={error} /> : null}
          </View>
          <Button
            containerStyle={buttonContainerStyle}
            titleStyle={buttonTitleStyle}
            title={language ? 'फार्म दर्ज करें' : 'Submit Form'}
            onPress={onSubmit}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderBottomWidth: 0,
    paddingTop: 15,
  },
  inputStyle: {
    backgroundColor: '#F2F0F0',
    borderRadius: 10,
    paddingLeft: 10,
  },
  labelStyle: {
    color: 'black',
  },
  headerStyle: {
    color: 'white',
    paddingVertical: 25,
    textAlign: 'center',
  },
  Container: {
    backgroundColor: '#1B73E8',
  },
  body: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  errorStyle: {
    marginLeft: 15,
    marginTop: -30,
  },

  buttonContainerStyle: {
    paddingVertical: 10,
    backgroundColor: '#2288DC',
  },
  buttonTitleStyle: {
    fontSize: 20,
    color: 'white',
  },
  jobDescription: {
    color: '#1B73E8',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default AuthForm;
