import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex bg-gray-100">
      <div className="p-6 w-full">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="mt-2">Here is a summary of the app's health and performance.</p>
        </div>
        <div className="mt-4">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-normal py-1 px-2 border border-gray-400 rounded shadow">
          <NavLink to="/reported" className="mr-4 text-blue-500 hover:text-blue-600 font-semibold">
            Reported reviews
          </NavLink>
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-normal py-1 px-2 border border-gray-400 rounded shadow">
          <NavLink to="/admincourses" className="text-blue-500 hover:text-blue-600 font-semibold">
            Admin courses
          </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
}