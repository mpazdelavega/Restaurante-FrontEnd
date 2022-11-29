import { Alert } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateHora, updateMesa } from "../../../services/mesa";
import { updateReserva } from "../../../services/reserva";
import { generateSale, getSaleList } from "../../../services/shoppingCart";
function PagoRecibido() {
  var navigate = useNavigate();
  const [listaReserva, setListaReserva] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [open, setOpen] = useState(false);
  const getSales = () => {
    getSaleList({ setSalesList });
  };

  const confirmSale = () => {
    generateSale().then(() => {
      setOpen(true);
      getSales();
      let number = 0;
      localStorage.setItem("number", number.toString());
      window.dispatchEvent(new Event("storage"));
    });
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
    <div className="register min-h-screen bg-[#F2F4FE] flex items-center justify-center p-4">
      
      <div className="max-w-lg">
    
        <div className="flex justify-center mb-8"></div>
        
        
        <div className="bg-stone-700 w-full rounded-lg p-8 mb-8">
          <div className="flex flex-col items-center gap-1 mb-8">
            <h1 className="text-xl text-white">Pago realizado correctamente</h1>
            <p className="text-gray-300 text-sm">
              Haga clic en continuar para volver al menú principal
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <a href="/store">
                <button
                  className="w-full bg-amber-900 py-2 px-4 text-white rounded-md hover:bg-amber-600 transition-colors mt-5"
                  onClick={() => {
                    confirmSale();
                    updateEstado(getNumeroMesa(), getFechaMesa());
                    updateReservaEstado(getNumeroReserva(), getHoraMesa());
                    updateEstadoHora(getNumeroHoraMesa(),getHoraMesa());
                  }}
                >
                  Continuar
                </button>
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default PagoRecibido;
