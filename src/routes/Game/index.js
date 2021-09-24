import {useRouteMatch, Switch, Route} from 'react-router-dom'
import {useState} from "react"
import StartPage from "./Start"
import BoardPage from "./Board"
import FinishPage from "./Finish"
import {PokemonContext} from "../../context/pokemonContext"


const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({})
    const match = useRouteMatch();
    const handlePokeSelected = (key, pokemon) => {
      setSelectedPokemons(prevState => {
        if (prevState[key]) {
          const copyState = {...prevState}
          delete copyState[key]

          return copyState
        }
        return {
          ...prevState,
          [key]: pokemon,
        }
      })
    }
    return (
      <PokemonContext.Provider value={{
        pokemon: selectedPokemons,
        onSelectedPokemons: handlePokeSelected
      }}>
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
      </PokemonContext.Provider>
    );
};

export default GamePage;
