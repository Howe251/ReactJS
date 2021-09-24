import s from "../static/css/Menu.module.css";
import cn from "classnames";
import {Link} from 'react-router-dom'

const Menu = ({onClickMenu, menuClicked}) => {
  const MENU = [{"title": "Home","to": "/"},
                {"title": "Game","to": "/game"},
                {"title": "About","to": "/about"},
                {"title": "Contact","to": "/contact"}]

  const clickHandler = () => {
    onClickMenu && onClickMenu();
  }
  return (
    <div class={cn(s.menuContainer, {[s.active]: menuClicked === true, [s.deactive]: menuClicked === false})}>
      <div class={s.overlay} />
      <div class={s.menuItems}>
        <ul>
          {
            MENU.map(({title, to}, index) => (
              <li key={index}>
                <Link onClick={clickHandler} to={to}>
                  {title}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Menu;
