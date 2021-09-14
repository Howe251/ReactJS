import s from "../static/css/Header.module.css"

const Header = ({title, desc}) => {
  return (<header class={s.root}>
    <div class={s.forest}></div>
    <div class={s.container}>
        <h1>{title}</h1>
        <p>{desc}</p>
    </div>
</header>);
}

export default Header;
