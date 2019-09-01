const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

console.log('USER: ', process.env.POSTGRES_USER)

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTRGRES_HOST,
    user: process.env.POSTRGRES_USER,
    password: process.env.POSTRGRES_PASSWORD,
    database: process.env.POSTRGRES_DB
  }
});

const app = express();

app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json());

// app.get('/', (req, res)=> { res.send(db.users) })
app.get('/', (req, res) => { res.send('hello snitches ...') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
  console.log('app is running on port 3000');
})
