import axios from 'axios'

import {CREATE_USER, SIGN_IN, GET_USERS_DATA, SIGN_OUT} from './types';

export const fetchUsers = () => dispatch => {
  axios.get('http://localhost:5000/users/fetch?name=all')
    .then(res => {
        const newList = res.data;
        // console.log("Action Fetch all users:", newList)
        dispatch({
            type: GET_USERS_DATA,
            payload: newList
        });
    });
}

export const createUser = (userData) => dispatch => {
    dispatch({
        type: CREATE_USER,
        payload: userData
    });
    /*
    axios.post('http://localhost:5000/users', userData)
      .then(res => {
          const newUser = res.data;
          // console.log("Action Fetch all users:", newList)
          dispatch({
              type: CREATE_USER,
              payload: newUser
          });
      }).catch( (error) => {
          console.log(error);
      });
    */
  }
  
export const signOut = () => dispatch => {
    dispatch({
        type: SIGN_OUT
    });
};

export const signIn = (userData) => dispatch => {
    dispatch({
        type: SIGN_IN,
        payload: userData
    });
};

