const OrderRepository = require('../../../../domain/repositories/order.repository.interface');
const OrderModel = require('./models/order.model');
const Order = require('../../../../domain/entities/order.entity');

class OrderMongoRepository extends OrderRepository {
    async getAll() {
        const order = await OrderModel.find();
        return order.map(p => new Order(o._id.toString(), o.userId, o.products, o.total, o.status));
    }

    async getById(id) {
        const order = await OrderModel.findById(id);
        if (!order) return null;
        return new Order(order._id.toString(), order.userId, order.products, order.total, order.status);
    }

    async create(orderEntity) {
        const newOrder = new OrderModel({
            userId: orderEntity.userId,
            products: orderEntity.products,
            total: orderEntity.total,
            status: orderEntity.status
        });
        const savedOrder = await newOrder.save();
        return new Order(savedOrder._id.toString(), savedOrder.userId, savedOrder.products, savedOrder.total, savedOrder.status);
    }

    async update(id, orderEntity) {
        const updatedOrder = await OrderModel.findByIdAndUpdate(id, {
            userId: orderEntity.userId,
            products: orderEntity.products,
            total: orderEntity.total,
            status: orderEntity.status
        }, { new: true });

        if (!updatedOrder) return null;
        return new Order(updatedOrder._id.toString(), updatedOrder.userId, updatedOrder.products, updatedOrder.total, updatedOrder.status);
    }

    async delete(id) {
        await OrderModel.findByIdAndDelete(id);
    }
}

module.exports = OrderMongoRepository;