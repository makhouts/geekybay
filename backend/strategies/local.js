import passport from "passport";
import passportLocal from "passport-local";
import pool from "../helper/dbConnection.js";
import bcrypt from "bcrypt";
const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => {
  done(null, user.userName);
});

passport.deserializeUser(async (username, done) => {
  let user;
  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        connection.release();
        if (!err) {
          user = user[0];
        } else {
          throw new Error("Could not find user");
        }
        if (user) {
          done(null, user);
        }
      });
    });
  } catch (error) {
    done(error, null);
  }
});



export const local = passport.use(
  new LocalStrategy(async (username, password, done) => {
    //username and password from req
    try {
      let user;
      pool.getConnection(async(err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM users WHERE userName = ?", [username], async(err, user) => {
          connection.release();
            user = user[0];
            if (!user) {
              done(null, false);
            } else {
              if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
              } else {
                done(null, false);
              }
            }
        });
      });
    } catch (error) {
      done(error, false);
    }
  })
);
