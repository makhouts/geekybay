import React, {useState} from 'react';
import classes from './searchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';


export const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState();

    return (
      <div className={classes.searchBar}>
        <input type="text" name="search" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
        <Link to={`products/${searchTerm}`}>
          <AiOutlineSearch className={classes.searchIcon} />
        </Link>
      </div>
    );
}
