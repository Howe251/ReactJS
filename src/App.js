import {useState} from 'react';
import HomePage from './routes/Home'
import GamePage from './routes/Game'

const App = () => {
  const [page, setPage] = useState('app');

  const handleChangePage = (page) => {
    console.log('####: <App />');
    setPage(page)
  }

  switch (page) {
    case "app":
      return <HomePage onChangePage={handleChangePage}/>
      break;
    case "game":
      return <GamePage />
      break;
    default:
      return <HomePage />
  }
  return (
    <div>

    </div>
  )
}

export default App;
