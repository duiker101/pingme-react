import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React, {Component} from 'react';
import './monitor.css'
import ApiService from "../ApiService";

class MonitorView extends Component {
    constructor(props) {
        super(props);
        this.state = {hovering: false, time: ''}
    }

    render() {
        return (
            <div ref="content" className="monitor hidden" onMouseEnter={() => this.setHover(true)}
                 onMouseLeave={() => this.setHover(false)}>
                <img src={this.profileIcon()}/>
                <div className="title">{this.props.player.name}({this.props.champion.name})</div>
                <div className="time">{this.state.time}</div>
                <span onClick={() => this.props.stop(this.props.player)}>
                <FontAwesomeIcon icon="times" className={this.state.hovering ? 'visible' : ''}/>
                </span>
            </div>
        );
    }

    setHover = (hover) => {
        this.setState({hovering: hover})
    };

    profileIcon = () => {
        let baseUrl = 'http://ddragon.leagueoflegends.com/cdn/';
        return `${baseUrl}${this.props.version}/img/profileicon/${this.props.player.profileIconId}.png`
    };

    componentDidMount() {
        setTimeout(() => {
            this.refs.content.classList.remove("hidden");
        }, 50);

        setTimeout(this.updateGame, 10 * 1000 + 200);
        this.gameTime();
    }

    updateGame = () => {
        ApiService.getGame(this.props.player.id)
            .then(game => {

            })
            .catch(error => console.log(error))
    };

    gameTime = () => {
        let diff = ((new Date().getTime()) - 1534694997496) / 1000;
        let minutes = parseInt(diff / 60);
        let seconds = parseInt(diff - minutes * 60);
        this.setState({time: `${minutes}:${seconds}`});
        setTimeout(this.gameTime, 10)
    }
}

export default MonitorView;