import React from 'react';
import './entry.css';

function Entry(){
    return(
        <div className="entry">
            <div className="entry-pokedex">
                <p>Pokedex</p>
            </div>
            <div className='loading-wrapper'>
                <div className='loading'></div>
            </div>
        </div>
    );
}

export default Entry;