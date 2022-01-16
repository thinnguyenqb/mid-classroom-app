import { GLOBALTYPES } from '../actions/globalTypes';
import { TYPES } from './../actions/authAction';

const initialState = {
  user: {},
  token: '',
  isLogged: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH: 
      return action.payload;
    case TYPES.GET_USER: 
      {
        var newUser = {...state.user };
        newUser = action.payload.user
        return {
          ...state,
          user: newUser, 
          token: action.payload.token,
          isLogged: action.payload.isLogged,
        }
      }
    default:
      return state; 
  }
}

export default authReducer