const  bcrypt = require('bcrypt');
class Router{
    constructor(app,db){
        this.login (app,db)
        this.singup (app,db)
        this.logout(app,db)
        this.isLoggedIn(app,db)
    }
    login(app,db){
        app.post('/login',(req,res)=>{
            let username = req.body.username
            let password = req.body.password
            let cols = [username];
            db.query('SELECT* FROM usuario WHERE phone = ? LIMIT 1',cols,(err,data,fields)=>{

                if(err){
                    res.json({
                        succes:false,
                        msg:"Error has occured"
                    })
                    return;
                }
                if(data && data.length === 1){
                    bcrypt.compare(password,data[0].password,(bcryptErr,verified)=>{
                        if(verified){
                            req.session.userID = data[0].id;
                            res.json({
                                success:true,
                                username: data[0].name,
                                msg:'mamadas'
                            })
    
                            return;
                        }
                        else{
                            res.json({
                                success:false,
                                msg: 'invalid Password'
                            })
                        }
                    })
                }
                else{
                    res.json({
                        success:false,
                        msg:'User not found'
                    })
                }
            })
        })

    }
    singup(app,db){
        app.post('/singup',(req,res)=>{
            let phone = req.body.phone
            let email = req.body.email
            let password = bcrypt.hashSync(req.body.password,9);
            let name = req.body.name
            let lastname = req.body.lastname

            let cols = [phone];
            db.query('SELECT* FROM usuario WHERE phone = ? LIMIT 1',cols,(err,data,fields)=>{
                if(data && data.length === 1){
                    res.json({
                        success:false,
                        msg:'Telefono ya registrado'
                    })
                }
                
                else{
                    var values = [[email, password,phone,name,lastname]];
                    var sql = "INSERT INTO `usuario` (`email`, `password`,`phone`,`name`,`lastname`) VALUES ? ";
                    db.query(sql,[values],function(err,result){
                    if(err) throw err;
                    else{
                        res.json({
                        success:true,
                        msg:"Se ha registrado tu cuente"
                        })
                    }
                    });      
                }
            })
        });
    }
    logout(app,db){
        app.post('/logOut',(req,res)=>{
             if(req.session.userID){
                req.session.destroy();
                res.json({
                    success:true
                })
                return true;
            }
            else {
                res.json({
                    success:false
                })

                return false; 
            }

        })

    }
    isLoggedIn(app,db){
        app.post('/isLoggedIn', (req,res) => {
            if(req.session.userID){
                let cols = [req.session.userID];
                db.query('SELECT* FROM usuario WHERE id = ? LIMIT 1',cols, (err,data,fields)=>{
                    if(data && data.length === 1){
                        res.json({
                            success: true,
                            username: data[0].name
                        })
                        return true;
                    }
                    else{
                        res.json({
                            success: false
                        })
                    }

                });
            }
            else {
                res.json({
                    success: false
                })
            }
        })
    }

}
module.exports = Router