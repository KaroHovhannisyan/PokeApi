/**
 * Created by karo on 5/23/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {createStore} from "redux";
import {Provider} from "react-redux"
import './main.css';


function POKEMON(state = [] ,action) {
    switch (action.type) {
        case 'POKEMONS_BY_TYPE':
            return {pokemonsArray:action.pokemons}
        case 'POKEMON_BY_NAME':
            return {pokemonName:action.pokemonName}
        default:
            return {pokemonsArray:action.pokemons}
    }

}
const store = createStore(POKEMON)
store.subscribe(() =>
    console.log('Store changed', store.getState())
)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);




