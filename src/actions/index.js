import axios from 'axios';
import { 
    USER_LOGIN_SUCCESS, 
    LOGIN_SYSTEM_ERROR,
    REG_SYSTEM_ERROR, 
    AUTH_LOADING,
    LOGOUT,
    COOKIE_CHECKED,
    SELECT_PRODUCT,
    PLUS_CART,
    HISTORY_CART
} from './types';

export const onUserRegister = ({ username, email, phone, password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        if(username === '' || email === '' || phone === '' || password === '') {
            dispatch({ type: REG_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi!' })
        }
        else {
            axios.get('http://localhost:2000/users', { 
                params: {
                    username
                }
            }).then((res) => {
                if(res.data.length === 0) {
                    axios.post('http://localhost:2000/users', {
                        username, email, password, phone
                    }).then((res) => {
                        console.log(res)
                        dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data.username })
                    }).catch((err) => {
                        console.log(err);
                        dispatch({ type: REG_SYSTEM_ERROR, payload: 'System Error' })
                    })
                }
                else {
                    dispatch({ type: REG_SYSTEM_ERROR, payload: 'Username has been taken'})
                }
                
            }).catch((err) => {
                dispatch({ type: REG_SYSTEM_ERROR, payload: 'System Error'})
            })
            
        }
    }
}

// export const onItemRegister = ({ nama, merk, description, harga, img }) => {
//     return (dispatch) => {
//         dispatch({ type: AUTH_LOADING })
//         if(nama === '' || merk === '' || description === '' || harga === '' || img === '') {
//             dispatch({ type: ADD_SYSTEM_ERROR, payload: 'Semua form diatas wajib diisi!' })
//         }
//         else {
//             axios.get('http://localhost:2000/popok', { 
//                 params: {
//                     nama
//                 }
//             }).then((res) => {
//                 if(res.data.length === 0) {
//                     axios.post('http://localhost:2000/popok', {
//                         nama, merk, description, harga, img
//                     }).then((res) => {
//                         console.log(res)
//                         dispatch({ type : ADD_ITEM_SUCCESS, payload: res.data.nama })
//                     }).catch((err) => {
//                         console.log(err);
//                         dispatch({ type: ADD_SYSTEM_ERROR, payload: 'System Error' })
//                     })
//                 }
//                 else {
//                     dispatch({ type: ADD_SYSTEM_ERROR, payload: 'Username has been taken'})
//                 }
                
//             }).catch((err) => {
//                 dispatch({ type: ADD_SYSTEM_ERROR, payload: 'System Error'})
//             })
            
//         }
//     }
// }

export const onUserLogin = ({ username, password }) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOADING })
        // setTimeout(() => loginYok(dispatch,username,password), 2000);
        loginYok(dispatch,username,password);
    }
}

export const keeplogin = (username) => {
    return (dispatch) => {
        axios.get('http://localhost:2000/users', {
            params: {
                username
            }
        }).then((res) => {
            if(res.data.length > 0) {
                dispatch({ 
                    type: USER_LOGIN_SUCCESS, 
                    payload: { email: res.data[0].email, username } 
                })
            }
        })
    }
}

export const cookieChecked = () => {
    return { type: COOKIE_CHECKED }
}

var loginYok = (dispatch,username,password) => {
    axios.get('http://localhost:2000/users', {
            params: {
                username,
                password
            }
        }).then((res) => {
            console.log(res)
            if (res.data.length > 0) {
                dispatch({ 
                    type: USER_LOGIN_SUCCESS, 
                    payload: { email: res.data[0].email, username }
                })
            }
            else {
                dispatch({ type: LOGIN_SYSTEM_ERROR, payload: 'Username or password invalid' })
            }
        }).catch((err) => {
            console.log(err)
            dispatch({ type: LOGIN_SYSTEM_ERROR, payload: 'System Error' })
        })
}

export const select_product = (selectedProduct) => {
    return { 
        type: SELECT_PRODUCT,
        payload: selectedProduct
    }
}

export const onUserLogout = () => {
    return { type: LOGOUT };
}

export const tambahCart = () => {
    return { type: PLUS_CART }
}

export const tambahHistory = () => {
    return { type: HISTORY_CART }
}
