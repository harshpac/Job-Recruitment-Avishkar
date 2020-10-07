const path = require('path');
const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const main = require('./routes/main');
const developers = require('./routes/developers');
const companies = require('./routes/companies');

const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://dbUserM:dbUserM@cluster0.s9eju.mongodb.net/webs?retryWrites=true&w=majority'

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(main);
app.use(developers);
app.use(companies);


mongoose.connect(mongoURI)
.then(result => {
    app.listen(PORT),console.log('i am listening at 3000');
})
.catch(err => console.log(err));
