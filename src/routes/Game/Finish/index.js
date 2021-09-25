import FirebaseContext from "../../../context/firebaseContext"
import PokemonContext from "../../../context/pokemonContext"

import {useHistory} from 'react-router-dom';

import {useContext, useState} from 'react';
import s from "./style.module.css"

import PokemonCard from "../../../Components/PokemonCard"

let cardTosave = []

const FinishPage = () => {
  const history = useHistory();
  const {pokemon, cardsPlayer2, win, clearContext} = useContext(PokemonContext)
  const firebase = useContext(FirebaseContext)
  const [cdsPlayer2, setCdsPlayer2] = useState(cardsPlayer2)

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
      cardTosave["selected"] = false
      firebase.addPokemon(cardTosave)
    }
    else if (!win) {
      alert("К сожалению Вы проиграли. Попробуйте еще раз")
    }
    clearContext()
    history.push("/game")
  }

  if (cardsPlayer2.length === 0) {
    history.replace('/game')
  }
  console.log("cdsPlayer22", cdsPlayer2);
  return (
    <>
    <h1>Твои карты</h1>
    <div className={s.flex}>
    {
      Object.values(pokemon).map(item => <PokemonCard
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
      cdsPlayer2.map(item => <PokemonCard
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
