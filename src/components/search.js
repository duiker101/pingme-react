import React, {Component} from 'react';
import './search.css'
import Countries from "./countries";

class Search extends Component {
    constructor(props) {
        super(props);
        this.countries = ["EUW1", "EUN1", "NA1", "KR", "OC1", "BR1", "JP1", "TR1", "RU", "LA1", "LA2"];
        this.state = {currentCountry: this.countries[0]}
    }

    render() {
        return (
            <div className="search">
                <input type="text" placeholder="Player Name" onKeyPress={this.keyPress}/>
                <button onClick={this.toggleCountries} className="region">{this.state.currentCountry}</button>
                <Countries ref="countries"
                           countries={this.countries}
                           currentCountry={this.state.currentCountry}
                           changeCountry={this.changeCountry}/>
            </div>
        );
    }
    keyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.addPlayer(e.target.value)
        }
    };

    toggleCountries = () => {
        this.refs.countries.toggleExpansion()
        // fetch("https://api.riftkit.net/api/euw1/featured")
        //     .then(r => r.json())
        //     .then(data => console.log(data));
    };

    changeCountry = (country) => {
        this.setState({currentCountry: country});
        this.toggleCountries();
    };
}

export default Search;