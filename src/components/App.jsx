import React ,{Component} from 'react';
import axios from 'axios';
import SearchBar from './searchBar.jsx';
import PokemonList from './PokemonList.jsx';
import {connect} from "react-redux";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemons: [],
            type: 'type',
            name_id: "water",
            count:10,
            isLoading:false
            
        }
    }

        componentWillMount()
        {   console.log("Will Mount in App");
            this.getPokemonsByTypeAndName(this.state.type, this.state.name_id);
        }

        getPokemonsByTypeAndName(type, name)
        {
            
            if(this.state.type === "type") {
                axios.get(`http://pokeapi.co/api/v2/${type}/${name}/`)
                    .then(res => {
                        this.loadingEnds();
                        var pokemonsArray = res.data.pokemon.slice(0, this.state.count);
                        this.props.AddPokemons('POKEMONS_BY_TYPE',pokemonsArray);
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                        this.loadingEnds();
                        alert("Not Found If you dont know name you can enter only numbers");
                        
                    });
            }
            else if (this.state.type === "pokemon"){
                axios.get(`http://pokeapi.co/api/v2/${type}/${name}/`)
                    .then(res => {
                        this.loadingEnds();
                        var pokemonName =res.data.name;
                        this.props.AddPokemons('POKEMON_BY_NAME',[],pokemonName);
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("Wrong name");
                        this.loadingEnds();
                        
                    });
                

            }
        }
      
loadingEnds(){
    if(this.state.isLoading){
    this.setState({isLoading:false});
    }  
}
    shouldComponentUpdate(nextProps,nextState){
//        if(nextProps.count !== this.props.count || nextProps.name_id !== this.props.name_id){
//            console.log("Bdi update exni");
//            return true;
//        } 
//        console.log("abort");
//        return false;
        console.log("Should Update");
        return true;
        
    }
    componentWillUpdate(nextProps,nextState){
        
        
    }
        render()
        {
            this.getPokemonsByTypeAndName(this.state.type,this.state.name_id);
            return (<div>
                <SearchBar
                    onApiTypeChange={(type) => {
                        this.setState({type:type,
                                       name_id:1,
                                       isLoading:true})
                    }}
                    onApiNameChange={(name) => {
                        this.setState({name_id:name,
                                       isLoading:true
                                       })
                
                    }}
                    
                    onCountChange ={(cnt)=>{
                                console.log(cnt);
                                this.setState({count:cnt,isLoading:true})
                        
                        }}
                    
                    isLoading={this.state.isLoading}
                />
                <PokemonList />

            </div>)
        }

}



const mapStateToProps = state => ({fisrtStep:state});

export default connect(
    null,
    dispatch =>({
        AddPokemons:(type,array,name)=>{dispatch({type:type, pokemons:array ,pokemonName:name})}
    }))(App);



