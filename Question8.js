const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'testDB';

// Connect to MongoDB
async function performOperations() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const users = db.collection('users');

        // INSERT operations
        // Single document insert
        const insertResult = await users.insertOne({
            name: 'John Doe',
            email: 'john@example.com',
            age: 30
        });
        console.log('Inserted document:', insertResult.insertedId);

        // Multiple documents insert
        const insertManyResult = await users.insertMany([
            { name: 'Alice', email: 'alice@example.com', age: 25 },
            { name: 'Bob', email: 'bob@example.com', age: 35 }
        ]);
        console.log('Inserted documents:', insertManyResult.insertedIds);

        // UPDATE operations
        // Update one document
        const updateResult = await users.updateOne(
            { name: 'John Doe' },
            { $set: { age: 31 } }
        );
        console.log('Updated documents:', updateResult.modifiedCount);

        // Update multiple documents
        const updateManyResult = await users.updateMany(
            { age: { $lt: 30 } },
            { $inc: { age: 1 } }
        );
        console.log('Updated multiple documents:', updateManyResult.modifiedCount);

        // DELETE operations
        // Delete one document
        const deleteResult = await users.deleteOne(
            { name: 'Bob' }
        );
        console.log('Deleted documents:', deleteResult.deletedCount);

        // Delete multiple documents
        const deleteManyResult = await users.deleteMany(
            { age: { $gt: 30 } }
        );
        console.log('Deleted multiple documents:', deleteManyResult.deletedCount);

        await client.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

performOperations();
