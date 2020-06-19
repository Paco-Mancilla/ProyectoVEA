import React        from 'react';
import InputField   from './InputField';
import SubmitButton from './SubmitButton';
import {Link}       from 'react-router-dom';
import Recaptcha    from 'react-recaptcha';
import './App.css';


class SingupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            phone: '',
            email:'',
            password: '',
            password2:'',
            name: '',
            lastname:'',
            buttonDisabled: false,
            isVerified: false
        }
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
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
            phone: '',
            email:'',
            password: '',
            password2:'',
            name: '',
            lastname:'',
            buttonDisabled: false
        })
    }
    resetPassword(){
        this.setState({
            password: '',
            password2:'',
            buttonDisabled: false
        })
    }
    
    async doLogin(){
        if(this.state.isVerified){
            if(!this.state.phone){return;} 
            if(!this.state.email){return;}
            if(!this.state.password){return;} 
            if(!this.state.password2){return;} 
            if(!this.state.name){return;}
            if(!this.state.lastname){return;}
            if (this.state.password !== this.state.password2){
                console.log("No coninsiden las contraseñas");
                this.resetPassword();
                return;}

            this.setState({
                buttonDisabled:true
            })

            try{
                let res = await fetch('/singup',{
                    method:'post',
                    headers: {
                        'Accept': 'Application/json',
                        'Content-Type': 'Application/json'
                    },
                    body: JSON.stringify({
                        phone: this.state.phone,
                        email: this.state.email,
                        password: this.state.password,
                        password2: this.state.password2,
                        name: this.state.name,
                        lastname: this.state.lastname
                    }) 
                })
                let result = await res.json();
                if(result && result.success){
                    this.setState({
                        isVerified:false
                    })
                    this.resetForm();
                    alert(result.msg)
                }
                else{
                    this.setState({
                        phone:''
                    })
                    alert(result.msg)
                    
                }
            
            }
            catch(e){
                console.log(e);
                this.resetForm();
            }
        }else{
            alert("Verifica el captcha CALVOO")
        }
    }

    recaptchaLoaded(){

        console.log('Captcha succesfully loaded');
    }
    verifyCallback(response){
        if(response){
            this.setState({
                isVerified: true
            })
        }


    }
    render(){
        
        return (
            <div className="singupForm">
                 
                <div className="tittle"> 
                <Link to="/">
                    <p>Cancell</p>
                </Link>
                    <h1>VEA</h1>
                    <h3>Register with us</h3>
                </div>
               <div className= "form">
                <InputField
                    type = 'number'
                    placeholder = 'Phone'
                    value = {this.state.phone ? this.state.phone :''}
                    onChange = {(val) => this.setInputValue('phone',val)}
                />
                <InputField
                    type = 'email'
                    placeholder = 'email'
                    value = {this.state.email? this.state.email :''}
                    onChange = {(val) => this.setInputValue('email',val)}
                />
                <InputField
                    type = 'password'
                    placeholder = 'password'
                    value = {this.state.password? this.state.password :''}
                    onChange = {(val) => this.setInputValue('password',val)}
                />
                <InputField
                    type = 'password'
                    placeholder = 'Confirm password'
                    value = {this.state.password2? this.state.password2 :''}
                    onChange = {(val) => this.setInputValue('password2',val)}
                />
                <InputField
                    type = 'text'
                    placeholder = 'Name'
                    value = {this.state.name? this.state.name :''}
                    onChange = {(val) => this.setInputValue('name',val)}
                />
                <InputField
                    type = 'text'
                    placeholder = 'Last name'
                    value = {this.state.lastname? this.state.lastname :''}
                    onChange = {(val) => this.setInputValue('lastname',val)}
                />
                <Recaptcha
                    className="rcapt"
                    sitekey="6LdZpqYZAAAAALSw2DCawSsTu1zStklhqpVJxBBA"
                    render="explicit"
                    verifyCallback={this.verifyCallback}
                    onloadCallback={this.recaptchaLoaded}
                />

                <SubmitButton
                    text = 'Register'
                    disabled = {this.state.buttonDisabled}
                    onClick = {() => this.doLogin()}
                />
                </div>

                 

                
                
            </div> 
        );
    } 
}//close App class

export default SingupForm;