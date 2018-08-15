import React from 'react';
import './search.css'

class SearchView extends React.Component {
    render() {
        return (
            <div className="search">
                <input type="text"/>
                <button className="region">EUW1</button>
            </div>
        );
    }
}

export default SearchView;