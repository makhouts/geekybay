import React from 'react';
import './navigation.css';

export const Navigation = () => {
    return (
        <div className='container'>
            <nav className='navigation'>
                <div className="logo">
                    {/* logo */}
                    <p>GeekyBay</p>        
                </div>
                <div className='nav-links-container'>
                    <ul className='nav-links'>
                        <li>link 1</li>
                        <li>link 2</li>
                        <li>link 3</li>
                        <li>link 4</li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
