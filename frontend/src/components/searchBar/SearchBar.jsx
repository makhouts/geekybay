import React, {useState} from 'react';
import classes from './searchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';


export const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigateProducts = useNavigate();

  const navigateToProducts = (e) => {
    if(e.key === 'Enter') {
      navigateProducts(`products/${searchTerm}`);
      setSearchTerm('');
    }
  }

    return (
      <div className={classes.searchBar}>
        <input type="text" name="search" placeholder="Search..." onKeyPress={navigateToProducts} value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
        <Link to={`products/${searchTerm}`} onClick={() => setSearchTerm('')}>
          <AiOutlineSearch className={classes.searchIcon} />
        </Link>
      </div>
    );
}
