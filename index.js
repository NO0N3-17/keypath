const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const express= require("express");
const DB = require('./database/db');
const { checkUser } = require("./middlewares/authMiddlewares");
const router = require('./routes/router')

app = express();

DB();

const port = 5000;

app.use(express.static('public'));

app.use(cookieParser());

app.use(bodyparser.urlencoded({ extended:false }));


app.set('view engine','ejs');

app.get('*',checkUser);
app.use(router);

app.listen(port);