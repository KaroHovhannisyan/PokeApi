import React ,{Component} from 'react';
import Pokemon from './Pokemon.jsx';
import {connect} from 'react-redux';
import "../main.css";



class PokemonList extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            pokemons: [],
        }

    }

    componentDidMount() {
    var list = this.refs.list;

    this.msnry = new Masonry( list, {
        itemSelector: '.pokemon',
        columnWidth: 95,
        gutter: 10,
        isFitWidth: true
    });
    }


    componentDidUpdate()
    {
        this.msnry.reloadItems();
        this.msnry.layout();
    }

    componentWillReceiveProps(nextProps) {
        var PokemonNames = [];
        if (nextProps.FinishState.pokemonName) {
            PokemonNames.push(nextProps.FinishState.pokemonName)


        } else {
            nextProps.FinishState.pokemonsArray.map(e => PokemonNames.push(e.pokemon.name));
        }
        this.setState({pokemons: PokemonNames});
    }
    render(){
        return (<div className="pokemonList" ref="list">
            {
                this.state.pokemons.map(e =>
                    <Pokemon
                        nameorId={e}
                        key={e}
                        
                        />
                
                )
            }

        </div>)
    }
}

const mapStateToProps = state => ({FinishState:state});

export default connect(mapStateToProps)(PokemonList)

