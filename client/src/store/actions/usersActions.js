import axios from 'axios'

import {CREATE_USER, SIGN_IN, GET_USERS_DATA, SIGN_OUT, UPDATE_FAVORITES} from './types';

export const fetchUsers = () => dispatch => {
  axios.get('/users/fetch?name=all')
    .then(res => {
        const newList = res.data;
        // console.log("Action Fetch all users:", newList)
        dispatch({
            type: GET_USERS_DATA,
            payload: newList
        },
        err => {
            console.log('FETCH Users error:', err);
        }
        );
    });
}

export const fetchFavorites = () => (dispatch) => {
    console.log('GET FAVORITES...');
    axios.get('/favorites')
      .then(res => {
          const newList = res.data;
          // console.log("Action Fetch all users:", newList)
          dispatch({
              type: UPDATE_FAVORITES,
              payload: newList
          });
      }
      
      );
  }

export const createUser = (userData) => dispatch => {
    dispatch({
        type: CREATE_USER,
        payload: userData
    });
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
        throw error;
    }
};

