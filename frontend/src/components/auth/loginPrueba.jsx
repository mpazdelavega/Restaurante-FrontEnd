import React from 'react'

const loginPrueba = () => {
  return (
    <div className="register min-h-screen bg-[#F2F4FE] flex items-center justify-center p-4">
      <div className="max-w-lg">
        <div className="flex justify-center mb-8">
        </div>
        <div className="bg-stone-700 w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h1 className="text-xl text-white">Bienvenido</h1>
            <p className="text-gray-300 text-sm">
              Ingresa con tu correo electrónico y tu contraseña
            </p>
          </div>
          <form className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="email"
                className="w-full border py-2 px-10 rounded-md outline-none"
                placeholder="Ingresa tu correo"
                
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
            <div className="relative">
              <input
                type="password"
                className="w-full border py-2 px-10 rounded-md outline-none"
                placeholder="Ingresa tu contraseña"
                
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
            <p className='text-red-600 text-xs italic'></p>
            <div>
              <button
                type="submit"
                
                className="w-full bg-amber-900 py-2 px-4 text-white rounded-md hover:bg-amber-600 transition-colors"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
        <span className="text-white flex items-center justify-center gap-2">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-amber-600">
            Registrate aquí
          </a>
        </span>
      </div>
    </div>
  )
}

export default loginPrueba