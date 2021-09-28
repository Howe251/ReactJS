import s from "../static/css/Header.module.css";
import {useHistory} from 'react-router-dom';

import {useSelector, useDispatch} from 'react-redux'
import {plusAction, selectCount} from '../store/counter'

const Header = ({title, desc}) => {

  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  console.log("### count", count);

  const history = useHistory();

  const handleClick = () => {
    history.push("/game")
    //dispatch(plusAction(1))
  }
  return (
    <header class={s.root}>
    <div class={s.forest}></div>
    <div class={s.silhouette}></div>
    <div class={s.moon}></div>
    <div class={s.container}>
        <h1>{title}</h1>
        <p>{desc}</p>
        <button onClick={handleClick}>
          Начать игру
        </button>
    </div>
</header>);
}

export default Header;
