import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './countries.css'

class Countries extends Component {
    constructor(props) {
        super(props);
        this.state = {expanded: this.props.expanded};
    }

    render() {
        return (
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
        );
    }

    componentWillReceiveProps(props) {
        this.setState({expanded: props.expanded});
    }

    changeCountry = (country) => {
        this.props.changeCountry(country);
    };

    expandedClass = () => {
        return this.state.expanded ? "expanded" : "";
    };

    currentCountryClass = (code) => {
        return code === this.props.currentCountry ? "current" : "";
    }
}

Countries.propTypes = {
    countries: PropTypes.array,
    expanded: PropTypes.bool,
    changeCountry: PropTypes.func
};

export default Countries;