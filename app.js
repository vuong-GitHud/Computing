const express = require('express')
const expressLayouts=require('express-ejs-layouts')
const app = express()
var session = require('express-session');
var cookieSession = require('cookie-session');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8080 ;
const user = []
const bcrypt = require('bcrypt')
//const urldb = 'mongodb://localhost:27017/ATNexample';
//const configHeader = require("./ATNexample/ATNexample.product");
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'ASQ.AdTekDev', 
    cookie: { 
        maxAge: 600000,
        views: 1,
        }
        })
    );
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.use(expressLayouts)
app.set('layout', './layouts/full-width') 
app.set('views', './views')
app.set('view engine', '.ejs')

app.get('', (req, res) => { res.render('login', {title:'ATN'})
})
app.get('/index', (req, res) => { res.render('index', {title:'ATN'})
})
app.get('/product', (req, res) => { res.render('product', {title:'ATN'})
})
app.get('/order', (req, res) => { res.render('order', {title:'ATN'})
})
app.get('/login', (req, res) => { res.render('login', {title:'ATN'})
})
app.post('/login', loginPage);
function loginPage(req, res) {
    if (session.user) {
        res.redirect('index');
    } else {
        if (req.query.username && req.query.username.trim() != "") {
            accsubmit = {
                name : req.query.name.trim(),
                password : req.query.password.trim()
            };
            session.user = accsubmit;
            res.redirect('login');
            console.log(user);
        } else {
            res.render("index", {title: "ATN" });
        }
       
    }
}

app.get('/payment', (req, res) => { res.render('payment', {title:'ATN'})
})
app.get('/register', (req, res) => { res.render('register', {title:'ATN'})
})
app.post('/register', async (req, res) => {
    try {
        const hashredpassword = await bcrypt.hash(req.body.password, 10)
        user.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.redirect('/register')
    } catch (error) {
        res.redirect('/login')

    }
    console.log(user);
})
app.listen(port, ()=> console.info(`App listening on port ${port}`))
