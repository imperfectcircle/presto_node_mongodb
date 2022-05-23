/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import mongodb from 'mongodb';
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

    static transformOrderDocument(orderDoc) {
        return new Order(
            orderDoc.productData,
            orderDoc.userData,
            orderDoc.status,
            orderDoc.date,
            orderDoc._id,
        );
    }

    static transformOrderDocuments(orderDocs) {
        return orderDocs.map(this.transformOrderDocument);
    }

    static async findAll() {
        const orders = await getDb()
            .collection('orders')
            .find()
            .sort({ _id: -1 })
            .toArray();

        return this.transformOrderDocuments(orders);
    }

    static async findAllForUser(userId) {
        const uid = new mongodb.ObjectId(userId);

        const orders = await getDb()
            .collection('orders')
            .find({ 'userData._id': uid })
            .sort({ _id: -1 })
            .toArray();

        return this.transformOrderDocuments(orders);
    }

    static async findById(orderId) {
        const order = await getDb()
            .collection('orders')
            .findOne({ _id: new mongodb.ObjectId(orderId) });

        return this.transformOrderDocument(order);
    }

    save() {
        if (this.id) {
            // * Nel caso stia aggiornando un ordine
            const orderId = new mongodb.ObjectId(this.id);
            return getDb()
                .collection('orders')
                .updateOne({ _id: orderId }, { $set: { status: this.status } });
        }
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
