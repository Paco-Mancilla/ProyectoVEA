import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';
import {Link} from 'react-router-dom';


class LoginForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }

    setInputValue(property,val){
        val = val.trim();
        if(val.length > 25){
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetForm(){
        this.setState({
            username:'',
            password:'',
            buttonDisabled:false
        })
    }
    async doLogin(){
        if(!this.state.username){return;} 
        if(!this.state.password){return;}
        this.setState({
            buttonDisabled:true
        })

        try{
            let res = await fetch('/login',{
                method:'post',
                headers: {
                    'Accept': 'Application/json',
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                }) 
            })

            let result = await res.json();
            
            if(result && result.success){
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            }
            else if(result && result.success === false){
                this.resetForm();
                alert(result.msg)

            }

        }
        catch(e){
            console.log(e);
            this.resetForm();
        }
    }

    render(){
        
        return (
            <div className="loginForm">
                <div className="logc">
                <h1> VEA </h1>
                <h3>Login with us</h3>
                <InputField
                    type = 'text'
                    placeholder = 'Username'
                    value = {this.state.username ? this.state.username :''}
                    onChange = {(val) => this.setInputValue('username',val)}
                />
                <InputField
                    type = 'password'
                    placeholder = 'password'
                    value = {this.state.password ? this.state.password :''}
                    onChange = {(val) => this.setInputValue('password',val)}
                />

                <SubmitButton
                    text = 'Login'
                    disabled = {this.state.buttonDisabled}
                    onClick = {() => this.doLogin()}
                />

                <Link to="/singup">
                    <button className = 'reg'>Aun no tienes cuenta? registrate</button>
                </Link>
                </div>
            </div> 
        );
    } 
}//close App class

export default LoginForm;