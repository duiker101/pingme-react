import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types';
import './search_input.css'

class SearchInput extends Component {
    render() {
        return (
            <React.Fragment>
                <input ref={e => this.input = e}
                       onKeyPress={this.keyPress}
                       type="text"
                       placeholder="Player Name"
                       autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>

                <div className="submit">
                    {!this.props.loading &&
                        <span onClick={this.submitSearch}>
                            <FontAwesomeIcon icon="search" className={`button`}/>
                        </span>
                    }
                    {this.props.loading &&
                        <div className={`loader`}>
                            <Loader type="Puff" color="#555" height="40" width="30" cl/>
                        </div>
                    }
                </div>
            </React.Fragment>
        );
    }

    submitSearch = () => {
        this.filterName(this.input.value);
    };

    /**
     * If Enter pressed act as if the user clicked the search button
     * @param e
     */
    keyPress = (e) => {
        if (e.key === 'Enter') {
            this.filterName(this.input.value);
        }
    };

    /**
     * Return a name as API compatible(remove spaces)
     * TODO also encode funky chars
     * @param value
     */
    filterName = (value) => {
        let name = value.replace(/\s/g, "");
        if (name.length <= 0) {
            this.props.showError("Name not valid");
            return;
        }
        this.props.onSearch(name)
    };
}

SearchInput.propTypes = {
    loading: PropTypes.bool,
    onSearch: PropTypes.func
};

export default SearchInput;