if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
});

// Check if able to connect to DB
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
});

export default pool;
