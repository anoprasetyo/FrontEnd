import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SelectProductReducer from './SelectProductReducer';


export default combineReducers({
    pikachu: () => '',
    auth: AuthReducer,
    selectedProduct: SelectProductReducer

})