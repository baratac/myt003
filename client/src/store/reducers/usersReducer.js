import {CREATE_USER, SIGN_IN, GET_USERS_DATA, SIGN_OUT} from '../actions/types';

const initialState = {
    usersList: [],
    currentUser: { name: 'unknown' },
    sessionActive: false
}

export default function( state = initialState, action) {

    switch (action.type) {
        case CREATE_USER: 
          return {
            ...state,
            currentUser: action.payload,
            sessionActive: true
          };
        case GET_USERS_DATA: 
          return {
            ...state,
            usersList: action.payload,
          };
        case SIGN_OUT:
            return {
              ...state,
              currentUser: {name: 'unknown'},
              sessionActive: false
            };
        case SIGN_IN: 
          return {
            ...state,
            currentUser: action.payload,
            sessionActive: true
          };
        default:
            return state;
    }
};