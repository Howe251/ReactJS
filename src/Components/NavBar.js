import s from "../static/css/NavBar.module.css"
import cn from "classnames";

//import image from "../static/img/logo.png"
import {ReactComponent as LoginSVG} from "../static/img/login.svg"
import {ReactComponent as LogoSVG} from "../static/img/logo.svg"

const NavBar = ({onClickMenu, isActive, bgActive, onClickLogin}) => {
  const clickHandler = () => {
    onClickMenu && onClickMenu();
  }
  return (
    <nav class={cn(s.root, {[s.bgActive]:bgActive})}>
      <div class={s.navWrapper}>
        <p class={s.brand}>
          <LogoSVG />
        </p>
        <div className={s.loginAndMenu}>
          <div
            className={s.loginWrap}
            onClick={onClickLogin}>
            <LoginSVG />
          </div>
          <div onClick={clickHandler} className={cn(s.menuButton, {[s.active]: isActive})}>
            <span />
          </div>
        </div>
      </div>
    </nav>);
}

export default NavBar;
