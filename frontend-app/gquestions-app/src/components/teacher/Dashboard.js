import React, { useEffect, useRef, useState, Fragment } from 'react';
import Navbar from '../../containers/Navbar';
import '../../assets/styles/tailwind.css';
import { Helmet } from "react-helmet";
import AOS from "aos";
import backgroundGeneralYellowDark from "../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../assets/images/background-general-yellow_light.png";
import link_examen from "../../assets/images/link_examen.png";
import { DropdownUser } from '../user/DropdownUser';
import { GetGeneracionesUsuarioAPI } from '../../api/Dashboard/GetGeneracionesUsuarioAPI';
import { useHistory } from 'react-router';
import { PrintGeneracion } from './PrintGeneracion';
import Scrollbars from "react-custom-scrollbars";
import emptyImage from '../../assets/images/empty_generaciones.png';
import { Dialog, Transition } from '@headlessui/react';
import { LoadingPage } from '../../containers/LoadingPage';

export const Dashboard = () => {

  const [generaciones, setGeneraciones] = useState([])
  const history = useHistory();
  const [irDownload, setIrDownload] = useState(false)
  const [downloadGeneracion, setDownloadGeneracion] = useState([])
  const [generacionesEmpty, setGeneracionesEmpty] = useState(false)

  const [isLoading, setIsLoading] = useState(true);

  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  // Hooks Link de acceso a exámenes
  const [isOpen, setIsOpen] = useState(false);

  const [copyText, setCopyText] = useState("Copiar");
  const [linkExamenes, setLinkExamenes] = useState("");

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
    let generacion = await fetch("http://127.0.0.1:8000/api/generacion/get/" + id_generacion, {
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
    if (response === false) { //Verifica si hay un error en el server al obtener las generaciones

      setIsLoading(true)
    }
    else{
      setGeneraciones(response)
      // Verificaca de que haya elementos generados, si no los hay, entonces, muestra mensaje de vacío
      if (response.length === 0) setGeneracionesEmpty(true)
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

  const onClickDownload = async (e) => {
    let id_generacion = e.target.id;
    let generacion = await getGeneracionFromDB(id_generacion);
    console.log(generacion[0].generaciones_texto)
    setDownloadGeneracion(generacion[0].generaciones_texto)
    setIrDownload(true)
    console.log(downloadGeneracion.ir)
  }

  function openModal(e) {
    setLinkExamenes("localhost:3000/student/login-examen/" + e.target.id)
    setIsOpen(true)
  }

  function closeModal() {
    setCopyText("Copiar")
    setIsOpen(false);
  }

  const copyTextFunction = () => {
    navigator.clipboard.writeText(linkExamenes);
    setCopyText("Enlace copiado");
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
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"></link>
        </Helmet>

        <Navbar className='fixed' />

        <CustomScrollbars
          autoHide
          autoHideTimeout={900}
          autoHideDuration={400}
          style={{ height: "100vh" }}
          data-aos="fade-right"
          className='container lg:text-base text-sm dark:text-white'>


          <div className="grid grid-rows xl:pl-32 px-8 py-8 md:px-8 lg:pl-16">
            <h1 className='font-black xl:text-5xl md:text-4xl text-2xl md:text-left md:mb-10 '>
              Dashboard
          </h1>
            <p className="text-gray-500 font-semibold text-sm md:text-base dark:text-gray-200">
              Aquí puedes deslizar y visualizar tus exámenes generados
          </p>
            {/* <button
          type="submit"
          className="md:text-base text-sm z-10 pl-1 block w-52 focus:outline-none bg-red-200 hover:bg-red-300 focus:bg-red-300 text-black rounded-lg px-2 py-2 font-semibold"
          onClick={handleClickPrueba}
          >
          Pruebas
        </button> */}
            <div className="mt-10">
              <p className={generacionesEmpty ? "hidden" : "text-gray-500 dark:text-gray-200 mb-4 uppercase text-lg"}>Historial de generaciones</p>
            </div>

            <CustomScrollbars
              className={generacionesEmpty ? 'hidden' : ''}
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
                      className="transition duration-500 py-4 rounded-xl hover:bg-gray-300 px-4 hover:bg-opacity-40 cursor-pointer font-bold border-b border-gray-300 dark:border-gray-700">
                      <div className="grid grid-rows-">
                        <p className="hidden sm:block">Generación número: {contador = contador + 1}</p>
                        <div className="grid grid-cols-12">
                          <p className="col-span-12 mb-4 sm:col-span-8 text-gray-500 text-sm dark:text-gray-400">Públicado - {generacion.fecha_generacion} | Número de examenes: {generacion.n_examenes} | Número de preguntas: {generacion.n_preguntas * generacion.n_examenes}</p>
                          <div className="col-span-12 sm:col-span-4 place-self-center sm:place-self-end">

                            <span
                              className="transition duration-500 hover:text-yellowmain text-gray-900 dark:text-gray-50 dark:hover:text-yellowmain material-icons mr-2"
                              id={generacion.id}
                              onClick={openModal}
                            >&#xe157;
                            </span>

                            <span
                              className="transition duration-500 hover:text-yellowmain text-gray-900 dark:text-gray-50 dark:hover:text-yellowmain material-icons mr-2"
                              onClick={onClickVerGeneracion}
                              id={generacion.id}
                            >&#xe8f4;
                            </span>

                            <span
                              className="transition duration-500 hover:text-yellowmain text-gray-900 dark:text-gray-50 dark:hover:text-yellowmain material-icons mr-2"
                              onClick={onClickDownload}
                              id={generacion.id}
                            >&#xf090;
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>)
                  )
                }

              </ul>
            }{isLoading && 
              <div>
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
                        Enlace de examen para tus estudiantes
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
                            <img src={link_examen} alt="linked" className="w-52"></img>
                          </div>
                          <li className="list-none">
                            <div className="grid grid-cols-12 text-sm text-gray-500 p-4 bg-gray-100 rounded-xl text-left border border-gray-200">
                              <p className="col-span-11 p-1 font-semibold text-blue-600 underline outline-none focus:outline-none">
                                {linkExamenes}
                              </p>

                              <div className="tooltip place-self-center select-none">
                                <button
                                  className="transition duration-500 col-span-1 p-1 hover:text-darkColor hover:bg-yellowlight rounded text-gray-900
                                   material-icons mr-2
                                    outline-none focus:outline-none"
                                  onClick={copyTextFunction}
                                >&#xe14d;
                              </button>
                                <span className="tooltiptext">{copyText}</span>
                              </div>
                            </div>

                          </li>
                        </ul>
                      </div>


                      <div className="flex mt-4 justify-end space-x-4 select-none">
                        <button
                          type="button"
                          className="btn-secondary  transition duration-500 inline-flex justify-center px-12 py-2 text-sm font-medium text-yellow-900 bg-yellow-100 border border-transparent 
                        rounded-md hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={closeModal}
                        >
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