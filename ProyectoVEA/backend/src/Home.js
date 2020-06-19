import React        from 'react';
import SubmitButton from './SubmitButton';
import UserStore    from './stores/UserStore';



class Home extends React.Component {
    async doLogout(){
        try{
          let res = await fetch('/logOut',{
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          let result = await res.json();
    
          if(result && result.success){
            UserStore.isLoggedIn = false;
            UserStore.username = '';
            
          }
    
        }//close Try
        catch(e){
          console.log(e)
        }//close catch
      }//Close async
    
    render(){
      return (
      <div className="home">
        <div className = 'container'>
                Wellcome {UserStore.username}
                <SubmitButton
                    text = {'Logout'}
                    disabled = {false}
                    onClick = { () => this.doLogout()}
                />
            </div>
      </div> );
    } 
  }//close App class
  
  export default Home;