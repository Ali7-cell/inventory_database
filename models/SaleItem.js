const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const SaleItem = sequelize.define('SaleItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sales',
            key: 'id'
        },
        comment: "Reference to the parent Sale"
    },
    batch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'batches',
            key: 'id'
        },
        comment: "Reference to the specific Batch sold"
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Quantity sold"
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Selling price per unit at the time of sale"
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Quantity * unit_price"
    },
    sold_as: {
        type: DataTypes.ENUM('pack', 'unit'),
        allowNull: false,
        defaultValue: 'unit',
        comment: "Whether the item was sold as a full pack or individual unit"
    },
    quantity_in_base_units: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "The normalized quantity in base units"
    }
}, {
    tableName: 'sale_items',
    timestamps: true
});

module.exports = SaleItem;
