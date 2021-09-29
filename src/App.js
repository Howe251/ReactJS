import HomePage from './routes/Home'
import GamePage from './routes/Game'
import About from './routes/About'
import Contact from './routes/Contact'
import NotFound from './routes/NotFound'
import MenuHeader from './Components/MenuHeader'
import Footer from './Components/Footer'
import {useLocation, Route, Switch, Redirect} from 'react-router-dom';
import cn from 'classnames';

import s from "./App.module.css"
import FirebaseClass from "./service/firebase"
import {useState} from 'react';

const App = () => {
  const location = useLocation('/');
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';
  const [theme, setTheme] = useState('light');

  const handlerChangeTheme = (val) => {
    setTheme(val)
  }

  return(
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding}/>
            <div className={cn(s.wrap, {[s.isHomePage]: isPadding})}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" component={HomePage} />
                <Route path="/game" component={GamePage} />
                <Route path="/about" component={About}/>
                <Route path="/contact" component={Contact}/>
                <Route render={() => (
                  <Redirect to="/404"/>
                )}/>
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
  )
}

export default App;
