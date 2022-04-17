const fs = require('fs');
const {join}= require('path');

const filepath = join(__dirname,'user.join');

const getUsers =()=>{
    const data = fs.existsSync(filepath)?fs.readFileSync(filepath):[];

    try{
        return JSON.parse(data);
    }catch(e){
        return [];
    }
}

const saveUser = (users)=>{
    fs.writeFileSync(filepath, JSON.stringify(users,null,'\t'));
}

const userRoute = (app)=>{
    app.route('/users/:id?')
        .get((req,res)=>{
            const users = getUsers()
            res.send({users})
        })
        .post((req,res)=>{
            const users = getUsers()

            users.push(req.body)
            saveUser(users)

            res.status(201).send('ok')
        })
        .put((req,res)=>{
            const users = getUsers()

            saveUser(users.map(u=>{
                if(u.id === req.params.id){
                    return {
                        ...u,
                        ...req.body
                    }
                }

                return u
            }))

            res.status(200).send('ok')

        })
        .delete((req,res)=>{
            const users = getUsers();

            saveUser(users.filter(u=>{
                if(req.params.id !== u.id){
                    return u;
                }
            }))

            res.status(200).send('ok')

        })
}

module.exports=userRoute;