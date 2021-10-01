import Menu from "./Menu.js"
import NavBar from "./NavBar.js"
import Modal from "../Modal"
import LoginForm from './LoginForm.js'

import {useState} from 'react';
import {NotificationManager} from 'react-notifications';


const MenuHeader = ({bgActive}) =>{
  const [isActive, setActive] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const handleClick = (isActive) => {
    setActive(prevState => !prevState);
  }
  const LoginClick = () => {
    setOpenModal(prevState => !prevState)
  }

  const handleSubmitLoginForm = async ({email, pass, login}) => {
    if (login) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          email,
          password: pass,
          returnSecurityToken: true
        })
      }
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA8jE0Z93s83gbTHSAbAsIDqO18VLTNFmM', requestOptions).then(res => res.json())
      console.log(response);
      if (response.hasOwnProperty('error')) {
        NotificationManager.error(response.error.message, 'Ошибка!')
      } else {
        localStorage.setItem('idToken', response.idToken)
        NotificationManager.success('Аккаунт создан')
    }
  }
  else {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email,
        password: pass,
      })
    }
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8jE0Z93s83gbTHSAbAsIDqO18VLTNFmM', requestOptions).then(res => res.json())
    console.log(response);
    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'Ошибка!')
    } else {
      localStorage.setItem('idToken', response.idToken)
      NotificationManager.success('Успешная авторизация')
      setOpenModal(false)
    }
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
          onSubmit={handleSubmitLoginForm}
      />
    </Modal>
  </>
)
}
export default MenuHeader;
