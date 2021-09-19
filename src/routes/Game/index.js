import {useHistory} from 'react-router-dom';
import PokemonCard from "../../Components/PokemonCard"
import {useState, useEffect} from 'react';

import s from "./style.module.css"

import {set, ref, push, child, onValue} from "firebase/database"
import database from "../../service/firebase"

const GamePage = () => {
  const [pokeActive, setPokeActive] = useState({});

  useEffect(() => {
    const pok = ref(database, "pokemons")
    onValue(pok, (snapshot) => {
      setPokeActive(snapshot.val());
    });
  }, [])

  const history = useHistory();
  const handleClickHome = () => {
    history.push("/")
  }
  
  const handleClickAddNew = () => {
    const Poke = Object.entries(pokeActive)
    const PokeToSave = Poke[1]
    console.log(PokeToSave)
    const newID = Math.floor(Math.random() * PokeToSave[1].id)
    let i = 0
    //Проверка на отсутствие одинаковых id
    console.log(newID)
    while (i < Poke.length){
      if (newID === Poke[i][1].id) {
        const newID = Math.floor(Math.random() * (PokeToSave[1].id));
        console.log(newID)
        i = 0;
        console.log("совпадение");
      }
      i++
    }
    // Генерация ключа через firebase
    const newKey = push(child(ref(database, 'pokemons/'), "pokemons")).key;
    console.log(newKey)
    PokeToSave[0] = newKey
    PokeToSave[1].id = newID
    console.log(PokeToSave)
    // Отправка данных в DB
    set(ref(database, 'pokemons/' + PokeToSave[0]), {
      ...PokeToSave[1]
    });
  }

  const PokeClick = (id) => {
    setPokeActive(prevState => {
    return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = {...item[1]};
        if (pokemon.id === id) {
            pokemon.active = !pokemon.active;
            set(ref(database, 'pokemons/' + item[0]), {
              ...item[1],
              active: pokemon.active
            });
        };

        acc[item[0]] = pokemon;
        return acc;
    }, {});
  });
  }

  return (
    <>
    <button onClick={handleClickAddNew}>
      Добавить покемона
    </button>
    <div onClick={PokeClick} className={s.flex}>
    {Object.entries(pokeActive).map(([key, {id, name, values, img, type, active}]) => <PokemonCard
      key={key}
      name={name}
      values={values}
      img={img}
      id={id}
      type={type}
      isActive={active}
      onClickCard={PokeClick}/>)}
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

export default GamePage;
