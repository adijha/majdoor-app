import React, {useContext} from 'react';
import {Text, StyleSheet, Button, TouchableOpacity, View} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as LanguageContext} from '../context/LanguageContext';

const LanguageScreen = () => {
  const {state, changeLanguage} = useContext(LanguageContext);
  const {text, buttonContainer, activeButton, inactiveButton} = styles;
  const {language} = state;
  return (
    <>
      <Spacer />
      <Spacer />
      <Spacer>
        <Text style={text}> Select Your Language </Text>
        <Text style={text}> (अपनी भाषा चुनिए) </Text>
      </Spacer>
      <Spacer />
      <Spacer />
      <View style={buttonContainer}>
        <TouchableOpacity onPress={() => changeLanguage('English')}>
          <Text style={!language ? activeButton : inactiveButton}>ENGLISH</Text>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity onPress={() => changeLanguage('Hindi')}>
          <Text style={language ? activeButton : inactiveButton}>हिन्दी</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: 'center',
  },
  buttonContainer: {},
  activeButton: {
    textAlign: 'center',
    borderWidth: 3,
    borderColor: '#18434D',
    backgroundColor: '#18434D',
    color: 'white',
    marginHorizontal: 60,
    borderRadius: 10,
    padding: 15,
    fontSize: 25,
  },
  inactiveButton: {
    fontSize: 25,
    textAlign: 'center',
    borderWidth: 5,
    borderColor: '#18434D',
    color: 'black',
    marginHorizontal: 60,
    borderRadius: 10,
    padding: 15,
  },
});

LanguageScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default LanguageScreen;
