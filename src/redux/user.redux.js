import axios from '../config/base'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
    isAuth: '',
    msg: '',
    user:'',
    pass:''
};
//reducer
export function user(state=initState, action) {
    switch (action.type){
        case REGISTER_SUCCESS:
            return {...state, msg:'', isAuth:true,}
        case ERROR_MSG:
            return {...state, isAuth: false, msg: action.msg}
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
             data:data
            }
}

export function register({user, pass, confirmPass}){
    if(!user || !pass || !confirmPass){
        return errorMsg('请填写所有信息')
    }

    if(pass!==confirmPass){
        return errorMsg('输入的密码不一致')
    }

    return dispatch =>{
        axios.post('user/register', {user, pass})
            .then(res=>{
                if(res.status===200 && res.data.code === 0){
                    dispatch(registerSuccess({user, pass}))
                }else{
                    //注册失败
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}