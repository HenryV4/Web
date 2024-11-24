// backend/index.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(cors());

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


// Endpoint to fetch all items in the cart
app.get('/api/cart', (req, res) => {
    const query = 'SELECT * FROM cart_items';
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Endpoint to add an item to the cart
app.post('/api/cart', (req, res) => {
    const { id, name, price, quantity, imageSrc, variant } = req.body;

    // Check if the item with the same ID and variant already exists in the cart
    const queryCheck = 'SELECT * FROM cart_items WHERE id = ? AND variant = ?';
    db.get(queryCheck, [id, variant], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (row) {
            // If the item exists, calculate the new quantity
            const newQuantity = row.quantity + quantity;

            // Enforce the maximum quantity limit
            if (newQuantity > 10) {
                return res.status(400).json({ error: 'The maximum quantity is 10!' });
            }

            // Update the existing item's quantity
            const queryUpdate = 'UPDATE cart_items SET quantity = ? WHERE id = ? AND variant = ?';
            db.run(queryUpdate, [newQuantity, id, variant], function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(200).json({ message: 'Item quantity updated successfully' });
            });
        } else {
            // Insert a new item if it doesn't exist
            const queryInsert =
                'INSERT INTO cart_items (id, name, price, quantity, imageSrc, variant) VALUES (?, ?, ?, ?, ?, ?)';
            db.run(
                queryInsert,
                [id, name, price, quantity, imageSrc, variant],
                function (err) {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.status(201).json({ id: this.lastID });
                }
            );
        }
    });
});


// Endpoint to remove an item from the cart
app.delete('/api/cart/:cart_id', (req, res) => {
    const { cart_id } = req.params; // Destructure cart_id instead of id
    const query = 'DELETE FROM cart_items WHERE cart_id = ?';

    db.run(query, [cart_id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Item not found in cart' });
        } else {
            res.status(204).send();
        }
    });
});

app.put('/api/cart/:cart_id', (req, res) => {
    const cartId = req.params.cart_id;
    const { quantity } = req.body;

    const query = 'UPDATE cart_items SET quantity = ? WHERE cart_id = ?';

    db.run(query, [quantity, cartId], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Item not found in cart' });
        } else {
            res.status(200).json({ message: 'Quantity updated successfully' });
        }
    });
});

// Backend route to fetch cart items (for debugging)
app.get('/api/check-cart', (req, res) => {
    console.log('Received request for /api/check-cart'); // Log that the route was hit

    const query = 'SELECT * FROM cart_items';

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching cart items:', err.message);
            return res.status(500).json({ error: err.message });
        }

        console.log('Fetched cart items:', rows);  // Log the fetched rows
        res.json(rows);  // Send the rows back to the frontend
    });
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
