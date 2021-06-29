import React, { useEffect, useRef } from 'react';
import '../../assets/styles/tailwind.css';

export const ModalCredits = () => {

  const divModal = React.createRef();
  // Hooks dark mode
  const darkModeRef = useRef();

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      darkModeRef.current.classList.add('dark')
    } else {
      darkModeRef.current.classList.remove('dark')
    }
  }, []);

  const acceptButton = () => {
    divModal.current.classList.add('hidden');
  };

  return (
    <div
      ref={divModal}
      className='fixed z-10 inset-0 overflow-y-auto font-manrope'
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

        <div className='inline-block align-bottom bg-white dark:bg-darkColor rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-white dark:bg-darkColor border-b border-gray-600 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mt-3 sm:mt-0 sm:ml-4'>
                <h3
                  className='text-xl font-bold leading-6 text-gray-900 dark:text-white uppercase'
                  id='modal-title'
                >
                  Créditos
                  </h3>
                <div className='mt-2'>
                  <p className='text-base font-semibold dark:text-gray-400'>
                    Imagen en página de registro:
                    </p>

                  <a
                    href='https://www.freepik.com/vectors/banner'
                    target="_blank"
                    rel="noreferrer"
                    className='text-sm underline dark:text-blue-500'>
                    Banner vector created by upklyak - www.freepik.com</a>
                </div>
              </div>
            </div>
          </div>
          <div className='sm:ml-64 ml-0 sm:w-auto w-full grid grid-col-12 dark:bg-darkColor px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              onClick={acceptButton}
              className='sm:col-start-6 btn-primary'>
              Aceptar
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}