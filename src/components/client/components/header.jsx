import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { MdLogout, MdOutlineMenuBook } from "react-icons/md";
import { RiReservedFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoCalendar } from "react-icons/io5";
import { logout } from "../../../services/auth";
import { getReservaList, updateReserva } from "../../../services/reserva";
import { updateHora, updateMesa } from "../../../services/mesa";

function Header() {
  const [nav, setNav] = useState(false);
  const [refresh, setRefresh] = useState(false);
  var navigate = useNavigate();
  let [number, setNumber] = useState(0);
  const [listaReserva, setListaReserva] = useState([]);
  useEffect(() => {
    let shouldUpdate = true;

    const getUserCart = () => {
      const item = localStorage.getItem("number");
      if (item) {
        setNumber(parseInt(item));
      }
    };
    if (shouldUpdate) {
      getUserCart();
    }
    window.addEventListener("storage", getUserCart);
    return () => {
      shouldUpdate = false;
    };
  }, [number]);

  useEffect(() => {
    getReservaList({ setListaReserva });
    console.log(getNumeroMesa());
  }, [refresh]);


  const getEstadoReservaUsuario = () => {
    let estadoReserva = '';
    listaReserva.forEach((item) => {
      estadoReserva = item.estado_reserva;
    })
    return estadoReserva;
  }

  const closeSession = () => {
    logout({ navigate });
  };

  const getNumeroMesa = () => {
    let nMesa = "";
    listaReserva.forEach((item) => {
      nMesa = item.mesa.id_mesa;
    });
    return nMesa;
  };

  const getFechaMesa = () => {
    let fechaMesa = "";
    listaReserva.forEach((item) => {
      fechaMesa = item.mesa.date;
    });
    return fechaMesa;
  };

  const getHoraMesa = () => {
    let horaMesa = "";
    listaReserva.forEach((item) => {
      horaMesa = item.hora_mesa.hora;
    });
    return horaMesa;
  };

  const getNumeroHoraMesa = () => {
    let idHoraMesa = "";
    listaReserva.forEach((item) => {
      idHoraMesa = item.hora_mesa.id_hora_mesa;
    });
    return idHoraMesa;
  };

  const getNumeroReserva = () => {
    let idReserva = "";
    listaReserva.forEach((item) => {
      idReserva = item.id_reserva;
    });
    return idReserva;
  };

  const updateEstado = (id,fecha) => {
    console.log(id)
    const mesa = {
      id_mesa: id,
      estado: "Disponible",
      date: fecha,
    };
    updateMesa({mesa})
    
  } 

  const updateEstadoHora = (id, hora) => {
    const horaMesa = {
      id_hora_mesa: id,
      estado: "Disponible",
      hora: hora,
    };
    updateHora({horaMesa})
    
  } 

  const updateReservaEstado = (id, hora) => {
    const reserva = {
      id_reserva: id,
      fecha: "2022-10-15",
      estado_reserva: "Cancelado",
      hora: hora,
    };
    updateReserva({reserva})
    //window.location.href = window.location.href;
  } 

  return (
    <div className="dark:bg-amber-600 mx-auto flex justify-between items-center p-4 sticky top-0 z-50 shadow-xl">
      {/* Left side */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Siglo <span className="font-bold text-white">XXI</span>
        </h1>

        <div className="hidden md:flex items-center bg-white rounded-full  text-[14px]">
        {getEstadoReservaUsuario() === "No Cancelado" ? <p className="font-bold text-amber-600 rounded-full p-2">Mesa N°{getNumeroMesa()}</p>:null}
          
        </div>
      </div>

      {/* Search Input 
      <div className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] md:w-[300px] lg:w-[400px]'>
        <AiOutlineSearch size={25} />
        <input
          className='bg-transparent p-2 w-full focus:outline-none'
          type='text'
          placeholder='Search foods'
        />
      </div>
      */}
      {/* Cart button */}
      <a href="/store">
        <button className="bg-white text-amber-600 hidden md:flex items-center py-2  rounded-full w-[100px]">
          <MdOutlineMenuBook size={20} className="mr-1 ml-4" /> Menu
        </button>
      </a>
      {/* <a href="/store/reserva">
        <button className="bg-white text-amber-600 hidden md:flex items-center py-2  rounded-full w-[120px]">
          <IoCalendar size={20} className="mr-1 ml-4" /> Reservar
        </button>
      </a>
      <a href="/store/reservas">
        <button className="bg-white text-amber-600 hidden md:flex items-center py-2  rounded-full w-[150px]">
          <RiReservedFill size={20} className="mr-1 ml-4" /> Mis Reservas
        </button>
      </a> */}
      <a href="/store/cart">
        <button className="bg-white text-amber-600 hidden md:flex items-center py-2  rounded-full w-[120px]">
          <BsFillCartFill size={20} className="mr-1 ml-4" /> Carro ({number})
        </button>
      </a>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          Siglo <span className="font-bold text-amber-600">XXI</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <a href="/store">
              <li className="text-xl py-4 flex cursor-pointer">
                <MdOutlineMenuBook size={25} className="mr-4 text-amber-600" />{" "}
                Menu
              </li>
            </a>
            {/* <a href="/store/reserva">
              <li className="text-xl py-4 flex cursor-pointer">
                <IoCalendar size={25} className="mr-4 text-amber-600" />{" "}
                Reservar
              </li>
            </a>
            <a href="/store/reservas">
              <li className="text-xl py-4 flex cursor-pointer">
                <RiReservedFill size={25} className="mr-4 text-amber-600" /> Mis
                reservas
              </li>
            </a> */}

            <a href="/store/cart">
              <li className="text-xl py-4 flex cursor-pointer">
                <BsFillCartFill size={25} className="mr-4 text-amber-600" />{" "}
                Carro ({number})
              </li>
            </a>

            <li
              className="text-xl py-4 flex cursor-pointer"
              onClick={() => {
                closeSession();
                updateEstado(getNumeroMesa(), getFechaMesa());
                updateReservaEstado(getNumeroReserva(), getHoraMesa());
                updateEstadoHora(getNumeroHoraMesa(),getHoraMesa());
              }}
            >
              <MdLogout size={25} className="mr-4 text-amber-600" /> Cerrar
              Sesión
            </li>
            
            <li className="text-xl text-gray-400 py-4 flex cursor-pointer mt-5 text-sm">
              ♦ Advertencia, al cerrar sesión se cancelara la hora reservada y se eliminaran los productos del pedido ♦
            </li>
            
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
