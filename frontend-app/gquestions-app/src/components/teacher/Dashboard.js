import React, { useEffect, useRef, useState, Fragment } from 'react';
import Navbar from './Navbar';
import '../../assets/styles/tailwind.css';
import { Helmet } from "react-helmet";
import AOS from "aos";
import backgroundGeneralYellowDark from "../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../assets/images/background-general-yellow_light.png";
import link_examen from "../../assets/images/link_examen.png";
import { DropdownUser } from '../teacher/user/DropdownUser';
import { GetGeneracionesUsuarioAPI } from '../../api/Dashboard/GetGeneracionesUsuarioAPI';
import { useHistory } from 'react-router';
import { PrintGeneracion } from './PrintGeneracion';
import Scrollbars from "react-custom-scrollbars";
import emptyImage from '../../assets/images/empty_generaciones.png';
import { Dialog, Transition } from '@headlessui/react';
import { LoadingPage } from '../../containers/LoadingPage';
import { BASE_DIR } from '../../api/BaseDirURl';

export const Dashboard = () => {

  const [generaciones, setGeneraciones] = useState([])
  const history = useHistory();
  const [irDownload, setIrDownload] = useState(false)
  const [downloadGeneracion, setDownloadGeneracion] = useState([])
  const [generacionesEmpty, setGeneracionesEmpty] = useState(false)

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLink, setIsLoadingLink] = useState(false);

  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  // Hooks Link de acceso a exámenes
  const [isOpen, setIsOpen] = useState(false);

  const [copyText, setCopyText] = useState("Copiar");
  const [linkExamenes, setLinkExamenes] = useState("");
  const [passwordExamen, setPasswordExamen] = useState("");

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }
    AOS.init({
      duration: 800,
    })
    setIsLoading(false);
    getGeneracionesFromDB();// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getGeneracionFromDB = async (id_generacion) => {
    let generacion = await fetch(BASE_DIR + "api/generacion/get/" + id_generacion, {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify()
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      }).catch(err => {
        console.log(err)
        return false;
      })
    return generacion;
  }

  const getGeneracionesFromDB = async () => {
    setIsLoading(true);
    const response = await GetGeneracionesUsuarioAPI(localStorage.getItem('id_user'));
    const arrayTempGeneraciones = []

    if (response === false) { //Verifica si hay un error en el server al obtener las generaciones

      setIsLoading(true)
    }
    else {
      response.map(generacion => {
        if (generacion.generaciones_texto.length !== 0) { //Verifica que las generaciones tengan el texto generado, si no lo tiene no lo agrega al renderizado
          arrayTempGeneraciones.push(generacion)
        }
        return true;
      })

      setGeneraciones(arrayTempGeneraciones)
      // Verificaca de que haya elementos generados, si no los hay, entonces, muestra mensaje de vacío
      if (arrayTempGeneraciones.length === 0) setGeneracionesEmpty(true)
      else setGeneracionesEmpty(false)

      setIsLoading(false);
    }
  }

  const onClickVerGeneracion = (e) => {
    history.push({
      pathname: '/teacher/visualizar-generacion',
      //search: '?query=abc',
      state: { id_generacion: e.target.id }
    })
  }

  /*   const onClickGeneracion = (e) => {
      history.push({
        pathname: '/teacher/visualizar-generacion',
        //search: '?query=abc',
        state: { id_generacion: e.target.id }
      })
    } */

  const onClickDownload = async (e) => {
    let id_generacion = e.target.id;
    let generacion = await getGeneracionFromDB(id_generacion);

    setDownloadGeneracion(generacion[0].generaciones_texto)
    setIrDownload(true)
  }

  async function openModal(e) {
    let id_generacion = e.target.id;
    setLinkExamenes("https://gquestions.herokuapp.com/student/login-examen/" + e.target.id)

    setIsLoadingLink(true);
    let generacion = await getGeneracionFromDB(id_generacion);
    setPasswordExamen(generacion[0].generacion_examenes[0].contrasena_exam);
    setIsOpen(true)
    setIsLoadingLink(false);
  }

  function closeModal() {
    setCopyText("Copiar")
    setIsOpen(false);
  }

  const copyTextFunction = () => {
    navigator.clipboard.writeText(linkExamenes);
    setCopyText("Enlace copiado");
  }

  function FormatDateFunction(date) {
    var dateFormat = require('dateformat');
    var now = date;
    var date_custom = dateFormat(now);

    return date_custom;
  }

  if (irDownload === false) {
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
        }}
      >
        <Helmet>
          <title>Dashboard - GQuestions</title>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
            rel="stylesheet"></link>
        </Helmet>

        <Navbar className='fixed' />

        <CustomScrollbars
          autoHide
          autoHideTimeout={900}
          autoHideDuration={400}
          style={{ height: "100vh" }}
          data-aos="fade-right"
          className='lg:text-base text-sm dark:text-white'>


          <div className="container grid grid-rows xl:px-32 px-6 py-8 md:px-8 lg:px-16">
            <h1 className='font-black xl:text-5xl md:text-4xl text-2xl md:text-left md:mb-10 mb-4'>
              Dashboard
          </h1>
            <p className="text-gray-500 font-semibold text-sm md:text-base dark:text-gray-200 mb-4">
              Aquí puedes deslizar y visualizar tus exámenes generados
          </p>
            {/* <button
          type="submit"
          className="md:text-base text-sm z-10 pl-1 block w-52 focus:outline-none bg-red-200 hover:bg-red-300 focus:bg-red-300 text-black rounded-lg px-2 py-2 font-semibold"
          onClick={handleClickPrueba}
          >
          Pruebas
        </button> */}
            <div className="backdrop-filter backdrop-blur-lg bg-yellowlight bg-opacity-50 dark:bg-opacity-100 border-gray-200 rounded-t-xl container shadow">
              <div className={generacionesEmpty ? "hidden" : "pl-4 rounded-t-xl py-2 text-yellow-900 font-bold uppercase text-sm"}>Historial de generaciones</div>
            </div>

            <CustomScrollbars
              className={generacionesEmpty ? 'hidden' : 'container shadow bg-white bg-opacity-50 border-gray-100 dark:bg-darkColor dark:bg-opacity-80 border dark:border-gray-800 rounded-b-xl shadow-b'}
              autoHide
              autoHideTimeout={900}
              autoHideDuration={400}
              style={{ height: "70vh" }}>

              {!isLoading &&
                <ul>
                  {
                    generaciones.map((generacion, contador = 1) => (
                      <li
                        key={contador}
                        id={generacion.id}
                        className="duration-500 pt-6 pb-4 hover:bg-gray-200 px-4 hover:bg-opacity-40 
                          cursor-pointer font-bold border-b border-gray-300 dark:border-gray-700 
                          dark:hover:bg-opacity-10">
                        <div className="grid transition pointer-events-none" >
                          <p className="hidden sm:block">Generación {contador + 1}</p>
                          <div className="grid grid-cols-12">
                            <p className="col-span-12 mb-4 sm:col-span-8 text-gray-500 text-sm dark:text-gray-400">Generado: {FormatDateFunction(generacion.fecha_generacion)} | Cantidad de examenes: {generacion.n_examenes} | Cantidad de preguntas: {generacion.n_preguntas * generacion.n_examenes}</p>
                            <div className="col-span-12 sm:col-span-4 place-self-center sm:place-self-end mr-2 pointer-events-auto">

                              {generacion.generacion_examenes.length === 0 &&
                                <div className="tooltip select-none">
                                  <span
                                    className="ml-2 transform hover:scale-110 hover:text-yellowmain text-gray-900 dark:text-gray-50 dark:hover:text-yellowmain material-icons-outlined mr-2"
                                    id={generacion.id}
                                  >&#xe16f;
                                </span>
                                  <span className="tooltiptext text-sm">Sin examen</span>
                                </div>
                              }{generacion.generacion_examenes.length !== 0 &&
                                <div className="tooltip select-none ">
                                  {!isLoadingLink &&
                                    <span>
                                      <span
                                        className="ml-2 transform hover:scale-110 hover:text-yellowmain text-gray-900 dark:text-gray-50 dark:hover:text-yellowmain material-icons-outlined mr-2"
                                        id={generacion.id}
                                        name={`${generacion.id}-modal`}
                                        onClick={openModal}
                                      >&#xe157;
                                      </span>
                                      <span className="tooltiptext text-sm">Enlace examen</span>
                                    </span>
                                  }{isLoadingLink &&
                                    <span>
                                       <span
                                        className="ml-2 transform hover:scale-110 hover:text-yellowmain text-gray-900 dark:text-gray-50 dark:hover:text-yellowmain material-icons-outlined mr-2"
                                      >&#xe88b;
                                      </span>
                                    </span>}

                                </div>
                              }

                              <div className="tooltip place-self-center select-none">
                                <span
                                  className="ml-2 transform hover:scale-110 hover:text-yellowmain text-gray-900 dark:text-gray-50 dark:hover:text-yellowmain material-icons-outlined mr-2"
                                  onClick={onClickVerGeneracion}
                                  name={`${generacion.id}-show-generacion`}
                                  id={generacion.id}
                                >&#xe8f4;
                                </span>
                                <span className="tooltiptext text-sm">Visualizar</span>
                              </div>
                              <div className="tooltip place-self-center select-none">
                                <span
                                  className="ml-2 transform hover:scale-110 hover:text-yellowmain text-gray-900 dark:text-gray-50 dark:hover:text-yellowmain material-icons-outlined mr-2"
                                  onClick={onClickDownload}
                                  id={generacion.id}
                                >&#xe2c4;
                                </span>
                                <span className="tooltiptext text-sm">Descargar</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>)
                    )
                  }

                </ul>
              }{isLoading &&
                <div className="pt-52">
                  <LoadingPage />
                </div>}
            </CustomScrollbars>

            {/* Link exámenes Modal */}
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto font-manrope"
                onClose={closeModal}
              >
                {/* Use the overlay to style a dim backdrop for your dialog */}
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
                <div className="min-h-screen px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0" />
                  </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold leading-6 text-gray-900 select-none"
                      >
                        Enlace del examen para tus estudiantes
                      </Dialog.Title>
                      <div className="mt-2">

                      </div>

                      <div className="mt-6">
                        <ul className="list-none space-y-4 md:text-justify">
                          <li>
                            <p className="text-gray-500 text-sm md:text-base dark:text-gray-200">
                              Este es el enlace que puedes compartir con tus estudiantes para que puedan acceder a los examenes correspondientes a esta generación.
                            </p>
                          </li>
                          <div className="flex place-content-center select-none">
                            <img src={link_examen} alt="linked" className="md:w-64 w-52"></img>
                          </div>
                          <li className="list-none">
                            <div className="grid grid-cols-12 text-sm text-gray-500 p-4 bg-gray-100 rounded-t-xl text-left border border-gray-200">
                              <p className="col-span-11 p-1 font-semibold text-blue-600 underline outline-none focus:outline-none">
                                {linkExamenes}
                              </p>

                              <div className="tooltip place-self-center select-none">
                                <button
                                  className="ml-2 transition duration-500 col-span-1 p-1 hover:text-darkColor hover:bg-yellowlight rounded text-gray-900
                                   material-icons-outlined mr-2 outline-none focus:outline-none"
                                  onClick={copyTextFunction}
                                >&#xe14d;
                              </button>
                                <span className="tooltiptext">{copyText}</span>
                              </div>
                            </div>
                            <div className="text-center px-4 bg-gray-100 rounded-b-xl border border-gray-200">
                              <p className="p-1 text-xl font-semibold text-gray-400 outline-none focus:outline-none">
                                Contraseña: {passwordExamen}
                              </p>
                            </div>

                          </li>
                        </ul>
                      </div>


                      <div className="flex mt-4 justify-end space-x-4 select-none">
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={closeModal}>
                          Cerrar
                      </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>

            <div className={generacionesEmpty ? 'py-40 px-6 select-none' : 'hidden'}>
              <p className="dark:text-gray-200 text-gray-800 text-center">Oops... Todavía no tienes generaciones, puedes ir a la pestaña de generación y generar tus primeros exámenes</p>
              <img src={emptyImage} alt="empty" className="md:w-96 py-8 sm:w-64 w-64" style={{ display: "block", margin: "auto" }}></img>
            </div>

          </div>
        </CustomScrollbars>
        <DropdownUser />
      </div>
    );
  } if (irDownload === true) {
    return (
      <PrintGeneracion generacion={downloadGeneracion} />
    )
  }
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