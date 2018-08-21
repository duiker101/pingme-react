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
        this.state = {monitors: {}, error: '', loading: false, order: 0};
    }

    componentDidMount() {
        Apis.getVersions().then(data => this.version = data['v']);
        Apis.getChampions().then(data => this.champions = data);

        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
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
                            showError={this.showError}
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

    findGame = (player) => {
        Apis.getGame(player.id)
            .then(game => {
                this.addMonitor(player, game)
            })
            .catch(error => this.showError(error.message))
    };

    addMonitor = (player, game) => {
        let champion = this.champions[this.getChampionId(player, game)];
        this.state.monitors[player.id] = {player: player, game: game, champion: champion, order: this.state.order};
        this.setState({monitors: this.state.monitors, loading: false, order: this.state.order + 1});
        this.scheduleUpdate(player.id);
    };

    updateGame = (playerId) => {
        if (!(playerId in this.state.monitors))
            return;
        Apis.getGame(playerId)
            .then(game => {
                if (!(playerId in this.state.monitors))
                    return;
                this.state.monitors[playerId].game = game;
                this.setState({monitors: this.state.monitors});
                this.scheduleUpdate(playerId)
            })
            .catch(error => {
                    if (error.code === 404)
                        this.finishedMonitor(playerId);
                    else
                        this.showError(error.message)
                }
            )
    };

    scheduleUpdate = (playerId) => {
        setTimeout(() => this.updateGame(playerId), 10200);
    };

    finishedMonitor = (playerId) => {
        let player = this.state.monitors[playerId].player;
        this.stop(playerId);

        let notification = new Notification(`${player.name} finished playing`, {
            icon: 'https://i.imgur.com/Tmc5u7u.png',
            body: "Go fuck some shit up!"
        });
    };

    getChampionId = (player, game) => {
        for (let p of game.participants) {
            if (p.summonerId === player.id)
                return p.championId;
        }
    };

    stop = (playerId) => {
        delete this.state.monitors[playerId];
        this.setState({monitors: this.state.monitors});
    };

    setLoading = (loading) => {
        this.setState({loading: loading});
    };

    showError = (message) => {
        this.setState({error: message, loading: false});

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
