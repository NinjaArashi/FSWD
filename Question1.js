const fs = require('fs');

// Synchronous Operations
try {
    // Open file synchronously
    const fdSync = fs.openSync('Q1.txt', 'w+');
    
    // Write to file synchronously
    fs.writeSync(fdSync, 'Hello Guys WhatsUp !\n', 0);
    
    // Read from file synchronously
    const bufferSync = Buffer.alloc(100);
    fs.readSync(fdSync, bufferSync, 0, 100, 0);
    console.log('Sync Read:', bufferSync.toString());
    
    // Append to file synchronously
    fs.writeSync(fdSync, 'Appended Sync!\n', null);
    
    // Close file
    fs.closeSync(fdSync);
    
} catch (error) {
    console.error('Sync Error:', error);
}

// Asynchronous Operations
fs.open('Q1-1.txt', 'a+', (err, fdAsync) => {
    if (err) {
        return console.error('Async Error:', err);
    }

    // Write to file asynchronously
    fs.write(fdAsync, 'Hello WhatsUp !\n', 0, (writeErr) => {
        if (writeErr) console.error('Write Error:', writeErr);
        
        // Read from file asynchronously
        const bufferAsync = Buffer.alloc(200);
        fs.read(fdAsync, bufferAsync, 0, 200, 0, (readErr) => {
            if (readErr) console.error('Read Error:', readErr);
            console.log('Async Read:', bufferAsync.toString());
            
            // Append to file asynchronously
            fs.write(fdAsync, 'Appended Async!\n', null, (appendErr) => {
                if (appendErr) console.error('Append Error:', appendErr);
                
                // Close file
                fs.close(fdAsync, (closeErr) => {
                    if (closeErr) console.error('Close Error:', closeErr);
                });
            });
        });
    });
});

// Synchronous delete operation
try {
    fs.unlinkSync('Q1.txt');
    console.log('File deleted synchronously');
} catch (error) {
    console.error('Sync Delete Error:', error);
}

// Asynchronous delete operation
fs.unlink('Q1-1.txt', (error) => {
    if (error) {
        console.error('Async Delete Error:', error);
    } else {
        console.log('File deleted asynchronously');
    }
});
