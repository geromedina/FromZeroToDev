import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { getCourses } from "../../store/coursesSlices";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/NavBar";
import { NavLink } from 'react-router-dom';
import img1 from '../../assets/pictures/img-01.png';
import linkedin from '../../assets/pictures/logo-linkedin.svg';
import facebook from '../../assets/pictures/logo-facebook.svg';
import microsoft from '../../assets/pictures/logo-microsoft.svg';
import amazon from '../../assets/pictures/logo-amazon.svg';
import google from '../../assets/pictures/logo-google.svg';
import img4 from '../../assets/pictures/img-04.png';
import netflix from '../../assets/pictures/logo-netflix.svg';
import cel from '../../assets/pictures/img-06.png';

const Home: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <body className="bg-gray-800">
      {/* <Navbar/> */}
      <section className="container mx-auto py-24 px-8">
        <div className="text-center lg:w-3/5 mx-auto mb-24">
          <h1 className="text-3xl lg:text-5xl font-medium text-white mb-2.5">The best platform to boost your tech career</h1>
          <p className="text-lg text-gray-400 mb-7">We have the largest community of experts to provide you with the ideal content for your learning</p>
          <div className="flex flex-col sm:flex-row justify-center">
            <NavLink to="/courses">
              <button type="button" className="mb-20 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">Start now</button>
            </NavLink>
          </div>
            <img src={img1} className='mx-auto' />
        </div>
      </section>

      <section className="py-0">
        <div className="container mx-auto px-8">
          <p className="text-lg text-gray-400 mb-10 text-center">Companies that trust us to train their team</p>
          <div className="flex flex-wrap justify-center">
            <img src={linkedin} alt="" />
            <img src={facebook} alt="" />
            <img src={microsoft} alt="" />
            <img src={amazon} alt="" />
            <img src={google} alt="" />

          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-24">
        <div className="container mx-auto px-8">
          <div className="grid xl:grid-cols-2">
            <div className="bg-white p-8  sm:p-20 rounded-l-3xl rounded-r-3xl xl:rounded-r-none">
              <p className="text-lg text-gray-400 mb-10">"The FromZeroToDev courses have been incredible, I have been able to learn at my own pace and acquire the knowledge I need for my job."</p>
              <div className="flex items-center flex-col sm:flex-row">
                <img src={img4} className="w-14 sm:mr-5 mb-4 sm:mb-0"/>
                <div className="sm:mr-5 sm:border-r sm:border-gray-200 sm:pr-5 mb-5 sm:mb-0">
                  <p className="font-medium">Adriana Campos</p>
                  <p className="text-gray-400">Front-End Developer</p>
                </div>
                <img src={netflix} />
              </div>
            </div>
            <div className="testimonial rounded-r-3xl">
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 pt-24">
        <div className="bg-gray-900">
          <div className="container mx-auto px-8">
            <div className="grid lg:grid-cols-2">
              <div className="flex items-center lg:my-24 my-14">
                <div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-white mb-2.5">Create your own professional course now</h2>
                  <p className="text-lg text-gray-400 mb-5">Hundreds of the best courses were powered by our creators</p>
                  <div className="flex flex-col sm:flex-row text-center">
                    <NavLink to="/create">
                    <button type="button" className="mb-20 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">Create now</button>
                    </NavLink>
                  </div>
                </div>
              </div>
                <div className="flex justify-center relative">
                  <img src={cel}  className="lg:absolute bottom-0"/>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </body>
  );
};

export default Home;
