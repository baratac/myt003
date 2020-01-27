import axios from 'axios'

import {CREATE_USER, SIGN_IN, GET_USERS_DATA, SIGN_OUT} from './types';

export const fetchUsers = () => dispatch => {
  axios.get('/users/fetch?name=all')
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
  
export const signOut = () => async dispatch => {
    try {
        await axios.put('/users/logout');
        axios.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem('userToken');
        dispatch({
            type: SIGN_OUT
        });
    }
    catch (error) {
        console.log('Sign Out error:', error);
    }
};

export const signIn = (authData) =>  async dispatch => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authData.token;
    try {
        const res = await axios.get('/users/get-user');
        localStorage.setItem('userToken', authData.token);
        dispatch({
            type: SIGN_IN,
            payload: { ...res.data, token: authData.token }
        });
    }
    catch(error) {
        console.log('Sign In error:', error);
    }
};

