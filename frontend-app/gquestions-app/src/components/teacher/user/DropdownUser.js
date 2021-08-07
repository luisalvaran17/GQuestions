import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Redirect } from 'react-router';
import { UpdateTerminosUserAPI } from '../../../api/Usuario/UpdateTerminosUserAPI';
import { LogoutAPI } from '../../../api/Usuario/LogoutAPI';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const DropdownUser = () => {

  const [closeSession, setCloseSession] = useState(false)
  const [ajustesCuenta, setAjustesCuenta] = useState(false)

  // Hooks dark mode
  const darkModeRef = useRef();

  // Hooks Terminos y condiciones
  const [isOpen, setIsOpen] = useState(false)
  const [terminos, setTerminos] = useState({
    terminos_condiciones: false,
  })

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      darkModeRef.current.classList.add('dark')
    } else {
      darkModeRef.current.classList.remove('dark')
    }
  }, []);

  const onClickLogout = async () => {
    let response_logout = await LogoutAPI();
    if (response_logout !== false) {
      setCloseSession(true);
    }else{
      setCloseSession(false);
    }
  }

  const onClickAjustesCuenta = async () => {
    setAjustesCuenta(true)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false);
  }

  const closeModalNoAccept = async () => {
    const id_user = localStorage.getItem('id_user');
    setTerminos(
      Object.assign(terminos, {
        terminos_condiciones: false,
      })
    )
    await UpdateTerminosUserAPI(id_user, terminos)
    setIsOpen(false)
  }

  const closeModalAccept = async () => {
    const id_user = localStorage.getItem('id_user');
    setTerminos(
      Object.assign(terminos, {
        terminos_condiciones: true,
      })
    )
    await UpdateTerminosUserAPI(id_user, terminos);
    setIsOpen(false);
  }

  if (closeSession === false && ajustesCuenta === false) {
    return (
      <div ref={darkModeRef}>
        {/* Profile dropdown */}

        {/* Términos y condiciones Modal */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
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
                <div className="font- inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-black font-manrope leading-6 text-gray-900"
                  >
                    Términos y condiciones
                </Dialog.Title>
                  <div className="mt-2">
                    <ul className="bg-gray-100 text-sm shadow rounded-xl list-none space-y-2 md:text-justify">
                      <div className="text-gray-700 p-4 pb-1">
                        <li className="mb-2">
                          <p>
                            Debido a que los modelos de lenguaje a gran escala como GPT-2 no distinguen la realidad de la ficción, el texto generado no debe ser considerado
                            verdadero.
                          </p>
                        </li>
                        <li className="mb-2">
                          <p>
                            El uso de GPT-2 en esta aplicación web tiene el propósito de ayudar en el aprendizaje del idioma Inglés (ayuda gramatical, vocabulario, lectura y escritura).
                          </p>
                        </li>
                        <li className="mb-2">
                          <p>
                            Es importante mencionar que el modelo GPT-2 puede reflejar sesgos inherentes a los sistemas en los que fueron entrenados, sin embargo, se ha implementado una estrategia que intenta reducir los posibles sesgos que pueda presentar el sistema en esta implementación.
                          </p>
                        </li>
                      </div>
                      <li className="list-none">
                        <p className="text-sm text-gray-500 p-4 border-t border-gray-200 bg-gray-100 rounded-b-xl md:text-justify">
                          "No encontramos diferencias estadísticamente significativas en las sondas de sesgo de género, raza y religión entre 774M y 1.5B, lo que implica que todas las versiones de GPT-2 deben abordarse con niveles similares de precaución en los casos de uso que son sensibles a los sesgos en torno a los atributos humanos."
                            <br></br>
                          <a className="outline-none focus:outline-none"
                            href="https://github.com/openai/gpt-2/blob/master/model_card.md#out-of-scope-use-cases"
                            target="_blank" rel="noreferrer">
                            <b>Model card GPT-2: </b><span className="text-blue-600 underline">
                              https://github.com/openai/gpt-2/blob/master/model_card.md
                              </span>
                          </a>
                        </p>
                      </li>
                    </ul>
                    <div className="flex mt-4 justify-end space-x-4">
                      <button
                        type="button"
                        className="shadow transition duration-500 w-full inline-flex justify-center sm:px-12 px-8 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent 
                        rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModalNoAccept}
                      >
                        Rechazar
                      </button>
                      <button
                        type="button"
                        className="shadow transition duration-500 w-full inline-flex justify-center sm:px-12 px-8 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent 
                        rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModalAccept}
                      >
                        Aceptar
                      </button>
                    </div>
                  </div>

                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        <Menu as="div" className="absolute xl:left-0 left-2 bottom-5 ml-3">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="outline-none focus:outline-none">
                  <div className='md:grid grid-cols-12 md:w-56 w-10 mt-auto shadow items-center p-1 transition duration-500 text-yellow-800 
                  md:hover:bg-white md:hover:border-yellowmain md:hover:text-darkColor md:dark:hover:text-white md:dark:hover:bg-darkColor 
                  md:dark:hover:border-yellow-900 md:bg-yellowlight md:dark:bg-yellowlight md:border-opacity-50 border md:border-yellow-800 
                  md:dark:text-yellow-900 md:rounded-xl rounded-full mb-1 bg-yellowlight dark:bg-yellowlight dark:text-yellow-800 border-transparent'>
                    <div className="col-span-2">
                      <svg
                        className='fill-current h-4 md:w-5 w-full my-2 md:mx-3 md:mr-4'
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='far'
                        data-icon='user'
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
                    <div className="col-span-8 text-left pl-4 md:py-1">
                      <span className='capitalize md:block hidden text-xs font-bold'>{localStorage.getItem('name')}</span>
                    </div>

                    <div className="col-span-2">
                      <span className="hidden md:block ">
                        <svg
                          className={`${open ? 'transform -rotate-1' : ''} transform rotate-180 transition duration-100 w-5 h-5`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                          <path fill='currentColor' d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute bottom-4 left-0 mb-10 mt-2 w-72 rounded-xl shadow-lg py-1 bg-white dark:bg-darkColor 
                  border dark:border dark:border-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <Menu.Item>
                    <div className={
                      'block font-light px-4 py-2 text-sm text-gray-700 dark:text-gray-100 border-b'}>
                      <p className="font-bold" >Logueado como</p>
                      <p>
                        {localStorage.getItem('email')}
                      </p>
                    </div>

                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onClickAjustesCuenta}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'transition duration-500 w-full outline-none focus:outline-none text-left font-bold px-4 py-2 text-sm text-gray-700 dark:text-gray-100 dark:hover:bg-yellowlight dark:hover:text-black'
                        )}
                      >
                        Ajustes de cuenta
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={openModal}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'transition duration-500 w-full outline-none focus:outline-none text-left font-bold px-4 py-2 text-sm text-gray-700 dark:text-gray-100 dark:hover:bg-yellowlight dark:hover:text-black'
                        )}
                      >
                        Términos y condiciones
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onClickLogout}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'transition duration-500 w-full outline-none focus:outline-none text-left font-bold px-4 py-2 text-sm text-gray-700 dark:text-gray-100 dark:hover:bg-yellowlight dark:hover:text-black'
                        )}
                      >
                        Cerrar sesión
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    )
  } else if (closeSession) {
    return (
      <Redirect to='/' />
    );
  } else if (ajustesCuenta) {
    return (
      <Redirect to={{
        pathname: '/teacher/ajustes-cuenta',
      }}
      />
    );
  }
}
