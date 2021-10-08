import s from "../static/css/NavBar.module.css"
import cn from "classnames";

import {useSelector} from 'react-redux'
import {selectUserLoading, selectLocalID} from '../store/user'
import {Link} from 'react-router-dom'

import {ReactComponent as LoginSVG} from "../static/img/login.svg"
import {ReactComponent as LogoSVG} from "../static/img/logo.svg"
import {ReactComponent as UserSVG} from "../static/img/user.svg"

const NavBar = ({onClickMenu, isActive, bgActive, onClickLogin}) => {
  const isLoadingUser = useSelector(selectUserLoading)
  const localId = useSelector(selectLocalID)
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
          { (!isLoadingUser && !localId) && (
            <div
              className={s.loginWrap}
              onClick={onClickLogin}>
              <LoginSVG />
            </div>
          )}
          {(!isLoadingUser && localId) && (
            <Link
              className={s.loginWrap}
              to="/user"
            >
              <UserSVG />
            </Link>
          )}
          <div onClick={clickHandler} className={cn(s.menuButton, {[s.active]: isActive})}>
            <span />
          </div>
        </div>
      </div>
    </nav>);
}

export default NavBar;
