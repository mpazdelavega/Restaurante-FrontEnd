import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { MdLogout, MdOutlineMenuBook, MdOutlineLogin } from "react-icons/md";
import { RiReservedFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoCalendar, IoRestaurant } from "react-icons/io5";
import { logout } from "../../../services/auth";
import { getReservaList } from "../../../services/reserva";

function HeaderReserva() {
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

  const getNumeroMesa = () => {
    let nMesa = "";
    listaReserva.forEach((item) => {
      nMesa = item.mesa.id_mesa;
    });
    return nMesa;
  };

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
      </div>
      {/* Cart button */}
      <a href="/reserva">
        <button className="bg-white text-amber-600 hidden md:flex items-center py-2  rounded-full w-[120px]">
          <IoCalendar size={20} className="mr-1 ml-4" /> Reservar
        </button>
      </a>
      <a href="/reservas">
        <button className="bg-white text-amber-600 hidden md:flex items-center py-2  rounded-full w-[150px]">
          <RiReservedFill size={20} className="mr-1 ml-4" /> Mis Reservas
        </button>
      </a>
      <a href="/index">
        <button className="bg-white text-amber-600 hidden md:flex items-center py-2  rounded-full w-[160px]">
          <IoRestaurant size={20} className="mr-1 ml-4" /> Realizar pedido
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
            <a href="/reserva">
              <li className="text-xl py-4 flex cursor-pointer">
                <IoCalendar size={25} className="mr-4 text-amber-600" />{" "}
                Reservar
              </li>
            </a>
            <a href="/reservas">
              <li className="text-xl py-4 flex cursor-pointer">
                <RiReservedFill size={25} className="mr-4 text-amber-600" /> Mis
                reservas
              </li>
            </a>

            <a href="/index">
              <li className="text-xl py-4 flex cursor-pointer">
                <IoRestaurant size={25} className="mr-4 text-amber-600" />{" "}
                Relizar pedido
              </li>
            </a>

            <li
              className="text-xl py-4 flex cursor-pointer"
              onClick={closeSession}
            >
              <MdLogout size={25} className="mr-4 text-amber-600" /> Cerrar
              Sesión
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HeaderReserva;
