// imports
const mysql = require('mysql');

// settings
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    keepAliveInitialDelay: 1000, // Mantém a conexão ativa
});
// run db
db.connect(err => {
    if (err) {
        console.log('Erro ao conectar ao database: ', err);
    } else {
        console.log('Servidor conectado com o database')
    }
});
// tornar o banco acessível nos outros modulos
module.exports = db;