import React, { useEffect, useState } from "react";
import { updateMesa, updateHora } from '../../../services/mesa'
import { deleteReservaItem, getReservaList, updateReserva } from "../../../services/reserva";
import {
  getShoppingList,
  getSaleList,
  deleteShoppingItem,
  generateSale,
} from "../../../services/shoppingCart";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function ReservaUsuario() {
  //SE DEBE ACTUALIZAR EL ESTADO DE LA HORA DESDE LA PAGINA DE VER RESERVAS
  const [listaReserva, setListaReserva] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [open, setOpen] = useState(false);

  let [number, setNumber] = useState(0);
  useEffect(() => {
    console.log(listaReserva)
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
  
  const getList = () => {
    getReservaList({ setListaReserva });
  };

  const getSales = () => {
    getSaleList({ setSalesList });
  };

  useEffect(() => {
    getList();
    getSales();
  }, []);
  const deleteItem = (itemId) => {
    deleteReservaItem({ itemId }).then(() => {
        
        getReservaList({ setListaReserva });
    });
  };

  //   const calculateTotal = (items) => {
  //     let total = 0;
  //     items.forEach((item) => {
  //       total = total + item.amount * item.product.price;
  //     });
  //     return total;
  //   };
  const getDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  const confirmSale = () => {
    generateSale().then(() => {
      setOpen(true);
      getSales();
      getList();
      let number = 0;
      localStorage.setItem("number", number.toString());
      window.dispatchEvent(new Event("storage"));
    });
  };
  const closeFeedback = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
    console.log("RESERVA UPDATE ID: " + id)
    const reserva = {
      id_reserva: id,
      fecha: "2022-10-15",
      estado_reserva: "Cancelado",
      hora: hora,
    };
    updateReserva({reserva})
    //window.location.href = window.location.href;
  } 

  const notifyReserva = () => {
    toast.error('Reserva cancelada', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  return (
    <div className="max-w-[1440px] mx-auto overflow-x-auto relative shadow-xl sm:rounded-lg mb-10 mt-5">
      <h1 className="text-amber-600 font-bold text-4xl text-center mb-5">
        Mis Reservas
      </h1>
      <table className="w-full text-sm text-left text-black dark:text-black">
        <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-amber-600 dark:text-black">
          <tr>
            <th scope="col" className="py-3 px-6">
              Numero Reserva
            </th>
            <th scope="col" className="py-3 px-6">
              Numero Mesa
            </th>
            <th scope="col" className="py-3 px-6">
              Fecha / hora reserva
            </th>
            <th scope="col" className="py-3 px-6">
              Estado
            </th>
            <th scope="col" className="py-3 px-6">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        {listaReserva.map((item) => (
          <tbody key={item.id_reserva}>
            <tr className="bg-white border-b dark:bg-white dark:border-amber-600 hover:bg-gray-50 dark:hover:bg-amber-600">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-black"
              >
                {item.id_reserva}
              </th>
              <td className="py-4 px-6">Mesa N°{item.mesa.id_mesa}</td>
              <td className="py-4 px-6">{item.mesa.date} {item.hora_mesa.hora}</td>
              {item.estado_reserva === "Cancelado" ? <td className="py-4 px-6">{item.estado_reserva}</td> : <td className="py-4 px-6">{item.mesa.estado}</td>}
              
              <td className="py-4 px-6 text-right">
              {item.estado_reserva != "Cancelado" ? <a
                  className="font-medium text-white dark:text-black hover:underline cursor-pointer"
                  onClick={() => {updateEstado(item.mesa.id_mesa, item.mesa.date);updateReservaEstado(item.id_reserva, item.hora_mesa.hora);updateEstadoHora(item.hora_mesa.id_hora_mesa, item.hora_mesa.hora);window.location.reload();}}
                >
                  Cancelar Reserva
                </a>: null}
                
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <ToastContainer />
    </div>
  );
}

export default ReservaUsuario;
