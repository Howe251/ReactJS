import {useHistory} from 'react-router-dom';
import PokemonCard from "../../../Components/PokemonCard"
import {useState, useEffect, useContext} from 'react';

import FirebaseContext from "../../../context/firebaseContext"

import s from "./style.module.css"

import {set, ref, push, child, onValue} from "firebase/database"
import database from "../../../service/firebase"

const StartPage = () => {
  const firebase = useContext(FirebaseContext)
  const [pokeActive, setPokeActive] = useState({});
  const PokemonContext = useContext(PokemonContext);
  useEffect(() => {
    firebase.getPokemonsSocket((pokemons) => {
      setPokeActive(pokemons)
    })

    return () => firebase.offPokemonsSocket();
  }, [])

  const history = useHistory();
  const handleClickHome = () => {
    history.push("/")
  }

  const PokeClick = (key) => {
    setPokeActive(prevState => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      }
    }))
  }

  return (
    <>
    <button>
      Начать игру
    </button>
    <div onClick={PokeClick} className={s.flex}>
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
      onClickCard={() => PokeClick(key)}/>)}
    </div>
    <div>
      <p>Это страница игры!!!</p>
    </div>
    <button onClick={handleClickHome}>
      Домой
    </button>
    </>
  )
}

export default StartPage;
