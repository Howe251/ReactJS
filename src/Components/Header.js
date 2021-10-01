import s from "../static/css/Header.module.css";
import {useHistory} from 'react-router-dom';

const Header = ({title, desc}) => {

  const history = useHistory();

  const handleClick = () => {
    history.push("/game")
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
