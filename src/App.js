import React, {Component} from 'react';
import Search from "./components/search";
import Board from "./components/board";
import Nav from "./components/nav";
import Footer from "./components/footer";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {monitors: ["a","b"]}
    }


    render() {
        return (
            <main>
                <Nav/>
                <section>
                    <div className={`wrapper ${this.wrapperClass()}`}>
                        <Search  addPlayer={this.fetchPlayer}/>
                        <Board monitors={this.state.monitors}/>
                    </div>
                </section>
                <Footer/>
            </main>
        );
    }

    fetchPlayer = (name) => {
        this.setState({monitors: this.state.monitors.concat([name])})
    };

    wrapperClass() {
        return this.state.monitors.length > 0 ? "expanded" : "";
    }
}

export default App;
