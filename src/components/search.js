import React from 'react';
import './search.css'
import Countries from "./countries";

class Search extends React.Component {
    render() {
        return (
            <div className="search">
                <input type="text" placeholder="Player Name"/>
                <button onClick={this.toggleCountries} className="region">EUW1</button>
                <Countries ref="countries" expanded={false}/>
            </div>
        );
    }

    toggleCountries = () => {
        // this.refs.countries.expanded = !this.refs.countries.expanded;
        this.refs.countries.toggleExpansion()
    }
}

export default Search;