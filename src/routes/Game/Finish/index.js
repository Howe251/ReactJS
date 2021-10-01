import {useHistory} from 'react-router-dom';

import {useState, useEffect} from 'react';
import s from "./style.module.css"

import PokemonCard from "../../../Components/PokemonCard"

import {useSelector, useDispatch} from 'react-redux'
import {selectedPokemons, getWin, clearSelectedPokemons} from '../../../store/pokemons'
import {selectPl2Data, postPokemon} from '../../../store/player2Cards'

let cardTosave = []

const FinishPage = () => {
  const history = useHistory();

  const dispatch = useDispatch()
  const chosenPokemons = useSelector(selectedPokemons)
  const cardsPlayer2 = useSelector(selectPl2Data)
  const [cdsPlayer2, setCdsPlayer2] = useState(
    cardsPlayer2.map((item) => ({ ...item, selected: false }))
  )
  const win = useSelector(getWin)

  const PokeClick = (id) => {
    const copyPlayer2Cards = [...cdsPlayer2]
    copyPlayer2Cards.forEach(item => {
       item.selected = false
       if (item.id === id) {
         cardTosave = item
         item.selected = !item.selected
       }
     })
     setCdsPlayer2(prevState => prevState = [...copyPlayer2Cards])
  }

  const handleClickButton = () => {
    console.log(win);
    if (win && cardTosave.id != null) {
      cardTosave.selected = false
      console.log("cardTosave", cardTosave);
      dispatch(postPokemon(cardTosave))
      dispatch(clearSelectedPokemons())
      history.push("/game")
    }
    else if (win && cardTosave.id == null) {
      alert("Выберите карту")
    }
    else if (!win) {
      alert("К сожалению Вы проиграли. Попробуйте еще раз")
      dispatch(clearSelectedPokemons())
      history.push("/game")
    }
  }
  console.log(cardsPlayer2.length);
  if (!cardsPlayer2.length) {
    history.replace('/game')
  }
  return (
    <>
    <h1>Твои карты</h1>
    <div className={s.flex}>
    {
      Object.values(chosenPokemons).map(item => <PokemonCard
        key={item.id}
        name={item.name}
        values={item.values}
        img={item.img}
        id={item.id}
        type={item.type}
        isActive
        />
      )
    }
    </div>
    <h1>Карты противника</h1>
    <div className={s.flex}>
    {
      Object.values(cdsPlayer2).map(item => <PokemonCard
        className={s.card}
        key={item.id}
        name={item.name}
        values={item.values}
        img={item.img}
        id={item.id}
        type={item.type}
        isSelected={item.selected}
        onClickCard={() => PokeClick(item.id)}
        isActive
        />
      )
    }
    </div>
    <button onClick={handleClickButton}>
      Закончить игру
    </button>
    </>
  )
}

export default FinishPage;
