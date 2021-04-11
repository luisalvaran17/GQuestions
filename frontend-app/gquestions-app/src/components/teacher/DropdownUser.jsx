import React, { Component } from 'react';
import '../../assets/styles/tailwind.css';
class MenuUsuario extends Component {
  constructor(props) {
    super(props);
    this.divRefShow = React.createRef();
  }

  state = {
    showMenuUser: false,
  };

  openMenu = () => {
    if (this.state.showMenuUser === true) {
      this.divRefShow.current.classList.add('hidden');
      console.log(this.divRefShow.isActive);
      this.setState({ showMenuUser: false });
    }
    if (this.state.showMenuUser === false) {
      this.divRefShow.current.classList.remove('hidden');
      this.setState({ showMenuUser: true });
    }
  };

  render() {
    return (
      <div className='font-normal' x-data='{ open: false }'>
        <button
          type='button'
          aria-haspopup='true'
          onClick={this.openMenu}
          className='block transition-opacity duration-200 outline-none rounded-full dark:opacity-75 dark:hover:opacity-100 focus:outline-none dark:focus:opacity-100'
        >
          <span className='sr-only'>User menu</span>
          <div className='mt-auto flex items-center p-2 text-black bg-yellowlight	dark:text-yellow-500 rounded-full mb-1'>
            <svg
              className='fill-current h-4 w-4 m-2 '
              aria-hidden='true'
              focusable='false'
              data-prefix='far'
              data-icon='user'
              /* className='svg-inline--fa fa-user fa-w-14' */
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 448 512'
            >
              <path
                fill='currentColor'
                d='M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z'
              ></path>
            </svg>
          </div>
        </button>
        <div
          x-show='open'
          ref={this.divRefShow}
          className='hidden absolute bottom-12 left-20 w-60 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-dark focus:outline-none'
          tabindex='-1'
          role='menu'
          aria-label='User menu'
        >
          <div className='border-b mb-2 py-2'>
            <label
              role='menuitem'
              className='block px-4 py-1 text-sm font-bold'
            >
              Logueado como
            </label>
            <label role='menuitem' className='block px-4 text-sm  '>
              example@example.com
            </label>
          </div>

          <a
            href='/'
            role='menuitem'
            className='block px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600'
          >
            Ajustes de cuenta
          </a>
          <a
            href='/'
            role='menuitem'
            className='block px-4 py-2 text-sm  transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600'
          >
            Términos y condiciones
          </a>
          <a
            href='/'
            role='menuitem'
            className='block px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:text-light dark:hover:bg-blue-600'
          >
            Cerrar sesión
          </a>
        </div>
      </div>
    );
  }
}

export default MenuUsuario;
