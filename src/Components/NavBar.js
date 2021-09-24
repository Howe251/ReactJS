import s from "../static/css/NavBar.module.css"
import cn from "classnames";

const NavBar = ({onClickMenu, isActive, bgActive}) => {
  const clickHandler = () => {
    onClickMenu && onClickMenu();
  }
  return (
    <nav class={cn(s.root, {[s.bgActive]:bgActive})}>
      <div class={s.navWrapper}>
        <p class={s.brand}>
          LOGO
        </p>
        <div onClick={clickHandler} class={cn(s.menuButton, {[s.active]: isActive})}>
          <span />
        </div>
      </div>
    </nav>);
}

export default NavBar;
