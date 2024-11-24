// const express = require('express');
// const cors = require('cors');
// const db = require('./db');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const app = express();
// const PORT = 5000;
// const SECRET_KEY = "superdupermegapassword3000";

// app.use(express.json());
// app.use(cors());

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//     res.status(200).json({ status: 'OK' });
// });

// app.use('/images', express.static('images'));

// // Middleware for authorization
// const authMiddleware = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Unauthorized: Token missing or malformed' });
//     }

//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) {
//             console.error('Token verification failed:', err.message);
//             return res.status(403).json({ message: 'Forbidden: Invalid token' });
//         }

//         req.user = decoded; // Attach user info to the request
//         next();
//     });
// };



// app.get('/api/validate-token', (req, res) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(401).json({ valid: false, message: 'No token provided' });
//     }

//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//         if (err) {
//             console.error('Token validation failed:', err.message); // Debug log
//             return res.status(401).json({ valid: false, message: 'Invalid token' });
//         }

//         res.status(200).json({ valid: true, user: decoded });
//     });
// });


// // Signup endpoint
// app.post('/api/signup', async (req, res) => {
//     const { username, email, password } = req.body;

//     console.log('Received signup request body:', req.body); // Debug log

//     if (!email || !username || !password) {
//         console.error('Missing required fields:', { username, email, password });
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     db.get('SELECT * FROM users WHERE email = ?', [email], async (err, existingUser) => {
//         if (err) {
//             console.error('Database error during email check:', err.message);
//             return res.status(500).json({ error: 'Database error' });
//         }

//         if (existingUser) {
//             console.warn('Signup attempt with existing email:', email);
//             return res.status(400).json({ error: 'Email already exists' });
//         }

//         try {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             console.log('Password hashed successfully for:', username);

//             const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//             db.run(query, [username, email, hashedPassword], function (err) {
//                 if (err) {
//                     console.error('Error inserting user into database:', err.message);
//                     return res.status(500).json({ error: 'Database error' });
//                 }
//                 console.log('User inserted successfully with ID:', this.lastID);
//                 res.status(201).json({ id: this.lastID });
//             });
//         } catch (hashError) {
//             console.error('Error hashing password:', hashError.message);
//             res.status(500).json({ error: 'Server error' });
//         }
//     });
// });

// // Login endpoint
// app.post('/api/login', (req, res) => {
//     const { email, password } = req.body;

//     console.log('Received login request:', { email }); // Debug log

//     // Retrieve user by email
//     db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
//         if (err) {
//             console.error('Database error during login:', err.message);
//             return res.status(500).json({ error: 'Database error' });
//         }

//         if (!user) {
//             console.warn('Login attempt with invalid email:', email);
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         console.log('User retrieved from database:', user);

//         // Compare passwords
//         const isPasswordCorrect = await bcrypt.compare(password, user.password);
//         console.log('Password comparison result:', isPasswordCorrect);

//         if (!isPasswordCorrect) {
//             console.warn('Login attempt with incorrect password for email:', email);
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
//         console.log('JWT token generated successfully for user:', email);
//         res.json({ token });
//     });
// });

// // Endpoint to fetch all banks with optional filters and search term
// app.get('/api/banks', (req, res) => {
//     const { type, searchTerm } = req.query;
//     let query = 'SELECT * FROM banks WHERE 1=1';
//     const params = [];

//     if (type) {
//         query += ' AND type = ?';
//         params.push(type);
//     }

//     if (searchTerm) {
//         query += ' AND (title LIKE ? OR description LIKE ?)';
//         params.push(`%${searchTerm}%`, `%${searchTerm}%`);
//     }

//     db.all(query, params, (err, rows) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(rows);
//     });
// });

// app.get('/api/banks/:id', (req, res) => {
//     const { id } = req.params;
//     db.get('SELECT * FROM banks WHERE id = ?', [id], (err, row) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         if (!row) {
//             return res.status(404).json({ error: 'Bank not found' });
//         }
//         res.json(row);
//     });
// });



// // Endpoint to fetch all items in the cart
// app.get('/api/cart', authMiddleware, (req, res) => {
//     const userId = req.user.id; // Extract user ID from token
//     console.log(`Fetching cart items for user ID: ${userId}`); // Debug log

//     const query = 'SELECT * FROM cart_items WHERE user_id = ?';
//     db.all(query, [userId], (err, rows) => {
//         if (err) {
//             console.error('Database error fetching cart:', err.message); // Debug log
//             return res.status(500).json({ error: err.message });
//         }

//         console.log('Cart items retrieved:', rows); // Debug log
//         res.json(rows); // Return all cart items for the user
//     });
// });

// // Endpoint to add an item to the cart
// app.post('/api/cart', authMiddleware, (req, res) => {
//     const userId = req.user.id; // Extract user ID from token
//     const { product_id, name, price, quantity, imageSrc, variant } = req.body;

//     // Validate all required fields
//     if (!product_id || !name || !price || !quantity || !imageSrc || !variant) {
//         console.error('Missing required fields:', req.body); // Log what is missing
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     // Check if the product already exists in the cart
//     const queryCheck = `
//         SELECT * FROM cart_items 
//         WHERE user_id = ? AND product_id = ? AND variant = ?
//     `;
//     db.get(queryCheck, [userId, product_id, variant], (err, row) => {
//         if (err) {
//             console.error('Database error during cart check:', err.message);
//             return res.status(500).json({ error: 'Database error' });
//         }

//         if (row) {
//             // Update quantity if product already exists
//             const newQuantity = row.quantity + quantity;

//             if (newQuantity > 10) {
//                 return res.status(400).json({ error: 'Maximum quantity of 10 exceeded.' });
//             }

//             const queryUpdate = `
//                 UPDATE cart_items 
//                 SET quantity = ? 
//                 WHERE user_id = ? AND product_id = ? AND variant = ?
//             `;
//             db.run(queryUpdate, [newQuantity, userId, product_id, variant], function (err) {
//                 if (err) {
//                     console.error('Error updating cart item:', err.message);
//                     return res.status(500).json({ error: 'Database error' });
//                 }
//                 res.status(200).json({ message: 'Cart item updated successfully.' });
//             });
//         } else {
//             // Insert new item if it doesn't exist
//             const queryInsert = `
//                 INSERT INTO cart_items (user_id, product_id, name, price, quantity, imageSrc, variant) 
//                 VALUES (?, ?, ?, ?, ?, ?, ?)
//             `;
//             db.run(queryInsert, [userId, product_id, name, price, quantity, imageSrc, variant], function (err) {
//                 if (err) {
//                     console.error('Error inserting cart item:', err.message);
//                     return res.status(500).json({ error: 'Database error' });
//                 }
//                 res.status(201).json({ id: this.lastID });
//             });
//         }
//     });
// });

// // Endpoint to update the quantity of an item in the cart
// app.put('/api/cart/:cart_id', authMiddleware, (req, res) => {
//     const { cart_id } = req.params; // Get cart ID from URL
//     const { quantity } = req.body; // Get new quantity from request body
//     const userId = req.user.id; // Extract user ID from token

//     console.log(`Received request to update cart item: cart_id=${cart_id}, userId=${userId}, quantity=${quantity}`); // Debug log

//     if (!quantity || quantity < 1 || quantity > 10) {
//         return res.status(400).json({ error: 'Quantity must be between 1 and 10' });
//     }

//     // Check if the cart item exists and belongs to the user
//     const queryCheck = 'SELECT * FROM cart_items WHERE cart_id = ? AND user_id = ?';
//     db.get(queryCheck, [cart_id, userId], (err, row) => {
//         if (err) {
//             console.error('Database error during cart update:', err.message);
//             return res.status(500).json({ error: 'Database error' });
//         }

//         if (!row) {
//             console.warn(`Cart item not found: cart_id=${cart_id}, userId=${userId}`);
//             return res.status(404).json({ error: 'Cart item not found' });
//         }

//         // Update the quantity of the cart item
//         const queryUpdate = 'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND user_id = ?';
//         db.run(queryUpdate, [quantity, cart_id, userId], function (err) {
//             if (err) {
//                 console.error('Error updating cart item:', err.message);
//                 return res.status(500).json({ error: 'Database error' });
//             }

//             res.status(200).json({ message: 'Cart item updated successfully.' });
//         });
//     });
// });



// // Endpoint to remove an item from the cart
// app.delete('/api/cart/:cart_id', authMiddleware, (req, res) => {
//     const { cart_id } = req.params;
//     const userId = req.user.id;

//     const query = 'DELETE FROM cart_items WHERE cart_id = ? AND user_id = ?';
//     db.run(query, [cart_id, userId], function (err) {
//         if (err) {
//             res.status(500).json({ error: err.message });
//         } else if (this.changes === 0) {
//             res.status(404).json({ error: 'Item not found in cart' });
//         } else {
//             res.status(204).send();
//         }
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;
const SECRET_KEY = "superdupermegapassword3000";

app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.use('/images', express.static('images'));

// Middleware for authorization
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Authorization header missing or malformed'); // Debug log
        return res.status(401).json({ message: 'Unauthorized: Token missing or malformed' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part after "Bearer"
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err.message); // Debug log
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        req.user = decoded; // Attach user info to the request
        next();
    });
};



