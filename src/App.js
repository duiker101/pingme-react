import React, {Component} from 'react';
import Search from "./components/search/search";
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

                        <Search
                            loading={this.state.loading}
                            setLoading={this.setLoading}
                            showError={this.showError}
                            addPlayer={this.fetchPlayer} />

                        {/*<div>*/}
                        {/*{Object.values(this.state.monitors).map(p =>*/}
                        {/*<MonitorView key={p.id}*/}
                        {/*player={p}*/}
                        {/*version={this.version}*/}
                        {/*champion={this.champions[p.championId]}*/}
                        {/*stop={this.stop}*/}
                        {/*/>*/}
                        {/*)}*/}
                        {/*</div>*/}
                    </div>
                </section>
                <Footer/>
            </main>
        );
    }


    stop = (player) => {
        delete this.state.monitors[player.id];
        this.setState({monitors: this.state.monitors});
    };

    setLoading = (loading) => {
        this.setState({loading: loading});
    };

    showError = (message) => {
        this.setState({error: message});

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
