import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // asumiendo que utilizas React Router
import Dropdown from "../Dropdown/Dropdown";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backURL } from "../../main";

const UserAvatar: React.FC = () => {
  const { logout, user, isAuthenticated } = useAuth0(); // asumiendo que tienes una función de logout en tu hook de autenticación
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({ role: null });
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${backURL}/users`)
        .then((response) => {
          const userWithEmail = response.data.find(
            (userData: any) => userData.email === user?.email
          );
          setUserData(userWithEmail);
        })
        .catch((error) => console.log(error));
    }
  }, [isAuthenticated, user, navigate]);

  const isAdmin = userData?.role === "admin";

  console.log(`user:`, userData)

  return (
    <div className="relative inline-block text-left mr-4 z-10">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full w-10 h-10 border-2 border-gray-500 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={handleDropdownToggle}
        >
          <img
            className="w-full h-full rounded-full"
            src={user?.picture}
            alt="User avatar"
          />
        </button>
      </div>

      {isOpen && (
        <Dropdown>
          <div>
            <div className="block px-4 py-2 text-sm text-gray-700 ">
              {user?.name}
            </div>
            <div className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-700">
              {user?.email}
            </div>
          </div>
          {isAdmin &&
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              Dashboard
            </Link>
          }
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            My account
          </Link>
          <button
            type="button"
            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            onClick={() => logout()}
          >
            Logout
          </button>
        </Dropdown>
      )}
    </div>
  );
};

export default UserAvatar;
