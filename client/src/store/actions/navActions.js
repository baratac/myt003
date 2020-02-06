import {ENTER_SPLASH_PAGE, EXIT_SPLASH_PAGE} from './types';

export const enterHome = () => dispatch => {

    dispatch({
        type: ENTER_SPLASH_PAGE,
        payload: null
    });
}

export const exitHome = () => dispatch => {
    dispatch({
        type: EXIT_SPLASH_PAGE,
        payload: null
    });
};
