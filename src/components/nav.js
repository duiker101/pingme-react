import React, {Component} from 'react';
import './nav.css'
import Logo from '../res/github.svg'

class Nav extends Component {
    render() {
        return (<nav>
            <a href="https://riftkit.net">Home</a>
            <a href="https://pingme.riftkit.net/">Ping Me</a>
            <a href="https://map.riftkit.net">LoL Planner</a>
            <a href="https://riftkit.net/about">About</a>
            <a href="https://github.com/duiker101/pingme-react">
                <img src={Logo} alt={'GitHub logo'}/>
            </a>
        </nav>);
    }
}

export default Nav;
