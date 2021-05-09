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
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CarouselEjemplo } from '../components/home/CarouselEjemplos';
import { Footer } from '../components/home/Footer';
import { useHome } from '../hooks/useHome'

export const Homepage = () => {

  const divRefMenu = React.createRef();
  const darkMode = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));
  console.log(darkModeBool)

  const { logged } = useHome();
  const [navbar, setNavbar] = useState(false)

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
  }, [darkMode]);

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
    if (window.scrollY >= 20) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  window.addEventListener('scroll', changeBackgroundNavBar);
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

  if (logged === false) {
    return (

      <div ref={darkMode} className={localStorage.getItem("theme")}>

        <div id='inicio'>

          <Helmet>
            <script src='https://unpkg.com/aos@2.3.1/dist/aos.js'></script>
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
              className='animation-cards-examples flex items-center flex-shrink-0  mr-0 lg:ml-16'
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

            <div className='block lg:hidden mr-4'>
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
              className='hidden w-full text-center lg:text-left gap-x-2 flex-grow lg:flex lg:items-center lg:w-auto font-medium mt-3'
            >
              <div className='text-sm lg:flex-grow mb-2'>
                <a
                  href='#about'
                  className='transition duration-500  p-2 block mt-4 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Acerca de
              </a>
                <a
                  href='#caracteristicas'
                  onClick={scrollAnimation}
                  className='transition duration-500 p-2 block mt-4 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Características
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

              <div className="flex items-center justify-items-center justify-self-center place-content-center py-2 mr-2">
                <span className="">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <label className="mx-2 flex items-center relative w-max cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="appearance-none transition-colors cursor-pointer w-12 h-6 rounded-full outline-none focus:outline-none bg-gray-300"
                    onChange={handleDarkMode}
                    defaultChecked={darkModeBool}>
                  </input>
                  <span className="w-5 h-5 right-7 absolute rounded-full transform transition-transform bg-white shadow-md" />
                </label>
                <span className="">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </span>
              </div>

              <div>
                <Link
                  to='/login'
                  className='transition duration-500 inline-block shadow-md text-sm text-black text-center z-10 w-full max-w-xs mx-auto bg-yellowlight hover:bg-yellowmain focus:bg-yellowmain rounded-lg px-2 py-2 font-semibold lg:mb-0 mb-2'
                >
                  Iniciar sesión
              </Link>
              </div>
              <div className='lg:mr-16'>
                <Link
                  to='/register'
                  className='transition duration-500 inline-block shadow-md text-sm text-black text-center z-10 w-full max-w-xs mx-auto bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg px-2 py-2 font-semibold'
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
              <div className='grid grid-cols-12'>
                <div className='col-span-12 sm:col-span-6'>
                  <div className='grid grid-rows-3 lg:mx-8 md:mx-8 mx-8 text-sm md:text-base'>
                    <div className='items-center'>
                      <h1 className='font-black xl:text-5xl md:text-3xl text-xl text-justify md:text-left'>
                        Plataforma impulsada por IA para crear exámenes de Inglés
                        automáticamente
                    </h1>
                    </div>
                    <div className='items-center place-self-center'>
                      <p className='text-justify'>
                        Utilizar un generador de exámenes te permite automatizar
                      el proceso, ahorrar tiempo y aplicarlos directamente.{' '}
                      </p>
                    </div>
                    <div className='text-center md:text-left'>
                      <Link
                        to='/register'
                        className='inline-block md:text-base text-sm text-black text-center z-10 w-full max-w-xs mx-auto bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg px-2 py-4 font-semibold lg:mb-0 mb-2'
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

          {/* Por qué utilizar un generador de exámenes */}
          <div className='mx-auto my-auto w-full md:py-24 py-16 dark:bg-darkColor dark:text-white'>
            <div className='container mx-auto flex '>
              <div className='grid grid-rows md:mx-8 mx-8'>
                <div className='grid grid-cols-12 lg:gap-x-16 gap-y-4 '>
                  <div
                    data-aos='fade-right'
                    className='md:col-span-6 col-span-12 font-black xl:text-4xl md:text-3xl'
                  >
                    <h1 className='text-justify sm:text-left'>
                      ¿Por qué utilizar un generador de exámenes?
                  </h1>
                  </div>
                  <div className='md:col-span-6 col-span-12 text-sm md:text-base'>
                    <p className='text-justify'>
                      Con tecnología inteligencia artificial y algoritmos de
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

          {/* Características */}
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
                    Nuestro propósito es que puedas Generar exámenes de Inglés
                    automáticamente
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
                      Genera Exámenes
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
                      Turn your idea from concept to MVP mpvpvpv mvpp
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Sketch out the product to align the user needs
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Convert the designs into a live application Convert the designs into a live application
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Launching the application to the market Convert the designs into a live application
                    </div>
                  </div>
                </div>
                {/* Vertical responsive */}
                <div className='grid-cols-12 block md:hidden text-sm'>
                  <div className='col-span-2  hidden sm:block'></div>
                  <div className='col-span-12 sm:col-span-10 my-8'>
                    <div className='grid grid-rows-4 mt-3 text-justify'>
                      <div className='sm:mb-20 mb-4'>
                        <b>Genera Exámenes: </b>Turn your idea from concept to MVP
                    </div>
                      <div className='sm:mt-4 mb-4'>
                        <b>Genera Textos: </b>Sketch out the product to align the
                      user needs
                    </div>
                      <div className='sm:mt-6 mb-4'>
                        <b>Genera Preguntas: </b>Convert the designs into a live
                      application
                    </div>
                      <div className='sm:mt-8 mb-4'>
                        <b>Aplica el examen: </b>Launching the application to the
                      market
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
                    <h1 className='font-bold'>Cada examen es único</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mattis et sed nam sem tellus erat.
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mattis et sed nam sem tellus erat.
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mattis et sed nam sem tellus erat.
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
                    <h1 className='font-bold'>Examen automátizado</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mattis et sed nam sem tellus erat.
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
                      ¿Cómo utilizar el generador de exámenes?
                  </h1>
                  </div>
                  <div className='md:col-span-8 col-span-12'>
                    <div
                      data-aos='fade-up'
                      className='grid grid-rows space-y-8 text-sm md:text-base'
                    >
                      <p>
                        <b>Configura los parámetros del examen: </b>Puedes
                      especificar la cantidad de exámenes a generar, la longitud
                      de los textos, la cantidad de preguntas por examen y el
                      tipo de pregunta.
                    </p>
                      <p>
                        <b>Establece el tema de los textos: </b>Puedes especificar
                      un tema o simplemente permitir que el sistema genere
                      textos de manera aleatoria en un ámbito acádemico.
                    </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Venenatis scelerisque at quam congue posuere libero in sit
                        quam. Consequat, scelerisque non tincidunt sit lectus
                        senectus.
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>

          {/* Uso móvil */}
          <div className='mx-auto my-auto w-full sm:pt-8 md:pb-0 py-0 md:pt-0 bg-cyanmain'>
            <div className='container mx-auto flex'>
              <div className='grid grid-cols-12 md:mx-8 mx-8 sm:mt-8 mt-16'>
                <div className='grid grid-rows-3 md:col-span-6 col-span-12 items-center text-sm md:text-base'>
                  <h1 className='font-black xl:text-4xl md:text-3xl text-xl text-justify md:text-left self-end'>
                    Genera, aplica y resuelve tus exámenes desde el móvil
                </h1>
                  <p className='self-start'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus condimentum erat et leo luctus lacinia.{' '}
                  </p>
                  <p className='font-semibold'>
                    Accede desde el navegador de tu móvil
                </p>
                </div>
                <div className='grid grid-rows md:col-span-6 col-span-12 '>
                  <img src={screnshootMobiles} alt='Screenshots mobiles'></img>
                </div>
              </div>
            </div>
          </div>
        </div >
        <Footer />
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
              className='animation-cards-examples flex items-center flex-shrink-0  mr-0 lg:ml-16'
              href='#inicio'
            >
              <img
                src={LogoGQuestions}
                alt='React Logo'
                height='40px'
                width='90px'
              />
              <span className='font-black font-asap text-xl tracking-tight lg:mr-4'>
                GQuestions
            </span>
            </a>

            <div className='block lg:hidden mr-4'>
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
              className='hidden w-full text-center lg:text-left gap-x-2 flex-grow lg:flex lg:items-center lg:w-auto font-medium mt-3'
            >
              <div className='text-sm lg:flex-grow mb-2'>
                <a
                  href='#about'
                  className='transition duration-500  p-2 block mt-4 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Acerca de
              </a>
                <a
                  href='#caracteristicas'
                  onClick={scrollAnimation}
                  className='transition duration-500 p-2 block mt-4 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800'
                >
                  Características
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

              <div className="flex items-center justify-items-center justify-self-center place-content-center py-2 mr-2">
                <span className="">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <label className="mx-2 flex items-center relative w-max cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="appearance-none transition-colors cursor-pointer w-12 h-6 rounded-full outline-none focus:outline-none bg-gray-300"
                    onChange={handleDarkMode}
                    defaultChecked={darkModeBool}>
                  </input>
                  <span className="w-5 h-5 right-7 absolute rounded-full transform transition-transform bg-white shadow-md" />
                </label>
                <span className="">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </span>
              </div>

              <div className="mr-10">
                <Link
                  to='teacher/generacion'
                  className='inline-block shadow-md text-sm lg:mr-3 lg:ml-0 text-black text-center  
                  ml-10 z-10 w-full max-w-xs mx-auto bg-yellowlight hover:bg-yellowmain focus:bg-yellowmain rounded-lg px-2 py-2 font-semibold lg:mb-0 mb-2'
                >
                  Ir a tu cuenta
              </Link>

                <div className=''>
                  <p
                    className='inline-block text-sm  lg:mr-3 lg:ml-0 ml-10 text-black dark:text-white text-center z-10 w-full max-w-xs mx-auto'
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
              <div className='grid grid-cols-12'>
                <div className='col-span-12 sm:col-span-6'>
                  <div className='grid grid-rows-3 lg:mx-8 md:mx-8 mx-8 text-sm md:text-base'>
                    <div className='items-center'>
                      <h1 className='font-black xl:text-5xl md:text-3xl text-xl text-justify md:text-left'>
                        Plataforma impulsada por IA para crear exámenes de Inglés
                        automáticamente
                    </h1>
                    </div>
                    <div className='items-center place-self-center'>
                      <p className='text-justify'>
                        Utilizar un generador de exámenes te permite automatizar
                      el proceso, ahorrar tiempo y aplicarlos directamente.{' '}
                      </p>
                    </div>
                    <div className='text-center md:text-left'>
                      <Link
                        to='/register'
                        className='inline-block md:text-base text-sm text-black text-center z-10 w-full max-w-xs mx-auto bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg px-2 py-4 font-semibold lg:mb-0 mb-2'
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

          {/* Por qué utilizar un generador de exámenes */}
          <div className='mx-auto my-auto w-full md:py-24 py-16 dark:bg-darkColor dark:text-white'>
            <div className='container mx-auto flex '>
              <div className='grid grid-rows md:mx-8 mx-8'>
                <div className='grid grid-cols-12 lg:gap-x-16 gap-y-4 '>
                  <div
                    data-aos='fade-right'
                    className='md:col-span-6 col-span-12 font-black xl:text-4xl md:text-3xl'
                  >
                    <h1 className='text-justify sm:text-left'>
                      ¿Por qué utilizar un generador de exámenes?
                  </h1>
                  </div>
                  <div className='md:col-span-6 col-span-12 text-sm md:text-base'>
                    <p className='text-justify'>
                      Con tecnología inteligencia artificial y algoritmos de
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

          {/* Características */}
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
                    Nuestro propósito es que puedas Generar exámenes de Inglés
                    automáticamente
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
                      Genera Exámenes
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
                      Turn your idea from concept to MVP mpvpvpv mvpp
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Sketch out the product to align the user needs
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Convert the designs into a live application Convert the designs into a live application
                    </div>
                    <div className='md:col-span-3 pr-16'>
                      Launching the application to the market Convert the designs into a live application
                    </div>
                  </div>
                </div>
                {/* Vertical responsive */}
                <div className='grid-cols-12 block md:hidden text-sm'>
                  <div className='col-span-2  hidden sm:block'></div>
                  <div className='col-span-12 sm:col-span-10 my-8'>
                    <div className='grid grid-rows-4 mt-3 text-justify'>
                      <div className='sm:mb-20 mb-4'>
                        <b>Genera Exámenes: </b>Turn your idea from concept to MVP
                    </div>
                      <div className='sm:mt-4 mb-4'>
                        <b>Genera Textos: </b>Sketch out the product to align the
                      user needs
                    </div>
                      <div className='sm:mt-6 mb-4'>
                        <b>Genera Preguntas: </b>Convert the designs into a live
                      application
                    </div>
                      <div className='sm:mt-8 mb-4'>
                        <b>Aplica el examen: </b>Launching the application to the
                      market
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
                    <h1 className='font-bold'>Cada examen es único</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mattis et sed nam sem tellus erat.
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mattis et sed nam sem tellus erat.
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mattis et sed nam sem tellus erat.
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
                    <h1 className='font-bold'>Examen automátizado</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mattis et sed nam sem tellus erat.
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
                      ¿Cómo utilizar el generador de exámenes?
                  </h1>
                  </div>
                  <div className='md:col-span-8 col-span-12'>
                    <div
                      data-aos='fade-up'
                      className='grid grid-rows space-y-8 text-sm md:text-base'
                    >
                      <p>
                        <b>Configura los parámetros del examen: </b>Puedes
                      especificar la cantidad de exámenes a generar, la longitud
                      de los textos, la cantidad de preguntas por examen y el
                      tipo de pregunta.
                    </p>
                      <p>
                        <b>Establece el tema de los textos: </b>Puedes especificar
                      un tema o simplemente permitir que el sistema genere
                      textos de manera aleatoria en un ámbito acádemico.
                    </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Venenatis scelerisque at quam congue posuere libero in sit
                        quam. Consequat, scelerisque non tincidunt sit lectus
                        senectus.
                    </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr></hr>

          {/* Uso móvil */}
          <div className='mx-auto my-auto w-full sm:pt-8 md:pb-0 py-0 md:pt-0 bg-cyanmain'>
            <div className='container mx-auto flex'>
              <div className='grid grid-cols-12 md:mx-8 mx-8 sm:mt-8 mt-16'>
                <div className='grid grid-rows-3 md:col-span-6 col-span-12 items-center text-sm md:text-base'>
                  <h1 className='font-black xl:text-4xl md:text-3xl text-xl text-justify md:text-left self-end'>
                    Genera, aplica y resuelve tus exámenes desde el móvil
                </h1>
                  <p className='self-start'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus condimentum erat et leo luctus lacinia.{' '}
                  </p>
                  <p className='font-semibold'>
                    Accede desde el navegador de tu móvil
                </p>
                </div>
                <div className='grid grid-rows md:col-span-6 col-span-12 '>
                  <img src={screnshootMobiles} alt='Screenshots mobiles'></img>
                </div>
              </div>
            </div>
          </div>
        </div >
        <Footer />
      </div >
    )
  }
}
