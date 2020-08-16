import React, {useState, useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import SplashScreen from './SplashScreen';
import LanguageScreen from './LanguageScreen';
import FormScreen from './FormScreen';
import {Context as AuthContext} from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const {state, update_uid} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setTimeout(() => {
    console.log({user});
    if (user) {
      update_uid(user.uid, user.phoneNumber);
      setUser(user);
    }
      
      if (initializing) setInitializing(false);
    }, 2000);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <SplashScreen />;

  if (!user) {
    return <LanguageScreen />;
  }

  return <FormScreen />;
};
ResolveAuthScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};
export default ResolveAuthScreen;
