import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneralGreenDark from "../../assets/images/background-general-green_dark.png";
import backgroundGeneralGreenLight from "../../assets/images/background-general-green_light.png";
import { DropdownUser } from "../user/DropdownUser";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const ExamenPublicado = () => {


  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }

  }, []);

  return (
    <div
      ref={darkModeRef}
      className="flex container xl:justify-center xl:items-center w-screen h-screen font-manrope"
      style={{
        backgroundImage: `url(${darkModeBool ? backgroundGeneralGreenDark : backgroundGeneralGreenLight})`,
        width: "100%",
        height: "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "",
        minWidth: "100%",
      }}
    >
      <Helmet>
        <title>Examen publicado - GQuestions</title>
      </Helmet>
      <div className="xl:absolute xl:left-0">
        <Navbar className="fixed" />
      </div>
      <div className="container flex justify-center items-center">
        <div className="">
          <div className="grid text-center cols-span-12 mx-4">
            <h1 className="font-bold xl:text-5xl  md:text-4xl sm:text-3xl text-xl mb-10 dark:text-white">
              Examen publicado con éxito
              </h1>
          </div>

          <div className="text-center self-end mb-3 col-span-12">
            <p className="text-gray-500 font-semibold text-md dark:text-gray-400">Enlace del examen</p>
          </div>

          <div className="grid text-center px-12 md:px-20 col-span-12">
            <input
              type="text"
              id="cod_generado"
              className="grid md:text-lg text-2xl text-gray-400 text-center font-bold sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"

              name="cod_generado"
              disabled={true}
              value="http://enlace_prueba/uuid_generacion"
            />
          </div>


          <div className="py-4 px-12 md:px-20 col-span-12 my-0">
            <Link to="/teacher/dashboard">
              <button
                type="submit"
                className="text-base z-10 pl-1 block w-full mx-auto focus:outline-none bg-green-400 hover:bg-green-500 focus:bg-green-500 text-black rounded-lg px-2 py-2 font-semibold"
              >
                Aceptar
                </button>
            </Link>
          </div>

        </div>
      </div>
      <DropdownUser />
    </div>
  );
}
