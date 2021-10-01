import HomePage from './routes/Home'
import GamePage from './routes/Game'
import About from './routes/About'
import Contact from './routes/Contact'
import NotFound from './routes/NotFound'
import MenuHeader from './Components/MenuHeader'
import Footer from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import {useLocation, Route, Switch, Redirect} from 'react-router-dom';
import cn from 'classnames';

import {NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css'

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
    <>
      <Switch>
        <Route path="/404" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding}/>
            <div className={cn(s.wrap, {[s.isHomePage]: isPadding})}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={About}/>
                <PrivateRoute path="/contact" component={Contact}/>
                <Route render={() => (
                  <Redirect to="/404"/>
                )}/>
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </>
  )
}

export default App;