// Validate token endpoint
app.get('/api/validate-token', (req, res) => {
    const token = req.headers['authorization'];
    console.log('Received Authorization header:', token);

    if (!token || !token.startsWith('Bearer ')) {
        console.error('Token missing or malformed');
        return res.status(401).json({ valid: false, message: 'Token missing or malformed' });
    }

    const rawToken = token.split(' ')[1]; // Extract token after "Bearer "
    jwt.verify(rawToken, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err.message);
            return res.status(401).json({ valid: false, message: 'Invalid token' });
        }

        console.log('Token validated successfully:', decoded);
        res.status(200).json({ valid: true, user: decoded });
    });
});


// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    console.log('Received signup request body:', req.body); // Debug log

    if (!email || !username || !password) {
        console.error('Missing required fields:', { username, email, password });
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, existingUser) => {
        if (err) {
            console.error('Database error during email check:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (existingUser) {
            console.warn('Signup attempt with existing email:', email);
            return res.status(400).json({ error: 'Email already exists' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Password hashed successfully for:', username);

            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.run(query, [username, email, hashedPassword], function (err) {
                if (err) {
                    console.error('Error inserting user into database:', err.message);
                    return res.status(500).json({ error: 'Database error' });
                }
                console.log('User inserted successfully with ID:', this.lastID);
                res.status(201).json({ id: this.lastID });
            });
        } catch (hashError) {
            console.error('Error hashing password:', hashError.message);
            res.status(500).json({ error: 'Server error' });
        }
    });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    console.log('Received login request:', { email }); // Debug log

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            console.error('Database error during login:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
            console.warn('Login attempt with invalid email:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log('User retrieved from database:', user);

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', isPasswordCorrect);

        if (!isPasswordCorrect) {
            console.warn('Login attempt with incorrect password for email:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
        console.log('JWT token generated successfully for user:', email);
        res.json({ token });
    });
});

// Fetch all banks endpoint
app.get('/api/banks', (req, res) => {
    const { type, searchTerm } = req.query;
    let query = 'SELECT * FROM banks WHERE 1=1';
    const params = [];

    if (type) {
        query += ' AND type = ?';
        params.push(type);
    }

    if (searchTerm) {
        query += ' AND (title LIKE ? OR description LIKE ?)';
        params.push(`%${searchTerm}%`, `%${searchTerm}%`);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Database error fetching banks:', err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Fetch single bank by ID
app.get('/api/banks/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM banks WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Bank not found' });
        }
        res.json(row);
    });
});

