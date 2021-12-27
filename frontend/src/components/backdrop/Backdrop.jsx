import { motion } from 'framer-motion';
import React from 'react'
import classes from './backdrop.module.css';

export const Backdrop = (props) => {
    return props.show ? <motion.div transition={{ type: 'spring', damping:50, stiffness: 300 }} whileHover={{backgroundColor: '#000000ab'}} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className={classes.Backdrop} onClick={props.clicked}></motion.div> : null
}