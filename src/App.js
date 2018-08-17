import React, {Component} from 'react';
import Search from "./components/search";
import Board from "./components/board";
import Nav from "./components/nav";
import Footer from "./components/footer";

import './App.css';

class App extends Component {
    wrapperClass() {
        return this.state.monitors.length > 0 ? "expanded" : "";
    }

    constructor(props) {
        super(props);
        this.state = {monitors: []}
    }


    render() {
        return (
            <main>
                <Nav/>
                <section>
                    <div className={`wrapper ${this.wrapperClass()}`}>
                        <Search/>
                        <Board/>
                    </div>
                </section>
                <Footer/>
            </main>
        );
    }
}

export default App;
