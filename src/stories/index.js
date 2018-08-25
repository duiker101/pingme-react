import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';

import {library} from '@fortawesome/fontawesome-svg-core'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import Countries from "../components/search/countries";
import Search from "../components/search/search";
import SearchInput from "../components/search/search_input";
import MonitorView from "../components/monitor";
import * as game from './game.json';

library.add(faSearch);
library.add(faTimes);

let countries = ["EUW1", "EUN1", "NA1", "KR", "OC1", "BR1", "JP1", "TR1", "RU", "LA1", "LA2"];

// storiesOf('Search Button', module)
//     .add('Default', () =>
//         <SearchButton loading={false} onClick={action('clicked')}/>
//     )
//     .add('Loading', () =>
//         <SearchButton loading={true} onClick={action('clicked')}/>
//     )
// ;

storiesOf('Search Input', module)
    .add('Default', () =>
        <div style={{position: 'relative'}}>
            <SearchInput loading={false} searched={action('onSearch')}/>
        </div>
    )
    .add('Loading', () =>
        <div style={{position: 'relative'}}>
            <SearchInput loading={true} searched={action('onSearch')}/>
        </div>
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
        <Search/>
    )
;

let player = {
    "accountId": 30745356,
    "id": 27032200,
    "name": "Duiker101",
    "profileIconId": 774,
    "revisionDate": 1530519258000,
    "summonerLevel": 42
};

let monitor = {
    player: player,
    game: game,
    champion: {name: "What'evga"}
};

storiesOf('Monitor', module)
    .add('Full', () =>
        <MonitorView monitor={monitor} version='8.16.1'/>
    )
;
