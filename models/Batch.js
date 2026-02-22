const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Batch = sequelize.define('Batch', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        },
        comment: "Reference to the Product model"
    },
    batch_number: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Unique identifier for the batch"
    },
    expiry_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Expiration date of the batch"
    },
    cost_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Purchase price per unit for this batch"
    },
    selling_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Selling price per BASE UNIT for this batch"
    }
}, {
    tableName: 'batches',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['batch_number', 'product_id']
        }
    ]
});

module.exports = Batch;
