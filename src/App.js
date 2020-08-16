import React from 'react';
import {setNavigator} from './navigationRef';
import LanguageScreen from './screens/LanguageScreen';
import LoginScreen from './screens/LoginScreen';
// import LogoutScreen from './screens/LogoutScreen';
import FormScreen from './screens/FormScreen';
import ShareScreen from './screens/ShareScreen';
import ResolveAuthScreen from './screens/ResolveAuthScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Provider as LanguageProvider} from './context/LanguageContext';
import {Provider as AuthProvider} from './context/AuthContext';

const switchNavigator = createSwitchNavigator({
  ResolveAuthScreen,
  authFlow: createStackNavigator({
    Language: LanguageScreen,
    Login: LoginScreen,
  }),
  mainFlow: createStackNavigator({
    Form: FormScreen,
    Share: ShareScreen,
    // Logout: LogoutScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <App ref={(navigator) => setNavigator(navigator)} />
      </LanguageProvider>
    </AuthProvider>
  );
};
