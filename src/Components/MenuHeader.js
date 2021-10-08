import Menu from "./Menu.js"
import NavBar from "./NavBar.js"
import Modal from "../Modal"
import LoginForm from './LoginForm.js'

import {useState} from 'react';
import {useDispatch} from 'react-redux'
import {getUser, getUserUpdate} from '../store/user'
import {NotificationManager} from 'react-notifications';

const loginSignUp = async ({email, pass, type}) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      email,
      password: pass,
      returnSecurityToken: true
    })
  }
  switch (type) {
    case 'signUp':
      return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8jE0Z93s83gbTHSAbAsIDqO18VLTNFmM', requestOptions).then(res => res.json())
    case 'login':
      return await await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8jE0Z93s83gbTHSAbAsIDqO18VLTNFmM', requestOptions).then(res => res.json())
    default:
      return "I cant login user"
  }
}

const MenuHeader = ({bgActive}) =>{
  const [isActive, setActive] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);

  const dispatch = useDispatch()

  const handleClick = (isActive) => {
    setActive(prevState => !prevState);
  }
  const LoginClick = () => {
    setOpenModal(prevState => !prevState)
  }

  const handleSubmitLoginForm = async (props) => {
      const response = await loginSignUp(props)
      if (response.hasOwnProperty('error')) {
        NotificationManager.error(response.error.message, 'Ошибка!')
      } else {
        localStorage.setItem('idToken', response.idToken)
        if (props.type === 'signUp') {
          const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json())
          console.log("StarterPack", pokemonsStart);
          for (const item of pokemonsStart.data) {
            await fetch(`https://pokemon-game-7d576-default-rtdb.europe-west1.firebasedatabase.app/${response.localId}/pokemons.json?auth=${response.idToken}`, {
              method: 'POST',
              body: JSON.stringify(item)
            })
          }
          NotificationManager.success('Аккаунт создан')
          dispatch(getUserUpdate())
        } else {
          NotificationManager.success('Успешная авторизация')
          dispatch(getUserUpdate())
        }
    setOpenModal(false)
    }
}
return (
  <>
    <Menu
      onClickMenu={handleClick}
      menuClicked={isActive}
    />
    <NavBar
      bgActive={bgActive}
      onClickMenu={handleClick}
      isActive={isActive}
      onClickLogin={LoginClick}
    />
    <Modal
      isOpen={isOpenModal}
      title="Login"
      onCloseModal={LoginClick}>
      <LoginForm
          isResetFiled={!isOpenModal}
          onSubmit={handleSubmitLoginForm}
      />
    </Modal>
  </>
)
}
export default MenuHeader;
