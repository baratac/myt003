import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer"
import usersReducer from "./usersReducer"
import navReducer from "./navReducer"


const rootReducer = combineReducers({cities: citiesReducer, 
                                     itineraries: itinerariesReducer,
                                     users: usersReducer,
                                     navigation: navReducer});


export default rootReducer;