import axios from 'axios'

import {UPDATE_ITINERARIES, UPDATE_IT_ACTIVITIES, UPDATE_IT_COMMENTS} from './types';

export const getItineraries = (cityId) => dispatch => {
    // console.log('ACTION GET IT for city:', cityId);
  axios.get('http://localhost:5000/itineraries/' + cityId)
    .then(res => {
        const newList = res.data;
        // console.log("Action Get city Itineraries:", newList)
        dispatch({
            type: UPDATE_ITINERARIES,
            payload: { city: cityId, itList: newList }
        });
    });
}

export const getItActivities = (itineraryId) => dispatch => {
    axios.get('http://localhost:5000/actvts/' + itineraryId)
    .then(res => {
        const newList = res.data;
        // console.log("Action Get Itinerary Activities:", newList)
        dispatch({
            type: UPDATE_IT_ACTIVITIES,
            payload: { itId: itineraryId, activities: newList }
        });
    });
};

export const getItComments = (itineraryId) => dispatch => {
    axios.get('http://localhost:5000/comments/' + itineraryId)
    .then(res => {
        const newList = res.data;
        console.log("Action Get Itinerary Comments:", newList)
        dispatch({
            type: UPDATE_IT_COMMENTS,
            payload: { itId: itineraryId, comments: newList }
        });
    });
};
