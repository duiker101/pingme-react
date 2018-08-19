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
            <div ref="content" className="monitor hidden" onMouseEnter={() => this.setHover(true)}
                 onMouseLeave={() => this.setHover(false)}>
                <img
                    src={`http://ddragon.leagueoflegends.com/cdn/${this.props.version}/img/profileicon/${this.props.player.profileIconId}.png`}/>
                <div className="title">{this.props.player.name}</div>
                <div className="time">00:00</div>
                <span onClick={() => this.props.stop(this.props.player)}>
                <FontAwesomeIcon icon="times" className={this.state.hovering ? 'visible' : ''}/>
                </span>
            </div>
        );
    }

    // stop = (e) => {
    //     this.props.stop(e);
    // };

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