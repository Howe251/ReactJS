import background from "../static/img/bg2.jpg"

const Layout = ({title, descr, urlBg, colorBg}) => {
  let backgr = {}
  if (urlBg && !colorBg) { backgr = {backgroundImage: `url(${urlBg})` }}
  else if (urlBg && colorBg) {  backgr = {background: "#009a63 " + `url(${urlBg})` + " center no-repeat" }}
  else { backgr = {backgroundColor: colorBg} }
  return (
    <section style={backgr} class="root">
    <div class="wrapper">
        <article>
            <div class="title">
                <h3>{title}</h3>
                <span class="separator"></span>
            </div>
            <div class="desc full">
                <p>{descr}</p>
            </div>
        </article>
    </div>
    </section>
  )
}

export default Layout;
