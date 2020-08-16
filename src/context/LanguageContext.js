import createDataContext from './createDataContext';
import {navigate} from '../navigationRef';

const languageReducer = (state, action) => {
  switch (action.type) {
    case 'change_language':
      if (action.payload === 'English') return {...state, language: false};
      if (action.payload === 'Hindi') return {...state, language: true};

    case 'toggle_language':
      return {...state, language: !state.language};
    default:
      return state;
  }
};

const changeLanguage = (dispatch) => (language) => {
  dispatch({type: 'change_language', payload: language});
  navigate('Login');
};

const toggleLanguage = (dispatch) => () => {
  dispatch({type: 'toggle_language'});
};

export const {Context, Provider} = createDataContext(
  languageReducer,
  {changeLanguage, toggleLanguage},
  {language: true}, // true  === "Hindi" , false === "English"
);
