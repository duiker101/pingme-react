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

                <SearchInput searched={this.fetchPlayer} loading={this.props.loading}/>

                <button onClick={this.toggleExpansion} className="region">{this.state.currentCountry}</button>

                <Countries
                    ref={c => this.countrySelector = c}
                    currentCountry={this.state.currentCountry}
                    changeCountry={this.changeCountry}/>
            </div>
        );
    }

    toggleExpansion = () => {
        this.countrySelector.toggleExpansion();
    };

    changeCountry = (country) => {
        this.setState({currentCountry: country});
    };

    fetchPlayer = (name) => {
        // todo check player already added

        this.props.setLoading(true);

        Apis.getPlayer(name)
            .then(player => {
                this.props.addPlayer(player);
            })
            .catch(error => this.showError(error.message))
    };

    showError = (message) => {
        this.props.setLoading(false);
        this.props.showError(message);
    }
}

Search.propTypes = {
    loading: PropTypes.bool,

    addPlayer: PropTypes.func,
    setLoading: PropTypes.func,
    showError: PropTypes.func
};

export default Search;