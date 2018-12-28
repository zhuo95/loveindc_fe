import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'

@connect(
    state => state.user,
    {register}
)
class Register extends React.Component{

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            user: '',
            pass: '',
            confirmPass: ''
        }
    }

    login(){
        this.props.history.push('/login');
    }

    handleChange(key,val){
        this.setState({
            [key]: val
        })
    }

    handleRegister(){
        this.props.register(this.state)
    }

    render(){
        return(
            <div>
                <Logo></Logo>
                <h2>Sign up</h2>
                <WingBlank>
                    <List>
                        {this.props.msg? <p className='error-msg'>{this.props.msg}</p> : null }
                        <InputItem
                            onChange={v=> this.handleChange('user',v)}>Username</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v=> this.handleChange('pass',v)}>Password</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v=> this.handleChange('confirmPass',v)}>Confirm</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={()=>this.handleRegister()}>Sign up</Button>
                    <WhiteSpace/>
                    <Button onClick={this.login} type='primary'>Log in</Button>
                </WingBlank>
            </div>

        )
    }
}

export default Register