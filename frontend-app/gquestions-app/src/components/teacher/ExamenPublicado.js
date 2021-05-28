import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneralGreenDark from "../../assets/images/background-general-green_dark.png";
import backgroundGeneralGreenLight from "../../assets/images/background-general-green_light.png";
import { DropdownUser } from "../teacher/user/DropdownUser";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const ExamenPublicado = () => {


  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));
  const linkExamenes = "localhost:3000/student/login-examen/" + localStorage.getItem('uuid_generacion');
  const [copyText, setCopyText] = useState("Copiar");

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }

  }, []);

  const copyTextFunction = () => {
    navigator.clipboard.writeText(linkExamenes);
    setCopyText("Enlace copiado");
  }

  return (
    <div
      ref={darkModeRef}
      className="flex container w-screen font-manrope"
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
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"></link>
      </Helmet>

      <Navbar className="fixed" />

      <div className="container mx-auto flex justify-center items-center h-full" style={{ height: "100vh" }}>
        <div className="">
          <div className="grid text-center cols-span-12 mx-4">
            <h1 className="font-bold xl:text-5xl  md:text-4xl sm:text-3xl text-xl mb-10 dark:text-white">
              Examen publicado con éxito
              </h1>
          </div>

          <div className="text-center self-end mb-3 col-span-12 bg-gray">
            <p className="text-gray-500 font-semibold text-md dark:text-gray-400">Enlace del examen</p>
          </div>

          <div className="flex text-center px-12 md:px-20 col-span-12">
            <div className="w-full">
              <input
                type="text"
                id="cod_generado"
                className="text-base text-gray-400 text-center font-bold sm:col-span-4 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                      focus:ring-yellowlight w-full pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"

                name="cod_generado"
                disabled={true}
                value={linkExamenes}
              />
            </div>
            <div className="tooltip place-self-center select-none justify-items-end place-content-end justify-self-end">
              <button
                className="border border-gray-200 transition duration-500 col-span-1 p-2 mx-1 text-green-800 bg-green-200 
                          hover:bg-green-300 hover:border-gray-400 rounded-lg material-icons mr-2 outline-none focus:outline-none"
                onClick={copyTextFunction}
              >&#xe14d;
              </button>
              <span className="tooltiptext text-sm">{copyText}</span>
            </div>
          </div>


          <div className="py-4 px-12 md:px-20 col-span-12 my-0">
            <Link to="/teacher/dashboard">
              <button
                type="submit"
                className="transition duration-500 text-base z-10 pl-1 block w-full mx-auto focus:outline-none 
                bg-green-400 hover:bg-green-500 focus:bg-green-500 text-black rounded-lg px-2 py-2 font-semibold"
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
