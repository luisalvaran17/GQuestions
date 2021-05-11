import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneralGreenDark from "../../assets/images/background-general-green_dark.png";
import backgroundGeneralGreenLight from "../../assets/images/background-general-green_light.png";
import { DropdownUser } from "../user/DropdownUser";
import { StepsProgress } from "./StepsProgress";
import { CreateExamenAPI } from "../../api/Examen/CreateExamenAPI";
import ReactDOM from 'react-dom'
import { ExamenPublicado } from "./ExamenPublicado";

export const ExamenConfiguracion = (props) => {

  const divRefErrorMessage = React.createRef();
  const Textos = props.textos;

  const { v4: uuidv4 } = require("uuid"); // id aleatorio (uuuidv4)  
  
  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  const [examenConfiguracion, setExamenConfiguracion] = useState({
    id_examen: "",
    title_exam: "Sin título",
    contrasena_exam: '',
    n_intentos: 1,
    fecha_hora_ini: '',
    fecha_hora_fin: '',
    generacion: '',
  });

  const [irExamenPublicado, setIrExamenPublicado] = useState(false)

  useEffect(() => {

    if(localStorage.theme === 'dark'){
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    }else{
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }

    // componentwillunmount
    return () => {
    }
  }, []);

  const handleClick = () => {
    if (checkFieldsValidations() === true) {
      setExamenesDB();
      setIrExamenPublicado(true);
    }
  }

  const setExamenesDB = async () => {

    let UUID_EXAMEN = "" // utilizada para guardar temporalmente el uuid del texto base y crear la relacion con las preguntas de dicho texto
    let splitUUID = []

    for (let i = 0; i < Textos.length; i++) {
      UUID_EXAMEN = uuidv4();
      splitUUID = UUID_EXAMEN.split("-");
      UUID_EXAMEN = splitUUID[0] //+ "-" + splitUUID[1]; // Acorta el  UUID GENERADO POR LA FUNCION uuidv4()  

      setExamenConfiguracion(
        Object.assign(examenConfiguracion, {
          id_examen: UUID_EXAMEN,
          generacion: localStorage.getItem('uuid_generacion'),
        })
      )
      await CreateExamenAPI(examenConfiguracion); // POST de examen al endpoint
    }
  }

  const handleChange = (e) => {
    setExamenConfiguracion(
      Object.assign(examenConfiguracion, {
        [e.target.name]: e.target.value,
      })
    )
    console.log(examenConfiguracion)
  };

  const checkFieldsValidations = () => {
    let boolEmpty = false;
    let boolContrasena = false;

    let p_empty = "";
    let p_contrasena = "";

    if (
      examenConfiguracion.contrasena_exam === "" ||
      examenConfiguracion.n_intentos === 0 ||
      examenConfiguracion.fecha_hora_ini === "" ||
      examenConfiguracion.fecha_hora_fin === ""
    ) {
      boolEmpty = true;
      p_empty = React.createElement('p', {}, '●  Hay campos vacíos');
    }
    if (examenConfiguracion.contrasena_exam.length < 4) {
      boolContrasena = true;
      p_contrasena = React.createElement('p', {}, '●  La contraseña debe tener al menos 4 carácteres');
    }

    if (boolContrasena || boolEmpty) {
      removeClassdivRefErrorMessage();
      const X = React.createElement('div', {}, [p_empty, p_contrasena]);
      ReactDOM.render(X, document.getElementById('error_messages'));
      return false;
    }
    else {
      return true;
    }
  }

  const addClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.add("hidden");
  };

  const removeClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.remove("hidden");
  };

  if (!irExamenPublicado) {
    return (
      <div
        ref={darkModeRef}
        className="flex container w-screen h-screen font-manrope"
        style={{
          backgroundImage: `url(${darkModeBool ? backgroundGeneralGreenDark: backgroundGeneralGreenLight})`,
          width: "100%",
          height: "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "",
          minWidth: "100%",
        }}
      >
        <div>
          <Navbar className="fixed" />
        </div>
        <div className="container xl:mx-32 mx-4 md:mx-8 lg:mx-16 mt-8 dark:text-white">
          <div className="grid grid-rows">
            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left mb-12 lg:mb-20 text-2xl">
              Configuración examen
            </h1>
            <div className="grid grid-cols-12 sm:mb-44 mb-0">
              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                  Fecha y hora de inicio
                </label>
                <input
                  type="datetime-local"
                  id="fecha_hora_ini"
                  className="text-sm text-gray-800 md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  placeholder="dd/mm/aaaa"
                  name="fecha_hora_ini"
                  onChange={handleChange}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                  Fecha y hora de finalización
                </label>
                <input
                  type="datetime-local"
                  id="fecha_hora_fin"
                  className="text-sm text-gray-800 md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  placeholder="dd/mm/aaaa"
                  name="fecha_hora_fin"
                  onChange={handleChange}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                  Contraseña del examen
                </label>
                <input
                  type="password"
                  id="contrasena_exam"
                  className="grid text-s text-gray-800 mtext-gray-800 md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"

                  name="contrasena_exam"
                  placeholder="Contraseña"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 mb-44 ">
              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                  Nombre del examen
                </label>
                <input
                  type="text"
                  className="grid text-sm text-gray-800 md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"

                  name="title_exam"
                  placeholder="Ingresa el nombre del examen"
                  onChange={handleChange}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                  Número de intentos
                </label>
                <input
                  type="number"
                  id="numero_intentos"
                  className="grid text-sm text-gray-800 md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  name="numero_intentos"
                  placeholder="Por defecto 1"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="py-3 mt-4 w-full">
              <hr></hr>
            </div>
            <div className="grid grid-rows justify-end items-end">
              <button
                type="submit"
                className="transition duration-500 z-10 px-4 block focus:outline-none bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 text-black rounded-lg py-2 mb-1 font-semibold"
                onClick={handleClick}
              >
                Terminar y públicar
              </button>
            </div>
          </div>

          {/* Stepper progress bar */}
          <StepsProgress active={4} />

          {/* Error messages */}
          <div

            ref={divRefErrorMessage}
            className="hidden animate-pulse mt-1 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            <div id="error_messages" className="text-sm md:text-base">
            </div>

            <span
              className="absolute inset-y-0 right-0 flex items-center mr-4"
              onClick={addClassdivRefErrorMessage}
            >
              <svg
                className="w-4 h-4 fill-current"
                role="button"
                viewBox="0 0 20 20"
              >
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
        </div>
        <DropdownUser />
      </div>
    );
  } else if (irExamenPublicado) {
    return (
      <ExamenPublicado />
    );
  }
}