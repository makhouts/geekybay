import React from 'react';
import classes from './searchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';


export const SearchBar = () => {
    return (
      <div className={classes.searchBar}>
        <input type="text" name="search" placeholder="Search..." />
        <AiOutlineSearch className={classes.searchIcon} />
      </div>
    );
}
