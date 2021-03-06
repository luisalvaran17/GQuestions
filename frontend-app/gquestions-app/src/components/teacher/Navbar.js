import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Logo from '../../assets/images/logo.png';
import { Link, useHistory, useLocation } from 'react-router-dom';

function Navbar() {

  let history = useHistory();
  let location = useLocation();
  const darkModeRef = useRef();

  const divRefButtonDashboard = React.createRef();
  const divRefButtonGeneracion = React.createRef();
  const divRefButtonEstadisticas = React.createRef();
  const divRefButtonAjustes = React.createRef();
  const divRefButtonCalificaciones = React.createRef();

  useEffect(() => {

    if (localStorage.theme === 'dark') {
      darkModeRef.current.classList.add('dark')
    } else {
      darkModeRef.current.classList.remove('dark')
    }

  }, []);

  function handleClickDashboard() {
    history.push("/teacher/dashboard");
  }

  function handleClickGeneracion() {
    history.push("/teacher/generacion");
  }

  function handleClickEstadisticas() {
    history.push("/teacher/estadisticas");
  }

  function handleClickAjustes() {
    history.push("/teacher/ajustes");
  }

  function handleClickCalificaciones() {
    history.push("/teacher/calificaciones");
  }

  useEffect(() => {
    if (location.pathname === '/teacher/generacion') {
      divRefButtonGeneracion.current.classList.add('bg-yellowlight');
      divRefButtonGeneracion.current.classList.add('text-yellow-700');
      divRefButtonGeneracion.current.classList.add('shadow');
    }
    if (location.pathname === '/teacher/dashboard') {
      divRefButtonDashboard.current.classList.add('bg-yellowlight');
      divRefButtonDashboard.current.classList.add('text-yellow-700');
      divRefButtonDashboard.current.classList.add('shadow');
    }
    if (location.pathname === '/teacher/ajustes') {
      divRefButtonAjustes.current.classList.add('bg-yellowlight');
      divRefButtonAjustes.current.classList.add('text-yellow-700');
      divRefButtonAjustes.current.classList.add('shadow');
    }
    if (location.pathname === '/teacher/estadisticas') {
      divRefButtonEstadisticas.current.classList.add('bg-yellowlight');
      divRefButtonEstadisticas.current.classList.add('text-yellow-700');
      divRefButtonEstadisticas.current.classList.add('shadow');
    }
    if (location.pathname === '/teacher/calificaciones') {
      divRefButtonCalificaciones.current.classList.add('bg-yellowlight');
      divRefButtonCalificaciones.current.classList.add('text-yellow-700');
      divRefButtonCalificaciones.current.classList.add('shadow');
    }
    AOS.init({
      duration: 1000,
    })
  });

  return (
    <div ref={darkModeRef} className='flex font-manrope font-semibold'>
      <nav className='h-full md:w-64 w-20 flex flex-col items-center bg-white pt-8 pb-2 border-r 
      mb-4 border-r-black dark:bg-darkGrayColor2 dark:border-gray-700 shadow-md'>
        <div className="flex w-full items-center transform hover:scale-105 duration-200">
          <Link to="/">
            <img className="w-20" src={Logo} alt='Logo app' />
          </Link>
          <Link to="/">
            <span className='md:block hidden font-black dark:text-white font-asap xl:text-2xl text-lg tracking-tight lg:mr-0'>
              GQuestions
            </span>
          </Link>
        </div>

        <ul className='w-full h-full px-2 mt-2 text-gray-700 dark:text-gray-400 capitalize'>

          <li ref={divRefButtonGeneracion}
            className='mt-3 py-2 px-1 transition duration-300 hover:ring-2 hover:ring-yellowlight hover:text-yellow-800
              hover:bg-yellowlight hover:opacity-75 dark-hover:text-yellow-300 rounded-lg'
          >
            <button
              onClick={handleClickGeneracion}
              id='btn-generacion'
              className='w-full flex items-center focus:outline-none'>
              <svg
                aria-hidden='true'
                focusable='false'
                data-prefix='far'
                data-icon='file-alt'
                className='fill-current h-5 w-5 mx-4'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 384 512'
              >
                <path
                  fill='currentColor'
                  d='M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z'
                ></path>
              </svg>
              <span className='md:block hidden'>Generaci??n</span>
            </button>
          </li>

          <li ref={divRefButtonDashboard} className='mt-3 py-2 px-1 transition duration-300 hover:ring-2 hover:ring-yellowlight hover:text-yellow-800
              hover:bg-yellowlight hover:opacity-75 dark-hover:text-yellow-300 rounded-lg'>
            <button onClick={handleClickDashboard} className='w-full flex items-center focus:outline-none'
              id='btn-dashboard'>
              <svg viewBox='0 0 24 24'
                className='fill-current h-5 w-5 mx-4'>
                <path
                  d='M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9
							17v2H5v-2h4M21 3h-8v6h8V3M11 3H3v10h8V3m10
							8h-8v10h8V11m-10 4H3v6h8v-6z'
                ></path>
              </svg>
              <span className='md:block hidden'>Dashboard</span>
            </button>
          </li>

          <li ref={divRefButtonEstadisticas} className='mt-3 py-2 px-1 transition duration-300 hover:ring-2 hover:ring-yellowlight hover:text-yellow-800
              hover:bg-yellowlight hover:opacity-75 dark-hover:text-yellow-300 rounded-lg'>
            <button onClick={handleClickEstadisticas} className='w-full flex items-center focus:outline-none'
              id='btn-estadisticas'>
              <svg
                aria-hidden='true'
                focusable='false'
                data-prefix='far'
                data-icon='file-alt'
                className='fill-current h-5 w-5 mx-4'
                role='img'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 384 512'
              >
                <path
                  fill='currentColor'
                  d='M396.8 352h22.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-192 0h22.4c6.4 0 12.8-6.4 12.8-12.8V140.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h22.4c6.4 0 12.8-6.4 12.8-12.8V204.8c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zM496 400H48V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16zm-387.2-48h22.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-22.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8z'
                ></path>
              </svg>
              <span className='md:block hidden'>Estad??sticas</span>
            </button>
          </li>

          <li ref={divRefButtonCalificaciones}
            className='mt-3 py-2 px-1 transition duration-300 hover:ring-2 hover:ring-yellowlight hover:text-yellow-800
              hover:bg-yellowlight hover:opacity-75 dark-hover:text-yellow-300 rounded-lg'
          >
            <button onClick={handleClickCalificaciones} className='w-full flex items-center focus:outline-none'
              id='btn-calificaciones'>
              <svg
                aria-hidden='true'
                focusable='false'
                data-prefix='far'
                data-icon='file-alt'
                className='fill-current h-5 w-5 mx-4'
                role='img'
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 24 24">
                <path d="M13,12H20V13.5H13M13,9.5H20V11H13M13,14.5H20V16H13M21,4H3A2,2 0 0,0 1,6V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V6A2,2 0 0,0 21,4M21,19H12V6H21" />
              </svg>
              <span className='md:block hidden'>Calificaciones</span>
            </button>
          </li>

          <li ref={divRefButtonAjustes}
            className='mt-3 py-2 px-1 transition duration-300 hover:ring-2 hover:ring-yellowlight hover:text-yellow-800
              hover:bg-yellowlight hover:opacity-75 dark-hover:text-yellow-300 rounded-lg'>
            <button onClick={handleClickAjustes} className='w-full flex items-center focus:outline-none'
              id='btn-ajustes'>
              <svg
                className='fill-current h-6 w-6 mx-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='#000000'
              >
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z' />
              </svg>
              <span className='md:block hidden'>Ajustes</span>
            </button>
          </li>
        </ul>

        <div className="px-2 w-full mb-4">
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
