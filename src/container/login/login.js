import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state => state.user,
    {login}
)
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            passs:''
        };
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(key,val){
        this.setState({
            [key]: val
        })
    }

    handleLogin(){
        this.props.login(this.state)
    }

    register(){
        this.props.history.push('/signup');
    }
    render(){
        return(
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/> : null}
                <Logo></Logo>
                <h2 >Log in</h2>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=> this.handleChange('user',v)}>Username</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v=> this.handleChange('pass',v)}>Password</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.handleLogin}>Log in</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type='primary'>Sign up</Button>
                </WingBlank>
            </div>

        )
    }
}

export default Login