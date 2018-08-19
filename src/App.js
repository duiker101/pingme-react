import React, {Component} from 'react';
import Search from "./components/search";
import Board from "./components/board";
import Nav from "./components/nav";
import Footer from "./components/footer";
import Errors from "./components/errors";
import ApiService from "./ApiService";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {monitors: ['a'], error: '', loading: false};

        ApiService.getVersions().then(data => this.versions = data['v']);
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
                        <Board monitors={this.state.monitors}/>
                    </div>
                </section>
                <Footer/>
            </main>
        );
    }

    fetchPlayer = (name) => {
        this.setState({loading: true});
        ApiService.getPlayer(name)
            .then(player => {
                this.findGame(player)
            })
            .catch(error => this.showError(error))
    };

    findGame = (player) => {
        ApiService.getGame(player.id)
            .then(a => {
                this.setState({loading: false});
                this.setState({monitors: this.state.monitors.concat([player.name])})
            })
            .catch(error => this.showError(error))
    };

    showError = (error) => {
        this.setState({loading: false});
        this.setState({error: error.message});
        console.log(error);
    };

    wrapperClass() {
        return this.state.monitors.length > 0 ? "expanded" : "";
    }
}

export default App;
