import background from "../static/img/bg2.jpg"

const Layout = ({title, descr, urlBg = false, colorBg}) => {
  const backgr = urlBg ? {backgroundImage: `url(${urlBg})`} : {backgroundColor: colorBg};
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
