import {useHistory} from 'react-router-dom';
import PokemonCard from "../../Components/PokemonCard"
import pokemons from "../../Components/pokemons.json";

import s from "./style.module.css"

const GamePage = () => {
  const history = useHistory();

  const handleClickButton = (page) => {
    history.push("/")
  }
  return (
    <>
    <div className = {s.flex}>
    {pokemons.map((item) => <PokemonCard  key={item.id} name={item.name} values={item.values} img={item.img} id={item.id} type={item.type} isActive={true}/>)}
    </div>
    <div>
      Это страница игры!!!
      <button onClick={handleClickButton}>
        Домой
      </button>
    </div>
    </>
  )
}

export default GamePage;
