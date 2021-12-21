import React from 'react';
import classes from './contact.module.css';
import { PageTransition } from '../../helpers/animations';

export const Contact = () => {
    return (
      <PageTransition>
        <div>
           <p className={classes.ptag}>contact test</p> 
        </div>
      </PageTransition>
    )
}
