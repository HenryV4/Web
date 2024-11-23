// backend/index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.use('/images', express.static('images'));

// Endpoint to fetch all banks with optional filters and search term
app.get('/api/banks', (req, res) => {
    const { type, minInterestRate, maxInterestRate, foundedYear, searchTerm } = req.query;

    let query = 'SELECT * FROM banks WHERE 1=1';
    const params = [];

    if (type) {
        query += ' AND type = ?';
        params.push(type);
    }

    if (minInterestRate) {
        query += ' AND interestRate >= ?';
        params.push(parseFloat(minInterestRate));
    }

    if (maxInterestRate) {
        query += ' AND interestRate <= ?';
        params.push(parseFloat(maxInterestRate));
    }

    if (foundedYear) {
        if (foundedYear === 'Before 1950') {
            query += ' AND foundedYear < 1950';
        } else if (foundedYear === '1950-2000') {
            query += ' AND foundedYear BETWEEN 1950 AND 2000';
        } else if (foundedYear === '2000+') {
            query += ' AND foundedYear > 2000';
        }
    }

    if (searchTerm) {
        query += ' AND (title LIKE ? OR description LIKE ?)';
        params.push(`%${searchTerm}%`, `%${searchTerm}%`);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Endpoint to fetch a single bank by ID
app.get('/api/banks/:id', (req, res) => {
    const bankId = req.params.id;
    db.get('SELECT * FROM banks WHERE id = ?', [bankId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!row) {
            res.status(404).json({ error: 'Bank not found' });
        } else {
            res.json(row);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
