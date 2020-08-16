import React from 'react';
import {Text, StyleSheet, Image, StatusBar, View} from 'react-native';
const imgSrc = require('../assets/splash.png');

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0335AA" />
      <Image source={imgSrc} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: 700,
    width: 500,
  },
  container: {
    flex: 1,
    backgroundColor: '#0335AA',
  },
});

SplashScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

export default SplashScreen;
