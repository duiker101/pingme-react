import React from 'react';
import './search.css'
import Countries from "./countries";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.countries = ["EUW1", "EUN1", "NA1", "KR", "OC1", "BR1", "JP1", "TR1", "RU", "LA1", "LA2"];
        this.state = {currentCountry: this.countries[0]}
    }

    render() {
        return (
            <div className="search">
                <input type="text" placeholder="Player Name"/>
                <button onClick={this.toggleCountries} className="region">{this.state.currentCountry}</button>
                <Countries ref="countries"
                           countries={this.countries}
                           currentCountry={this.state.currentCountry}
                           changeCountry={this.changeCountry} />
            </div>
        );
    }

    toggleCountries = () => {
        this.refs.countries.toggleExpansion()
    };

    changeCountry = (country) => {
        this.setState({currentCountry: country});
        this.toggleCountries();
    };
}

export default Search;