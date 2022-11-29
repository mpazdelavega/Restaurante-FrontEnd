import React, { useEffect, useState } from "react";
import {
  getShoppingList,
  getSaleList,
  deleteShoppingItem,
  generateSale,
  updateShoppingItem,
  getShoppingListStatus,
} from "../../../services/shoppingCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useMercadopago } from "react-sdk-mercadopago"
import { updateHora, updateMesa } from "../../../services/mesa";
import { getReservaList, updateReserva } from "../../../services/reserva";
//import {Helmet} from "react-helmet";

function Cart() {

  const mercadopago = useMercadopago.v2(
    "TEST-4d3b8d1f-820b-4fb7-bb9a-de76881fff04",
    {
      locale: "es-CL",
    }
  );
  const [rendered, setRendered] = useState(false);

  //const { id } = useParams(); // id de producto
  const [preferenceId, setPreferenceId] = useState(null);
  const [productList, setProductList] = useState([]);
  const [productListStatus, setProductListStatus] = useState([]);
  const [listaReserva, setListaReserva] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    return axios
      .post("http://localhost:8080/shoppingList/mercado", productList)
      .then((response) => {
        return response.data;
      });
  };

  useEffect(() => {
    const fetch = async () => {
      const a = await fetchData();
      if (mercadopago && a !== "") {
        mercadopago.checkout({
          preference: {
            id: a,
          },
          render: {
            container: ".cho-container",
            label: "PAGO WEB",
          },
        });
      }
    };
    fetch();
  }, [mercadopago]);

  const [clientData, setClientData] = useState({ client_id: "" });

  let [number, setNumber] = useState(0);
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

  
  

  const [salesList, setSalesList] = useState([]);
  const [open, setOpen] = useState(false);

  const getList = () => {
    getShoppingList({ setProductList });
    getShoppingListStatus({ setProductListStatus });
  };

  const updateItem = (itemId) => {
    updateShoppingItem({ itemId }).then(() => {
      getShoppingList({ setProductList });
      getShoppingListStatus({ setProductListStatus });
    });
  };

  const getSales = () => {
    getSaleList({ setSalesList });
  };

  useEffect(() => {
    getList();
    getSales();
    getEstadoPedido();
    console.log(getIdClient(productList));
    //const timer = setTimeout(() => window.location.reload(), 20000);
  }, []);

  const deleteItem = (itemId) => {
    deleteShoppingItem({ itemId }).then(() => {
      let number = parseInt(localStorage.getItem("number")) - 1;
      localStorage.setItem("number", number.toString());
      window.dispatchEvent(new Event("storage"));
      getShoppingList({ setProductList });
      getShoppingListStatus({ setProductListStatus });
    });
  };

  const getEstadoPedido = () => {
    let estadoPedido = "";
    productListStatus.forEach((item) => {
      estadoPedido = item.estado_pedido;
    });
    return estadoPedido;
  };

  setTimeout(() => {}, 3000);

  const calculateTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total = total + item.amount * item.product.price;
    });
    return total;
  };

  const calculateCantidad = (items) => {
    let cantidad = 0;
    items.forEach((item) => {
      cantidad = item.amount;
    });
    return cantidad;
  };

  const getIdClient = (items) => {
    let clientId = "";
    items.forEach((item) => {
      clientId = item.client.id;
    });
    return clientId;
  };

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
  const notifyDelete = () => {
    toast.info("Producto eliminado del pedido", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyPedido = () => {
    toast.success("🍔 Se ha realizado el pedido correctamente 🍕", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifyPedidoPagado = () => {
    toast.success("💵 Un camarero se acercara a su mesa para relizar el pago en efectivo 💵", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    getReservaList({ setListaReserva });
    console.log(getNumeroMesa());
    console.log(getFechaMesa());
    console.log(getHoraMesa());
    console.log(getNumeroHoraMesa());
    console.log(getNumeroReserva  ());
  }, [refresh]);

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
    <div className="container mx-auto xl:pb-16 mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Productos seleccionados</h1>
            <h2 className="font-semibold text-2xl">{number} Platos</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Detalle carrito
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Cantidad
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Precio
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Estado
            </h3>
          </div>

          {productListStatus.map((item) => (
            <div
              key={item.id}
              className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
            >
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24" src={item.product.image} alt="" />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.product.name}</span>
                  <span className="text-red-500 text-xs">
                    {item.product.category}
                  </span>
                  <a
                    className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer transition-colors"
                    onClick={() => {
                      deleteItem(item.id);
                      notifyDelete();
                    }}
                  >
                    Eliminar
                  </a>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <svg
                  className="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>

                <span className="mx-2 border text-center w-8" type="text">
                  {item.amount}
                </span>

                <svg
                  className="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${item.product.price}
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${item.product.price}
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                {item.estado_pedido}
              </span>
            </div>
          ))}
          <a
            href="/store"
            className="flex font-semibold text-amber-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-amber-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continuar comprando
          </a>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Resumen pedido
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              {number} Platos
            </span>
            <span className="font-semibold text-sm">
              ${calculateTotal(productListStatus)}
            </span>
          </div>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Costo total</span>
              <span>${calculateTotal(productListStatus)}</span>
            </div>
            {productListStatus.length ? <button
              className="bg-amber-600 font-semibold hover:bg-amber-900 transition-colors py-3 text-sm text-white uppercase w-full"
              onClick={() => {
                updateItem(getIdClient(productListStatus));
                notifyPedido();
                window.location.reload();
              }}
            >
              Realizar pedido
            </button> : null}
            
          </div>
        </div>
      </div>
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Pedido</h1>
            <h2 className="font-semibold text-2xl">{number} Platos</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Detalle pedido
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Cantidad
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Precio
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Estado
            </h3>
          </div>

          {productList.map((item) => (
            <div
              key={item.id}
              className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
            >
              <div className="flex w-2/5">
                <div className="w-20">
                  <img className="h-24" src={item.product.image} alt="" />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.product.name}</span>
                  <span className="text-red-500 text-xs">
                    {item.product.category}
                  </span>
                  <a
                    className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer transition-colors"
                    onClick={() => {
                      deleteItem(item.id);
                      notifyDelete();
                    }}
                  >
                    Eliminar
                  </a>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <svg
                  className="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>

                <span className="mx-2 border text-center w-8" type="text">
                  {item.amount}
                </span>

                <svg
                  className="fill-current text-gray-600 w-3"
                  viewBox="0 0 448 512"
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                </svg>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${item.product.price}
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${item.product.price}
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                {item.estado_pedido}
              </span>
            </div>
          ))}
          <a
            href="/store"
            className="flex font-semibold text-amber-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-amber-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continuar comprando
          </a>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Resumen pedido
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              {number} Platos
            </span>
            <span className="font-semibold text-sm">
              ${calculateTotal(productList)}
            </span>
          </div>

          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Costo total</span>
              <span>${calculateTotal(productList)}</span>
            </div>
            {productList.length ? <button
              className="bg-green-600 font-semibold hover:bg-green-900 transition-colors py-3 text-sm text-white uppercase w-full"
              onClick={() => { 
                confirmSale();
                notifyPedidoPagado(); 
                // updateEstado(getNumeroMesa(), getFechaMesa());
                // updateReservaEstado(getNumeroReserva(), getHoraMesa());
                // updateEstadoHora(getNumeroHoraMesa(),getHoraMesa());
              }}
            >
              PAGAR EFECTIVO
            </button> : null}        
            
            <div className="cho-container mt-5" />
          </div>
        </div>
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default Cart;
