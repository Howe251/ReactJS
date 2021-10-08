import {useHistory} from 'react-router-dom';
import PokemonCard from "../../../Components/PokemonCard"
import {useState, useEffect} from 'react';

import s from "./style.module.css"

import database from "../../../service/firebase"

import {useDispatch, useSelector} from 'react-redux'
import {selectedPokemons, getPokemonsAsync, selectPokemonsData, selectPokemonsLoading, setSelectedPokemons, clearSelectedPokemons, setTurn} from '../../../store/pokemons'

const StartPage = () => {
  const history = useHistory();
  const pokemonsRedux = useSelector(selectPokemonsData)
  const chosenPokemons = useSelector(selectedPokemons)
  const dispatch = useDispatch()
  const [pokeActive, setPokeActive] = useState({});

  const isLoading = useSelector(selectPokemonsLoading)
  useEffect(() => {
    dispatch(setTurn(null))
    dispatch(clearSelectedPokemons())
    dispatch(getPokemonsAsync())
  }, [])

  useEffect(() => {
    setPokeActive(pokemonsRedux)
  }, [pokemonsRedux])

  const handleClickHome = () => {
    history.push("/")
  }

  const handleClickStart = () => {
    history.push("/game/board")
  }

  const PokeClick = (key) => {
    const pokemon = {...pokeActive[key]}
    dispatch(setSelectedPokemons({key, pokemon}))

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
        disabled={Object.keys(chosenPokemons).length < 5}>
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
        if (Object.keys(chosenPokemons).length < 5 || selected) {
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
