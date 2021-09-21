import HomePage from './routes/Home'
import GamePage from './routes/Game'
import About from './routes/About'
import Contact from './routes/Contact'
import NotFound from './routes/NotFound'
import MenuHeader from './Components/MenuHeader'
import Footer from './Components/Footer'
import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';
import cn from 'classnames';

import s from "./App.module.css"
import {FirebaseContext} from "./context/firebaseContext";
import Firebase from "./service/firebase"
import {useState} from 'react';

const App = () => {
  const match = useRouteMatch('/');
  const [theme, setTheme] = useState('light');

  const handlerChangeTheme = (val) => {
    setTheme(val)
  }

  return(
      <FirebaseContext.Provider value={new Firebase()}>
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!match.isExact}/>
            <div className={cn(s.wrap, {[s.isHomePage]: match.isExact})}>
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
      </FirebaseContext.Provider >
  )
}

export default App;
