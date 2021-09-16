import HomePage from './routes/Home'
import GamePage from './routes/Game'
import About from './routes/About'
import MenuHeader from './Components/MenuHeader'
import Footer from './Components/Footer'
import {useRouteMatch, Route, Switch, Redirect} from 'react-router-dom';
import cn from 'classnames';

import s from "./App.module.css"

const App = () => {
  const match = useRouteMatch('/');
  return(
      <Switch>
        <Route path="/404" render={() => (
          <h1>404 Not Found</h1>
        )} />
        <Route>
          <>
            <MenuHeader bgActive={!match.isExact}/>
            <div className={cn(s.wrap, {[s.isHomePage]: match.isExact})}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" component={HomePage} />
                <Route path="/game" component={GamePage} />
                <Route path="/about" component={About}/>
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
