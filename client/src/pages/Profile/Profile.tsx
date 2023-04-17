import React, {Fragment, useState}from "react";
import { RiLineChartLine, RiHashtag } from "react-icons/ri";
import { useAppSelector } from "../../store/hooks";
import ReactDom from "react-dom";
import { useLocalStorage } from "../../components/LocalStorage/useLocalStorage";


const Profile: React.FC = () => {
  const products = useAppSelector((state) => state.courses.cartItems);

  return (
    <div className=" h-full lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 h-[100vh]">
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8">
        <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
          <RiLineChartLine className="text-5xl" />
          <h4 className="text-2xl">Earnings</h4>

          <span className="py-1 px-3 bg-primary-300/80 rounded-full">
            + 10% since last month
          </span>
        </div>
        <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
          <RiLineChartLine className="text-5xl" />
          <h4 className="text-2xl">Earnings</h4>
          <span className="text-5xl text-white">&euro; 8,350</span>
          <span className="py-1 px-3 bg-primary-300/80 rounded-full">
            + 10% since last month
          </span>
        </div>
        {/* Card 3 */}
        <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
          <h1 className="text-2xl font-bold mb-8">Your projects</h1>
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <div className="flex items-center gap-4 mb-4 overflow-y-scroll">
              <div className="w-14 h-36 object-cover rounded-full "></div>
            </div>
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
        <div>
          <h1 className="text-2xl font-bold mb-8">Sus ventas</h1>
          <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
            {/* Card 1 */}
            <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
              <div className="col-span-2 flex items-center gap-4">
                <img
                  src="https://img.freepik.com/foto-gratis/hombre-joven-hermoso-contento-camiseta-azul-que-senala-lado_1262-17845.jpg"
                  className="w-14 h-14 object-cover rounded-xl"
                />
                <div>
                  <h3 className="font-bold">Emma</h3>
                </div>
              </div>
              <div>
                <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                  curso-cursos
                </span>
              </div>
              <div>
                <span className="font-bold">&euro; 1,200.87</span>
              </div>
            </div>
            {/* Card 2 */}
            <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
              <div className="col-span-2 flex items-center gap-4">
                <img
                  src="https://img.freepik.com/foto-gratis/alegre-joven-deportista-posando-mostrando-pulgares-arriba-gesto_171337-8194.jpg"
                  className="w-14 h-14 object-cover rounded-xl"
                />
                <div>
                  <h3 className="font-bold">Rama</h3>
                </div>
              </div>
              <div>
                <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                  curso-cursos
                </span>
              </div>
              <div>
                <span className="font-bold">&euro; 12,998.88</span>
              </div>
            </div>
          </div>
          <div className="bg-primary-900 text-gray-300 p-8 rounded-xl shadow-2xl flex items-center justify-between flex-wrap xl:flex-nowrap gap-8">
            <div>
              <RiHashtag className="text-4xl -rotate-12" />
            </div>
            <div>
              <h5 className="font-bold text-white">Engage with clients</h5>
              <h5>Join slack channel</h5>
            </div>
            <div className="w-full xl:w-auto">
              <button className="bg-primary-100 py-2 px-6 rounded-xl text-white w-full">
                Join now
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-8">Recommended project</h1>
          <div className="bg-white p-10 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
            <div>
                <div className="flex flex-wrap gap-4 mb-4 overflow-y-scroll">
                  {products?.map((p) => (
                    <div key={p.id} className="w-1/3 max-w-xs">
                      <div className="h-36 object-cover rounded-full ">
                        <div className="h-24 w-full rounded-md border border-gray-200">
                          <img
                            src={p.image}
                            alt="img"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="mt-2">
                          <div className="text-base font-medium text-gray-900">
                            <a href="">{p.name}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
