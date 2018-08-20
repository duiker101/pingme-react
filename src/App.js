import React, {Component} from 'react';
import Search from "./components/search";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Errors from "./components/errors";
import MonitorView from "./components/monitor";
import ApiService from "./ApiService";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {monitors: {}, error: '', loading: false};

        ApiService.getVersions().then(data => this.version = data['v']);
        ApiService.getChampions().then(data => this.champions = data);
    }


    render() {
        return (
            <main>
                <Nav/>
                <section>
                    <div className={`wrapper ${this.wrapperClass()}`}>
                        <Errors message={this.state.error}/>
                        <Search addPlayer={this.fetchPlayer} loading={this.state.loading}/>
                        <div>
                            {Object.values(this.state.monitors).map(p =>
                                <MonitorView key={p.id}
                                             player={p}
                                             version={this.version}
                                             champion={this.champions[p.championId]}
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

    fetchPlayer = (name) => {
        // todo check player already added
        this.setState({loading: true});
        ApiService.getPlayer(name)
            .then(player => {
                this.findGame(player)
            })
            .catch(error => this.showError(error))
    };

    findGame = (player) => {
        ApiService.getGame(player.id)
            .then(game => {
                console.log(game);
                for (let p of game.participants) {
                    if (p.summonerId === player.id)
                        player.championId = p.championId
                }
                this.state.monitors[player.id] = player;
                console.log(player);
                this.setState({
                    monitors: this.state.monitors,
                    loading: false
                })
            })
            .catch(error => this.showError(error))
    };

    stop = (player) => {
        delete this.state.monitors[player.id];
        this.setState({
            monitors: this.state.monitors
        });
    };

    showError = (error) => {
        this.setState({loading: false});
        this.setState({error: error.message});

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
