import React, {Component} from 'react';

import './search.css'
import Countries from "./countries";
import SearchButton from "./search_button";
import ApiService from "../../ApiService";

class Search extends Component {
    constructor(props) {
        super(props);
        this.countries = ["EUW1", "EUN1", "NA1", "KR", "OC1", "BR1", "JP1", "TR1", "RU", "LA1", "LA2"];
        this.state = {currentCountry: this.countries[0]}
    }

    render() {
        return (
            <div className="search">

                <input type="text" placeholder="Player Name"
                       ref={e => this.input = e}
                       onKeyPress={this.keyPress}
                       autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

                <SearchButton click={this.submitSearch} loading={this.props.loading}/>

                <Countries countries={this.countries}
                           currentCountry={this.state.currentCountry}
                           changeCountry={this.changeCountry}/>
            </div>
        );
    }

    submitSearch = () => {
        this.filterName(this.input.value);
    };

    keyPress = (e) => {
        if (e.key === 'Enter') {
            this.filterName(this.input.value);
        }
    };

    filterName = (value) => {
        let name = value.replace(/\s/g, "");
        if (name.length <= 0) {
            this.props.showError("Name not valid");
            return;
        }
        this.fetchPlayer(name)
    };


    changeCountry = (country) => {
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