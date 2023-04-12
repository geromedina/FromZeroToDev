import React, { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from "../../store/hooks";


const Cart: React.FC = () => {

  const { user } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  const products = useAppSelector((state) => state.courses.cartItems)

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  // const [cartItems, setCartItems] = useState<ShoppingCartItem[]>([]);
  // const [total, setTotal] = useState<number>(0);

  // const addToCart = (product: Product) => {
  //   const itemIndex = cartItems.findIndex(item => item.product.id === product.id);
  //   if (itemIndex >= 0) {
  //     const updatedCartItems = [...cartItems];
  //     updatedCartItems[itemIndex].quantity += 1;
  //     setCartItems(updatedCartItems);
  //   } else {
  //     setCartItems([...cartItems, { product, quantity: 1 }]);
  //   }
  //   setTotal(total + product.price);
  // };

  // const removeFromCart = (product: Product) => {
  //   const itemIndex = cartItems.findIndex(item => item.product.id === product.id);
  //   if (itemIndex >= 0) {
  //     const updatedCartItems = [...cartItems];
  //     if (updatedCartItems[itemIndex].quantity > 1) {
  //       updatedCartItems[itemIndex].quantity -= 1;
  //       setCartItems(updatedCartItems);
  //     } else {
  //       updatedCartItems.splice(itemIndex, 1);
  //       setCartItems(updatedCartItems);
  //     }
  //     setTotal(total - product.price);
  //   }
  // };

  // const clearCart = () => {
  //   setCartItems([]);
  //   setTotal(0);
  // };


  return (
    <div className='z-10'>
      <button type='button' className='inline-flex items-center justify-center rounded-full w-10 h-10 border-2 border-gray-500 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-4' onClick={handleDropdownToggle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2zM1 3c0 .55.45 1 1 1h1l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.67-1.43a.993.993 0 0 0-.9-.57H2c-.55 0-1 .45-1 1zm16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2z"/></svg>
      </button>

      {isOpen && (
        <Dropdown>
          <div >
            <div className="block px-4 py-2 text-sm text-gray-700 ">
              El carro de: {user?.name?.split(' ')[0]}
            </div>
          </div>

          <div>
            <ul>
              {products?.map(p => (<li key={p.id}>
                <h4>{p.name}</h4>
                <img src={p.image} alt="img" />
              </li>))}
            </ul>
          </div>

          <button
            type="button"
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            
          >
            Vaciar el carro
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            
          >
            Finalizar compra
          </button>
        </Dropdown>
      )}

    </div>
  )
}

export default Cart