import axios from 'axios'

import {FETCH_CITIES, GET_CITY, UPDATE_VIEW} from './types';

export const fetchCities = () => dispatch => {
  axios.get('/cities/all')
    .then(res => {
        const newList = res.data;
        // console.log("Action Fetch Cities:", newList)
        dispatch({
            type: FETCH_CITIES,
            payload: newList
        },
        err => {
            console.log('FETCH Cities error:', err);
        }
        );
    });
}

export const updateView = (newData) => dispatch => {
    dispatch({
        type: UPDATE_VIEW,
        payload: newData
    });
};

export const getCity = (cityID) => dispatch => {
    dispatch({
        type: GET_CITY,
        payload: cityID
    });
}
