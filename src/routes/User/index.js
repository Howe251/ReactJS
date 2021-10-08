import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {selectUser, removeUser} from '../../store/user'
import s from './style.module.css';

const User = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const date = new Date(+user.createdAt)

  const exitClickHandler = () => {
    localStorage.removeItem('idToken')
    dispatch(removeUser())
    history.replace('/')
  }
  return (
    <div className={s.root}>
      <p>email: {user.email}</p>
      <p>Дата регистрации: {date.toString()}</p>
      <button onClick={exitClickHandler}>
        Выход
      </button>
    </div>
  )
}

export default User;
