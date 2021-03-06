import React, { useEffect, useRef } from 'react';
import '../../assets/styles/tailwind.css';

export const ModalRegister = () => {

  const divModal = React.createRef();

  const acceptButton = () => {
    divModal.current.classList.add('hidden');
  };

  // Hooks dark mode
  const darkModeRef = useRef();

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      darkModeRef.current.classList.add('dark')
    } else {
      darkModeRef.current.classList.remove('dark')
    }
  }, []);

  return (
    <div
      ref={divModal}
      className='fixed z-10 inset-0 overflow-y-auto'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div 
        ref={darkModeRef}
        className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          aria-hidden='true'
        ></div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
          </span>

        <div className='inline-block align-bottom bg-white  rounded-lg text-left overflow-hidden shadow-xl 
        transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
        id='modal-register'>
          <div className='bg-white dark:bg-darkColor px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-600'>
            <div className='sm:flex sm:items-start'>
              <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10'>
                <svg
                  className='h-6 w-6 text-green-600'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  className='text-lg leading-6 font-medium text-gray-900 dark:text-white'
                  id='modal-title'
                >
                  El usuario ya est?? registrado
                  </h3>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500 dark:text-white'>
                    Puedes ir a la pantalla de iniciar sesi??n e introducir tu
                    correo electr??nico y contrase??a
                    </p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 dark:bg-darkColor px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              onClick={acceptButton}
              className='transition duration-500 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'
            >
              Aceptar
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}