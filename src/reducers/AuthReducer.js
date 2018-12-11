import { 
    USER_LOGIN_SUCCESS, 
    LOGIN_SYSTEM_ERROR,
    REG_SYSTEM_ERROR, 
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED,
    ADD_ITEM_SUCCESS,
    ADD_SYSTEM_ERROR,
    PLUS_CART,
    HISTORY_CART
} from '../actions/types';

const INITIAL_STATE = { username: '', error1: '', error2: '', nama: '', error4: '', loading: false , cookie: false, jumlahCart: 0, historyCart: 0 };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS :
            return { ...INITIAL_STATE, username: action.payload.username, email: action.payload.email, cookie: true }
        case LOGIN_SYSTEM_ERROR :
            return { ...INITIAL_STATE, error1: action.payload, cookie: true }
        case REG_SYSTEM_ERROR :
            return { ...INITIAL_STATE, error2: action.payload, cookie: true }
        case ADD_ITEM_SUCCESS :
            return { ...INITIAL_STATE, nama: action.payload, cookie: true }
        case ADD_SYSTEM_ERROR :
            return { ...INITIAL_STATE, error4: action.payload, cookie: true }
        case AUTH_LOADING :
            return { ...state, loading: true }
        case PLUS_CART :
            return { ...state, jumlahCart : 0}
        case HISTORY_CART :
            return { ...state, historyCart : 0}
        case LOGOUT :
            return { ...INITIAL_STATE, cookie: true };
        case COOKIE_CHECKED :
            return { ...INITIAL_STATE, cookie: true }
        default :
            return state;
    }
}