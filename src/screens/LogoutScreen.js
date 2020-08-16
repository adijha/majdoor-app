// import React, {useContext} from 'react';
// import {Button} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {navigate} from '../navigationRef';
// import {Context as AuthContext} from '../context/AuthContext';

// const LogoutScreen = () => {
//   const {state, delete_uid} = useContext(AuthContext);
//   // Handle the button press
//   const logout = () => {
//     auth()
//       .signOut()
//       .then(() => {
//         delete_uid();
//         navigate('ResolveAuthScreen');
//       });
//   };

//   return <Button title="Logout" onPress={logout} />;
// };

// LogoutScreen.navigationOptions = () => {
//   return {
//     header: () => false,
//   };
// };

// export default LogoutScreen;
