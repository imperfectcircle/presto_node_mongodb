/* eslint-disable import/extensions */

// ! To use import add "type": "module" to package.json
// ! you need to add .js when importing your own modules and change "module.exports =" to
// ! "export default the_name_of_the_feature" if you have a signle feature per module and "export { feature1, feature2 }" for more.
// ! If you have more feature, you should import them w/ "import { feature1, feature2 } from 'path/to/module.js' "

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import csrf from 'csurf';
import expressSession from 'express-session';

import authRoutes from './routes/auth.routes.js';
import baseRoutes from './routes/base.routes.js';
import productsRoutes from './routes/products.routes.js';
import adminRoutes from './routes/admin.routes.js';
import cartRoutes from './routes/cart.routes.js';
import OrdersRoutes from './routes/orders.routes.js';

import createSessionConfig from './config/session.js';

import logger from './logger/logger.js';

import { connectToDatabase } from './data/database.js';

import addCsrfTokenMiddleware from './middlewares/csrf.token.js';
import { errorPageNotFound, errorHandler } from './middlewares/error-handler.js';
import checkAuthStatusMiddleware from './middlewares/check-auth.js';
import protectRoutesMiddleware from './middlewares/protect-routes.js';
import cartMiddleware from './middlewares/cart.js';
import updateCartPricesMiddleware from './middlewares/update-cart-prices.js'

const projectEnv = dotenv.config();
dotenvExpand.expand(projectEnv);

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionConfig = createSessionConfig();

app.use(express.static('public'));
// * Filtra le req che iniziano con /products/assets indirizzandole a product-data
app.use('/products/assets', express.static('product-data'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressSession(sessionConfig));
app.use(csrf());
app.use(addCsrfTokenMiddleware);
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);
app.use(checkAuthStatusMiddleware);
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
// * Filtra le req che iniziano con /cart 
app.use('/cart', cartRoutes);

app.use(protectRoutesMiddleware);
// * Filtra le req che iniziano con /orders 
app.use('/orders', protectRoutesMiddleware, OrdersRoutes)
// * Filtra le req che iniziano con /admin 
app.use('/admin', protectRoutesMiddleware, adminRoutes);

app.use(errorPageNotFound)
app.use(errorHandler);

connectToDatabase()
    .then(() => {
        app.listen(process.env.APP_PORT);
    })
    .catch((error) => {
        logger.error(error);
    });
