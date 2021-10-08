import HomePage from './routes/Home'
import GamePage from './routes/Game'
import About from './routes/About'
import Contact from './routes/Contact'
import NotFound from './routes/NotFound'
import User from './routes/User'
import MenuHeader from './Components/MenuHeader'
import Footer from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import {useLocation, Route, Switch, Redirect} from 'react-router-dom';
import cn from 'classnames';

import {NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css'

import s from "./App.module.css"
import {useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux'
import {getUser, selectUserLoading} from './store/user'

const App = () => {
  const isUserLoading = useSelector(selectUserLoading)
  const dispatch = useDispatch()
  const location = useLocation('/');
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';
  const [theme, setTheme] = useState('light');
  console.log("###isUserLoading", isUserLoading);
  const handlerChangeTheme = (val) => {
    setTheme(val)
  }

  useEffect(() => {
    dispatch(getUser())
  }, [])

  if (isUserLoading) {
    return "Загрузка..."
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
                <PrivateRoute path="/user" component={User}/>
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
