const path = require('path');

const express = require('express');

const csrf = require('csurf');

const authRoutes = require('./routes/auth.routes');

const db = require('./data/database');

const addCsrfMiddlewareToken = require('./middlewares/csrf.token');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(csrf());

app.use(addCsrfMiddlewareToken);

app.use(authRoutes);

db.connectToDatabase()
    .then(() => {
        app.listen(3000);
    })
    .catch((error) => {
        console.log('Errore nella connessione al database');
        console.log(error);
    });
