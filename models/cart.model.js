/* eslint-disable import/extensions */
/* eslint-disable no-else-return */
/* eslint-disable max-len */
import Product from './product.model.js';

export default class Cart {
    // * Imposto il valore di default in modo che se il carrello è creato senza che vengano passati valori nel costruttore utilizzo automaticamente un array vuoto
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }

    async updatePrices() {
        const productIds = this.items.map((item) => item.product.id);

        const products = await Product.findMultiple(productIds);

        const deletableCartItemProductIds = [];

        this.items.forEach((el) => {
            const product = products.find((prod) => prod.id === el.product.id);

            if (!product) {
                // product was deleted!
                // "schedule" for removal from cart
                deletableCartItemProductIds.push(el.product.id);
                return;
            }

            // product was not deleted
            // set product data and total price to latest price from database
            const element = el;
            element.product = product;
            element.totalPrice = el.quantity * el.product.price;
        });

        if (deletableCartItemProductIds.length > 0) {
            this.items = this.items.filter((item) => deletableCartItemProductIds.indexOf(item.product.id) < 0);
        }

        // re-calculate cart totals
        this.totalQuantity = 0;
        this.totalPrice = 0;

        this.items.forEach((el) => {
            this.totalQuantity += el.quantity;
            this.totalPrice += el.totalPrice;
        });
        // for (const item of this.items) {
        //     this.totalQuantity = this.totalQuantity + item.quantity;
        //     this.totalPrice = this.totalPrice + item.totalPrice;
        // }
    }

    //* aggiungo oggetti al carrello
    addItem(product) {
        // * Non salvo in una collezione nel database ma nella session dell'utente in modo che anche gli utenti non loggati possano aggiungere prodotti al carrello
        const cartItem = {
            product,
            quantity: 1,
            totalPrice: product.price,
        };

        for (let i = 0; i < this.items.length; i += 1) {
            const item = this.items[i];
            if (item.product.id === product.id) {
                cartItem.quantity = +item.quantity + 1;
                cartItem.totalPrice = item.totalPrice + product.price;
                this.items[i] = cartItem;

                this.totalQuantity += 1;
                this.totalPrice += product.price;
                return;
            }
        }
        this.items.push(cartItem);
        this.totalQuantity += 1;
        this.totalPrice += product.price;
    }

    updateItem(productId, newQuantity) {
        for (let i = 0; i < this.items.length; i += 1) {
            const item = this.items[i];
            if (item.product.id === productId && newQuantity > 0) {
                const cartItem = { ...item };
                const quantityChange = newQuantity - item.quantity;
                cartItem.quantity = newQuantity;
                cartItem.totalPrice = newQuantity * item.product.price;
                this.items[i] = cartItem;

                this.totalQuantity += quantityChange;
                this.totalPrice += quantityChange * item.product.price;
                return { updatedItemPrice: cartItem.totalPrice };
            } else if (item.product.id === productId && newQuantity <= 0) {
                this.items.splice(i, 1);
                this.totalQuantity -= item.quantity;
                this.totalPrice -= item.totalPrice;
                return { updatedItemPrice: 0 };
            }
        }
        return null;
    }
}
