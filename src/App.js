import React, {Component} from 'react';
import Search from "./components/search/search";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Errors from "./components/errors";
import MonitorView from "./components/monitor";
import {Apis} from "./Apis";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /**
             * Current players being monitored. Hashmap where the key is the PlayerId
             */
            monitors: {},
            /**
             * Current error message
             */
            error: '',
            /**
             * if it's currently loading, triggered only on first search of a game
             */
            loading: false,
            /**
             * Incremental, increased every time we add a new monitor to keep sort of them
             * TODO, doesn't really need to be a state
             */
            order: 0};
    }

    render() {
        return (
            <main>
                <Nav/>
                <section>
                    <div className={`wrapper ${this.wrapperClass()}`}>
                        <Errors message={this.state.error}/>

                        <Search
                            loading={this.state.loading}
                            setLoading={this.setLoading}
                            onError={this.showError}
                            addPlayer={this.findGame}/>

                        <div>
                            {Object.values(this.state.monitors)
                                .sort((a, b) => a.order - b.order)
                                .map(m =>
                                    <MonitorView key={m.player.id}
                                                 monitor={m}
                                                 version={this.version}
                                                 stop={this.stop}
                                    />
                                )}
                        </div>
                    </div>
                </section>
                <Footer/>
            </main>
        );
    }

    /**
     * On mount of the component we gather from the API the version, for the profile icon and the list of champions
     * We also ask the user for notification permission if we don't have it already
     */
    componentDidMount() {
        Apis.getVersions('euw1').then(data => this.version = data['v']);
        Apis.getChampions('euw1').then(data => this.champions = data);

        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    /**
     * Find if a player is in a game, if so add it to the monitors
     * @param player object form the API
     * @param country
     */
    findGame = (player,country) => {
        Apis.getGame(player.id,country)
            .then(game => {
                this.addMonitor(player,country, game)
            })
            .catch(error => this.showError(error.message))
    };

    /**
     * Add a player, it's champion and a game to the monitors in the state
     * @param player
     * @param country
     * @param game
     */
    addMonitor = (player,country, game) => {
        let champion = this.champions[this.getChampionId(player, game)];
        let monitors = this.state.monitors;
        monitors[player.id] = {player: player, game: game, champion: champion, order: this.state.order};
        this.setState({monitors: monitors, loading: false, order: this.state.order + 1});
        this.scheduleUpdate(player.id, country);
    };

    /**
     * Update the game in a monitor for a specific player
     * @param playerId player who's game we want to update
     * @param country
     */
    updateGame = (playerId, country) => {
        if (!(playerId in this.state.monitors))
            return;
        Apis.getGame(playerId,country)
            .then(game => {
                if (!(playerId in this.state.monitors))
                    return;
                let monitor = this.state.monitors[playerId];
                monitor.game = game;
                this.setState({monitors: {...this.state.monitors, [playerId]: monitor}});
                this.scheduleUpdate(playerId,country)
            })
            .catch(error => {
                    if (error.code === 404)
                        this.finishedMonitor(playerId);
                    else
                        this.showError(error.message)
                }
            )
    };

    /**
     * start a timer to update a game in 10010ms. This is because the server has a cache of 10s on the game page so
     * we want to be sure we will get a new page. with page load times we probably would, but no one is going to notice
     * 10ms more
     * @param playerId
     */
    scheduleUpdate = (playerId,country) => {
        setTimeout(() => this.updateGame(playerId,country), 10010);
    };

    /**
     * Stop the monitor and notify the browser of a finished game
     * @param playerId
     */
    finishedMonitor = (playerId) => {
        let player = this.state.monitors[playerId].player;
        this.stop(playerId);

        if(window._paq)
            window._paq.push(['trackEvent', 'Notification', 'Display']);
        let notification = new Notification(`${player.name} finished playing`, {
            icon: 'https://i.imgur.com/Tmc5u7u.png',
            body: "Go fuck some shit up!"
        });
    };

    /**
     * Given a player and his game, find what champion he is playing and return it's id
     * @param player api object
     * @param game api object from the spectator api
     * @returns {number} champion id
     */
    getChampionId = (player, game) => {
        for (let p of game.participants) {
            if (p.summonerId === player.id)
                return p.championId;
        }
    };

    /**
     * Remove a monitor from the state
     * @param playerId
     */
    stop = (playerId) => {
        delete this.state.monitors[playerId];
        this.setState({monitors: this.state.monitors});
    };

    setLoading = (loading) => {
        this.setState({loading: loading});
    };

    /**
     * Display an error and start a timer for 3s, after which, hide the error
     * @param message
     */
    showError = (message) => {
        this.setState({error: message, loading: false});

        // TODO, use a isErrorVisible instead of clearing the error message
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({error: ''});
        }, 3000)
    };

    wrapperClass() {
        return Object.keys(this.state.monitors).length > 0 ? "expanded" : "";
    }
}

export default App;
