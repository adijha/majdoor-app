import React, {useState, useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from './SplashScreen';
import LanguageScreen from './LanguageScreen';
import FormScreen from './FormScreen';
import ShareScreen from './ShareScreen';
import {Context as AuthContext} from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const {state, update_uid} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState(null);
  const [formFilled, setFormFilled] = useState(false);
  function onAuthStateChanged(user) {
    setTimeout(async () => {
      console.log({user});
      if (user) {
        update_uid(user.uid, user.phoneNumber);
        setUser(user);
        const userAvailable = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        console.log(userAvailable.data());
        if (userAvailable.data()) {
          setUserData({
            number: userAvailable.data().phoneNumber,
            address: userAvailable.data().city,
            pincode: userAvailable.data().pinCode,
            name: userAvailable.data().name,
            skill: userAvailable.data().skill,
          });
          setFormFilled(true);
        }
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
  if (!formFilled) {
    return <FormScreen />;
  }
  return <ShareScreen userData={userData} />;
};
ResolveAuthScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};
export default ResolveAuthScreen;
