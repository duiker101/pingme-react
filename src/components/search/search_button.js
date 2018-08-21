import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Loader from 'react-loader-spinner'
import './search_button.css'

class SearchButton extends Component {
    render() {
        return (
            <div className="submit" onClick={this.onClick}>

                <FontAwesomeIcon icon="search" className={`button ${this.buttonClass()}`}/>

                <div className={`loader ${this.loaderClass()}`}>
                    <Loader type="Puff" color="#555" height="40" width="30" cl/>
                </div>
            </div>
        );
    }

    onClick = () => {
        this.props.click();
    };

    buttonClass = () => {
        return this.props.loading ? 'hidden' : '';
    };

    loaderClass = () => {
        return !this.props.loading ? 'hidden' : '';
    };
}

export default SearchButton;