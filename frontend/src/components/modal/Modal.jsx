import React from 'react'
import classes from './modal.module.css';
import {Backdrop} from '../backdrop/Backdrop';
import { AnimatePresence, motion } from 'framer-motion';

export const Modal = (props) => {    

    return props.show ? (

    <>
        <Backdrop clicked={props.modalClosed} show={props.show} />
        <AnimatePresence>
            <motion.div 
            className={classes.Modal}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}>
                {props.children}
            </motion.div>
        </AnimatePresence>
    </>
    ) : null;
}