import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar';
import '../../../assets/styles/tailwind.css';
import Scrollbars from "react-custom-scrollbars";
import { Helmet } from 'react-helmet';
import backgroundGeneralYellowDark from "../../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../../assets/images/background-general-yellow_light.png";
import { DropdownUser } from '../user/DropdownUser';
import { GetGeneracionesUsuarioAPI } from '../../../api/Dashboard/GetGeneracionesUsuarioAPI';
import { GetConfiguracionExamenAPI } from '../../../api/Examen/GetConfiguracionExamenAPI';
import { LoadingPage } from '../../../containers/LoadingPage';
import { useHistory } from 'react-router';

export const Calificaciones = () => {

  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  const [isLoading, setIsLoading] = useState(true);

  const [configuracionExamenes, setConfiguracionExamenes] = useState([])

  const history = useHistory();

  const [examenesEmpty, setExamenesEmpty] = useState(false)

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }
    getGeneracionesFromDB();
    setIsLoading(false);
  }, [])

  const getGeneracionesFromDB = async () => {
    setIsLoading(true);
    const response = await GetGeneracionesUsuarioAPI(localStorage.getItem('id_user'));

    if (response === false) { //Verifica si hay un error en el server al obtener las generaciones
      setIsLoading(true)
    }
    else {
      for (let i = 0; i < response.length; i++) {
        if (response[i].generacion_examenes.length !== 0) { //Verifica que las generaciones tengan el texto generado, si no lo tiene no lo agrega al renderizado
          const response_conf_examen = await GetConfiguracionExamenAPI(response[i].generacion_examenes[0])
          let config_examen = response_conf_examen[0];
          setConfiguracionExamenes(response_conf_examen => [...response_conf_examen, config_examen]);
        }
      }
      // Verificaca de que haya elementos generados, si no los hay, entonces, muestra mensaje de vacío
      if (response.length === 0) setExamenesEmpty(true)
      else setExamenesEmpty(false)

      setIsLoading(false);
    }
  }

  function FormatDateFunction(date) {
    var dateFormat = require('dateformat');
    var now = date;
    var date_custom = dateFormat(now);
    return date_custom;
  }

  const handleClickExamenConfiguracion = e => {
    let id_examen_configuracion = e.target.id;
    history.push('/teacher/calificaciones/' + id_examen_configuracion);
  }

  return (
    <div
      ref={darkModeRef}
      className="flex container w-screen font-manrope"
      style={{
        backgroundImage: `url(${darkModeBool ? backgroundGeneralYellowDark : backgroundGeneralYellowLight})`,
        width: "100%",
        height: "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "",
        minWidth: "100%",
      }}>

      <Helmet>
        <title>Calficaciones - GQuestions</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"></link>
      </Helmet>

      <Navbar className="fixed" />

      <CustomScrollbars
        autoHide
        autoHideTimeout={900}
        autoHideDuration={400}
        style={{ height: "100vh" }}
        data-aos="fade-right"
        className='lg:text-base text-sm dark:text-white'>


        <div className="grid grid-rows xl:pl-32 px-8 py-8 md:px-8 lg:pl-16">
          <h1 className='font-black xl:text-5xl md:text-4xl text-2xl md:text-left md:mb-10 '>
            Calificaciones
          </h1>
          <p className="text-gray-500 font-semibold text-sm md:text-base dark:text-gray-200 mb-4">
            Aquí puedes seleccionar el examen y visualizar las calificaciones de los estudiantes.
          </p>
          {/* <button
          type="submit"
          className="md:text-base text-sm z-10 pl-1 block w-52 focus:outline-none bg-red-200 hover:bg-red-300 focus:bg-red-300 text-black rounded-lg px-2 py-2 font-semibold"
          onClick={handleClickPrueba}
          >
          Pruebas
        </button> */}

          <div className="bg-yellowlight rounded-t-xl border-t container">
            <div className="pl-4 bg-yellowlight rounded-t-xl py-2 text-yellow-900 font-semibold">Todos los exámenes</div>
          </div>

          <CustomScrollbars
            className={examenesEmpty ? 'hidden' : 'container shadow bg-white bg-opacity-50 dark:bg-darkColor dark:bg-opacity-100 border dark:border-gray-800 rounded-b-xl shadow-b'}
            autoHide
            autoHideTimeout={900}
            autoHideDuration={400}
            style={{ height: "70vh" }}>

            {!isLoading &&
              <ul>
                {
                  configuracionExamenes.map((examen, contador = 1) => (
                    <li
                      key={contador}
                      id={examen.id_configuracion_examen}
                      onClick={handleClickExamenConfiguracion}
                      className="duration-500 pt-6 pb-4 hover:bg-gray-200 pl-4 pr-8 hover:bg-opacity-40 
                                                cursor-pointer font-bold border-b border-gray-300 dark:border-gray-700 dark:hover:bg-opacity-10">
                      <div className="grid transition pointer-events-none" >
                        <div className="grid grid-cols-12">
                          <div className="sm:col-span-10 col-span-12">
                            <p className="hidden sm:block">Examen {examen.title_exam}</p>
                            <p className="col-span-12 mb-4 sm:col-span-8 text-gray-500 text-sm dark:text-gray-400">Aplicado: {FormatDateFunction(examen.contestado)} | Intentos: {examen.n_intentos} | Duración: {examen.duracion / 3600} h</p>
                          </div>

                          <div className="sm:col-span-2 col-span-12 sm:justify-self-end place-self-center pointer-events-auto">
                            <div className="flex mr-2">

                              <div className="tooltip select-none" id={examen.id_configuracion_examen} onClick={handleClickExamenConfiguracion}>
                                <span
                                  className="ml-2 transition duration-500 hover:text-yellowmain text-yellow-900 dark:text-gray-50 dark:hover:text-yellowmain material-icons mr-2 pointer-events-none"
                                >&#xe5cc;
                                </span>
                                <span className="tooltiptext text-sm">Ir</span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </li>
                  )
                  )
                }
              </ul>
            }{isLoading &&
              <div className="pt-52">
                <LoadingPage />
              </div>}
          </CustomScrollbars>

          <div className={examenesEmpty ? 'py-40 px-6 select-none' : 'hidden'}>
            <p className="dark:text-gray-200 text-gray-800 text-center">Todavía no tienes exámenes generados</p>
          </div>

        </div>
      </CustomScrollbars>

      <DropdownUser />
    </div>
  );
}

// Funciones que cambian el estilo del scroll y otras props de una librería
const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: 'rgba(35, 49, 86, 0.8)'
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
