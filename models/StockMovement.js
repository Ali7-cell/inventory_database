const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const StockMovement = sequelize.define('StockMovement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    batch_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'batches',
            key: 'id'
        },
        comment: "Reference to the Batch module"
    },
    movement_type: {
        type: DataTypes.ENUM('IN', 'OUT'),
        allowNull: false,
        comment: "Type of movement: IN (stock increase) or OUT (stock decrease)"
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Quantity of items moved"
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: "Date and time of the movement"
    },
    reason: {
        type: DataTypes.ENUM('purchase', 'sale', 'expired', 'damaged', 'adjustment'),
        allowNull: false,
        comment: "Reason for the stock movement"
    },
    location: {
        type: DataTypes.ENUM('shop', 'godown', 'fridge'),
        allowNull: false,
        comment: "Location where the movement occurred"
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Optional notes about the movement"
    }
}, {
    tableName: 'stock_movements',
    timestamps: true,
    indexes: [
        {
            fields: ['batch_id', 'date']
        },
        {
            fields: ['date']
        }
    ]
});

module.exports = StockMovement;
