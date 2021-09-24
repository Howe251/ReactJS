import PokemonCard from "../../../../../Components/PokemonCard"
import cn from "classnames"
import {useState} from "react"
import s from "./style.module.css"

const PlayerBoard = ({ player, cards, onClickCard }) => {
  const [selected, setSelected] = useState(null)
  return (
    <>
    {
      cards.map((item) => (
        <div
        className={cn(s.cardBoard, {
          [s.selected]: selected === item.id
        })}
        onClick={() => {
          setSelected(item.id);
          onClickCard && onClickCard({
            player,
            ...item
          });
        }}
        >
          <PokemonCard
          key={item.id}
          name={item.name}
          values={item.values}
          img={item.img}
          id={item.id}
          type={item.type}
          minimize
          isActive
          />
        </div>
    ))
    }
    </>
  )
}

export default PlayerBoard;
