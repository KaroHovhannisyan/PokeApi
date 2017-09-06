import React ,{Component} from 'react';
import axios from 'axios';
import SearchBar from './searchBar.jsx';
import '../main.css';
import {Carousel} from 'react-bootstrap';;

class Pokemon extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            pokemon: {
                type: "",
                name: "",
                img:{
                    first:"",
                    second:"",
                    thirth:"",
                    last:""
                },
                param1:"",
                param2:"",

            },
        }
    }

    getPokemonByName(pokemonNameUrl) {
        axios.get(pokemonNameUrl)
        .then(res => {
            var pokemon = res.data;
            this.setState({
                pokemon: {
                    type: pokemon.types[0].type.name,
                    name: pokemon.name,
                    img: {
                        first: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png`,
                        second: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokemon.id}.png`,
                        thirth: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
                        last: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`
                    },
                    param1:pokemon.abilities[0].ability.name,
                    param2:pokemon.abilities[1].ability.name,
                }
            });

        });
}


     componentDidUpdate(){
        console.log("Update in Pokemon Cmp")
     }

    componentWillMount(){
        this.getPokemonByName(`http://pokeapi.co/api/v2/pokemon/${this.props.nameorId}/`);

    }
    render(){
    
        return (<div className="pokemon">
            <h1>{this.state.pokemon.type}</h1>
            <h2>{this.state.pokemon.name}</h2>
            <Carousel>
                <Carousel.Item>
                    <img width={200} className="carouselImg"  height={200} alt={this.state.pokemon.name} src={this.state.pokemon.img.first}/>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={200} className="carouselImg"  height={200} alt={this.state.pokemon.name} src={this.state.pokemon.img.second} />
                </Carousel.Item>
                <Carousel.Item>
                    <img width={200} className="carouselImg" height={200} alt={this.state.pokemon.name} src={this.state.pokemon.img.thirth} />
                </Carousel.Item>
                <Carousel.Item>
                    <img width={200} className="carouselImg"  height={200} alt={this.state.pokemon.name} src={this.state.pokemon.img.last}/>
                </Carousel.Item>
            </Carousel>
            <h2> Abilities</h2>
            <h5>{this.state.pokemon.param1} </h5>
            <h5> {this.state.pokemon.param2}</h5>



        </div>)
    }
}
export default Pokemon;
