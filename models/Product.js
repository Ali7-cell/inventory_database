const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Commercial name of the product"
    },
    generic_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Generic name/Formula of the product"
    },
    dosage_form: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Form of the product e.g., tablet, syrup, injection"
    },
    strength: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Potency of the product e.g., 500mg"
    },
    pack_size: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Size of the packing e.g., 10 tablets, 100ml"
    },
    base_unit: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Unit',
        comment: "The smallest unit (e.g., Tablet, Capsule)"
    },
    units_per_pack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "Number of base units in one pack"
    },
    low_stock_threshold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50,
        comment: "Alert threshold in base units"
    }
}, {
    tableName: 'products',
    timestamps: true
});

// NOTE: This module serves as a base reference for what exists in the system.
// It purposefully EXCLUDES quantity, price, batch, expiry, or sales data.

module.exports = Product;
