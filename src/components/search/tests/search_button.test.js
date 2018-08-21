import React from 'react';
import ReactDOM from 'react-dom';
import SearchButton from "../search_button";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchButton/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
