import React from 'react';
import classes from './primaryButton.module.css';

export const PrimaryButton = (props) => {
    return (
        <button className={classes.primaryButton}>{props.children}</button>
    )
}
