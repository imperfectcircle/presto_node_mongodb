const db = require('../data/database');
const logger = require('../logger/logger');

class Product {
    constructor(productData) {
        this.title = productData.title,
        this.summary = productData.summary,
        this.price = productData.price,
        this.description = productData.description,
        this.image = productData.image,
        this.imagePath = `product-data/images/${productData.image}`,
        this.imageUrl = `/products/assets/images/${productData.image}`,
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
            await db.getDb()
            .collection('products')
            .insertOne({productData})
        } catch (error) {
            logger.error(error)
        }
        
    }
}

module.exports = Product