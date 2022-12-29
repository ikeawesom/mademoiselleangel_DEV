const express = require('express');
const path = require('path');
const { signOut } = require('./controllers/firebase_control')

const app = express();
const PORT = 5000;

require('dotenv').config();  

const publicDir = path.join(__dirname,'./public');
app.use(express.static(publicDir));

app.set('view engine','hbs');

const bodyParser = require('body-parser');
const jsonParse = bodyParser.json();

// --------- Backend Processes --------- //

app.use('/firebaseProcess',require('./routes/firebase'));
app.use('/',require('./routes/pages'))
app.use('/stripe',require('./routes/stripe'))

// --------- Get to pages --------- //

app.get('/', (req,res) => {
    signOut.signOut();
    res.render('index');
})

app.get('/paynow',(req,res) => {
    signOut.signOut();
    res.render('paynow');
})

app.get('/admin/login', (req,res) => {
    res.render('admin/login')
})

app.get('/admin/dashboard', (req,res) => {
    res.render('admin/dashboard')
})

app.get('/admin/dashboard/product', (req,res)=>{
    res.render('admin/dashboard/product')
})

app.get('/admin/dashboard/order', (req,res)=>{
    res.render('admin/dashboard/order');
})

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`);
})