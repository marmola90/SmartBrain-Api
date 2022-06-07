const express= require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db =knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '1234',
      database : 'smart-brain'
    }
  });

const app= express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    db('users').select('*').then(user =>{
        res.json(user);
    })
})

app.post('/signin',(req,res)=>{ signin.handleSignin(req,res,db, bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=> { profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res)=>{ image.handleImage(req,res,db)})
app.post('/imageUrl',(req,res)=>{ image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})

