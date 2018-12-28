import React from 'react'
import axios from '../../config/base'
import {withRouter} from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component{
    componentDidMount() {
        //不用登录的页面
        const publicList = ['/login','/signup'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname) > -1){
            return null;
        }
        //获取用户信息
        axios.get('/user/info')
            .then(res => {
                if(res.status===200){
                    if(res.data.code===0){
                        //登录成功
                    }else {
                        //跳转，表示没登录要跳转
                        this.props.history.push('/login')
                    }
                }
        });
        //是否登录
    }

    render(){
        return null;
    }

}

export default AuthRoute