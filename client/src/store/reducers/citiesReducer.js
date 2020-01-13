import {FETCH_CITIES, GET_CITY, UPDATE_VIEW} from '../actions/types'
import theList from '../CityList'

const initialState = {
    sites: theList,
    currentPage: 1,
    currentView: theList.slice(0, 4),
    selectedCity: theList[0]
};

export default function( state = initialState, action) {

    switch (action.type) {
        case FETCH_CITIES: 
          return {
            ...state,
            sites: action.payload,
            currentPage: 1,
            currentView: action.payload.slice(0, 4)
          };
        case UPDATE_VIEW: 
          return {
            ...state,
            currentPage: action.payload.currentPage,
            currentView: action.payload.currentView
          };
        case GET_CITY: {
            const selCity = state.sites.filter( (item) => {
                return item._id === action.payload
            });
            return {
                ...state, 
                selectedCity: selCity
            }
        }
        default:
            return state;
    }
};