const sequelize = require('../config');
const Product = require('./Product');
const Batch = require('./Batch');
const Stock = require('./Stock');
const Supplier = require('./Supplier');
const StockMovement = require('./StockMovement');
const User = require('./User');
const Sale = require('./Sale');
const SaleItem = require('./SaleItem');

// Define relationships between models

// Product has many Batches
Product.hasMany(Batch, {
    foreignKey: 'product_id',
    as: 'batches'
});
Batch.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
});

// Batch has many Stock records
Batch.hasMany(Stock, {
    foreignKey: 'batch_id',
    as: 'stocks'
});
Stock.belongsTo(Batch, {
    foreignKey: 'batch_id',
    as: 'batch'
});

// Batch has many StockMovements
Batch.hasMany(StockMovement, {
    foreignKey: 'batch_id',
    as: 'movements'
});
StockMovement.belongsTo(Batch, {
    foreignKey: 'batch_id',
    as: 'batch'
});

// Sale relationships
Sale.hasMany(SaleItem, {
    foreignKey: 'sale_id',
    as: 'items'
});
SaleItem.belongsTo(Sale, {
    foreignKey: 'sale_id',
    as: 'sale'
});

SaleItem.belongsTo(Batch, {
    foreignKey: 'batch_id',
    as: 'batch'
});
Batch.hasMany(SaleItem, {
    foreignKey: 'batch_id',
    as: 'saleItems'
});

// Export all models and database instance
module.exports = {
    sequelize,
    Product,
    Batch,
    Stock,
    Supplier,
    StockMovement,
    User,
    Sale,
    SaleItem
};
