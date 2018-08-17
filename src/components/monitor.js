import React, {Component} from 'react';
import './monitor.css'

class MonitorView extends Component {
    render() {
        return (
            <div ref="content" className="monitor hidden">
                {this.props.name}
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.refs.content.classList.remove("hidden");
        }, 50)
    }
}

export default MonitorView;