import React, {Component} from 'react';
import './countries.css'

class Countries extends Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false};
    }

    render() {
        return (
            <React.Fragment>
                <button onClick={this.toggleExpansion} className="region">{this.props.currentCountry}</button>
                <div
                    className={`countries ${this.expandedClass()}`}>
                    {
                        this.props.countries.map((code) =>
                            <div
                                key={code}
                                onClick={() => this.changeCountry(code)}
                                className={`country ${this.currentCountryClass(code)}`}
                            >
                                {code}
                            </div>
                        )
                    }
                </div>
            </React.Fragment>
        );
    }

    changeCountry = (country) => {
        this.toggleExpansion();
        this.props.changeCountry(country);
    };

    toggleExpansion = () => {
        this.setState({expanded: !this.state.expanded});
    };

    expandedClass = () => {
        return this.state.expanded ? "expanded" : "";
    }

    currentCountryClass = (code) => {
        return code === this.props.currentCountry ? "current" : "";
    }
}

export default Countries;