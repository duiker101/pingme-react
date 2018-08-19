import React, {Component} from 'react';
import './nav.css'

class Nav extends Component {
    render() {
        return (<nav>
            <a href="http://riftkit.net">Home</a>
            <a href="http://pingme.riftkit.net/">Ping Me</a>
            <a href="http://map.riftkit.net">LoL Planner</a>
            <a href="http://riftkit.net/about">About</a>
        </nav>);
    }

}

export default Nav;
