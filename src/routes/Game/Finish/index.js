import FirebaseContext from "../../../context/firebaseContext"
import PokemonContext from "../../../context/pokemonContext"
import {useContext, useEffect, useState} from 'react';
import s from "./style.module.css"
import PokemonCard from "../../../Components/PokemonCard"

const FinishPage = () => {
  const {pokemon, cardsPlayer2} = useContext(PokemonContext)
  console.log("### player1", pokemon)
  console.log("### player2", cardsPlayer2)
  console.log(pokemon);
  return (
    <>
    <h1>Твои карты</h1>
    <div className={s.flex}>
    {Object.values(pokemon).map(item =>
      <PokemonCard
        key={item.id}
        name={item.name}
        values={item.values}
        img={item.img}
        id={item.id}
        type={item.type}
        minimize
        isActive
        />)}
    </div>
    <h1>Карты противника</h1>
    <div className={s.flex}>
    {cardsPlayer2.map(item =>
      <PokemonCard
        className={s.card}
        key={item.id}
        name={item.name}
        values={item.values}
        img={item.img}
        id={item.id}
        type={item.type}
        minimize
        isActive
        />)}
    </div>
    <button>
      Закончить игру
    </button>
    </>
  )
}

export default FinishPage;
