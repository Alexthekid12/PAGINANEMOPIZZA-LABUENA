const express = require('express');
const mysql = require('mysql2');  // Usamos promesas
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const connection = mysql.createConnection({
            host: "3.144.99.214",
            user: "root",
            password: "Alexander12",
            database: "pizza"
 });
  


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


connection.connect(( err ) => {
    if( err ) throw err;
    console.log('Conectado a la base de datos')
})

    


app.post('/formulario', (req, res) => {
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const no_tarjeta = req.body.no_tarjeta;
    const expira = req.body.expira;
    const cvv = req.body.cvv;    
    //estructuras query if
    const query = 'INSERT INTO PAGO (NOMBRE,TELEFONO,DIRECCION,NO_TARJETA,EXPIRA,CVV) VALUES (?,?,?,?,?,?)';
    connection.query(query, [nombre,telefono,direccion,no_tarjeta,expira,cvv], (err, result) => {
    if (err) throw err; // Si hay un error, lanza una excepción.
    res.send('Dato insertado correctamente en la base de datos.'); // Responde al cliente confirmando la inserción.
        
    });
});


app.listen(process.env.PORT, process.env.HOST, () => {
    console.log('Server is running on PORT ', process.env.PORT);
});