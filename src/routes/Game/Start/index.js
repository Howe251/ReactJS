import {useHistory} from 'react-router-dom';
import PokemonCard from "../../../Components/PokemonCard"
import {useState, useEffect, useContext} from 'react';

import FirebaseContext from "../../../context/firebaseContext"
import PokemonContext from "../../../context/pokemonContext"

import s from "./style.module.css"

import database from "../../../service/firebase"

const StartPage = () => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext)
  const pokemonContext = useContext(PokemonContext)
  const [pokeActive, setPokeActive] = useState({});

  useEffect(() => {
    firebase.getPokemonsSocket((pokemons) => {
      setPokeActive(pokemons)
    })
    return () => firebase.offPokemonsSocket();
  }, [])

  const handleClickHome = () => {
    history.push("/")
  }

  const handleClickStart = () => {
    history.push("/game/board")
  }

  const PokeClick = (key) => {
    const pokemon = {...pokeActive[key]}
    pokemonContext.onSelectedPokemons(key, pokemon)

    setPokeActive((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      }
    }))
  }

  return (
    <>
    <div className={s.buttonWrap}>
      <button
        onClick={handleClickStart}
        disabled={Object.keys(pokemonContext.pokemon).length < 5}>
        Начать игру
      </button>
    </div>
    <div onClick={() => PokeClick} className={s.flex}>
    {Object.entries(pokeActive).map(([key, {id, name, values, img, type, selected}]) => <PokemonCard
      className={s.card}
      key={key}
      name={name}
      values={values}
      img={img}
      id={id}
      type={type}
      isSelected={selected}
      isActive={true}
      onClickCard={() => {
        if (Object.keys(pokemonContext.pokemon).length < 5 || selected) {
            PokeClick(key)
        }
      }}/>)}
    </div>
    <button onClick={handleClickHome}>
      Домой
    </button>
    </>
  )
}

export default StartPage;
