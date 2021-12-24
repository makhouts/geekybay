import React from 'react';
import { Link } from 'react-router-dom';
import classes from './page404.module.css';
import { PageTransition } from '../../helpers/animations';


export const Page404 = () => {
    return (
      <PageTransition>
        <div className={classes.c}>
          <div className={classes._404}>404</div>
          <div className={classes._1}>THE PAGE</div>
          <div className={classes._2}>WAS NOT FOUND</div>
          <Link to="/" className={classes.btn}>
            BACK TO HOME
          </Link>
        </div>
      </PageTransition>
    );
}
