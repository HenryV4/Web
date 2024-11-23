// backend/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    // Create the banks table if it doesn't exist
    db.run(`
        CREATE TABLE IF NOT EXISTS banks (
            id INTEGER PRIMARY KEY,
            title TEXT,
            description TEXT,
            type TEXT,
            interestRate TEXT,
            foundedYear INTEGER,
            price TEXT,
            imageSrc TEXT
        )
    `);

    // Insert initial data if the table is empty
    db.all("SELECT COUNT(*) AS count FROM banks", (err, rows) => {
        if (err) throw err;

        if (rows[0].count === 0) {
            const banksData = [
                { id: 1, title: "Chase Bank", description: "A major U.S. bank offering personal and business banking services.", type: "Retail", interestRate: "4%", foundedYear: 2003, price: "$10m", imageSrc: "/images/Chase.jpg" },
                { id: 2, title: "HSBC", description: "A global bank headquartered in London, providing international banking services.", type: "Commercial", interestRate: "2.0%", foundedYear: 2006, price: "$1.3b", imageSrc: "/images/HSBC.png" },
                { id: 3, title: "ING", description: "A Dutch multinational bank specializing in online banking services.", type: "Online", interestRate: "3.4%", foundedYear: 1991, price: "$2.5m", imageSrc: "/images/ING.jpg" },
                { id: 4, title: "PrivatBank", description: "The largest bank in Ukraine, offering a range of personal and business banking services.", type: "Retail", interestRate: "0.6%", foundedYear: 1992, price: "$12.5m", imageSrc: "/images/Privat.jpg" },
                { id: 5, title: "Raiffeisen Bank Aval", description: "A leading commercial bank in Ukraine, part of the international Raiffeisen Group.", type: "Commercial", interestRate: "1.8%", foundedYear: 1886, price: "$9.1m", imageSrc: "/images/raiffeisen.jpg" },
                { id: 6, title: "First Ukrainian International Bank (FUIB)", description: "A large Ukrainian bank providing innovative financial services for retail and corporate clients.", type: "Retail", interestRate: "2.0%", foundedYear: 1991, price: "$6.9m", imageSrc: "/images/PUMB.jpeg" },
                { id: 7, title: "Wells Fargo", description: "An American multinational financial services company with offerings in banking, mortgages, and investments.", type: "Retail", interestRate: "0.9%", foundedYear: 1852, price: "$15m", imageSrc: "/images/Wells_Fargo.jpeg" },
                { id: 8, title: "Barclays", description: "A major British bank with services in retail, wholesale, and investment banking across the globe.", type: "Investment", interestRate: "4%", foundedYear: 1690, price: "$11.2m", imageSrc: "/images/Barclays.jpg" },
                { id: 9, title: "Citibank", description: "A large U.S. bank and subsidiary of Citigroup, known for its comprehensive financial services.", type: "Commercial", interestRate: "1.7%", foundedYear: 1812, price: "$3.4b", imageSrc: "/images/Citi.webp" }
            ];

            const stmt = db.prepare("INSERT INTO banks (id, title, description, type, interestRate, foundedYear, price, imageSrc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

            banksData.forEach((bank) => {
                stmt.run(bank.id, bank.title, bank.description, bank.type, bank.interestRate, bank.foundedYear, bank.price, bank.imageSrc);
            });

            stmt.finalize();
            console.log("Database initialized with sample data.");
        }
    });
});

module.exports = db;
