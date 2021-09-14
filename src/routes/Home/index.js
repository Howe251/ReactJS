import Header from "../../Components/Header.js";
import Layout from "../../Components/Layout.js";
import Footer from "../../Components/Footer.js";
import MenuHeader from "../../Components/MenuHeader.js";
import PokemonCard from '../../Components/PokemonCard.js';

import bg1 from "../../static/img/bg1.jpg";
import bg3 from "../../static/img/bg3.jpg";

import pokemons from "../../Components/pokemons.json";
import s from "./style.module.css"

import React from 'react';

const HomePage = ({onChangePage}) => {
  const handleClickButton = (page) => {
    console.log('####: <HomePage />');
    onChangePage && onChangePage('game');
  }
  return (
      <>
          <MenuHeader />
          <Header
            onClickButton={handleClickButton}
          />
          <Layout
            title = "Описание игры"
            urlBg = {bg1}
          >
            <p>В игре два игрока борются друг с другом, один играет за "синих", другой за "красных" на поле 3x3. У каждого игрока есть пять карт, и цель состоит в том, чтобы захватить карты противника, превратив их в свой собственный красный или синий цвет игрока. Чтобы выиграть, большинство из десяти сыгранных карт (включая одну карту, которая не помещена на доску) должны быть цвета карты игрока. Для этого игрок должен захватить карты, поместив карту рядом с картой противника, после чего будут сравниваться стороны, где соприкасаются две карты. Если ранг карты противника выше, чем у карты игрока, карта игрока будет захвачена и превращена в цвет противника. Если ранг игрока выше, карта противника будет захвачена и изменена на цвет игрока.</p>
          </Layout>
          <Layout
            id = "cards"
            title = "Карточки Покемонов"
            colorTitle = "#FEFEFE"
            colorBg = "#e2e2e2"
          >
                <div className = "flex">
                    { pokemons.map((item) => <PokemonCard key={item.id} name={item.name} values={item.values} img={item.img} id={item.id} type={item.type} />)}
                </div>
          </Layout>
          <Layout
          title = "Тут Покемоны могут отдохнуть"
          urlBg = {bg3}
          colorBg = "#e2e2e2"
          />
          <Footer/>
      </>
    )
}

export default HomePage;
