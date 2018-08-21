import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import SearchButton from "../components/search/search_button";

import {library} from '@fortawesome/fontawesome-svg-core'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import Countries from "../components/search/countries";
import Search from "../components/search/search";
import SearchInput from "../components/search/search_input";

library.add(faSearch);
library.add(faTimes);

let countries = ["EUW1", "EUN1", "NA1", "KR", "OC1", "BR1", "JP1", "TR1", "RU", "LA1", "LA2"];

storiesOf('Search Button', module)
    .add('Default', () =>
        <SearchButton loading={false} onClick={action('clicked')}/>
    )
    .add('Loading', () =>
        <SearchButton loading={true} onClick={action('clicked')}/>
    )
;

storiesOf('Search Input', module)
    .add('Default', () =>
        <SearchInput loading={false} searched={action('searched')}/>
    )
    .add('Loading', () =>
        <SearchInput loading={true} searched={action('searched')}/>
    )
;

storiesOf('Countries', module)
    .add('Closed', () =>
        <Countries expanded={false} countries={countries} currentCountry="EUW1" changeCountry={action('changed')}/>
    )
    .add('Open', () =>
        <Countries expanded={true} countries={countries} currentCountry="EUW1" changeCountry={action('changed')}/>
    )
;

storiesOf('Search', module)
    .add('Full', () =>
        <Search />
    )
;
