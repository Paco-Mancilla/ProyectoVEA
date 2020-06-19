import React        from 'react';
import './App.css';
import {observer}   from 'mobx-react';
import UserStore    from './stores/UserStore';
import LoginForm    from './LoginForm';
import Home         from './Home';
import SingupForm   from './SingupForm';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';


class App extends React.Component {
  
  async componentDidMount(){
    try{
      let res = await fetch('/isLoggedIn',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let result = await res.json();

      if(result && result.success){
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }
      else{
        UserStore.loading = false;
        UserStore.isLoggedIn= false;
      }

    }//close Try
    catch(e){
      UserStore.loading = false;
      UserStore.isLoggedIn = false; 
    }//close catch
  }//Close async

  render(){
    
    if (UserStore.loading){
      return (
        <div className="app">
          <div className = 'container'>
              Loading, pleas wait...
          </div>
        </div> 
      );
    }// close userstore.loading if

    else{
      if(UserStore.isLoggedIn){
        return (
          <div className="app">
            <Router>
            <Switch>
            <Route path="/" exact component={Home}/>
            </Switch>
            </Router>
          </div> 
        );
      }
      
      return (
        
        <div className="app" >
          <div className = "container">
            <Router>
            <Switch>
            <Route path="/" exact component={LoginForm}/>
            <Route path="/singup" component={SingupForm}/>
            </Switch>
            </Router>
          </div>
        </div> 
      );
    } 
    
  }
}//close App class

export default observer (App);
