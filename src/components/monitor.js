import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {Component} from 'react';
import './monitor.css'

class MonitorView extends Component {
    constructor(props) {
        super(props);
        this.state = {hovering: false}
    }

    render() {
        return (
            <div ref="content" className="monitor hidden" onMouseEnter={()=>this.setHover(true)}
                 onMouseLeave={()=>this.setHover(false)}>
                <img src='http://ddragon.leagueoflegends.com/cdn/7.24.2/img/profileicon/517.png'/>
                <div className="title">Tizio</div>
                <div className="time">00:00</div>
                <FontAwesomeIcon icon="times" className={this.state.hovering ? 'visible' : ''}/>
            </div>
        );
    }

    setHover = (hover) => {
        this.setState({hovering: hover})
        // console.log(hover);
    };

    componentDidMount() {
        setTimeout(() => {
            this.refs.content.classList.remove("hidden");
        }, 50)
    }
}

export default MonitorView;