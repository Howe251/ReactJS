import {useState} from 'react'
import s from "../static/css/Input.module.css"

const Input = ({ onSubmit, onChange, label, value, type, name }) => {

  return (
      <div className={s.root}>
          <input
            value={value}
            name={name}
            type={type}
            className={s.input}
            onChange={(event) => onChange(event.target.value)}
            required/>
          <span className={s.highlight}></span>
          <span className={s.bar}></span>
          <label className={s.label}>{label}</label>
      </div>
  )
}

export default Input;
