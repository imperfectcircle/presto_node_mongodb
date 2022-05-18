require('dotenv').config();

const path = require('path');
const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

const authRoutes = require('./routes/auth.routes');
const baseRoutes = require('./routes/base.routes');
const productsRoutes = require('./routes/products.routes');

const createSessionConfig = require('./config/session');

const db = require('./data/database');

const addCsrfMiddlewareToken = require('./middlewares/csrf.token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionConfig = createSessionConfig();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(addCsrfMiddlewareToken);
app.use(checkAuthStatusMiddleware);
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use(errorHandlerMiddleware);

db.connectToDatabase()
    .then(() => {
        app.listen(3000);
    })
    .catch((error) => {
        console.log('Errore nella connessione al database');
        console.log(error);
    });
