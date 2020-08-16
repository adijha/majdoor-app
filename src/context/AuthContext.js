import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'update_uid':
      console.log('------------update_uid-----------');
      console.log(' ');
      return {
        ...state,
        uid: action.payload.uid,
        phoneNumber: action.payload.phoneNumber,
      };
    case 'delete_uid':
      return {...state, uid: null};
    default:
      return state;
  }
};

const update_uid = (dispatch) => (uid, phoneNumber) => {
  dispatch({type: 'update_uid', payload: {uid, phoneNumber}});
};

const delete_uid = (dispatch) => (uid) => {
  dispatch({type: 'delete_uid'});
};

export const {Context, Provider} = createDataContext(
  authReducer,
  {update_uid, delete_uid},
  {uid: null, phoneNumber: null},
);
