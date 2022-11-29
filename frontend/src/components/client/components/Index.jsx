import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { getReservaAhora } from "../../../services/reserva";
import { ToastContainer, toast } from "react-toastify";

function Index() {
  //INGRESAR NUMERO DE MESA
  const [refresh, setRefresh] = useState(false);
  const [listaReserva, setListaReserva] = useState([]);

  const navigate = useNavigate();

  function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  function getHour(dateStr, locale) {
    var date3 = new Date(dateStr);
    return date3.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
    });
  }

  var today = new Date();
  var day = getDayName(today, "es-CL");
  var hora = getHour(today, "es-CL");

  const [numeroMesa, setNumeroMesa] = useState("");

  //Fecha y hora actual
  //   var hora_reserva = hora
  var dia_reserva = day
  var id_mesa = parseInt(numeroMesa);

  //Datos de prueba
  var hora_reserva = "13:00";
  //var dia_reserva = "lunes";

  //Falta validar con ID DE LA MESA

  useEffect(() => {
    console.log("Día actual: " + dia_reserva);
    console.log("Hora actual: " + hora_reserva);
    console.log("Numero mesa: " + parseInt(numeroMesa));

    console.log(listaReserva);
  }, [refresh]);

  const handleForm = (e) => {
    console.log("handleForm " + numeroMesa);
    setNumeroMesa(e.target.value);
  };

  const notifyAlerta = () => {
    toast.error("Número de mesa ingresado no se encuentra disponible en este horario.", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const notifyAlertaVacio = () => {
    toast.error("Ingrese número de mesa.", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const navigateStore = () => {
    navigate("/store");
  };

//   const navigateStore = () => {
//     console.log("Numero de mesa: " + numeroMesa)
//     getReservaAhora({ id_mesa, hora_reserva, dia_reserva, setListaReserva });
//     if (listaReserva.length) {
//       navigate("/store");
//     } else {
//         notifyAlerta();
//     }
//   };

  return (
    <div className="bg-white">
      <div className="max-w-[1640px] mx-auto p-4">
        <div className="max-h-[500px] relative">
          {/* Overlay */}
          <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center">
            <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Reserva <span className="text-amber-600">Tu</span>
            </h1>
            <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              {" "}
              <span className="text-amber-600">Mesa</span>{" "}
              <u>
                {" "}
                <a
                  href="/reserva"
                  className="hover:text-amber-600 transition-colors"
                >
                  {" "}
                  Aquí
                </a>
              </u>
            </h1>
          </div>
          <img
            className="w-full max-h-[500px] object-cover"
            src="https://img.freepik.com/foto-gratis/salon-restaurante-mucha-mesa_140725-6309.jpg?w=2000"
            alt="/"
          />
        </div>
      </div>
      <div className="max-w-[1640px] mx-auto p-4">
        <div className="max-h-[500px] relative">
          {/* Overlay */}
          <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center">
            <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              Realiza tu <span className="text-amber-600">Pedido</span>
            </h1>
            <input
              type="text"
              id="id_mesa"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-5 ml-4 w-44"
              onChange={(e) => handleForm(e)}
              value={numeroMesa}
              placeholder="Ingrese numero de mesa"
              required
            ></input>
            <button
              className="w-full bg-amber-900 py-2 px-4 text-white rounded-md hover:bg-amber-600 transition-colors mt-2 ml-4 w-44"
              onClick={() => {
                getReservaAhora({id_mesa, hora_reserva, dia_reserva, setListaReserva, navigate});
                if (numeroMesa === ""){
                  notifyAlertaVacio();
                }
                else if(!listaReserva.length){
                  notifyAlerta();
                }
                
              }}
            >
              Realizar pedido
            </button>
          </div>
          <img
            className="w-full max-h-[500px] object-cover"
            src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="/"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Index;
