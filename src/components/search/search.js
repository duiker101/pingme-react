import React, {Component} from 'react';

import './search.css'
import Countries from "./countries";
import ApiService from "../../ApiService";
import SearchInput from "./search_input";

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
        // this.setState({expanded: !this.state.expanded});
        this.countrySelector.toggleExpansion();
    };

    changeCountry = (country) => {
        // this.toggleExpansion();
        // this.countrySelector.toggleExpansion();
        this.setState({currentCountry: country});
    };


    fetchPlayer = (name) => {
        // todo check player already added

        this.props.setLoading(true);

        ApiService.getPlayer(name)
            .then(player => {
                this.findGame(player);
            })
            .catch(error => this.showError(error.message))
    };

    findGame = (player) => {
        ApiService.getGame(player.id)
            .then(game => {
                console.log(game);
                for (let p of game.participants) {
                    if (p.summonerId === player.id)
                        player.championId = p.championId
                }
                // this.state.monitors[player.id] = player;
                console.log(player);
                // this.setState({
                //     monitors: this.state.monitors,
                //     loading: false
                // })
            })
            .catch(error => this.showError(error.message))
    };

    showError = (message) => {
        this.props.setLoading(false);
        this.props.showError(message);
    }
}

export default Search;