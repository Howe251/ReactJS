import s from "../static/css/NavBar.module.css"
import cn from "classnames";

const NavBar = () => {
  return (
    <nav class={s.root}>
      <div class={s.navWrapper}>
        <p class={s.brand}>
          LOGO
        </p>
        <a class={cn(s.menuButton, s.active)}>
          <span />
        </a>
      </div>
    </nav>);
}

export default NavBar;
