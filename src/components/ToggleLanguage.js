import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Spacer from './Spacer';

const ToggleLanguage = ({language, toggleLanguage}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        toggleLanguage();
      }}>
      <Spacer>
        <Text style={style.link}>
          {language ? 'Change Language' : 'भाषा बदलें'}
        </Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  link: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
    color: '#18434D',
  },
});

export default ToggleLanguage;
