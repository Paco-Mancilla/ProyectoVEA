import { estendObservable, extendObservable } from 'mobx';

/*
    *User Stores 
*/

class UserStore{
    constructor(){
        extendObservable(this,{
            loading: true,
            isLoggedIn: false,
            username: ''
        })
    }
} 

export default new UserStore();