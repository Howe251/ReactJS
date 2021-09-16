import s from "../static/css/Header.module.css"

const Header = ({title, desc, onClickButton}) => {
  const handleClick = () => {
    console.log('####: <Header/>');
    onClickButton && onClickButton();
  }
  return (
    <header class={s.root}>
    <div class={s.forest}></div>
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
