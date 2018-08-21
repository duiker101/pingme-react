import React, {Component} from 'react';
import SearchButton from "./search_button";
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
                    <SearchButton loading={this.props.loading} onClick={this.submitSearch}/>
                </div>
            </React.Fragment>
        );
    }

    submitSearch = () => {
        this.filterName(this.input.value);
    };

    keyPress = (e) => {
        if (e.key === 'Enter') {
            this.filterName(this.input.value);
        }
    };

    filterName = (value) => {
        let name = value.replace(/\s/g, "");
        if (name.length <= 0) {
            this.props.showError("Name not valid");
            return;
        }
        this.props.searched(name)
    };
}

SearchInput.propTypes = {
    loading: PropTypes.bool,
    searched: PropTypes.func
};

export default SearchInput;