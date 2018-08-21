import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import SearchButton from "../components/search/search_button";

import {library} from '@fortawesome/fontawesome-svg-core'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import Countries from "../components/search/countries";

library.add(faSearch);
library.add(faTimes);


storiesOf('SearchButton', module)
    .add('Default', () =>
        <SearchButton loading={false} click={action('clicked')}/>
    )
    .add('Loading', () =>
        <SearchButton loading={true} click={action('clicked')}/>
    )
;

let countries = ["EUW1", "EUN1", "NA1", "KR", "OC1", "BR1", "JP1", "TR1", "RU", "LA1", "LA2"];
// let state = {currentCountry: this.countries[0]}
storiesOf('Countries', module)
    .add('Closed', () =>
        <Countries countries={countries} currentCountry="EUW1" changeCountry={action('changed')}/>
    )
    .add('Loading', () =>
        <SearchButton loading={true} click={action('clicked')}/>
    )
;
