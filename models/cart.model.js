/* eslint-disable max-len */
export default class Cart {
// * Imposto il valore di default in modo che se il carrello è creato senza che vengano passati valori nel costruttore utilizzo automaticamente un array vuoto
    constructor(items = [], totalQuantity = 0, totalPrice = 0) {
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
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
                cartItem.quantity = item.quantity + 1;
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
}
