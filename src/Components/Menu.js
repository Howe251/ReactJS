import s from "../static/css/MenuHeader.module.css";
import cn from "classnames";

const Menu = () => {
  return (
    <div class={cn(s.menuContainer, s.active)}>
      <div class={s.overlay} />
      <div class={s.menuItems}>
        <ul>
          <li>
            <a href="#welcome">
              HOME
            </a>
          </li>
          <li>
            <a href="#game">
              GAME
            </a>
          </li>
          <li>
            <a href="#about">
              ABOUT
            </a>
          </li>
          <li>
            <a href="#contact">
              CONTACT
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
