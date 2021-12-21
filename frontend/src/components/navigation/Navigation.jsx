import React from 'react';
import classes from './navigation.module.css';
import { motion } from 'framer-motion';
import { Link, NavLink } from "react-router-dom";


export const Navigation = () => {
  return (
    <div className={classes.container}>
      <nav className={classes.navigation}>
        <div className={classes.logo}>
          {/* logo */}
          <p>GeekyBay</p>
        </div>
        <div className={classes.navLinksContainer}>
          <ul className={classes.navLinks}>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              <NavLink to="">Home</NavLink>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              <NavLink to="products">Products</NavLink>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              <NavLink to="contact">Contact</NavLink>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              <NavLink to="login">Login</NavLink>
            </motion.li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
