const path = require('path');

const express = require('express');

const csrf = require('csurf');

const expressSession = require('express-session');

const authRoutes = require('./routes/auth.routes');

const createSessionConfig = require('./config/session');

const db = require('./data/database');

const addCsrfMiddlewareToken = require('./middlewares/csrf.token');

const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));

app.use(csrf());

app.use(addCsrfMiddlewareToken);

app.use(authRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
    .then(() => {
        app.listen(3000);
    })
    .catch((error) => {
        console.log('Errore nella connessione al database');
        console.log(error);
    });
