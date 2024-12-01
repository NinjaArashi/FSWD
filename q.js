const fs = require('fs');

// File paths
const asyncFilePath = './async.txt';
const syncFilePath = './sync.txt';

// **Asynchronous Operations**
fs.open(asyncFilePath, 'w', (err, fd) => {
    if (err) return console.error('Error opening async file:', err);

    // Write to file asynchronously
    const asyncData = 'This is asynchronous write!';
    fs.write(fd, asyncData, (writeErr) => {
        if (writeErr) return console.error('Error writing to async file:', writeErr);

        console.log('Data written asynchronously.');

        // Read from file asynchronously
        const buffer = Buffer.alloc(50);
        fs.read(fd, buffer, 0, buffer.length, 0, (readErr, bytesRead) => {
            if (readErr) return console.error('Error reading async file:', readErr);

            console.log(`Read ${bytesRead} bytes asynchronously:`, buffer.toString());
            fs.close(fd, () => console.log('Async file closed.'));
        });
    });
});

// **Synchronous Operations**
try {
    // Open file synchronously
    const fd = fs.openSync(syncFilePath, 'w');

    // Write to file synchronously
    const syncData = 'This is synchronous write!';
    fs.writeSync(fd, syncData);
    console.log('Data written synchronously.');

    // Read from file synchronously
    const buffer = Buffer.alloc(50);
    const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
    console.log(`Read ${bytesRead} bytes synchronously:`, buffer.toString());

    // Close the file synchronously
    fs.closeSync(fd);
    console.log('Sync file closed.');
} catch (err) {
    console.error('Error in synchronous file operations:', err);
}

// **Append and Delete Operations**
// Append to async.txt and sync.txt
fs.appendFile(asyncFilePath, '\nAppended asynchronously.', (err) => {
    if (err) return console.error('Error appending to async file:', err);
    console.log('Data appended asynchronously.');
});

try {
    fs.appendFileSync(syncFilePath, '\nAppended synchronously.');
    console.log('Data appended synchronously.');
} catch (err) {
    console.error('Error appending to sync file:', err);
}

// Delete files after operations
setTimeout(() => {
    fs.unlink(asyncFilePath, (err) => {
        if (err) return console.error('Error deleting async file:', err);
        console.log('Async file deleted.');
    });

    try {
        fs.unlinkSync(syncFilePath);
        console.log('Sync file deleted.');
    } catch (err) {
        console.error('Error deleting sync file:', err);
    }
}, 2000); // Delay to ensure all operations are complete
