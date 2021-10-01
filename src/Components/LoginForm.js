import {useState} from 'react'
import Input from "./Input"

import s from '../static/css/LoginForm.module.css'

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [login, setLogin] = useState(false)
  const [title, setTitle] = useState('Register?')
  const [buttonTitle, setButtonTitle] = useState('SignIn')

  const handleRegisterClick = () => {
    setLogin(prevState => !prevState)
    setTitle(prevState => login ? "Register?" : "Login?" )
    setButtonTitle(prevState => login ? "SignIn" : "SignUp" )
    console.log("click");
  }

  const handleSubmit = (event) => {
      event.preventDefault()
      onSubmit && onSubmit({
        email,
        pass,
        login
      })
      setEmail('');
      setPass('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        value={email}
        type="text"
        name="email"
        onChange={setEmail}
      />
      <Input
        label="Password"
        value={pass}
        type="password"
        name="password"
        onChange={setPass}
      />
      <div>
        <button className={s.button}>
          {buttonTitle}
        </button>
        <a
          onClick={handleRegisterClick}
          className={s.block}
        >{title}
        </a>
      </div>
    </form>

  )
}

export default LoginForm;
