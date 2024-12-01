const { MongoClient } = require('mongodb');

async function performCRUD() {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const collection = client.db('schoolDB').collection('students');
    
    try {
        // CREATE - Insert a new document
        const createResult = await collection.insertOne({
            name: 'John Smith',
            age: 20,
            grade: 'A',
            subjects: ['Math', 'Science']
        });
        console.log('Created document:', createResult.insertedId);

        // READ - Query documents
        const readResult = await collection.find({}).toArray();
        console.log('All documents:', readResult);

        // Find specific document
        const oneStudent = await collection.findOne({ name: 'John Smith' });
        console.log('Found student:', oneStudent);

        // UPDATE - Modify existing document
        const updateResult = await collection.updateOne(
            { name: 'John Smith' },
            { 
                $set: { grade: 'A+' },
                $push: { subjects: 'History' }
            }
        );
        console.log('Updated document count:', updateResult.modifiedCount);

        // DELETE - Remove document
        const deleteResult = await collection.deleteOne({ name: 'John Smith' });
        console.log('Deleted document count:', deleteResult.deletedCount);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

// Run the CRUD operations
performCRUD().catch(console.error);
