const express = require('express');
const mysql = require('mysql2/promise');  // Usamos promesas
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

async function connectDatabase() {
    try {
        const connection = await mysql.createConnection({
            host: "3.144.99.214",
            user: "root",
            password: "Alexander12",
            database: "pizza"
        });
        console.log('Database connected');
        return connection;
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Detiene el servidor si no se conecta
    }
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

(async () => {
   
   // const conexion = await connectDatabase();

    app.listen(process.env.PORT, process.env.HOST, () => {
        console.log('Server is running on PORT ', process.env.PORT);
    });
})();
