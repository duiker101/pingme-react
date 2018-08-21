import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './countries.css'

class Countries extends Component {
    constructor(props) {
        super(props);
        this.countries = ["EUW1", "EUN1", "NA1", "KR", "OC1", "BR1", "JP1", "TR1", "RU", "LA1", "LA2"];
        this.state = {expanded: false};
    }

    render() {
        return (
            <div
                className={`countries ${this.expandedClass()}`}>
                {
                    this.countries.map((code) =>
                        <div
                            key={code}
                            onClick={() => this.changeCountry(code)}
                            className={`country ${this.currentCountryClass(code)}`}>
                            {code}
                        </div>
                    )
                }
            </div>
        );
    }

    componentDidMount() {
        this.props.changeCountry(this.countries[0]);
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
    };

    currentCountryClass = (code) => {
        return code === this.props.currentCountry ? "current" : "";
    }
}

Countries.propTypes = {
    currentCountry: PropTypes.string,
    changeCountry: PropTypes.func
};

export default Countries;