const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Sale = sequelize.define('Sale', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Optional customer name for the sale"
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Gross total before discounts"
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        comment: "Flat discount applied to the sale"
    },
    net_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Final amount paid by the customer"
    },
    payment_method: {
        type: DataTypes.STRING,
        defaultValue: 'Cash',
        comment: "Payment method (Cash, Card, etc.)"
    },
    sale_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        comment: "Exact date and time of the sale"
    }
}, {
    tableName: 'sales',
    timestamps: true
});

module.exports = Sale;
