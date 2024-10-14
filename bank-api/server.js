const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import path module
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../'))); // Adjust the path based on where your HTML/CSS/JS files are

// In-memory storage for bank data
let banks = [];

// CREATE: Add a new bank
app.post('/api/banks', (req, res) => {
    const { bank, clients, loans } = req.body;

    if (!bank || !clients || !loans) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Check if the bank already exists in the database
    const checkSql = 'SELECT * FROM banks WHERE bank = ?';
    db.get(checkSql, [bank], (err, existingBank) => {
        if (err) return res.status(500).json({ error: err.message });

        if (existingBank) {
            return res.status(400).json({ message: 'Bank already exists.' });
        }

        // Insert the new bank into the database
        const insertSql = 'INSERT INTO banks (bank, clients, loans) VALUES (?, ?, ?)';
        db.run(insertSql, [bank, clients, loans], function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({ id: this.lastID, bank, clients, loans });
        });
    });
});

// READ: Get all banks
app.get('/api/banks', (req, res) => {
    const sql = 'SELECT * FROM banks';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows); // Return all banks as an array of objects
    });
});

// UPDATE: Edit an existing bank
app.put('/api/banks/:id', (req, res) => {
    const { id } = req.params;
    const { bank, clients, loans } = req.body;

    const sql = 'UPDATE banks SET bank = ?, clients = ?, loans = ? WHERE id = ?';
    db.run(sql, [bank, clients, loans, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        if (this.changes === 0) {
            return res.status(404).json({ message: 'Bank not found.' });
        }

        res.json({ id, bank, clients, loans });
    });
});

// DELETE: Remove a bank
app.delete('/api/banks/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM banks WHERE id = ?';
    db.run(sql, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Bank not found.' });
        }
        res.status(204).send(); // Success with no content
    });
});

// SEARCH + SORT + COUNT: Handle search, sorting, and counting in one endpoint
app.get('/api/banks/search-sort', (req, res) => {
    let { name, sort, count } = req.query;
    let sql = 'SELECT * FROM banks';
    let params = [];

    // Filter by name if provided
    if (name) {
        sql += ' WHERE bank LIKE ?';
        params.push(`%${name}%`);
    }

    // Sort by loans if requested
    if (sort === 'loans') {
        sql += ' ORDER BY loans DESC';
    }

    // Execute the query
    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // If count is requested, return the total number of loans
        if (count === 'true') {
            const totalLoans = rows.reduce((sum, bank) => sum + bank.loans, 0);
            return res.json({ totalLoans });
        }

        res.json(rows); // Return the filtered/sorted banks
    });
});

// Add a route for serving the main HTML page (index)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../lab5.html')); // Serve the lab5.html as the main page
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
