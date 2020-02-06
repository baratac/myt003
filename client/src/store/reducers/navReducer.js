import {ENTER_SPLASH_PAGE, EXIT_SPLASH_PAGE} from '../actions/types'


const initialState = {
    splashPageActive: false 
};

export default function( state = initialState, action) {

    switch (action.type) {
        case ENTER_SPLASH_PAGE: 
          return {
            ...state,
            splashPageActive: true
          };
        case EXIT_SPLASH_PAGE: 
          return {
            ...state,
            splashPageActive: false
          };
        default:
            return state;
    }
};