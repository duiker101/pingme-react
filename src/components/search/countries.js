import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './countries.css'

/**
 * Dialog to select the country in which to search
 */
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
        this.props.onChange(this.countries[0]);
    }

    changeCountry = (country) => {
        this.toggleExpansion();
        this.props.onChange(country);
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
    onChange: PropTypes.func
};

export default Countries;