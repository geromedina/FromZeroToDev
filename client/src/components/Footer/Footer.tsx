import React from 'react';
import logotipo from '../../assets/pictures/web-dev-icon.svg';
import { logoDiscord, logoGithub  } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className="bg-gray-900 border-t border-gray-400 py-14 w-full">
        <div className='container mx-auto px-8 mb-14'>
            <div className='grid lg:grid-cols-2'>
                <div className='mb-10 lg:mb-0'>
                    <div className='flex flex-grow items-center'>
                        <img src={logotipo} alt="logo" />
                        <h1 className="font-bold text-transparent bg-clip-text text-white px-2">FromZeroToDev</h1>
                    </div>
                    <p className='text-gray-400'>Discover the new way of learning</p>
                </div>
            <div>
                <div className='grid md:grid-cols-3'>
                    <div className='mb-8 lg:mb-0'>
                        <p className='text-lg font-medium text-white mb-5'>Product</p>
                        <ul>
                            <li className='mb-5'><a href='#' className='text-gray-400'>Courses</a></li>
                            <li className='mb-5'><a href='#' className='text-gray-400'>Tutorials</a></li>
                        </ul>
                    </div>
                    <div className='mb-8 lg:mb-0'>
                        <p className='text-lg font-medium text-white mb-5'>Company</p>
                        <ul>
                            <li className='mb-5'><a href='#' className='text-gray-400'>About FromZeroToDev</a></li>
                            <li className='mb-5'><a href='#' className='text-gray-400'>Blog</a></li>
                            <li className='mb-5'><a href='#' className='text-gray-400'>I want to be an instructor</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className='text-lg font-medium text-white mb-5'>Support</p>
                        <ul>
                            <li className='mb-5'><a href='#' className='text-gray-400'>Online chat</a></li>
                            <li className='mb-5'><a href='#' className='text-gray-400'>Talk to an advisor</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className='container mx-auto px-8 xl:px-0 border-t border-gray-400 pt-10'>
            <div className='grid lg:grid-cols-2'>
                <p className='text-gray-400 mb-5 lg:mb-0'>FromZeroToDev 2023 | All rights reserved.</p>
                <div className='flex lg:justify-end'>
                    <p className='text-gray-400 mr-7'>Follow us on:</p>
                    <a href="" className='mr-7'><IonIcon  icon={logoGithub} size="large" className="icon-class text-blue-500 hover:text-blue-600" /></a>
                    <a href="" className='mr-7'><IonIcon  icon={logoDiscord} size="large" className="icon-class text-blue-500 hover:text-blue-600" /></a>
                </div>
            </div>
        </div>
    </footer>
  )
};

export default Footer