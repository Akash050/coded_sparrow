const express = require('express')
var path = require('path');
// const ejs = require('ejs');
const app = express()
const port = 7000


app.set('view engine', 'ejs');
app.use(express.static("views"));
var cors = require('cors');  

const bodyParser = require('body-parser');
const connectDB = require('./services/db.service');

connectDB()
  .then(() => console.log("Connected to Mongodb..."))
  .catch((error) => console.error(error));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors({credentials: true, origin: 'http://localhost:5000'}));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
  });
  

  require('./config/routes').set_routes(app);

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/blog', (req, res) => {
    res.render('blog');
})
app.get('/carrers', (req, res) => {
    res.render('carrers');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/covid', (req, res) => {
    res.render('covid');
})
app.get('/resource', (req, res) => {
    res.render('resource-form');
})

app.listen(port, () => {
  console.log(`Tisana Tech running at ${port}`)
})