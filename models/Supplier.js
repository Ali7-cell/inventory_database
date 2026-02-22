const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Supplier = sequelize.define('Supplier', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supplier_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Name of the supplier person or representative"
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Name of the supplier company"
    },
    contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Contact number for the supplier"
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Physical address of the supplier (Optional)"
    }
}, {
    tableName: 'suppliers',
    timestamps: true
});

module.exports = Supplier;
