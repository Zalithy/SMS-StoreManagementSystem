const { app, BrowserWindow, ipcMain } = require('electron');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, '..', 'src-frontend', 'index.html'));
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
    if (mainWindow === null) createWindow();
});

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        setupDatabase();
        console.log('Database connected at', dbPath);
    }
});

function setupDatabase() {
    db.serialize(() => {
        // Create 'category' table
        db.run(`CREATE TABLE IF NOT EXISTS category (
            name TEXT PRIMARY KEY,
            type INTEGER
        );`, function(err) {
            if (err) {
                console.error('Error creating category table:', err.message);
                return;
            }
            console.log("Category table created successfully");

            // Create 'customers' table
            db.run(`CREATE TABLE IF NOT EXISTS customers (
                id INTEGER PRIMARY KEY,
                name TEXT,
                phonenumber TEXT,
                sale_date DATETIME
            );`, function(err) {
                if (err) {
                    console.error('Error creating customers table:', err.message);
                    return;
                }
                console.log("Customers table created successfully");

                // Create 'sales' table
                db.run(`CREATE TABLE IF NOT EXISTS sales (
                    id INTEGER PRIMARY KEY,
                    products_json TEXT,
                    customer_id INTEGER,
                    sale_date DATETIME,
                    paymentmethod TEXT,
                    FOREIGN KEY (customer_id) REFERENCES customers(id)
                );`, function(err) {
                    if (err) {
                        console.error('Error creating sales table:', err.message);
                        return;
                    }
                    console.log("Sales table created successfully");

                    // Create 'products' table
                    db.run(`CREATE TABLE IF NOT EXISTS products (
                        id INTEGER PRIMARY KEY,
                        quantity INTEGER DEFAULT 0,
                        name TEXT NOT NULL,
                        price REAL DEFAULT 0,
                        category TEXT,
                        FOREIGN KEY (category) REFERENCES category(name)
                    );`, function(err) {
                        if (err) {
                            console.error('Error creating products table:', err.message);
                            return;
                        }
                        console.log("Products table created successfully");
                    });
                    db.run(`INSERT INTO category (name) 
                    SELECT 'generico' 
                    WHERE NOT EXISTS (
                        SELECT 1 FROM category WHERE name = 'generico');`)
                });
            });
        });
    });
}


ipcMain.handle('execute-query', async (event, query) => {
    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(rows);
            }
        });
    });
});

ipcMain.handle('execute-sql', async (event, query) => {
    return new Promise((resolve, reject) => {

        db.run(query, [], (err) => {
            if (err) {
                reject(err.message);
            } else {
                resolve("Query executed successfully");
            }
        });
    });
});