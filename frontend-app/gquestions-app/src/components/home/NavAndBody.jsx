import React, { Component } from 'react';
import '../../assets/styles/tailwind.css';
import backgroundHome from '../../assets/images/background_home_2x.png';
import CarouselEjemplo from './CarouselEjemplos';
import computerImage from '../../assets/images/computer_image.png';
import propositoImage from '../../assets/images/propositos.png';
import iconVentajas_1 from '../../assets/images/ventajas-icon-1.png';
import iconVentajas_2 from '../../assets/images/ventajas-icon-2.png';
import iconVentajas_3 from '../../assets/images/ventajas-icon-3.png';
import iconVentajas_4 from '../../assets/images/ventajas-icon-4.png';
import screnshootMobiles from '../../assets/images/mobiles-screenshots.png';
import LogoGQuestions from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Body extends Component {
  constructor(props)
  {
    super(props);
    this.divRefMenu = React.createRef();
    window.addEventListener('scroll', this.changeBackgroundNavBar);

  }

  state = {
    navbar: false,
    isOpen: false,
  };

  addRemoveClassMenu = () => {
    let classList = this.divRefMenu.current.classList;
    let statusMenu = false;
    for (let i = 0; i < classList.length; i++) {
      if (classList[i] === 'hidden') {
        statusMenu = true;
        this.divRefMenu.current.classList.remove('hidden');
        break;
      } else {
        statusMenu = false;
      }
    }
    if (statusMenu === true) {
      this.divRefMenu.current.classList.remove('hidden');
    } else if (statusMenu === false) {
      this.divRefMenu.current.classList.add('hidden');
    }
    return true;
  };

  changeBackgroundNavBar = () => {
    if (window.scrollY >= 20) {
      this.setState({
        navbar: true,
      });
    } else {
      this.setState({
        navbar: false,
      });
    }
  };

  scrollAnimation = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  };

  UNSAFE_componentWillMount() {
    this.setState({
      navbar: false,
    });
  }
  
  componentDidMount()
  {
    this.setState({
      navbar: false,
    });
    
    AOS.init({
      duration: 500,
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  }

  render() {
    return (
      <div id="inicio">
        <Helmet>
          <script src='https://unpkg.com/aos@2.3.1/dist/aos.js'></script>
        </Helmet>
        {/* Header - Navbar */}
        <nav  className={this.state.navbar ? 'navbar shadow-sm h-auto mx-auto flex items-center justify-between flex-wrap py-6  bg-gradient-to-r from-yellowlight via-white to-white' : 'navbar h-auto mx-auto flex items-center justify-between flex-wrap py-6 bg-transparent'}>
          <a className='animation-cards-examples flex items-center flex-shrink-0  mr-0 lg:ml-16' href="#inicio">
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
              onClick={this.addRemoveClassMenu}
              id='boton'
              className='flex px-3 py-2 border rounded border-yellow-400 hover:text-yellow-600 hover:border-yellow-600'
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
            ref={this.divRefMenu}
            id='menu'
            className='hidden w-full text-center lg:text-left gap-x-4 flex-grow lg:flex lg:items-center lg:w-auto font-medium mt-3'
          >
            <div className='text-sm lg:flex-grow mb-2'>
              <a
                href='#caracteristicas'
                className='p-2 block mt-4 lg:inline-block lg:mt-0 ml-3 mr-3 rounded-md hover:bg-yellowlight hover:text-yellow-800'
              >
                Acerca de
              </a>
              <a
                href='#caracteristicas'
                onClick={this.scrollAnimation}
                className='p-2 block mt-4 lg:inline-block lg:mt-0 ml-3 mr-3 rounded-md hover:bg-yellowlight hover:text-yellow-800'
              >
                Características
              </a>
              <a
                href='#ventajas'
                className='p-2 block mt-4 lg:inline-block lg:mt-0 ml-3 mr-3 rounded-md hover:bg-yellowlight hover:text-yellow-800'
              >
                Ventajas
              </a>
              <a
                href='#ejemplos'
                className='p-2 block mt-4 lg:inline-block lg:mt-0 ml-3 rounded-md hover:bg-yellowlight hover:text-yellow-800'
              >
                Ejemplos
              </a>
            </div>
            <div>
              <Link
                to='/login'
                className='inline-block shadow-md text-sm text-black text-center z-10 w-full max-w-xs mx-auto bg-yellowlight hover:bg-yellow-400 focus:bg-yellow-400 rounded-lg px-2 py-2 font-semibold lg:mb-0 mb-2'
              >
                Iniciar sesión
              </Link>
            </div>
            <div className="lg:mr-16">
              <Link
                to='/register'
                className='inline-block shadow-md text-sm text-black text-center z-10 w-full max-w-xs mx-auto bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg px-2 py-2 font-semibold'
              >
                Registrarse
              </Link>
            </div>
          </div>
        </nav>

        {/* Body */}
        <div
          className='mx-auto bg-local my-auto w-full py-32 xl:py-64'
          style={{
            backgroundImage: `url(${backgroundHome})`,
            width: '',
            height: '',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            minHeight: '',
            minWidth: '',
          }}
        >
          <div className='container  mx-auto flex'>
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
                  className='w-1/2 lg:ml-40 xl:ml-64 sm:ml-32 ml-24'
                  src={computerImage}
                  alt='computer decorator'
                />
              </div>
            </div>
          </div>
        </div>

        <hr></hr>

        {/* Por qué utilizar un generador de exámenes */}
        <div className='mx-auto my-auto w-full md:py-24 py-16'>
          <div className='container mx-auto flex'>
            <div className='grid grid-rows md:mx-8 mx-8'>
              <div className='grid grid-cols-12 lg:gap-x-16 gap-y-4'>
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
          className='mx-auto my-auto w-full md:py-24 py-0 md_py-8 bg-purplelight'
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
                <div className='xl:ml-8'>
                  <img src={propositoImage} alt='propósitos GQuestions'></img>
                </div>
                <div className='grid grid-cols-12 font-bold lg:text-base text-sm text-justify'>
                  <div className='md:col-span-3 xl:ml-12 lg:ml-4  md:ml-0 '>
                    Genera Exámenes
                  </div>
                  <div className='md:col-span-3 xl:ml-10 lg:ml-16 md:ml-8'>
                    Genera Textos
                  </div>
                  <div className='md:col-span-3 xl:ml-2 lg:ml-16 md:ml-8'>
                    Genera Preguntas
                  </div>
                  <div className='md:col-span-3 xl:ml-0 lg:ml-24 md:ml-12'>
                    Aplica el examen
                  </div>
                </div>
                <div className='grid grid-cols-12 lg:text-base text-sm text-justify'>
                  <div className='md:col-span-3 xl:ml-12 lg:ml-4  md:ml-0'>
                    Turn your idea from concept to MVP
                  </div>
                  <div className='md:col-span-3 xl:ml-10 lg:ml-16 md:ml-8 xl:pr-16'>
                    Sketch out the product to align the user needs
                  </div>
                  <div className='md:col-span-3 xl:ml-2  lg:ml-16 md:ml-8'>
                    Convert the designs into a live application
                  </div>
                  <div className='md:col-span-3 xl:ml-0  lg:ml-24 md:ml-12'>
                    Launching the application to the market
                  </div>
                </div>
              </div>
              {/* Vertical responsive */}
              <div className='grid-cols-12 block md:hidden text-sm'>
                <div className='col-span-2  hidden sm:block'>

                </div>
                <div className='col-span-12 sm:col-span-10 '>
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
          className='mx-auto my-auto w-full md:py-16 py-8 mb-8'
        >
          <div className='container mx-auto flex'>
            <div
              data-aos='fade-up'
              className='grid grid-rows md:gap-y-8 text-justify md:mx-8 mx-8 text-sm md:text-base'
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

        <div id='ejemplos'>
          <CarouselEjemplo />
        </div>

        {/* Uso */}
        <div className='mx-auto my-auto w-full md:pt-8 pb-16 md:pb-16 py-0 mt-8'>
          <div className='container mx-auto flex'>
            <div className='grid grid-rows md:mx-8 mx-8'>
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
            <div className='grid grid-cols-12 md:mx-8 mx-8'>
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
      </div>
    );
  }
}

export default Body;
