import React from 'react';
import './countries.css'

class Country extends React.Component {
    render() {
        return (<div className="country">{this.props.code}</div>);
    }
}

class Countries extends React.Component {
    constructor() {
        super();
        this.state = {expanded: false}
        this.countries = ["EUW", "EUNE", "NA", "BR"];
        this.countryItems = this.countries.map((code) =>
            <Country code={code} key={code}/>
        )
    }

    render() {
        return (
            <div className={`countries ${this.state.expanded ? "expanded" : ""}`}>
                {this.countryItems}
            </div>
        );
    }

    toggleExpansion = () => {
        this.setState({expanded: !this.state.expanded})
    }
}

export default Countries;