/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react';
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react';
import Logo from '../../assets/images/logo.png';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { LogoutAPI } from '../../api/Usuario/LogoutAPI';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const NavbarStudent = (props) => {

  const navigation = props.navigation

  // Hooks dark mode
  const darkModeRef = useRef();
  const history = useHistory();

  // Hooks Terminos y condiciones
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      darkModeRef.current.classList.add('dark')
    } else {
      darkModeRef.current.classList.remove('dark')
    }
  }, []);

  const onClickNavbar = (e) => {
    let id_home = 0;
    let id_calificaciones = 1;
    let id_ajustes = 2;

    if (id_home === parseInt(e.target.id)) history.push('/student/home')
    if (id_calificaciones === parseInt(e.target.id)) history.push('/student/calificaciones')
    if (id_ajustes === parseInt(e.target.id)) history.push('/student/ajustes')
  }

  const onClickLogout = async () => {
    let response_logout = await LogoutAPI();
    if (response_logout !== false) {
      history.push('/');
    }else{
      //
    }
  }

  const onClickAjustes = () => {
    history.push('/student/ajustes-cuenta')
  }

  const onClickEncuesta = () => {
    history.push('/student/encuesta')
  }

  const onClickCondicionesUso = () => {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div ref={darkModeRef}>
      <Disclosure as="nav" className="py-4 sticky top-0 bg-white dark:bg-darkGrayColor2 dark:shadow-md shadow border-b border-gray-200 dark:border-gray-700 border-opacity-50 font-manrope">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button
                    className="inline-flex items-center justify-center p-2 rounded-md text-darkColor
                  hover:text-yellow-800 bg-yellowlight focus:outline-none outline-none focus:ring-inset">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="fill-current h-4 w-4 dark:focus:text-black dark:text-black" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>
                    ) : (
                      <svg
                        className='fill-current h-4 w-4 dark:focus:text-black dark:text-black'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <title>Menu</title>
                        <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                      </svg>
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">

                  <Link to="/">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-16 w-auto"
                        src={Logo}
                        alt="GQuestions"
                      />
                      <img
                        className="hidden lg:block"
                        src={Logo}
                        alt='GQuestions'
                        height='40px'
                        width='90px'
                      />
                      <span className='hidden lg:block font-black font-asap xl:text-xl text-lg tracking-tight lg:mr-0 dark:text-white'>
                        GQuestions
                    </span>
                    </div>
                  </Link>
                  <div className="hidden sm:block sm:ml-6 place-self-center">
                    <div className="flex space-x-4 ">
                      {navigation.map((item) => (
                        <button
                          key={item.name}
                          id={item.id}
                          onClick={onClickNavbar}
                          className={classNames(
                            item.current ? 'bg-yellowlight text-yellow-800 outline-none focus:outline-none' : 'text-darkColor dark:text-gray-200 outline-none focus:outline-none',
                            'px-3 py-2 text-sm font-medium transition duration-500 p-2 block mt-2 lg:inline-block lg:mt-0 ml-3 mr-2 rounded-md hover:bg-yellowlight hover:text-yellow-800 dark:hover:text-yellow-800'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="focus:outline-none outline-none">
                            <div className='flex mt-auto items-center p-1 text-yellow-800 bg-yellowlight sm:rounded-xl rounded-full'>
                              <span className='sm:hidden block'>
                                <svg
                                  className='fill-current h-4 w-4 m-2 '
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
                              </span>
                              <span className="hidden sm:block my-2 mx-3 text-darkColor font-semibold text-xs">{localStorage.getItem('name')}</span>
                              <span className="hidden sm:block text-darkColor">
                                <svg
                                  className={`${open ? 'transform rotate-180' : 'animate-pulse'} transition duration-500 w-5 h-5`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                                </svg>
                              </span>

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
                            className="origin-top-right absolute right-0 mt-2 w-72 rounded-xl shadow-lg py-1 bg-white dark:bg-darkColor border dark:border dark:border-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                                  onClick={onClickAjustes}
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
                                  onClick={onClickCondicionesUso}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'transition duration-500 w-full outline-none focus:outline-none text-left font-bold px-4 py-2 text-sm text-gray-700 dark:text-gray-100 dark:hover:bg-yellowlight dark:hover:text-black'
                                  )}
                                >
                                  Condiciones de uso
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  onClick={onClickEncuesta}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'flex cursor-pointer transition duration-500 w-full outline-none focus:outline-none text-left font-bold px-4 py-2 text-sm text-gray-700 dark:text-gray-100 dark:hover:bg-yellowlight dark:hover:text-black'
                                  )}
                                >
                                  <p>Responder encuesta</p><span className="flex text-xs bg-green-200 rounded-lg px-1 ml-1 font-semibold text-green-800 border border-green-300">nuevo</span>
                                </span>
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
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    id={item.id}
                    onClick={onClickNavbar}
                    className={classNames(
                      item.current ? 'w-full text-left bg-yellowlight text-yellow-800 outline-none focus:outline-none' : 'text-darkColor dark:text-gray-200 outline-none focus:outline-none',
                      'block px-3 py-2 rounded-md text-base font-medium transition duration-500 hover:bg-yellowlight hover:text-yellow-800 dark:hover:text-yellow-800'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>


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
                  Condiciones de uso
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
                      <li className="mb-2 text-darkColor">
                        <p>
                          <b>Advertencia: </b>Los exámenes son generados por algoritmos de Inteligencia Artificial y pueden tener sesgos, por tanto, el docente no es responsable del contenido.
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

                  <div className="mt-2">
                    <button
                      type="button"
                      className="btn-primary "
                      onClick={closeModal}
                    >
                      Entendido
                      </button>
                  </div>
                </div>

              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </div>
  )
}