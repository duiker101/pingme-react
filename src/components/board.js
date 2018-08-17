import React, {Component} from 'react';
import './board.scss'
import MonitorView from "./monitor";

class Board extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>{
            this.props.monitors.map(m =>
                <MonitorView key={m} name={m}/>
            )
        }</div>);
    }

    addPlayer = () => {

    }
}

export default Board;
