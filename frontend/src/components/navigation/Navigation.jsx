import React from 'react';
import classes from './navigation.module.css';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";


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
            <Link to=''>Home</Link>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
            <Link to='products'>Products</Link>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
            <Link to="contact">Contact</Link>
            </motion.li>
            <motion.li
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
            <Link to='login'>Login</Link>
            </motion.li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
