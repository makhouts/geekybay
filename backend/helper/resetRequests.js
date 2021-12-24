import pool from "../helper/dbConnection.js";

export function createResetRequest(id, username, email) {
  pool.getConnection(async (err, connection) => {
    if (err) throw err;
    connection.query("INSERT INTO requests (requestId, username, email) VALUES (?, ?, ?)", [id, username, email], (err, rows) => {
      connection.release();
      if (!err) {
        // console.log("");
      } else {
        console.log(err);
      }
    });
  });
}


// should return promises in order ot use th
/*export function getResetRequest(id) {
  pool.getConnection(async (err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM requests WHERE requestId = ?", [id], (err, request) => {
      connection.release();
      if (!err) {
        return request;
      } else {
        console.log(err);
      }
    });
  });
}*/

/*export function getUserByUsername(username) {
  pool.getConnection(async (err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM users WHERE userName = ?", username, (err, user) => {
      connection.release();
      if (!err) {
        return user;
      } else {
        return new Error({ message: "Could not find user" });
      }
    });
  });
}
*/

