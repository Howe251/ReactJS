import s from './style.module.css';
import PokemonCard from "../../../Components/PokemonCard"
import PlayerBoard from "./component/playerBoard"
import Result from './component/Result'
import ArrowChoice from './component/ArrowChoice'
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux'
import {getPokemonsAsync, selectPokemonsData, selectPokemonsLoading, setTurn, getTurn, selectedPokemons, getWin, setWin} from '../../../store/pokemons'
import {addPL2Pokemons, selectPl2Data} from '../../../store/player2Cards'

const countWin = (board, player1, player2) => {
  let player1Count = player1.length;
  let player2Count = player2.length;

  board.forEach(item => {
    if (item.card.possession === 'red') {
      player2Count++;
    }
    if (item.card.possession === 'blue') {
      player1Count++;
    }
  });
  return [player1Count, player2Count];
}

const BoardPage = () => {
  const chosenPokemons = useSelector(selectedPokemons)
  const win = useSelector(getWin)
  const turn = useSelector(getTurn)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTurn(Math.round(Math.random()*(2-1)+1)))
  }, [])

  const [board, setBoard] = useState([])
  const [player1, setPlayer1] = useState(() => {
    return Object.values(chosenPokemons).map(item => ({
        ...item,
        possession: 'blue',
      }))
  })

  const [result, setResult] = useState(null)
  const [player2, setPlayer2] = useState([])
  const [chosenCard, setChosenCard] = useState(null)
  const [steps, setSteps] = useState(0)
  const history = useHistory();


  useEffect(() => {
    async function fetchData() {
    const boardResponse = await fetch("https://reactmarathon-api.netlify.app/api/board")
    const boardRequest = await boardResponse.json()
    setBoard(boardRequest.data)

    const player2Response = await fetch("https://reactmarathon-api.netlify.app/api/create-player")
    const player2Request = await player2Response.json()
    setPlayer2(() => {
      return player2Request.data.map(item => ({
        ...item,
        possession: 'red',
      }))
    })
  }
  fetchData();
  }, [])

  console.log(board)

  const handleClickBoardPlate = async (position) => {
    if (chosenCard) {
      const params = {
        position,
        card: chosenCard,
        board,
      }

      const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(params),
      })

      const request = await res.json();
      console.log("### request", request.data);
      if (chosenCard.player === 1) {
        setPlayer1(prevState => prevState.filter(item => item.id !== chosenCard.id));
        dispatch(setTurn(2))
      }

      if (chosenCard.player === 2) {
        if (player2.length === 5) {
            dispatch(addPL2Pokemons(player2))
        }
        setPlayer2(prevState => prevState.filter(item => item.id !== chosenCard.id));
        dispatch(setTurn(1))
      }

      setBoard(request.data)
      setChosenCard({})
      setSteps(prevState => {
        const count = prevState + 1
        return count
      })
    }
  }

  useEffect(() => {
    if (steps === 9){
      const [count1, count2] = countWin(board, player1, player2)
      console.log(count1);
      console.log(count2);
      if (count1 > count2) {
        setResult("win")
        dispatch(setWin(true))
      } else if (count1 < count2) {
        setResult("lose")
      } else {
        setResult("draw")
      }
      setTimeout(() => {  history.replace('/game/finish') }, 2000);
    }
  }, [steps])

  if (Object.keys(chosenPokemons).length === 0) {
    history.replace('/game')
  }
    return (
        <div className={s.root}>
          <Result type={result} />
          <ArrowChoice side={turn} />
						<div className={s.playerOne}>
              <PlayerBoard
                player={1}
                cards={player1}
                onClickCard={(card) => setChosenCard(card)}
              />
						</div>
            <div className={s.board}>
                {
                  board.map(item => (
                    <div
                      key={item.position}
                      className={s.boardPlate}
                      onClick={() => !item.card && handleClickBoardPlate(item.position)}
                    >
                      {
                        item.card && <PokemonCard{...item.card} isActive minimize />
                      }
                    </div>
                  ))
                }
            </div>
            <div className={s.playerTwo}>
              <PlayerBoard
                player={2}
                cards={player2}
                onClickCard={(card) => setChosenCard(card)}
              />
						</div>
        </div>
    );
};

export default BoardPage;
