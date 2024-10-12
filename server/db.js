// imports
import mysql from "mysql";
// trocar para a lib mysql2
// https://www.npmjs.com/package/mysql2
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
db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar ao database: ", err);
  } else {
    console.log("Servidor conectado com o database");
  }
});
// tornar o banco acessível nos outros modulos
export default db;
// usar export default db; para exportar o banco de dados
