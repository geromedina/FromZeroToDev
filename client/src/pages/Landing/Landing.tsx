import React from 'react';
import Footer from '../../components/Footer/Footer';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/pictures/web-dev-icon.svg';

const Landing: React.FC = (): JSX.Element => {
  return (
    <div className="bg-white">
      <nav className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap mx-auto p-10 justify-center">
        <img src={logo} alt="logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FromZeroToDev</span>
        </div>
      </nav>
        <div className='flex flex-row'>
          <div className='p-10'>
            <img src="https://img.plasmic.app/img-optimizer/v1/img/5fc8c319beca87bfc95d188be8d58260.png?q=75&f=webp" alt="" />
          </div>
          <div className='flex flex-col text-center justify-center'>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500">FromZeroToDev </span>the course platform that adapts to you.</h1>
            <p className="font-bold mb-3 text-gray-900 dark:text-gray-800 py-6">Specialize in development regardless of your level of knowledge and experience, we will adapt to your objectives.</p>
            <NavLink to="/home">
              <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Start now</button>
            </NavLink>
          </div>
        </div>
         <Footer/>
    </div>
    
  )
}

export default Landing