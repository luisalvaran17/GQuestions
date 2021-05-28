import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneralGreenDark from "../../assets/images/background-general-green_dark.png";
import backgroundGeneralGreenLight from "../../assets/images/background-general-green_light.png";
import { DropdownUser } from "../teacher/user/DropdownUser";
import { StepsProgress } from "./StepsProgress";
import { CreateConfiguracionExamenAPI } from "../../api/Examen/CreateConfiguracionExamenAPI";
import { CreateExamenAPI } from "../../api/Examen/CreateExamenAPI";
import ReactDOM from 'react-dom'
import { ExamenPublicado } from "./ExamenPublicado";
import { Helmet } from "react-helmet";
import Scrollbars from "react-custom-scrollbars";

export const ExamenConfiguracion = (props) => {

  const divRefErrorMessage = React.createRef();
  const Textos = props.textos;
  const { v4: uuidv4 } = require("uuid"); // id aleatorio (uuuidv4)  

  const [isLoading, setIsLoading] = useState(false);  
  const [errorServer, setErrorServer] = useState({
    boolError: false,
  });
  const errorServerRef = useRef();

  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  const [examenConfiguracion, setExamenConfiguracion] = useState({
    id_configuracion_examen: "",
    title_exam: "Sin título",
    contrasena_exam: '',
    n_intentos: 1,
    fecha_hora_ini: '',
    fecha_hora_fin: '',
    generacion: '',
  });

  const [examen, setExamen] = useState({
    id_examen: '',
    assigned_to: '',
    texto: '',
    examen_configuracion: ''
  })

  const [irExamenPublicado, setIrExamenPublicado] = useState(false)

  useEffect(() => {

    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }
    setIsLoading(false);
    // componentwillunmount
    return () => {
    }
  }, []);

  const handleClick = async () => {
    if (checkFieldsValidations() === true) {
      await setExamenesDB();
      if (errorServer.boolError === false && isLoading === false) setIrExamenPublicado(true);
      else {
        setIsLoading(true);
        errorServerRef.current.classList.remove('hidden');
      }
    }
  }

  const setExamenesDB = async () => {
    let UUID_EXAMEN_CONFIGURACION = ""
    let UUID_EXAMEN = "" // utilizada para guardar temporalmente el uuid del texto base y crear la relacion con las preguntas de dicho texto
    let splitUUID = []

    UUID_EXAMEN_CONFIGURACION = uuidv4();
    splitUUID = UUID_EXAMEN_CONFIGURACION.split("-");
    UUID_EXAMEN_CONFIGURACION = splitUUID[0] //+ "-" + splitUUID[1]; // Acorta el  UUID GENERADO POR LA FUNCION uuidv4() 
    setExamenConfiguracion(
      Object.assign(examenConfiguracion, {
        id_configuracion_examen: UUID_EXAMEN_CONFIGURACION,
        generacion: localStorage.getItem('uuid_generacion'),
      })
    )

    setIsLoading(true);
    let response = await CreateConfiguracionExamenAPI(examenConfiguracion); // POST de examen al endpoint
    if (response === false) {
      setErrorServer(
        Object.assign(errorServer, {
          boolError: true,
        })
      );
    }

    for (let i = 0; i < Textos.length; i++) {

      UUID_EXAMEN = uuidv4();
      splitUUID = UUID_EXAMEN.split("-");
      UUID_EXAMEN = splitUUID[0] //+ "-" + splitUUID[1]; // Acorta el  UUID GENERADO POR LA FUNCION uuidv4()  

      setExamen(
        Object.assign(examen, {
          id_examen: UUID_EXAMEN,
          generacion: localStorage.getItem('uuid_generacion'),
          texto: Textos[i].id,
          examen_configuracion: UUID_EXAMEN_CONFIGURACION,
        })
      )
      await CreateExamenAPI(examen); // POST de examen al endpoint
    }
    setIsLoading(false);
  }

  const handleChange = (e) => {
    setExamenConfiguracion(
      Object.assign(examenConfiguracion, {
        [e.target.name]: e.target.value,
      })
    )
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
          <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM=" crossorigin="anonymous" />
        </Helmet>

        <Navbar className="fixed" />

        <CustomScrollbars
          autoHide
          autoHideTimeout={900}
          autoHideDuration={400}
          style={{ height: "100vh" }}
          data-aos="fade-right" 
          className="container xl:mx-32 mx-4 md:mx-8 lg:mx-16 mt-8 dark:text-white">

          <div className="grid grid-rows">
            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left mb-12 lg:mb-20 text-2xl">
              Configuración examen
            </h1>
            <div className="grid grid-cols-12 sm:mb-44 mb-0">
              <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-6 mb-2">
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

              <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-6 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                  Fecha y hora de fin
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

              <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-6 mb-2">
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

            <div className="grid grid-cols-12 sm:mb-44 mb-16 ">
              <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-6 mb-2">
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

              <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-6 mb-2">
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

            <div className="grid grid-rows justify-end items-end mr-6">
              {!isLoading &&
                <button
                  type="submit"
                  className="btn-primary"
                  onClick={handleClick}
                >
                  Terminar
              </button>
              }{isLoading &&
                <button
                  type="submit"
                  className="btn-primary"
                >
                  <span className="text-white my-0 mr-4 w-0 h-0">
                    <i className="fas fa-circle-notch fa-spin fa-x"></i>
                  </span>
                  Publicando ...
                </button>}
                <p ref={errorServerRef} className="hidden place-self-center text-sm border-l border-r border-b border-red-300 dark:border-red-300 p-2 rounded-t  rounded-lg text-red-600 dark:text-red-200">
                  Ha ocurrido un error de conexión
                </p>
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
        </CustomScrollbars>
        <DropdownUser />
      </div>
    );
  } else if (irExamenPublicado) {
    return (
      <ExamenPublicado />
    );
  }
}

// Funciones que cambian el estilo del scroll y otras props de una librería
const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: 'rgba(35, 49, 86, 0.8)',
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = props => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);