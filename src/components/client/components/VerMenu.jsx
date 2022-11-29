import React, { useEffect, useState } from 'react';
import { getAllProducts, getBestProducts } from '../../../services/product'
import { ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const VerMenu = () => {
  const [productList, setProductList] = useState([])
  const [bestProductList, setBestProductList] = useState([])
  const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    getAllProducts({ setProductList })
    getBestProducts({ setBestProductList })
    console.log(productList)
  }, [refresh])

  return (
    <div className='max-w-[1640px] m-auto px-4 py-12'>
      
      <h1 className='text-amber-600 font-bold text-4xl text-center'>
        Menu
      </h1>
      {/* Display foods */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
        
        {productList.map((productItem) => (
          productItem.stock !== 0 ? <div
          key={productItem.id}
          className='border shadow-lg rounded-lg hover:scale-105 duration-300'
        >
          
            <img
              src={productItem.image}
              alt={productItem.name}
              className='w-full h-[200px] object-cover rounded-t-lg'
            />
          
          <div className='flex justify-between px-2 py-4'>
            <p className='font-bold'>{productItem.name}</p>
            <p>
              <span className='bg-amber-600 text-white p-2 mr-2 rounded-full'>
                ${productItem.price}
              </span>
              
              
            </p>
          </div>
          
        </div> : null
          
        ))}
      </div>
      <h1 className='text-amber-600 font-bold text-4xl text-center mt-10'>
        Extras
      </h1>
      {/* Display foods */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
        {bestProductList.map((productItem) => (
          productItem.stock !== 0 ? <div
            key={productItem.id}
            className='border shadow-lg rounded-lg hover:scale-105 duration-300'
          >
            
              <img
                src={productItem.image}
                alt={productItem.name}
                className='w-full h-[200px] object-cover rounded-t-lg'
              />
            
            <div className='flex justify-between px-2 py-4'>
              <p className='font-bold'>{productItem.name}</p>
              <p>
                <span className='bg-amber-600 text-white p-2 mr-2 rounded-full'>
                  ${productItem.price}
                </span>
                
                
              </p>
            </div>
            
          </div> : null
          
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerMenu;
