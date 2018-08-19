import React, {Component} from 'react';
import './errors.css'

class Errors extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: false}
    }

    render() {
        return (
            <div className="errors">
                <div className={`error ${this.state.visible ? 'visible' : ''}`}>{this.props.message}</div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.message || nextProps.length === 0)
            return;

        clearTimeout(this.timer);
        console.log(nextProps);

        this.setState({visible: true});

        this.timer = setTimeout(() => {
            this.setState({visible: false});
        }, 3000)
    }
}

export default Errors;