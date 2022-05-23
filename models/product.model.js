/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import mongodb from 'mongodb';

import { getDb } from '../data/database.js';
import logger from '../logger/logger.js';

export default class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image;
        this.updateImageData();
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findById(productId) {
        let prodId;
        try {
            prodId = new mongodb.ObjectId(productId);
        } catch (error) {
            error.code = 404;
            logger.error(error);
            throw error;
        }

        const product = await getDb().collection('products').findOne({ _id: prodId });

        if (!product) {
            const error = new Error(`Non esiste un prodotto con l'id indicato`);
            error.code = 404;
            logger.error(error);
            throw error;
        }

        return new Product(product);
    }

    static async findAll() {
        const products = await getDb().collection('products').find().toArray();

        return products.map((el) => new Product(el));
    }

    static async findMultiple(ids) {
        const productIds = ids.map((id) => new mongodb.ObjectId(id));

        const products = await getDb()
            .collection('products')
            .find({ _id: { $in: productIds } })
            .toArray();

        return products.map((productDocument) => new Product(productDocument));
    }

    updateImageData() {
        this.imagePath = `product-data/images/${this.image}`;
        // * /products/assets/images/ vedere middleware per le pagine statiche in app.js
        this.imageUrl = `/products/assets/images/${this.image}`;
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image,
        };

        if (this.id) {
            const productId = new mongodb.ObjectId(this.id);
            if (!this.image) {
                delete productData.image;
            }
            await getDb().collection('products').updateOne(
                { _id: productId },
                {
                    $set: productData,
                },
            );
        } else {
            await getDb().collection('products').insertOne(productData);
        }
    }

    replaceImage(newImage) {
        this.image = newImage;
        this.updateImageData();
    }

    async remove() {
        const productId = new mongodb.ObjectId(this.id);
        await getDb().collection('products').deleteOne({ _id: productId });
    }
}
