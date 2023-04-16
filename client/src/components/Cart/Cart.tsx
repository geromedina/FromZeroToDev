import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "../../store/hooks";
import { useAppDispatch } from "../../store/hooks";
import { clearCart } from "../../store/coursesSlices";
import { removeFromCart } from "../../store/coursesSlices";
import { Product } from "../../store/coursesSlices";
import axios from "axios";

const Cart: React.FC = () => {
  const { user } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  const products = useAppSelector((state) => state.courses.cartItems);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const purchaseHandler = async () => {
    let totalPrice = 0;
    let description = "";
    for (let i = 0; i < products.length; i++) {
      totalPrice += products[i].price;
      description += products[i].name + ", ";
    }
    const body = {
      id: "product.id",
      title: description,
      currency_id: "ARS",
      picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
      description: "NIY",
      category_id: `en cart`,
      quantity: 1,
      unit_price: totalPrice,
      external_reference: description,
    };

    const rawData: any = await axios.put(
      "http://localhost:3001/payments",
      body
    );
    const url = rawData.data.init_point;
    console.log(url);
    window.location.href = url;
  };

  return (
    <div className="z-10">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full w-10 h-10 border-2 border-gray-500 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-4"
        onClick={handleDropdownToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2zM1 3c0 .55.45 1 1 1h1l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.67-1.43a.993.993 0 0 0-.9-.57H2c-.55 0-1 .45-1 1zm16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2z"
          />
        </svg>
      </button>

      {isOpen && (
        <Dropdown>
          <div className="pointer-events-auto w-screen max-w-[340px] overflow-hidden rounded-md border border-gray-200">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div>
                <div className="block px-4 py-2 text-sm text-gray-700 ">
                  El carro de: {user?.name?.split(" ")[0]}
                </div>
              </div>

              <div>
                <ul className="-my-3">
                  {products?.map((p) => (
                    <li key={p.id} className="flex py-4">
                      <div className="h-24 w-24 rounded-md border border-gray-200">
                        <img
                          src={p.image}
                          alt="img"
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href="">{p.name}</a>
                          </h3>
                          <p className="ml-4 font-semibold">${p.price}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => handleRemoveFromCart(p)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={handleClearCart}
              >
                Vaciar el carro
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={purchaseHandler}
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </Dropdown>
      )}
    </div>
  );
};

export default Cart;
