import React, { Component } from 'react';
import '../../assets/styles/tailwind.css';
import LogoGQuestions from '../../assets/images/logo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.divRefMenu = React.createRef();
  }

  state = {};

  addRemoveClassMenu = () => {
    let classList = this.divRefMenu.current.classList;
    let statusMenu = false;
    for (let i = 0; i < classList.length; i++) {
      console.log(classList[i]);
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

  render() {
    return (
      <nav className='container mx-auto flex items-center justify-between flex-wrap py-6'>
        <div className='flex items-center flex-shrink-0  mr-8'>
          <img
            src={LogoGQuestions}
            alt='React Logo'
            height='80px'
            width='80px'
          />
          <span className='font-semibold text-xl tracking-tight'>
            GQuestions
          </span>
        </div>
        <div className='block lg:hidden mr-8'>
          <button
            onClick={this.addRemoveClassMenu}
            id='boton'
            className='flex items-center px-3 py-2 border rounded text-teal-200 border-yellow-400 hover:text-yellow-600 hover:border-yellow-600'
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
              href='#'
              className='block mt-4 lg:inline-block lg:mt-0 ml-3 mr-3 hover:text-yellow-600 '
            >
              Acerca de
            </a>
            <a
              href='#'
              className='block mt-4 lg:inline-block lg:mt-0 ml-3 mr-3 hover:text-yellowmain'
            >
              Características
            </a>
            <a
              href='#'
              className='block mt-4 lg:inline-block lg:mt-0 ml-3 mr-3 hover:text-yellowmain'
            >
              Ventajas
            </a>
            <a
              href='#'
              className='block mt-4 lg:inline-block lg:mt-0 ml-3 hover:text-yellowmain'
            >
              Ejemplos
            </a>
          </div>
          <div>
            <a
              href='#'
              className='inline-block text-sm text-black text-center z-10 w-full max-w-xs mx-auto bg-yellowlight hover:bg-yellow-400 focus:bg-yellow-400 rounded-lg px-2 py-2 font-semibold lg:mb-0 mb-2'
            >
              Iniciar sesión
            </a>
          </div>
          <div>
            <a
              href='#'
              className='inline-block text-sm text-black text-center z-10 w-full max-w-xs mx-auto bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg px-2 py-2 font-semibold'
            >
              Registrarse
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
