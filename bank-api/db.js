const sqlite3 = require('sqlite3').verbose();

// Open a database connection
const db = new sqlite3.Database('./banks.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create the banks table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS banks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                bank TEXT NOT NULL,
                clients INTEGER NOT NULL,
                loans INTEGER NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            }
        });
    }
});

module.exports = db;
