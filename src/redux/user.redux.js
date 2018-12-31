import axios from '../config/base'
import Qs from 'qs';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';

const initState = {
    redirectTo: '',
    isAuth: '',
    msg: '',
    user:'',
};
//reducer
export function user(state=initState, action) {
    switch (action.type){
        case REGISTER_SUCCESS:
            return {...state, msg:'',redirectTo:'/user/info' , isAuth:true, ...action.payload};
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg};
        case LOGIN_SUCCESS:
            return {...state,  msg:'',redirectTo:'/user/info' , isAuth:true, ...action.payload};
        case LOAD_DATA:
            return {...state, ...action.payload};
        default:
            return state
    }
}

function errorMsg(msg){
    return {
        type: ERROR_MSG,
        msg: msg
    }
}

function registerSuccess(data) {
    return {type: REGISTER_SUCCESS,
             payload:data
            }
}

function loginSuccess(data) {
    return {type: LOGIN_SUCCESS,
        payload:data
    }
}

export function login({user, pass}) {
    if(!user || !pass){
        return errorMsg('请输入账号密码')
    }

    return dispatch => {
        axios.post('/user/login', Qs.stringify({user, pass}))
            .then(res=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(loginSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function register({user, pass , confirmPass}){
    if(!user || !pass || !confirmPass){
        return errorMsg('请填写所有信息')
    }

    if(pass!==confirmPass){
        return errorMsg('输入的密码不一致')
    }

    return dispatch =>{
        axios.post('user/register', Qs.stringify({user, pass}))
            .then(res=>{
                if(res.status===200 && res.data.code === 0){
                    dispatch(registerSuccess(res.data.data))
                }else{
                    //注册失败
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}

export function loadData(userinfo) {
    return {type: LOAD_DATA, payload:userinfo}
}