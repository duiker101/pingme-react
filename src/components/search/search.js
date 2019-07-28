import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Countries from "./countries";
import {Apis} from "../../Apis";
import SearchInput from "./search_input";

import './search.css'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {currentCountry: ''}
    }

    render() {
        return (
            <div className="search">

                <SearchInput onSearch={this.fetchPlayer} loading={this.props.loading}/>

                <button onClick={this.toggleCountryExpansion} className="region">{this.state.currentCountry}</button>

                <Countries
                    ref={c => this.countrySelector = c}
                    currentCountry={this.state.currentCountry}
                    onChange={this.onCountryChange}/>
            </div>
        );
    }

    toggleCountryExpansion = () => {
        this.countrySelector.toggleExpansion();
    };

    onCountryChange = (country) => {
        this.setState({currentCountry: country});
        if(window._paq)
            window._paq.push(['trackEvent', 'Country', 'Change', `Country - ${country}`]);
    };

    fetchPlayer = (name) => {
        // todo check player already added
        if(window._paq)
            window._paq.push(['trackEvent', 'Search', 'Player', `Country - ${this.state.currentCountry}`]);

        this.props.setLoading(true);

        Apis.getPlayer(name,this.state.currentCountry)
            .then(player => {
                this.props.addPlayer(player,this.state.currentCountry);
            })
            .catch(error => this.showError(error.message))
    };

    showError = (message) => {
        this.props.setLoading(false);
        this.props.onError(message);
    }
}

Search.propTypes = {
    loading: PropTypes.bool,

    addPlayer: PropTypes.func,
    setLoading: PropTypes.func,
    onError: PropTypes.func
};

export default Search;