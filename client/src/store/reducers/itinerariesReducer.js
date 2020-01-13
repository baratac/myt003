import {UPDATE_ITINERARIES, UPDATE_IT_ACTIVITIES, UPDATE_IT_COMMENTS} from '../actions/types'

const initialState = {
    itList: [],
    itineraryId: '',
    cityId: '',
    activityList: [],
    commentList: []
};

export default function( state = initialState, action) {

    switch (action.type) {
        case UPDATE_ITINERARIES: 
          return {
            ...state,
            itList: action.payload.itList,
            cityId: action.payload.city,
            itineraryId: '',
            activityList: [],
            commentList: []
          };
        case UPDATE_IT_ACTIVITIES: 
          return {
            ...state,
            itineraryId: action.payload.itId,
            activityList: action.payload.activities,
          };
        case UPDATE_IT_COMMENTS: 
        return {
            ...state,
            itineraryId: action.payload.itId,
            commentList: action.payload.comments,
          };
        default:
            return state;
    }
};