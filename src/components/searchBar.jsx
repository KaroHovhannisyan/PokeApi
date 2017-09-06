import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import {FormControl,
        Button,
        ButtonGroup
} from 'react-bootstrap';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Slider from 'material-ui/Slider';
import '../main.css';

class SearchBar extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            typeOfApi:"Type",
            pokemonTypes:['flying', 'normal', 'fairy', 'poison','water','fighting','ground','rock','bug','ghost','steel','fire','grass','electric','psychic','ice','dragon','dark',],
            count:10,
            searchText:"",
            isLoading:false,
            pokemonsNames:["bulbasaur", "ivysaur", "charmander", "venusaur", "charmeleon", "charizard", "squirtle", "wartortle", "blastoise", "caterpie", "metapod", "butterfree", "weedle", "kakuna", "beedrill", "pidgey", "pidgeotto", "pidgeot", "rattata", "raticate", "spearow", "fearow", "ekans", "arbok", "pikachu", "raichu", "sandshrew", "sandslash", "nidoran-f", "nidorina", "nidoqueen", "nidoran-m", "nidorino", "nidoking", "clefairy", "clefable", "vulpix", "ninetales", "jigglypuff", "wigglytuff", "zubat", "golbat", "oddish", "gloom", "vileplume", "paras", "parasect", "venonat", "venomoth", "diglett", "dugtrio"]
        }
    }



    choose(type) {
        switch (type) {
            case "Type":
                this.setState({typeOfApi: "Type"});
                this.props.onApiTypeChange("type");
                break;
            case "Pokemon":
                this.setState({typeOfApi: "Name"});
                this.props.onApiTypeChange("pokemon");
                break;
        }
    }
    
    
    
        search()
        {
        if(this.state.searchText){
            this.props.onApiNameChange(this.state.searchText.toLowerCase());
             this.setState({isLoading:true});
            
        }
        }

 changePokemonsCount(event, value) {
     this.setState({count:value});
     this.props.onCountChange(value);

  }
    
    searchInputChange(t){
        this.setState({searchText:t,
                       isLoading:false});
    }
        


    render(){
        var isLoading = this.props.isLoading;
        return (
           <div>        
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div className="searchBar">
                  <AutoComplete
                      ref="searchInput"
                      hintText={`Enter Pokemon ${this.state.typeOfApi} To Search`}
                      dataSource={this.state.typeOfApi==='Type'?this.state.pokemonTypes:this.state.pokemonsNames}
                      onUpdateInput={this.searchInputChange.bind(this)}
                      floatingLabelText={`Enter Pokemon ${this.state.typeOfApi} To Search`}
                    />
             
             <Button
                   bsStyle="primary"
                   disabled={isLoading}
                   onClick ={this.search.bind(this)}>
             {isLoading ? 'Loading...' : 'Search'}
            </Button>
                <p>Pokemons count {this.state.count} of 20</p>
        <Slider
          
          min={0}
          max={20}
          step={1}
          value={this.state.count}
          onChange={this.changePokemonsCount.bind(this)}
            style = {{width:'10%'}}
        />
    
            </div>
                </MuiThemeProvider>
                <ButtonGroup>
                    <Button onClick =  {this.choose.bind(this,"Type")}>Type</Button>
                    <Button onClick =  {this.choose.bind(this,"Pokemon")}>Pokemon</Button>
                </ButtonGroup>
            </div>
         
                )
    }
}
export default SearchBar;