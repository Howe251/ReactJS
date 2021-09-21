import {useHistory} from 'react-router-dom';
import PokemonCard from "../../Components/PokemonCard"
import pokemons from "../../Components/pokemons.json";
import {useState} from 'react';

import s from "./style.module.css"
const newPokemons = pokemons.map(item => ({...item}))

const GamePage = () => {
  const history = useHistory();
  const handleClickButton = (page) => {
    history.push("/")
  }
  const [pokeActive, setPokeActive] = useState(newPokemons);

  const PokeClick = (id) => {
    setPokeActive(newPokemons.map(item => {
        if (item.id === id){
          item.active = !item.active;
        }
        return item;
      }))}
  return (
    <>
    <div onClick={PokeClick} className={s.flex}>
    {newPokemons.map((item) => <PokemonCard
      key={item.id}
      name={item.name}
      values={item.values}
      img={item.img}
      id={item.id}
      type={item.type}
      isActive={item.active}
      onClickCard={PokeClick}/>)}
    </div>
    <div>
      <p>Это страница игры!!!</p>
      <button onClick={handleClickButton}>
        Домой
      </button>
    </div>
    </>
  )
}

export default GamePage;
