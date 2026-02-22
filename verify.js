const { sequelize, Product, Batch, Stock, Supplier, StockMovement } = require('./models');

async function verifyDatabase() {
    try {
        console.log('🔄 Testing database connection...');

        // Test connection
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');

        // Sync all models (create tables)
        console.log('\n🔄 Creating database tables...');
        await sequelize.sync({ force: false }); // Set to true to drop existing tables
        console.log('✅ All tables created successfully.');

        // Display table information
        console.log('\n📊 Database Tables:');
        console.log('   - products');
        console.log('   - batches');
        console.log('   - stocks');
        console.log('   - suppliers');
        console.log('   - stock_movements');

        console.log('\n✅ Database verification complete!');
        console.log(`📁 Database file: ${sequelize.config.storage}`);

    } catch (error) {
        console.error('❌ Database verification failed:', error);
    } finally {
        await sequelize.close();
    }
}

verifyDatabase();
