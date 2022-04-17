const express = require('express');
const bodyParser = require('body-parser')

const userRoute = require('./routes/usersRouter.js');

const port=8080;
const app = express();

app.use(bodyParser.urlencoded({extended:false}))

userRoute(app);

app.get('/',(req,res)=>{
    res.send('Ola mundo');
})

app.listen(port,()=>console.log('Ligado'));
