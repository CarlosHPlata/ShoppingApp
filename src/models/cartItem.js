export default class CartItem {
    constructor (
        quantity,
        productPrice,
        productTitle
    ) {
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.sum = productPrice * 1;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
        this.sum = this.productPrice * quantity;
    }
}