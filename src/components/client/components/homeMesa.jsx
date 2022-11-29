import React from 'react'

const homeMesa = () => {
  return (
    <div className='max-w-[1640px] mx-auto p-4'>
        <div className='max-h-[500px] relative'>
            {/* Overlay */}
            <div className='absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center'>
                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>Reserva <span className='text-amber-600'>Tu</span></h1>
                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'> <span className='text-amber-600'>Mesa</span> Aquí</h1>
            </div>
            <img className='w-full max-h-[500px] object-cover' src="https://img.freepik.com/foto-gratis/salon-restaurante-mucha-mesa_140725-6309.jpg?w=2000" alt="/" />
        </div>
    </div>
  )
}

export default homeMesa