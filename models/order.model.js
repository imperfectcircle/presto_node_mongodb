import { getDb } from '../data/database.js';

export default class Order {
    // * status => pending, fullfilled, canceled
    constructor(cart, userData, status = 'pending', date, orderId) {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        if (this.date) {
            this.fotmattedDate = this.date.toLocaleDateString('it-IT', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
        }
        this.id = orderId;
    }

    save() {
        if (this.id) {
            // * Nel caso stia aggiornando un ordine

        } else {
            // * Nel caso si tratti di un nuovo ordine
            const orderDocument = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),
                status: this.status,
            };
            return getDb().collection('orders').insertOne(orderDocument);
        }
    }
}
