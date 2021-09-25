import s from './style.module.css';
import PokemonContext from "../../../context/pokemonContext"
import PokemonCard from "../../../Components/PokemonCard"
import PlayerBoard from "./component/playerBoard"
import {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom'

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
  const pokemons = useContext(PokemonContext)

  const [board, setBoard] = useState([])
  const [player1, setPlayer1] = useState(() => {
    return Object.values(pokemons["pokemon"]).map(item => ({
      ...item,
      possession: 'blue',
    }))
  })
  const [player2, setPlayer2] = useState([])
  const [chosenCard, setChosenCard] = useState(null)
  const [steps, setSteps] = useState(0)
  const history = useHistory();


  useEffect(async () => {
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
    
  }, [])

  console.log(board)

  const handleClickBoardPlate = async (position) => {
    console.log("### position", position)
    console.log("### card", chosenCard);
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
      }

      if (chosenCard.player === 2) {
        console.log("### pl2 cards", player2);
        if (player2.length === 5) {
            pokemons.onSetPlayer2(player2)
        }
        setPlayer2(prevState => prevState.filter(item => item.id !== chosenCard.id));
      }

      setBoard(request.data)

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
        alert("ПОБЕДА")
        pokemons.onSetWin(true)
      } else if (count1 < count2) {
        alert("ПРОИГРЫШ")
      } else {
        alert("НИЧЬЯ")
      }
      history.push('/game/finish')
    }
  }, [steps])

  //if (Object.keys(pokemons["pokemon"]).length === 0) {
    //history.replace('/game')
  //}
    return (
        <div className={s.root}>
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
