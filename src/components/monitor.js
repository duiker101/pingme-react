import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import './monitor.css'

class MonitorView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /**
             * When hovering the component we want to show the x to remove the monitor
             */
            hovering: false,
            time: ''}
    }

    render() {
        return (
            <div ref="content" className="monitor hidden" onMouseEnter={() => this.setHover(true)}
                 onMouseLeave={() => this.setHover(false)}>
                <img src={this.profileIcon()}/>
                <div className="title">
                    {this.props.monitor.player.name}({this.props.monitor.champion.name}){this.gameMode()}
                </div>
                <div className="time">{this.state.time}</div>
                <span onClick={() => this.props.stop(this.props.monitor.player.id)}>
                <FontAwesomeIcon icon="times" className={this.state.hovering ? 'visible' : ''}/>
                </span>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.refs.content.classList.remove("hidden");
        }, 50);

        this.gameTime();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }


    setHover = (hover) => {
        this.setState({hovering: hover})
    };

    profileIcon = () => {
        let baseUrl = 'http://ddragon.leagueoflegends.com/cdn/';
        return `${baseUrl}${this.props.version}/img/profileicon/${this.props.monitor.player.profileIconId}.png`
    };

    /**
     * get the duration of the game as human-readable string. gameStartTime CAN BE 0
     */
    gameTime = () => {
        let time = this.props.monitor.game.gameStartTime;
        if (time > 0) {
            let diff = ((new Date().getTime()) - this.props.monitor.game.gameStartTime) / 1000;
            let minutes = parseInt(diff / 60);
            let seconds = parseInt(diff - minutes * 60);
            seconds = (seconds + "").length < 2 ? '0' + seconds : seconds;
            this.setState({time: `${minutes}:${seconds}`});
        } else {
            this.setState({time: `Starting...`});
        }
        this.timer = setTimeout(this.gameTime, 10);
    };

    /**
     * Get the game mode for the game but works only for some game modes. Should still cover 99% of the games.
     * @returns {string}
     */
    gameMode = () => {
        let id = this.props.monitor.game.gameQueueConfigId;
        let modes = {
            420: 'Ranked Solo',
            440: 'Ranked Flex',
            100: 'ARAM',
            450: 'ARAM'
        };

        if (id in modes)
            return ` - ${modes[id]}`;
        else return ''
    }
}

MonitorView.propTypes = {
    version: PropTypes.string,
    champion: PropTypes.object,
    player: PropTypes.object,
    game: PropTypes.object
};

export default MonitorView;