// Fetch all items in the cart
app.get('/api/cart', authMiddleware, (req, res) => {
    const userId = req.user.id;
    console.log(`Fetching cart items for user ID: ${userId}`);

    db.all('SELECT * FROM cart_items WHERE user_id = ?', [userId], (err, rows) => {
        if (err) {
            console.error('Database error fetching cart:', err.message);
            return res.status(500).json({ error: err.message });
        }

        console.log('Cart items retrieved:', rows);
        res.json(rows);
    });
});

// Add item to the cart
app.post('/api/cart', authMiddleware, (req, res) => {
    const userId = req.user.id;
    const { product_id, name, price, quantity, imageSrc, variant } = req.body;

    if (!product_id || !name || !price || !quantity || !imageSrc || !variant) {
        console.error('Missing required fields:', req.body);
        return res.status(400).json({ error: 'All fields are required' });
    }

    const queryCheck = `
        SELECT * FROM cart_items 
        WHERE user_id = ? AND product_id = ? AND variant = ?
    `;
    db.get(queryCheck, [userId, product_id, variant], (err, row) => {
        if (err) {
            console.error('Database error during cart check:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (row) {
            const newQuantity = row.quantity + quantity;

            if (newQuantity > 10) {
                return res.status(400).json({ error: 'Maximum quantity of 10 exceeded.' });
            }

            const queryUpdate = `
                UPDATE cart_items 
                SET quantity = ? 
                WHERE user_id = ? AND product_id = ? AND variant = ?
            `;
            db.run(queryUpdate, [newQuantity, userId, product_id, variant], function (err) {
                if (err) {
                    console.error('Error updating cart item:', err.message);
                    return res.status(500).json({ error: 'Database error' });
                }
                res.status(200).json({ message: 'Cart item updated successfully.' });
            });
        } else {
            const queryInsert = `
                INSERT INTO cart_items (user_id, product_id, name, price, quantity, imageSrc, variant) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            db.run(queryInsert, [userId, product_id, name, price, quantity, imageSrc, variant], function (err) {
                if (err) {
                    console.error('Error inserting cart item:', err.message);
                    return res.status(500).json({ error: 'Database error' });
                }
                res.status(201).json({ id: this.lastID });
            });
        }
    });
});

// Update cart item quantity
app.put('/api/cart/:cart_id', authMiddleware, (req, res) => {
    const { cart_id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    if (!quantity || quantity < 1 || quantity > 10) {
        return res.status(400).json({ error: 'Quantity must be between 1 and 10' });
    }

    const queryCheck = 'SELECT * FROM cart_items WHERE cart_id = ? AND user_id = ?';
    db.get(queryCheck, [cart_id, userId], (err, row) => {
        if (err) {
            console.error('Database error during cart update:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        if (!row) {
            console.warn(`Cart item not found: cart_id=${cart_id}, userId=${userId}`);
            return res.status(404).json({ error: 'Cart item not found' });
        }

        const queryUpdate = 'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND user_id = ?';
        db.run(queryUpdate, [quantity, cart_id, userId], function (err) {
            if (err) {
                console.error('Error updating cart item:', err.message);
                return res.status(500).json({ error: 'Database error' });
            }

            res.status(200).json({ message: 'Cart item updated successfully.' });
        });
    });
});

// Remove item from the cart
app.delete('/api/cart/:cart_id', authMiddleware, (req, res) => {
    const { cart_id } = req.params;
    const userId = req.user.id;

    const query = 'DELETE FROM cart_items WHERE cart_id = ? AND user_id = ?';
    db.run(query, [cart_id, userId], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            return res.status(404).json({ error: 'Item not found in cart' });
        } else {
            res.status(204).send();
        }
    });
});

// Endpoint to clear the user's cart
app.delete('/api/cart', authMiddleware, (req, res) => {
    const userId = req.user.id;

    const query = 'DELETE FROM cart_items WHERE user_id = ?';
    db.run(query, [userId], function (err) {
        if (err) {
            console.error('Error clearing cart:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({ message: 'Cart cleared successfully.' });
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
