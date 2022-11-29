import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { useParams } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../../../services/product";
import { getUserDetails } from "../../../services/auth";
import { addToCart } from "../../../services/shoppingCart";
import { ToastContainer, toast } from "react-toastify"

function Detail() {
  const [amountToAdd, setAmount] = useState(1);
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  let [editProduct, setEditProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [roles, setUserRole] = useState([]);
  const [showProductFeedback, setProductFeedback] = React.useState({
    show: false,
    status: false,
    infoText: "",
  });
  const [refresh, setRefresh] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    let shouldUpdate = true;
    getUserDetails({ setUserRole });
    if (shouldUpdate) {
      Promise.all([
        getProductById(id.toString()),
        getRelatedProducts({ category, id }),
      ]).then((results) => {
        const [first, second] = results;
        setProduct(first);
        setEditProduct(first);
        setRelatedProducts(second);
      });
    }
  }, [id, category, refresh]);

  const add = () => {
    setAmount(amountToAdd + 1);
  };
  const subtract = () => {
    setAmount(amountToAdd - 1);
  };
  const addProduct = (productToAdd) => {
    addToCart({ amountToAdd, productToAdd });
  };
  const handleOpenModal = () => setOpenModal(true);
  const closeProductFeedback = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setProductFeedback({ show: false });
  };

  const notifyPedido = () => {
    toast.success('🍔 Se agrego un producto al pedido 🍕', {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    
  }
  return (
    <div className="w-full max-w-6xl rounded bg-white p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
      <div className="border rounded-lg shadow-xl md:flex items-center -mx-10">
        <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
          <div className="relative">
            <img
              src={product && product.image}
              alt="product"
              className="w-full relative z-10"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-10">
          <div className="mb-10">
            <h1 className="font-bold text-2xl mb-5">{product && product.name}</h1>
            <p className="text-sm">{product && product.description}</p>
          </div>
          <div>
            <div className="inline-block align-bottom mr-5 mb-5">
              <span className="text-2xl leading-none align-baseline">$</span>
              <span className="font-bold text-5xl leading-none align-baseline">
                {product && product.price}
              </span>
            </div>
            <div className="inline-block align-bottom mb-5">
              <button
                onClick={() => {
                  addProduct(product);notifyPedido();
                }}
                className="bg-amber-600 opacity-75 hover:opacity-100 text-white transition-colors hover:bg-amber-900 rounded-full px-10 py-2 font-semibold"
              >
                <i className="mdi mdi-cart -ml-2 mr-2"></i> Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-amber-600 font-bold text-4xl text-center mt-10">
        Platos relacionados
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 pt-4">
        {relatedProducts.map((related) => (
          <div
            key={related.id}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <a
              href={
                "//localhost:3000/store/detail/" +
                related.id +
                "/" +
                related.category
              }
            >
              <img
                src={related.image}
                alt={related.name}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
            </a>
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{related.name}</p>
              <p>
                <span className="bg-amber-600 text-white p-2 mr-2 rounded-full">
                  ${related.price}
                </span>
                <button
                  onClick={() => {
                    addProduct(related, 1);notifyPedido();
                  }}
                  className="bg-amber-600 hover:bg-amber-900 transition-colors text-white p-1.5 rounded-full"
                >
                  Agregar
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Detail;
