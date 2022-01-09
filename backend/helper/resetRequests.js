import pool from "../helper/dbConnection.js";

export function createResetRequest(id, username, email) {
  pool.getConnection(async (err, connection) => {
    if (err) throw err;
    connection.query("INSERT INTO requests (requestId, username, email) VALUES (?, ?, ?)", [id, username, email], (err, rows) => {
      connection.release();
      if (!err) {
        return rows;
      } else {
        if (err) throw err;
      }
    });
  });
}
