import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/tailwind.css';
import backgroundHomeDark from '../assets/images/background_home_2x_dark.png';
import backgroundHomeLight from '../assets/images/background_home_2x.png';
import computerImage from '../assets/images/computer_image.png';
import iconVentajas_1 from '../assets/images/ventajas-icon-1.png';
import iconVentajas_2 from '../assets/images/ventajas-icon-2.png';
import iconVentajas_3 from '../assets/images/ventajas-icon-3.png';
import iconVentajas_4 from '../assets/images/ventajas-icon-4.png';
import proposito1 from '../assets/images/proposito1.png';
import proposito2 from '../assets/images/proposito2.png';
import proposito3 from '../assets/images/proposito3.png';
import proposito4 from '../assets/images/proposito4.png';
import screnshootMobiles from '../assets/images/mobiles-screenshots.png';
import LogoGQuestions from '../assets/images/logo.png';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CarouselEjemplo } from '../components/home/CarouselEjemplos';
import { Footer } from '../components/home/Footer';
import { useHome } from '../hooks/useHome';

export const Homepage = () => {

  const divRefMenu = React.createRef();
  const darkMode = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  const history = useHistory();

  const { logged } = useHome();
  const [navbar, setNavbar] = useState(false)
  const [buttonUp, setButtonUp] = useState(false)

  useEffect(() => {
    if (darkMode.current !== undefined) {
      if (localStorage.theme === 'dark') {
        darkMode.current.classList.add('dark');
        localStorage.setItem('bool-dark', true);
        setDarkModeBool(true);
      } else {
        darkMode.current.classList.remove('dark');
        setDarkModeBool(false);
      }
    }
  }, []);

  const addRemoveClassMenu = () => {
    let classList = divRefMenu.current.classList;
    let statusMenu = false;
    for (let i = 0; i < classList.length; i++) {
      if (classList[i] === 'hidden') {
        statusMenu = true;
        divRefMenu.current.classList.remove('hidden');
        break;
      } else {
        statusMenu = false;
      }
    }
    if (statusMenu === true) {
      divRefMenu.current.classList.remove('hidden');
    } else if (statusMenu === false) {
      divRefMenu.current.classList.add('hidden');
    }
    return true;
  };

  const changeBackgroundNavBar = () => {
    if (window.scrollY >= 20) setNavbar(true)
    else setNavbar(false)
  }

  const showButtonUp = () => {
    if (window.scrollY >= 600) setButtonUp(true)
    else setButtonUp(false)
  }

  window.addEventListener('scroll', changeBackgroundNavBar);
  window.addEventListener('scroll', showButtonUp)

  const scrollAnimation = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  };

  const handleDarkMode = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    if (value === true) {
      localStorage.setItem("theme", "dark");
      localStorage.setItem('bool-dark', true);
      darkMode.current.classList.add("dark");
      setDarkModeBool(true);
    }
    else if (value === false) {
      localStorage.removeItem("theme", "dark");
      localStorage.removeItem('bool-dark');
      darkMode.current.classList.remove("dark");
      setDarkModeBool(false);
    }
  }

  const onClickIrCuenta = () => {
    const rol_id_docente = "72eea687168b8c450afdeefa69c9d478b9ca90bfdcda1efb0029c9352ae4c70d";
    const rol_id_estudiante = "3d8388c45fc7f48e40800ff051117af34b204bb4a29098332f504774858e49db";

    let rol = localStorage.getItem('rol');
    if (rol_id_docente === rol) {
      history.push('/teacher/generacion')
    }
    else if (rol_id_estudiante === rol) {
      history.push('/student/home')
    }
  }

  if (logged === false) {
    return (

      <div ref={darkMode} className={localStorage.getItem("theme")}>

        <div id='inicio' className="font-manrope">

          <Helmet>
            <script src='https://unpkg.com/aos@2.3.1/dist/aos.js'></script>
            <title>GQuestions App</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"></link>
          </Helmet>
          {/* Header - Navbar */}
          <nav
            className={
              navbar
                ? 'navbar shadow-sm h-auto mx-auto flex items-center justify-between flex-wrap py-6  bg-gradient-to-r from-yellowlight via-white dark:from-darkColor to-white dark:via-darkColor dark:to-darkColor dark:bg-darkColor dark:text-white border-b border-gray-300 border-opacity-20'
                : 'navbar h-auto mx-auto flex items-center justify-between flex-wrap py-6 bg-transparent dark:bg-darkColor dark:text-white'
            }
          >
            <a
              className='animation-cards-examples flex items-center flex-shrink-0  mr-0 sm:ml-16 ml-4'
              href='#inicio'
            >
              <img
                src={LogoGQuestions}
                alt='React Logo'
                height='40px'
                width='90px'
              />
              <span className='font-black font-asap xl:text-xl text-lg tracking-tight lg:mr-0'>
                GQuestions
            </span>
            </a>

            <div className='block lg:hidden sm:mr-16 mr-4'>
              <button
                onClick={addRemoveClassMenu}
                id='boton'
                className='flex px-3 py-2 border rounded border-yellow-400  hover:text-yellow-600 hover:border-yellow-600 dark:bg-yellowlight dark:text-black outline-none focus:outline-none'
              >
                <svg
                  className='fill-current h-3 w-3'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Menu</title>
                  <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                </svg>
              </button>
            </div>
            <div
              ref={divRefMenu}
              id='menu'
              className='hidden w-full sm:ml-16 ml-4 mr-2 lg:text-left gap-x-2 flex-grow lg:flex lg:items-center lg:w-auto font-medium mt-3'
            >
              <div className='text-sm lg:flex-grow mb-2'>
                <a
                  href='#about'
                  className='transition duration-500 p-2 block mt-2 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Acerca de
              </a>
                <a
                  href='#caracteristicas'
                  onClick={scrollAnimation}
                  className='transition duration-500 p-2 block mt-2 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Caracter??sticas
              </a>
                <a
                  href='#ventajas'
                  className='transition duration-500 p-2 block mt-2 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Ventajas
              </a>
                <a
                  href='#ejemplos'
                  className='transition duration-500 p-2 block mt-2 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Ejemplos
              </a>
              </div>

              {/* Night or light mode */}
              <div className="flex items-center justify-items-center justify-self-center place-content-center py-2 ml-3 mr-2 mb-2 rounded-lg bg-gray-100 lg:bg-transparent  lg:dark:bg-darkColor dark:bg-darkGrayColor2">
                <span className="">
                  <svg className="h-5 w-5 dark:text-gray-400 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <label className="mx-2 flex items-center relative w-max cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="appearance-none transition-colors cursor-pointer w-12 h-6 rounded-full outline-none focus:outline-none bg-gray-300 dark:bg-yellowmain"
                    onChange={handleDarkMode}
                    defaultChecked={darkModeBool}>
                  </input>
                  <span className="w-5 h-5 right-7 absolute rounded-full transform transition-transform bg-darkGrayColor dark:bg-darkColor shadow-md" />
                </label>
                <span className="">
                  <svg className="h-5 w-5 text-gray-400 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </span>
              </div>

              <div className="ml-3 mr-2 lg:m-0">
                <Link
                  to='/login'
                  className='lg:m-0 mb-2 transition duration-500 inline-block shadow-md md:text-base text-sm text-darkGrayColor text-center
                   z-10 w-full mx-auto bg-yellowlight focus:bg-yellowlightdark hover:bg-yellowlightdark rounded-lg px-2 py-2 font-semibold outline-none focus:outline-none'>
                  Iniciar sesi??n
              </Link>
              </div>
              <div className='ml-3 mr-2 lg:mr-16 lg:ml-0'>
                <Link
                  to='/register'
                  className='transition duration-500 inline-block shadow-md md:text-base text-sm text-white text-center 
                  z-10 w-full mx-auto bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg px-2 py-2 font-semibold outline-none focus:outline-none'
                >
                  Registrarse
              </Link>
              </div>
            </div>
          </nav>
          {/* Body */}

          <div
            className='mx-auto bg-local my-auto w-full py-32 xl:py-64 dark:bg-darkColor dark:text-white'
            style={{
              backgroundImage: `url(${darkModeBool ? backgroundHomeDark : backgroundHomeLight})`,
              width: '',
              height: '',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              minHeight: '',
              minWidth: '',
            }}
          >
            <div className='container mx-auto flex'>
              <a
                href='#inicio'
                onClick={scrollAnimation}
              >
                <button
                  className={
                    buttonUp
                      ? 'animation-cards-examples fixed right-8 bottom-8 rounded-full w-11 h-11 bg-white bg-opacity-80 text-darkGrayColor shadow-md outline-none focus:outline-none'
                      : 'hidden'}
                >
                  <span
                    className="mt-1 material-icons"
                  >&#xe5d8;
                </span>
                </button>
              </a>
              <div className='grid grid-cols-12'>
                <div className='col-span-12 sm:col-span-6'>
                  <div className='grid grid-rows-3 lg:mx-8 md:mx-8 mx-8 text-sm md:text-base'>
                    <div className='items-center'>
                      <h1 className='font-black xl:text-5xl md:text-3xl text-xl text-justify md:text-left'>
                        Plataforma impulsada por IA para crear ex??menes de Ingl??s
                        autom??ticamente
                    </h1>
                    </div>
                    <div className='items-center place-self-center'>
                      <p className='text-justify'>
                        Utilizar un generador de ex??menes te permite automatizar
                      el proceso, ahorrar tiempo y aplicarlos directamente.{' '}
                      </p>
                    </div>
                    <div className='text-center md:text-left'>
                      <Link
                        to='/register'
                        className='ransition duration-500 inline-block shadow-md md:text-base text-sm text-white text-center z-10 w-full max-w-xs mx-auto bg-yellowmain
                         hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg outline-none focus:outline-none px-2 py-4 font-semibold lg:mb-0 mb-2'
                      >
                        Empezar
                    </Link>
                    </div>
                  </div>
                </div>
                <div className='col-span-12 sm:col-span-6 place-self-center'>
                  <img
                    className='w-1/2 lg:ml-40 xl:ml-64 sm:ml-32 ml-24 dark:hidden'
                    src={computerImage}
                    alt='computer decorator'
                  />
                </div>
              </div>
            </div>
          </div>

          <hr></hr>

          {/* Por qu?? utilizar un generador de ex??menes */}
          <div className='mx-auto my-auto w-full md:py-24 py-16 dark:bg-darkColor dark:text-white'>
            <div className='container mx-auto flex '>
              <div className='grid grid-rows md:mx-8 mx-8'>
                <div className='grid grid-cols-12 lg:gap-x-16 gap-y-4 '>
                  <div
                    data-aos='fade-right'
                    className='md:col-span-6 col-span-12 font-black xl:text-4xl md:text-3xl'
                  >
                    <h1 className='text-justify sm:text-left'>
                      ??Por qu?? utilizar un generador de ex??menes?
                  </h1>
                  </div>
                  <div className='md:col-span-6 col-span-12 text-sm md:text-base'>
                    <p className='text-justify'>
                      Con tecnolog??a inteligencia artificial y algoritmos de
                    Procesamiento de lenguaje Natural, <b>GQuestions</b> es una
                    plataforma que le permite crear diversa cantidad de
                    cuestionarios y evaluaciones, en un tiempo corto y
                    totalmente gratis.{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>

          {/* Caracter??sticas */}
          <div
            id='caracteristicas'
            className='mx-auto my-auto w-full md:py-24 py-0 md_py-8 bg-purplelight dark:bg-darkGrayColor dark:text-white'
          >
            <div className='container mx-auto flex'>
              <div className='grid grid-rows md:mx-8 mx-8'>
                <div
                  data-aos='fade-up'
                  className='py-8 font-black xl:text-4xl md:text-3xl text-xl text-justify md:text-left'
                >
                  <h1 className=''>
                    Nuestro prop??sito es que puedas Generar ex??menes de Ingl??s
                    autom??ticamente
                </h1>
                </div>

                {/* Horizontal responsive */}
                <div className='hidden md:block'>

                  <div className='grid grid-cols-12 font-bold lg:text-base text-sm text-justify'>
                    <div className='md:col-span-3'>
                      <img className="w-80" src={proposito1} alt="proposito 1"></img>
                    </div>
                    <div className='md:col-span-3'>
                      <img className="w-80" src={proposito2} alt="proposito 1"></img>
                    </div>
                    <div className='md:col-span-3'>
                      <img className="w-80" src={proposito3} alt="proposito 1"></img>
                    </div>
                    <div className='md:col-span-3'>
                      <img className="w-80" src={proposito4} alt="proposito 1"></img>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 font-bold lg:text-base text-sm text-justify'>
                    <div className='md:col-span-3'>
                      Genera Ex??menes
                    </div>
                    <div className='md:col-span-3'>
                      Genera Textos
                    </div>
                    <div className='md:col-span-3'>
                      Genera Preguntas
                    </div>
                    <div className='md:col-span-3'>
                      Aplica el examen
                    </div>
                  </div>
                  <div className='grid grid-cols-12 font-light lg:text-base text-sm text-justify'>
                    <div className='md:col-span-3 pr-16'>
                      Configura la generaci??n y GQuestions se encarga del resto
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Autom??ticamente se generan textos
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Autom??ticamente se generan preguntas
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Configura el conjunto de ex??menes y listo
                    </div>
                  </div>
                </div>
                {/* Vertical responsive */}
                <div className='grid-cols-12 block md:hidden text-sm'>
                  <div className='col-span-2  hidden sm:block'></div>
                  <div className='col-span-12 sm:col-span-10 my-8'>
                    <div className='grid grid-rows-4 mt-3 text-justify'>
                      <div className='sm:mb-20 mb-4'>
                        <b>Genera Ex??menes: </b>Configura la generaci??n y GQuestions se encarga del resto
                    </div>
                      <div className='sm:mt-4 mb-4'>
                        <b>Genera Textos: </b>Autom??ticamente se generan textos
                    </div>
                      <div className='sm:mt-6 mb-4'>
                        <b>Genera Preguntas: </b>Autom??ticamente se generan preguntas
                    </div>
                      <div className='sm:mt-8 mb-4'>
                        <b>Aplica el examen: </b>Configura el conjunto de ex??menes y listo
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr></hr>
          {/* Ventajas */}
          <div
            id='ventajas'
            className='mx-auto my-auto w-full md:py-16 py-8 dark:bg-darkColor dark:text-white'
          >
            <div className='container mx-auto flex'>
              <div
                data-aos='fade-up'
                className='grid grid-rows md:gap-y-8 text-justify md:mx-8 mx-8 text-sm md:text-base mb-8'
              >
                <div className='py-8 font-black xl:text-4xl md:text-3xl text-xl text-justify md:text-left'>
                  <h1 className=''>Ventajas de utilizar nuestro generador </h1>
                </div>
                <div className='grid grid-cols-12 gap-y-4'>
                  <span className=''>
                    <img
                      className='hidden sm:block h-8 lg:h-16'
                      src={iconVentajas_1}
                      alt='icon ventaja 1'
                    ></img>
                  </span>
                  <div className='col-span-12 sm:col-span-11 lg:col-span-5 grid grid-rows pr-0 lg:pr-32'>
                    <h1 className='font-bold'>Cada examen es ??nico</h1>
                    <p>
                      Se utilizan t??cnicas que permiten generar un conjunto de ex??menes que individualmente
                      son diferentes entre s?? pero conservando el tema.
                  </p>
                  </div>
                  <span className=''>
                    <img
                      className='hidden sm:block h-8 lg:h-16'
                      src={iconVentajas_2}
                      alt='icon ventaja 1'
                    ></img>
                  </span>
                  <div className='col-span-12 sm:col-span-11 lg:col-span-5 grid grid-rows pr-0 lg:pr-32'>
                    <h1 className='font-bold'>Ahorra tiempo</h1>
                    <p>
                    solo configura la generacion, GQuestions se encarga de la generaci??n de manera automatizada.
                  </p>
                  </div>
                </div>
                <div className='grid grid-cols-12 gap-y-4'>
                  <span className=''>
                    <img
                      className='hidden sm:block h-8 lg:h-16'
                      src={iconVentajas_3}
                      alt='icon ventaja 1'
                    ></img>
                  </span>
                  <div className='col-span-12 sm:col-span-11 lg:col-span-5 grid grid-rows pr-0 lg:pr-32'>
                    <h1 className='font-bold'>Ahorra dinero</h1>
                    <p>
                      Puedes aplicar los ex??menes directamente desde GQuestions.
                  </p>
                  </div>
                  <span className=''>
                    <img
                      className='hidden sm:block h-8 lg:h-16'
                      src={iconVentajas_4}
                      alt='icon ventaja 1'
                    ></img>
                  </span>
                  <div className='col-span-12 sm:col-span-11 lg:col-span-5 grid grid-rows pr-0 lg:pr-32'>
                    <h1 className='font-bold'>Examen autom??tizado</h1>
                    <p>
                      Gquestions se encarga de la generaci??n con tecnologia de Inteligencia Artificial
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr></hr>
          {/* Ejemplos */}

          <div id='ejemplos' className="">
            <CarouselEjemplo theme={"dark"} />
          </div>
          <hr></hr>
          {/* Uso */}
          <div className='mx-auto my-auto w-full md:pt-8 pb-16 md:pb-16 py-0 dark:bg-darkColor dark:text-white'>
            <div className='container mx-auto flex'>
              <div className='grid grid-rows md:mx-8 mx-8 mt-16'>
                <div className='grid grid-cols-12 items-center space-x-0 md:space-x-6'>
                  <div data-aos='fade-up' className='md:col-span-4 col-span-12'>
                    <h1 className='md:mx-0 font-black xl:text-4xl md:text-3xl text-justify md:text-left mb-2'>
                      ??C??mo utilizar el generador de ex??menes?
                  </h1>
                  </div>
                  <div className='md:col-span-8 col-span-12'>
                    <div
                      data-aos='fade-up'
                      className='grid grid-rows space-y-8 text-sm md:text-base'
                    >
                      <p>
                        <b>Configura los par??metros del examen: </b>Puedes
                      especificar la cantidad de ex??menes a generar, la longitud
                      de los textos, la cantidad de preguntas por examen y el
                      tipo de pregunta.
                      </p>
                      <p>
                        <b>Establece el tema de los textos: </b>Puedes especificar
                      un tema o simplemente permitir que el sistema genere
                      textos de manera aleatoria dentro de un ??mbito acad??mico.
                      </p>
                      <p>
                        <b>Edita los ex??menes: </b>
                        Puedes modificar los textos generados o simplemente puedes volver a generar cada 
                        texto y sus preguntas correspondientes antes de publicarlo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>

          {/* Uso m??vil */}
          <div className='mx-auto my-auto w-full sm:pt-8 md:pb-0 py-0 md:pt-0' style={{ backgroundColor: '#00c5cd' }}>
            <div className='container mx-auto flex'>
              <div className='grid grid-cols-12 md:mx-8 mx-8 sm:mt-8 md:mt-0'>
                <div className='grid grid-rows-3 md:col-span-6 col-span-12 items-center text-sm md:text-base'>
                  <h1 className='font-black xl:text-4xl md:text-3xl text-xl text-justify md:text-left self-end'>
                    Genera, aplica y resuelve tus ex??menes desde el m??vil
                </h1>
                  <p className='self-start'>
                    Desde el navegador web m??vil puedes utilizar GQuestions y acceder a todas sus funciones. 
                  </p>
                  <p className='font-semibold'>
                    Accede desde el navegador de tu m??vil
                </p>
                </div>
                <div className='grid grid-rows md:col-span-6 col-span-12 '>
                  <img src={screnshootMobiles} alt='Screenshots mobiles'></img>
                </div>
              </div>
            </div>
          </div>
        </div >

        <div id='about'>
          <Footer />
        </div>
      </div >
    );
  }

  /* ***************** */
  /* ***************** */
  /* *** Logueado **** */
  /* ***************** */
  /* ***************** */
  else {
    return (
      <div ref={darkMode} className="font-manrope">
        <div id='inicio'>
          <Helmet>
            <script src='https://unpkg.com/aos@2.3.1/dist/aos.js'></script>
            <title>GQuestions App</title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"></link>
          </Helmet>
          {/* Header - Navbar */}
          <nav
            className={
              navbar
                ? 'navbar shadow-sm h-auto mx-auto flex items-center justify-between flex-wrap py-6  bg-gradient-to-r from-yellowlight via-white dark:from-darkColor to-white dark:via-darkColor dark:to-darkColor dark:bg-darkColor dark:text-white border-b border-gray-300 border-opacity-20'
                : 'navbar h-auto mx-auto flex items-center justify-between flex-wrap py-6 bg-transparent dark:bg-darkColor dark:text-white'
            }
          >
            <a
              className='animation-cards-examples flex items-center flex-shrink-0  mr-0 sm:ml-16 ml-4'
              href='#inicio'
            >
              <img
                src={LogoGQuestions}
                alt='React Logo'
                height='40px'
                width='90px'
              />
              <span className='font-black font-asap xl:text-xl text-lg tracking-tight lg:mr-0'>
                GQuestions
            </span>
            </a>

            <div className='block lg:hidden sm:mr-16 mr-4'>
              <button
                onClick={addRemoveClassMenu}
                id='boton'
                className='flex px-3 py-2 border rounded border-yellow-400  hover:text-yellow-600 hover:border-yellow-600 dark:bg-yellowlight dark:text-black outline-none focus:outline-none'
              >
                <svg
                  className='fill-current h-3 w-3'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Menu</title>
                  <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                </svg>
              </button>
            </div>
            <div
              ref={divRefMenu}
              id='menu'
              className='hidden w-full sm:ml-16 ml-4 mr-2 lg:text-left gap-x-2 flex-grow lg:flex lg:items-center lg:w-auto font-medium mt-3'
            >
              <div className='text-sm lg:flex-grow mb-2'>
                <a
                  href='#about'
                  onClick={scrollAnimation}
                  className='transition duration-500 p-2 block mt-4 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Acerca de
              </a>
                <a
                  href='#caracteristicas'
                  onClick={scrollAnimation}
                  className='transition duration-500 p-2 block mt-4 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Caracter??sticas
              </a>
                <a
                  href='#ventajas'
                  className='transition duration-500 p-2 block mt-4 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Ventajas
              </a>
                <a
                  href='#ejemplos'
                  className='transition duration-500 p-2 block mt-4 lg:inline-block lg:mt-0 ml-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Ejemplos
              </a>
              </div>

              {/* Night or light mode */}
              <div className="flex items-center justify-items-center justify-self-center place-content-center ml-3 mr-2 sm:mr-16 py-2 mb-2 rounded-lg bg-gray-100 lg:bg-transparent lg:dark:bg-darkColor dark:bg-darkGrayColor2">
                <span className="">
                  <svg className="h-5 w-5 dark:text-gray-400 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <label className="mx-2 flex items-center relative w-max cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="appearance-none transition-colors cursor-pointer w-12 h-6 rounded-full outline-none focus:outline-none bg-gray-300 dark:bg-yellowmain"
                    onChange={handleDarkMode}
                    defaultChecked={darkModeBool}>
                  </input>
                  <span className="w-5 h-5 right-7 absolute rounded-full transform transition-transform bg-darkGrayColor dark:bg-darkColor shadow-md" />
                </label>
                <span className="">
                  <svg className="h-5 w-5 text-gray-400 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </span>
              </div>

              <div className="ml-3 mr-2 sm:mr-16">
                <button
                  onClick={onClickIrCuenta}
                  className='transition duration-500 inline-block shadow-md text-sm lg:mr-3 lg:ml-0 text-yellow-900 text-center  
                  z-10 w-full mx-auto bg-yellowlight focus:bg-yellowlightdark hover:bg-yellowlightdark outline-none focus:outline-none
                  rounded-lg px-2 py-2 font-semibold lg:mb-0 mb-2'
                >
                  Ir a tu cuenta
              </button>

                <div className=''>
                  <p
                    className='inline-block text-sm  lg:mr-3 lg:ml-0 text-black dark:text-white text-center z-10 w-full mx-auto'
                  >
                    {localStorage.getItem('email')}
                  </p>
                </div>
              </div>
            </div>
          </nav>

          {/* Body */}
          <div
            className='mx-auto bg-local my-auto w-full py-32 xl:py-64 dark:bg-darkColor dark:text-white'
            style={{
              backgroundImage: `url(${darkModeBool ? backgroundHomeDark : backgroundHomeLight})`,
              width: '',
              height: '',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              minHeight: '',
              minWidth: '',
            }}
          >
            <div className='container mx-auto flex'>
              <a
                href='#inicio'
                onClick={scrollAnimation}
              >
                <button
                  className={
                    buttonUp
                      ? 'animation-cards-examples fixed right-8 bottom-8 rounded-full w-11 h-11 bg-white bg-opacity-80 text-darkGrayColor shadow-md outline-none focus:outline-none'
                      : 'hidden'}
                >
                  <span
                    className="mt-1 material-icons"
                  >&#xe5d8;
                </span>
                </button>
              </a>
              <div className='grid grid-cols-12'>
                <div className='col-span-12 sm:col-span-6'>
                  <div className='grid grid-rows-3 lg:mx-8 md:mx-8 mx-8 text-sm md:text-base'>
                    <div className='items-center'>
                      <h1 className='font-black xl:text-5xl md:text-3xl text-xl text-justify md:text-left'>
                        Plataforma impulsada por IA para crear ex??menes de Ingl??s
                        autom??ticamente
                    </h1>
                    </div>
                    <div className='items-center place-self-center'>
                      <p className='text-justify'>
                        Utilizar un generador de ex??menes te permite automatizar
                      el proceso, ahorrar tiempo y aplicarlos directamente.{' '}
                      </p>
                    </div>
                    <div className='text-center md:text-left'>
                      <button
                        onClick={onClickIrCuenta}
                        className='inline-block md:text-base text-sm text-black text-center z-10 w-full max-w-xs mx-auto bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg px-2 py-4 font-semibold lg:mb-0 mb-2'
                      >
                        Empezar
                    </button>
                    </div>
                  </div>
                </div>
                <div className='col-span-12 sm:col-span-6 place-self-center'>
                  <img
                    className='w-1/2 lg:ml-40 xl:ml-64 sm:ml-32 ml-24 dark:hidden'
                    src={computerImage}
                    alt='computer decorator'
                  />
                </div>
              </div>
            </div>
          </div>

          <hr></hr>

          {/* Por qu?? utilizar un generador de ex??menes */}
          <div className='mx-auto my-auto w-full md:py-24 py-16 dark:bg-darkColor dark:text-white'>
            <div className='container mx-auto flex '>
              <div className='grid grid-rows md:mx-8 mx-8'>
                <div className='grid grid-cols-12 lg:gap-x-16 gap-y-4 '>
                  <div
                    data-aos='fade-right'
                    className='md:col-span-6 col-span-12 font-black xl:text-4xl md:text-3xl'
                  >
                    <h1 className='text-justify sm:text-left'>
                      ??Por qu?? utilizar un generador de ex??menes?
                  </h1>
                  </div>
                  <div className='md:col-span-6 col-span-12 text-sm md:text-base'>
                    <p className='text-justify'>
                      Con tecnolog??a inteligencia artificial y algoritmos de
                    Procesamiento de lenguaje Natural, <b>GQuestions</b> es una
                    plataforma que le permite crear diversa cantidad de
                    cuestionarios y evaluaciones, en un tiempo corto y
                    totalmente gratis.{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>

          {/* Caracter??sticas */}
          <div
            id='caracteristicas'
            className='mx-auto my-auto w-full md:py-24 py-0 md_py-8 bg-purplelight dark:bg-darkGrayColor dark:text-white'
          >
            <div className='container mx-auto flex'>
              <div className='grid grid-rows md:mx-8 mx-8'>
                <div
                  data-aos='fade-up'
                  className='py-8 font-black xl:text-4xl md:text-3xl text-xl text-justify md:text-left'
                >
                  <h1 className=''>
                    Nuestro prop??sito es que puedas Generar ex??menes de Ingl??s
                    autom??ticamente
                </h1>
                </div>

                {/* Horizontal responsive */}
                <div className='hidden md:block'>

                  <div className='grid grid-cols-12 font-bold lg:text-base text-sm text-justify'>
                    <div className='md:col-span-3'>
                      <img className="w-80" src={proposito1} alt="proposito 1"></img>
                    </div>
                    <div className='md:col-span-3'>
                      <img className="w-80" src={proposito2} alt="proposito 1"></img>
                    </div>
                    <div className='md:col-span-3'>
                      <img className="w-80" src={proposito3} alt="proposito 1"></img>
                    </div>
                    <div className='md:col-span-3'>
                      <img className="w-80" src={proposito4} alt="proposito 1"></img>
                    </div>
                  </div>
                  <div className='grid grid-cols-12 font-bold lg:text-base text-sm text-justify'>
                    <div className='md:col-span-3'>
                      Genera Ex??menes
                    </div>
                    <div className='md:col-span-3'>
                      Genera Textos
                    </div>
                    <div className='md:col-span-3'>
                      Genera Preguntas
                    </div>
                    <div className='md:col-span-3'>
                      Aplica el examen
                    </div>
                  </div>
                  <div className='grid grid-cols-12 font-light lg:text-base text-sm text-justify'>
                    <div className='md:col-span-3 pr-16'>
                      Configura la generaci??n y GQuestions se encarga del resto
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Autom??ticamente se generan textos
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Autom??ticamente se generan preguntas
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Configura el conjunto de ex??menes y listo
                    </div>
                  </div>
                </div>
                {/* Vertical responsive */}
                <div className='grid-cols-12 block md:hidden text-sm'>
                  <div className='col-span-2  hidden sm:block'></div>
                  <div className='col-span-12 sm:col-span-10 my-8'>
                    <div className='grid grid-rows-4 mt-3 text-justify'>
                      <div className='sm:mb-20 mb-4'>
                        <b>Genera Ex??menes: </b>Configura la generaci??n y GQuestions se encarga del resto
                    </div>
                      <div className='sm:mt-4 mb-4'>
                        <b>Genera Textos: </b>Autom??ticamente se generan textos
                    </div>
                      <div className='sm:mt-6 mb-4'>
                        <b>Genera Preguntas: </b>Autom??ticamente se generan preguntas
                    </div>
                      <div className='sm:mt-8 mb-4'>
                        <b>Aplica el examen: </b>Configura el conjunto de ex??menes y listo
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr></hr>
          {/* Ventajas */}
          <div
            id='ventajas'
            className='mx-auto my-auto w-full md:py-16 py-8 dark:bg-darkColor dark:text-white'
          >
            <div className='container mx-auto flex'>
              <div
                data-aos='fade-up'
                className='grid grid-rows md:gap-y-8 text-justify md:mx-8 mx-8 text-sm md:text-base mb-8'
              >
                <div className='py-8 font-black xl:text-4xl md:text-3xl text-xl text-justify md:text-left'>
                  <h1 className=''>Ventajas de utilizar nuestro generador </h1>
                </div>
                <div className='grid grid-cols-12 gap-y-4'>
                  <span className=''>
                    <img
                      className='hidden sm:block h-8 lg:h-16'
                      src={iconVentajas_1}
                      alt='icon ventaja 1'
                    ></img>
                  </span>
                  <div className='col-span-12 sm:col-span-11 lg:col-span-5 grid grid-rows pr-0 lg:pr-32'>
                    <h1 className='font-bold'>Cada examen es ??nico</h1>
                    <p>
                      Se utilizan t??cnicas que permiten generar un conjunto de ex??menes que individualmente
                      son diferentes entre s?? pero conservando el tema.
                  </p>
                  </div>
                  <span className=''>
                    <img
                      className='hidden sm:block h-8 lg:h-16'
                      src={iconVentajas_2}
                      alt='icon ventaja 1'
                    ></img>
                  </span>
                  <div className='col-span-12 sm:col-span-11 lg:col-span-5 grid grid-rows pr-0 lg:pr-32'>
                    <h1 className='font-bold'>Ahorra tiempo</h1>
                    <p>
                    solo configura la generacion, GQuestions se encarga de la generaci??n de manera automatizada.
                  </p>
                  </div>
                </div>
                <div className='grid grid-cols-12 gap-y-4'>
                  <span className=''>
                    <img
                      className='hidden sm:block h-8 lg:h-16'
                      src={iconVentajas_3}
                      alt='icon ventaja 1'
                    ></img>
                  </span>
                  <div className='col-span-12 sm:col-span-11 lg:col-span-5 grid grid-rows pr-0 lg:pr-32'>
                    <h1 className='font-bold'>Ahorra dinero</h1>
                    <p>
                      Puedes aplicar los ex??menes directamente desde GQuestions.
                  </p>
                  </div>
                  <span className=''>
                    <img
                      className='hidden sm:block h-8 lg:h-16'
                      src={iconVentajas_4}
                      alt='icon ventaja 1'
                    ></img>
                  </span>
                  <div className='col-span-12 sm:col-span-11 lg:col-span-5 grid grid-rows pr-0 lg:pr-32'>
                    <h1 className='font-bold'>Examen autom??tizado</h1>
                    <p>
                      Gquestions se encarga de la generaci??n con tecnologia de Inteligencia Artificial
                  </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr></hr>
          {/* Ejemplos */}

          <div id='ejemplos' className="">
            <CarouselEjemplo theme={"dark"} />
          </div>
          <hr></hr>
          {/* Uso */}
          <div className='mx-auto my-auto w-full md:pt-8 pb-16 md:pb-16 py-0 dark:bg-darkColor dark:text-white'>
            <div className='container mx-auto flex'>
              <div className='grid grid-rows md:mx-8 mx-8 mt-16'>
                <div className='grid grid-cols-12 items-center space-x-0 md:space-x-6'>
                  <div data-aos='fade-up' className='md:col-span-4 col-span-12'>
                    <h1 className='md:mx-0 font-black xl:text-4xl md:text-3xl text-justify md:text-left mb-2'>
                      ??C??mo utilizar el generador de ex??menes?
                  </h1>
                  </div>
                  <div className='md:col-span-8 col-span-12'>
                    <div
                      data-aos='fade-up'
                      className='grid grid-rows space-y-8 text-sm md:text-base'
                    >
                      <p>
                        <b>Configura los par??metros del examen: </b>Puedes
                      especificar la cantidad de ex??menes a generar, la longitud
                      de los textos, la cantidad de preguntas por examen y el
                      tipo de pregunta.
                      </p>
                      <p>
                        <b>Establece el tema de los textos: </b>Puedes especificar
                      un tema o simplemente permitir que el sistema genere
                      textos de manera aleatoria dentro de un ??mbito acad??mico.
                      </p>
                      <p>
                        <b>Edita los ex??menes: </b>
                        Puedes modificar los textos generados o simplemente puedes volver a generar cada 
                        texto y sus preguntas correspondientes antes de publicarlo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>

          {/* Uso m??vil */}
          <div className='mx-auto my-auto w-full sm:pt-8 md:pb-0 py-0 md:pt-0' style={{ backgroundColor: '#00c5cd' }}>
            <div className='container mx-auto flex'>
              <div className='grid grid-cols-12 md:mx-8 mx-8 sm:mt-8 md:mt-0'>
                <div className='grid grid-rows-3 md:col-span-6 col-span-12 items-center text-sm md:text-base'>
                  <h1 className='font-black xl:text-4xl md:text-3xl text-xl text-justify md:text-left self-end'>
                    Genera, aplica y resuelve tus ex??menes desde el m??vil
                </h1>
                  <p className='self-start'>
                    Desde el navegador web m??vil puedes utilizar GQuestions y acceder a todas sus funciones. 
                  </p>
                  <p className='font-semibold'>
                    Accede desde el navegador de tu m??vil
                </p>
                </div>
                <div className='grid grid-rows md:col-span-6 col-span-12 '>
                  <img src={screnshootMobiles} alt='Screenshots mobiles'></img>
                </div>
              </div>
            </div>
          </div>
        </div >
        <div id='about'>
          <Footer />
        </div>
      </div >
    )
  }
}
