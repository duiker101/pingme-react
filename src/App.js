import React from 'react';
import './App.css';
import SearchView from "./components/search";

class App extends React.Component {
    render() {
        return (
            //<main>
            //<SearchView />
            <button onClick={this.onClick}>Hi</button>
            // </main>
        );
    }

    onClick = () => {
        fetch("http://localhost:8000/api/euw1/summoner/by-name/duiker101")
            .then(response => response.json())
            .then(jsondata => console.log(jsondata))
    }
}

export default App;
