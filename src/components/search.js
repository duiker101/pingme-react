import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import Spinner from 'react-spinner'
import Loader from 'react-loader-spinner'

import './search.css'
import Countries from "./countries";

class Search extends Component {
    constructor(props) {
        super(props);
        this.countries = ["EUW1", "EUN1", "NA1", "KR", "OC1", "BR1", "JP1", "TR1", "RU", "LA1", "LA2"];
        this.state = {currentCountry: this.countries[0], search: ''}
    }

    render() {
        return (
            <div className="search">

                <input type="text" placeholder="Player Name"
                       onKeyPress={this.keyPress} onChange={this.handleSearchChange}
                       autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

                <div className="submit" onClick={() => this.addPlayer(this.state.search)}>
                    <FontAwesomeIcon icon="search" className={`button ${this.props.loading ? 'hidden' : ''}`}/>
                    <div className={`loader ${!this.props.loading ? 'hidden' : ''}`}>
                        <Loader type="Puff" color="#555" height="40" width="30" cl/>
                    </div>
                </div>

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
            this.addPlayer(this.state.search);
        }
    };

    handleSearchChange = (e) => {
        this.setState({search: e.target.value});
    };

    addPlayer = (value) => {
        let name = value.replace(/\s/g, "");
        this.props.addPlayer(name)
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