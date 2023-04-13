import React, { MouseEvent } from "react";
import { NavLink } from "react-router-dom";
import img from "../../assets/pictures/img.jpeg";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/coursesSlices";
import { Product } from '../../store/coursesSlices';



interface CardProps {
  name: string;
  difficulty: string;
  id: string;
  description: string;
  image: string;
  price: number;
}

const Card: React.FC<CardProps> = ({
  name,
  difficulty,
  id,
  image,
  description,
  price
}) => {

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, image, price}))
  }

  return (
        <NavLink
          to={`/detail/${id}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={image ? image : img} alt="Imagen" />
      </a>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Difficulty: {difficulty}
        </p>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleAddToCart}
          >
            Add to cart
            <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4Zm1 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>
          </button>
      </div>
    </div>
        </NavLink>
  );
};

export default Card;
