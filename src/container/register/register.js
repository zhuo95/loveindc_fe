import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
class Register extends React.Component{

    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }

    login(){
        this.props.history.push('/login');
    }

    render(){
        return(
            <div>
                <Logo></Logo>
                <h2>Sign up</h2>
                <WingBlank>
                    <List>
                        <InputItem>Username</InputItem>
                        <WhiteSpace/>
                        <InputItem>Password</InputItem>
                        <WhiteSpace/>
                        <InputItem>Confirm Pass</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary'>Sign up</Button>
                    <WhiteSpace/>
                    <Button onClick={this.login} type='primary'>Log in</Button>
                </WingBlank>
            </div>

        )
    }
}

export default Register