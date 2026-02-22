const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Stock = sequelize.define('Stock', {
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "Current quantity available for this batch at this location"
    },
    location: {
        type: DataTypes.ENUM('shop', 'godown', 'fridge'),
        allowNull: false,
        defaultValue: 'shop',
        comment: "Physical location of the stock"
    }
}, {
    tableName: 'stocks',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['batch_id', 'location']
        }
    ]
});

module.exports = Stock;
