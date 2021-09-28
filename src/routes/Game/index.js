import {useRouteMatch, Switch, Route} from 'react-router-dom'
import {useState} from "react"
import StartPage from "./Start"
import BoardPage from "./Board"
import FinishPage from "./Finish"


const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({})
    const [player2Cards, setPlayer2Cards] = useState([])
    const [win, setWin] = useState(false)
    const [turn, setTurn] = useState(1)
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

    const clearContextPoke = () => {
      return setSelectedPokemons({})
    }

    const getPlayer2Cards = (player2) => {
      console.log("### pl2", player2);
      return setPlayer2Cards(prevState => prevState = [...player2])
    }

    return (
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
    );
};

export default GamePage;
