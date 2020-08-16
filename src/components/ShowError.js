import React from 'react';
import {Text, StyleSheet} from 'react-native';

const ShowError = ({errMsg}) => <Text style={style.errMsg}> {errMsg} </Text>;

const style = StyleSheet.create({
  errMsg: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    textAlign: 'center',
  },
});

export default ShowError;
