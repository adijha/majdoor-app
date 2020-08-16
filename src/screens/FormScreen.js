import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {Context as LanguageContext} from '../context/LanguageContext';
import Form from '../components/Form';

const FormScreen = () => {
  const {state, toggleLanguage} = useContext(LanguageContext);
  const {language} = state;
  return (
    <View>
      <Form language={language} toggleLanguage={toggleLanguage} />
    </View>
  );
};

FormScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({});
export default FormScreen;
