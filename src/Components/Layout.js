import s from "../static/css/Layout.module.css"
import cn from "classnames";

const Layout = ({title, descr, urlBg, colorBg, children}) => {
  let backgr = {}
  if (urlBg && !colorBg) { backgr = {backgroundImage: `url(${urlBg})` }}
  else if (urlBg && colorBg) {  backgr = {background: "#009a63 " + `url(${urlBg})` + " center no-repeat" }}
  else { backgr = {backgroundColor: colorBg} }
  return (
    <section style={backgr} class={s.root}>
    <div class={s.wrapper}>
        <article>
            <div class={s.title}>
                <h3>{title}</h3>
                <span class={s.separator}></span>
            </div>
            <div class={cn(s.desc, s.full)}>
                {children}
            </div>
        </article>
    </div>
    </section>
  )
}

export default Layout;
