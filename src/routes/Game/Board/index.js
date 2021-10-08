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
import request from '../../../service/request'

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
  const history = useHistory();
  const chosenPokemons = useSelector(selectedPokemons)

  if (Object.keys(chosenPokemons).length === 0) {
    history.replace('/game')
  }

  const win = useSelector(getWin)
  const turn = useSelector(getTurn)
  const dispatch = useDispatch()

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
  const [serverBoard, setServerBoard] = useState([0,0,0,0,0,0,0,0,0])

  useEffect( async () => {
    if (turn == 2 && steps == 0) {
      const params = {
        currentPlayer: 'p2',
        hands: {
          p1: player1,
          p2: player2,
        },
        move: null,
        board: serverBoard,
      }
      const game = await request.game(params)
      //setBoard(returnBoard(game.oldBoard))
      console.log("###game1", game);

      if (game.move != null) {
        const idAi = game.move.poke.id;

        setTimeout(() => {
          setPlayer2(prevState => prevState.map(item => {
            if (item.id == idAi) {
              return  {
                ...item,
                selected: true,
              }
            }
            return item
          }));
        }, 1000)

        setTimeout(() => {
          setPlayer2(() => game.hands.p2.pokes.map(item => item.poke))
          setServerBoard(game.board)
          setBoard(returnBoard(game.board))
          dispatch(setTurn(1))
          setSteps(prevState => {
            const count = prevState + 1
            return count
          })
        }, 1500)
      }
    }
  }, [turn])

  useEffect(() => {
    async function fetchData() {
    const boardRequest = await request.getBoard()
    setBoard(boardRequest.data)
    console.log("###sel", chosenPokemons);
    const player2Request = await request.gameStart({
      pokemons: Object.values(chosenPokemons),
    })
    dispatch(addPL2Pokemons(player2Request.data))
    setPlayer2(() => {
      return player2Request.data.map(item => ({
        ...item,
        possession: 'red',
      }))
    })

     setTimeout(() => {
       dispatch(setTurn(Math.round(Math.random()*(2-1)+1)))
     }, 2000)
  }
  fetchData();
  }, [])

  const setSelectedCard = (card) => {
    setChosenCard(card)
    setPlayer1(prevState => prevState.map(item => {
      item.selected=false
      if (item.id == card.id) {
        return  {
          ...item,
          selected: !prevState.selected
        }
      }
      return item
    }));
  }

  const returnBoard = (board) => {
    return board.map((item, index) => {
      let card = null
      if (typeof item === 'object') {
        card = {
          ...item.poke,
          possession: item.holder === 'p1' ? 'blue' : 'red',
        }
      }
      return {
        position: index + 1,
        card,
      }
    })
  }

  const handleClickBoardPlate = async (position) => {
    if (chosenCard) {
      const params = {
        currentPlayer: 'p1',
        hands: {
          p1: player1,
          p2: player2,
        },
        move: {
          poke: {
            ...chosenCard,
          },
          position,
        },
        board: serverBoard,
      }

      if (chosenCard.player === 1) {
        setPlayer1(prevState => prevState.filter(item => item.id !== chosenCard.id));
        setChosenCard(null)
        dispatch(setTurn(2))
        setSteps(prevState => {
          const count = prevState + 1
          return count
        })
      }

      setBoard(prevState => prevState.map(item => {
        if (item.position === position) {
          return {
            ...item,
            card: chosenCard,
          }
        }

        return item
      }))

      const game = await request.game(params)
      setBoard(returnBoard(game.oldBoard))

      if (game.move != null) {
        const idAi = game.move.poke.id;

        setTimeout(() => {
          setPlayer2(prevState => prevState.map(item => {
            if (item.id == idAi) {
              return  {
                ...item,
                selected: true,
              }
            }
            return item
          }));
        }, 1000)

        setTimeout(() => {
          setPlayer2(() => game.hands.p2.pokes.map(item => item.poke))
          setServerBoard(game.board)
          setBoard(returnBoard(game.board))
          dispatch(setTurn(1))
          setSteps(prevState => {
            const count = prevState + 1
            return count
          })
        }, 1500)
      }
    }
  }

  useEffect(() => {
    if (steps === 9){
      const [count1, count2] = countWin(board, player1, player2)
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


    return (
        <div className={s.root}>
          <Result type={result} />
          <ArrowChoice side={turn} />
						<div className={s.playerOne}>
              <PlayerBoard
                player={1}
                cards={player1}
                onClickCard={(card) => setSelectedCard(card)}
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
              />
						</div>
        </div>
    );
};

export default BoardPage;
