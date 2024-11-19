//ambiente
import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

// settings
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

/*
// run db
db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar ao database: ", err);
  } else {
    console.log("Servidor conectado com o database");
  }
});


pool.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});
*/

// tornar o banco acessível nos outros modulos
export default pool;
// usar export default db; para exportar o banco de dados
