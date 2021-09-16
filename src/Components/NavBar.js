import s from "../static/css/NavBar.module.css"
import cn from "classnames";
import {useState} from 'react';

const NavBar = ({onClickMenu, isActive}) => {
  const clickHandler = () => {
    console.log('####: <Menu/>');
    onClickMenu && onClickMenu();
  }
  return (
    <nav class={s.root}>
      <div class={s.navWrapper}>
        <p class={s.brand}>
          LOGO
        </p>
        <a onClick={clickHandler} class={cn(s.menuButton, {[s.active]: isActive})}>
          <span />
        </a>
      </div>
    </nav>);
}

export default NavBar;
