import React from 'react';
import './countries.css'

class Countries extends React.Component {
    constructor() {
        super();
        this.state = {expanded: false}
    }

    render() {
        return (<div className={`countries ${this.state.expanded ? "expanded" : ""}`}>hi</div>);
    }

    toggleExpansion = () => {
        this.setState({expanded: !this.state.expanded})

    }
}

export default Countries;