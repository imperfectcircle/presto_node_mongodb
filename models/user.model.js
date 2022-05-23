/* eslint-disable import/extensions */
import bcrypt from 'bcryptjs';
import mongodb from 'mongodb';

import { getDb } from '../data/database.js';

class User {
    constructor(email, password, fullname, street, cap, city) {
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street,
            cap,
            city,
        };
    }

    static findById(userId) {
        const uid = new mongodb.ObjectId(userId);

        return getDb()
            .collection('users')
            .findOne({ _id: uid }, {
                projection: {
                    password: 0,
                },
            });
    }

    getUserWithSameEmail() {
        return getDb()
            .collection('users')
            .findOne({ email: this.email });
    }

    async existAlready() {
        const existingUser = await this.getUserWithSameEmail();
        return !!existingUser;
        /* !! Cast the value to a boolean; if exist it's true otherwise it's false */
    }

    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 12);

        await getDb()
            .collection('users')
            .insertOne({
                email: this.email,
                password: hashedPassword,
                name: this.name,
                address: this.address,
            });
    }

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    }
}

export default User;
