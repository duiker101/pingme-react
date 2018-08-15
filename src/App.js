import React from 'react';
import './App.css';
import SearchView from "./components/search";
import Board from "./components/board";
import Nav from "./components/nav";
import Footer from "./components/footer";

class App extends React.Component {
    // wrapperClass() {
    //     return this.state.contents.length > 0 ? "expanded" : "";
    // }

    render() {
        return (
            <main>
                <Nav/>
                <section>
                    {/*<div className={`wrapper ${this.wrapperClass()}`}>*/}
                    <div className={`wrapper`}>
                        <SearchView/>
                        <Board/>
                    </div>
                </section>
                <Footer/>
            </main>
        );
    }
}

export default App;
