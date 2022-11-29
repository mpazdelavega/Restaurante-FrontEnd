import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../../../services/auth'
import { getAllMesas, updateMesa, getAllHoras, updateHora } from '../../../services/mesa'
import { addReserva } from '../../../services/reserva';
import { deleteReservaItem, getReservaList, updateReserva } from "../../../services/reserva";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Mesa(props) {
  const [roles, setUserRole] = useState([{}])
  const [mesaList, setMesaList] = useState([])
  const [horaList, setHoraList] = useState([])
  const [listaReserva, setListaReserva] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [showProductFeedback, setProductFeedback] = React.useState({ show: false, status: false, infoText: '' })

  useEffect(() => {
    getUserDetails({ setUserRole })
    getAllMesas({ setMesaList })
    getAllHoras({ setHoraList })
    getReservaList({ setListaReserva })
    console.log(horaList)
  }, [refresh])

  const getList = () => {
    getReservaList({ setListaReserva });
  };

  const getReservas = () => {
    let reserva = '';
    let estado = '';
    let mesa = '';
    listaReserva.forEach((item) => {
      reserva = item.client.id;
      estado = item.estado_reserva;
      mesa = item.mesa.id_mesa;
    });
    if(reserva === getIdClient()){
      return estado;
    }
  };

  const getIdClient = () => {
    let clientId = '';
    listaReserva.forEach((item) => {
      clientId = item.client.id;
    });
    return clientId;
  };

  const handleOpenModal = () => setOpenModal(true)
  const closeProductFeedback = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setProductFeedback({ show: false });
  };

  const addMesa = (fechaToAdd, mesaToAdd, horaToAdd, idHoraMesa) => {
    // const horaMesa = {
    //   id_hora_mesa: idHoraMesa,
    //   estado: "OBJETO HORA MESA",
    //   hora: horaToAdd,
    // };
    
    if(horaToAdd === "Horas disponibles"){
      notifyAlerta();
    }
    else{
      addReserva({ fechaToAdd, mesaToAdd, horaToAdd, idHoraMesa });
    }
  }

  const updateEstado = (id,fecha, hora) => {
    const mesa = {
      id_mesa: id,
      estado: "Reservada",
      date: fecha,
    };
    console.log(id)
    if(hora !== "Horas disponibles"){
      updateMesa({mesa})
      notifyReserva();
    }
  } 

  const updateEstadoHora = (id,hora) => {
    const horaMesa = {
      id_hora_mesa: id,
      estado: "Reservada",
      hora: hora,
    };
    updateHora({horaMesa})
  } 

  const notifyReserva = () => {
    toast.success('📅 Mesa reservada correctamente ', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const notifyAlerta = () => {
    toast.error(' Por favor, seleccione una hora ', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }

  const getInitialState = () => {
    const value = "Horas disponibles";
    return value;
  };

  const [value, setValue] = useState(getInitialState);
  const [idMesa, setIdMesa] = useState(getInitialState);

  const handleChange = (e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setValue(e.target.value);
    setIdMesa(e.target.options[selectedIndex].getAttribute('data-key'));
    console.log("ID HORA MESA: " + idMesa)
    console.log("HORA MESA: " + value)
  };

  var today = new Date(),
  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 1);

  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>   
      <h1 className='text-amber-600 font-bold text-4xl text-center'>
        Mesas disponibles
      </h1>
      {/* Display foods */}
      <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 pt-4'>
        {mesaList.map((item) => (
          <div
            key={item.id_mesa}
            className='border shadow-lg rounded-lg hover:scale-105 duration-300 '
          >
            
            <a href={'//localhost:3000/store/detailMesa/' + item.id_mesa}>
            <img
              src={item.tipo_mesa.foto}
              alt={item.tipo_mesa.descripcion}
              className='w-full h-[200px] object-cover rounded-t-lg '
            />
            </a>
            
            <div className='flex px-5 py-4'>
              <p><span className='bg-amber-600 text-xs text-white p-2 mr-1 rounded-full'>
                N°{item.id_mesa}
                </span></p>
              <p>
              <span className='bg-amber-600 text-xs text-white p-2 mr-1 rounded-full'>
                  {item.tipo_mesa.capacidad} P
                </span>
                
                
              </p>
            </div>
            
            <div className="relative w-full lg:max-w-sm">
            <button className='bg-amber-600 hover:bg-amber-900 transition-colors text-white ml-4 p-1 w-5/6 rounded-full' onClick={() => {addMesa(date, item, value, idMesa);updateEstado(item.id_mesa,item.date, value);getReservas();updateEstadoHora(idMesa, value)}}>
                    Reservar
                </button>
            <p className='font-bold text-center mt-5 mb-2'>{item.date}</p>
            <select onChange={handleChange} className="mb-5 ml-4 w-5/6 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                <option>Horas disponibles</option>
                {horaList.map((item2) => (
                  item2.mesa.id_mesa === item.id_mesa && item2.estado === "Disponible" ? 
                  (<option key={item2.id_hora_mesa} data-key={item2.id_hora_mesa}>{item2.hora}</option>)
                  : null
                ))}
            </select>
        </div>
          </div>
        ))}
        {/* {item.estado === "Disponible" || item.estado === "Cancelado" ? <button className='bg-amber-600 hover:bg-amber-900 transition-colors text-white p-1.5 rounded-full' onClick={() => {addMesa(date, item);updateEstado(item.id_mesa);notifyReserva();getReservas()}}>
                    Reservar
                </button>: <button className='bg-gray-600 text-gray-300 p-1.5 rounded-full disabled' >
                    Reservada
                </button>}
                
              </p>
            </div>
            
          </div>
        ))} */}
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default Mesa;
