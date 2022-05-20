/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import { getDb } from '../data/database.js';
import logger from '../logger/logger.js';

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image;
        this.imagePath = `product-data/images/${productData.image}`;
        this.imageUrl = `/products/assets/images/${productData.image}`;
        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findAll() {
        const products = await getDb().collection('products').find().toArray();

        return products.map((el) => new Product(el));
    }

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image,
        };
        try {
            await getDb()
                .collection('products')
                .insertOne(productData);
        } catch (error) {
            logger.error(error);
        }
    }
}

export default Product;
