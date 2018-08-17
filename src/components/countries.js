import React, {Component} from 'react';
import './countries.css'

class Country extends Component {
    constructor(props) {
        super(props);
        this.changeCountry = props.changeCountry;
    }

    render() {
        return (<div onClick={this.onClick}
                     className={`country ${this.props.current ? "current" : ""}`}>{this.props.code}</div>);
    }

    onClick = () => {
        this.changeCountry(this.props.code);
    }
}

class Countries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false};
    }

    render() {
        return (
            <div
                className={`countries ${this.state.expanded ? "expanded" : ""}`}>
                {
                    this.props.countries.map((code) =>
                        <Country code={code}
                                 key={code}
                                 changeCountry={this.props.changeCountry}
                                 current={code === this.props.currentCountry}/>
                    )
                }
            </div>
        );
    }

    toggleExpansion = () => {
        this.setState({expanded: !this.state.expanded});
    }
}

export default Countries;