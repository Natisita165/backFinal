class Order {
    constructor( id, userId, products, total, status) {
        this.id = id;
        this.userId = userId;
        this.products = products;
        this.total = total;
        this.status = status;
    }
}

module.exports = Order;