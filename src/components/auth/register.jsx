import React, { useState } from 'react'
import { submitRegister } from '../../services/auth'
import { Alert } from '@material-tailwind/react';

function Register() {

  const [registerData, setRegisterData] = useState({
    userName: "",
    nombre: "",
    apellido: "",
    password: ""
  })
  const [open, setOpen] = useState(false)
  const [wrongData, setWrongData] = useState({
    status: true,
    infoText: ''
  })
  const handleForm = e => {
    const tempData = { ...registerData }
    tempData[e.target.id] = e.target.value
    setRegisterData(tempData)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const register = () => {
    submitRegister({ registerData, setRegisterData, setWrongData, setOpen })
  }

  return (
    <div className="register min-h-screen bg-[#F2F4FE] flex items-center justify-center p-4">
      <div className="max-w-lg">
        <div className="flex justify-center mb-8"></div>
        <Alert
          show={open}
          dismissible={{
            onClose: (e) => handleClose(e),
          }}
        >
          {wrongData.infoText === 'Revise los campos e intente nuevamente' ? <p className="-mb-3 max-w-md py-4 px-6 shadow-2xl shadow-red-800 rounded-lg bg-red-600">{wrongData.infoText}</p>  : ""}
          {wrongData.infoText === 'Registro exitoso! Inicie sesión' ? <p className="-mb-3 max-w-md py-4 px-6 shadow-2xl shadow-green-800 rounded-lg bg-green-600">{wrongData.infoText}</p>  : ""}
          
        </Alert>
        
        <div className="bg-stone-700 w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h1 className="text-xl text-white">Crear cuenta</h1>
            <p className="text-gray-300 text-sm">
              Crea tu cuenta dentro de la plataforma y disfruta
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                id="nombre" 
                onChange={e => handleForm(e)} value={registerData.nombre}
                className="w-full border py-2 px-10 rounded-md outline-none"
                placeholder="Ingresa tu nombre"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-amber-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>

            <div className="relative">
              <input
                type="text"
                id="apellido" 
                onChange={e => handleForm(e)} value={registerData.apellido}
                className="w-full border py-2 px-10 rounded-md outline-none"
                placeholder="Ingrese su apellido"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-amber-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>

            <div className="relative">
              <input
                type="email"
                id="userName" 
                name='email'
                onChange={e => handleForm(e)} value={registerData.userName}
                className="w-full border py-2 px-10 rounded-md outline-none"
                placeholder="Ingrese su correo"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-amber-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>

            <div className="relative mb-[-10]">
              <input
                type="password"
                id="password" 
                onChange={e => handleForm(e)} value={registerData.password} 
                className="w-full border py-2 px-10 rounded-md outline-none"
                placeholder="Ingrese su contraseña"
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute left-2 top-[50%] -translate-y-[50%] text-amber-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>

            <div>
              <button
                //type="submit"
                className="w-full bg-amber-900 py-2 px-4 text-white rounded-md hover:bg-amber-600 transition-colors"
                onClick={() => { register() }}
              >
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
        <span className="text-white flex items-center justify-center gap-2">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-amber-600">
            Inicia sesión
          </a>
        </span>
      </div>
    </div>
  )
}

export default Register