import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Logo from '../../assets/images/logo.png';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Examen = () => {
    return (
        <div className="font-manrope">

            {/* Toolbar */}
            <div className="flex justify-center items-center bg-gray-200 dark:bg-darkGrayColor2 text-white py-3 px-4 text-center fixed left-0 bottom-0 right-0 z-40">
                <img className="h-12 self-center " src={Logo} alt="GQuestions" />
                <p className="font- text-black dark:text-gray-200">Tiempo restante: 36:55 s</p>
            </div>

            {/* TopBar */}
            <div className="border shadow-sm">
                <nav className="container py-4 mx-auto h-36">
                    <div className="sm:pr-0 pr-20 text-sm sm:text-base">
                        <p className="uppercase font-light text-gray-600 dark:text-gray-100">Curso de Inglés IV - Universidad del Valle</p>
                        <p className="font-black text-gray-600 dark:text-gray-200 md:text-3xl text-xl">Examen Nombre Examen</p>
                        <p>Tiempo para el examen: 2h</p>
                        <p>Intentos: 1</p>
                    </div>

                    {/* Profile dropdown */}
                    <Menu as="div" className="absolute top-12 xl:right-64 lg:right-50 md:right-20 sm:right-12 right-8">
                        {({ open }) => (
                            <>
                                <div>
                                    <Menu.Button className="focus:outline-none outline-none">
                                        <div className='mt-auto flex items-center p-1 text-yellow-800 bg-yellowlight rounded-full'>
                                            <svg
                                                className='fill-current h-5 w-5 m-2 '
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
                                        className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg py-1 bg-white dark:bg-darkColor border dark:border dark:border-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                                                    onClick=""
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
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'transition duration-500 w-full outline-none focus:outline-none text-left font-bold px-4 py-2 text-sm text-gray-700 dark:text-gray-100 dark:hover:bg-yellowlight dark:hover:text-black'
                                                    )}
                                                >
                                                    Lipsum
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    /* onClick={onClickLogout} */
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

                </nav>
            </div>

            <div className="container mx-auto xl:px-96 md:px-32 sm:px-16 px-8 pt-8 pb-32">
                {/* Texto disclosure */}
                <div className="w-full">
                    <div className="w-full py-2 mx-auto bg-white rounded-lg">
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-base font-medium text-left 
                                text-yellow-900 bg-yellowlight bg-opacity-50 rounded-t-xl focus:outline-none 
                                focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75">
                                        <span>Texto para responder las preguntas</span>
                                        <svg
                                            className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-yellow-500`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                                            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                                        </svg>

                                    </Disclosure.Button>
                                    <Transition
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-base text-gray-500 border rounded-b-xl">
                                            Cuando tenía 25 años trabajó en el motor de cohete F-1 que sirvió para propulsar el cohete Saturno V que viajó a la luna, y a principios de los años 70 comenzó a desarrollar con Robert Kahn un conjunto de protocolos de comunicaciones para la red militar, financiado por la agencia gubernamental DARPA. El objetivo era crear una "red de redes" que permitiera interconectar las distintas redes del Departamento de Defensa de los Estados Unidos, todas ellas de diferentes tipos y que funcionaban con diversos sistemas operativos, con independencia del tipo de conexión: radioenlaces, satélites y líneas telefónicas.

                                            Las investigaciones, lideradas por Vinton Cerf, primero desde la Universidad de California (1967-1972) y posteriormente desde la Universidad de Stanford (1972-1976), llevaron al diseño del conjunto de protocolos que hoy son conocidos como TCP/IP (Transmission Control Protocol/Internet Protocol), que fue presentado por Vinton Cerf y Robert Kahn en 1972((Creadores de Internet)).
                                    </Disclosure.Panel></Transition>
                                </>
                            )}

                        </Disclosure>
                    </div>
                </div>

                {/* Questions */}
                <ul className="space-y-6">
                    {/* Multiple choice question */}
                    <li>
                        <div className="border rounded-lg shadow pt-8">
                            <div className="px-8 pb-4">
                                <p className="uppercase font-light text-gray-700 dark:text-gray-100">Pregunta 1</p>
                                <p className="font-semibold text-lg">¿Quién está considerado como uno de los padres de internet?</p>
                            </div>
                            <ul>
                                <button className="w-full">
                                    <li className="transition duration-200 flex items-center bg-gray-100 hover:bg-gray-100 focus:bg-yellowlight py-4 px-8 border-b border-t">
                                        <span className="mr-4 px-3 p-1 rounded-full border bg-yellowmain border-yellowmain">A</span>
                                        <p>Tim Berners Lee</p>
                                    </li>
                                </button>
                                <button className="w-full">
                                    <li className="transition duration-200 flex items-center hover:bg-gray-100 focus:bg-yellowlight py-4 px-8 border-b border-t">
                                        <span className="mr-4 px-3 p-1 rounded-full border border-yellowmain">B</span>
                                        <p>Tim Berners Lee</p>
                                    </li>
                                </button>
                                <button className="w-full">
                                    <li className="transition duration-200 flex items-center hover:bg-gray-100 focus:bg-yellowlight py-4 px-8 border-b border-t">
                                        <span className="mr-4 px-3 p-1 rounded-full border border-yellowmain">C</span>
                                        <p>Tim Berners Lee</p>
                                    </li>
                                </button>
                                <button className="w-full">
                                    <li className="transition duration-200 flex items-center hover:bg-gray-100 focus:bg-yellowlight py-4 px-8 border-b border-t">
                                        <span className="mr-4 px-3 p-1 rounded-full border border-yellowmain">D</span>
                                        <p>Tim Berners Lee</p>
                                    </li>
                                </button>
                            </ul>
                        </div>
                    </li>

                    {/* Open question */}
                    <li>
                        <div className="border rounded-lg shadow pt-8">
                            <div className="px-8 pb-4">
                                <p className="uppercase font-light text-gray-700 dark:text-gray-100">Pregunta 2</p>
                                <p className="font-semibold text-lg">¿Quién está considerado como uno de los padres de internet?</p>
                            </div>
                            <ul>
                                <div className="px-8 pb-4">
                                    <textarea
                                        className="w-full p-2 border rounded-lg resize-none focus:border-gray-400  bg-white text-gray-600 text-sm md:text-base outline-none focus:outline-none"
                                    >
                                    </textarea>
                                </div>
                            </ul>
                        </div>
                    </li>

                    {/* Multiple choice question */}
                    <li>
                        <div className="border rounded-lg shadow pt-8">
                            <div className="px-8 pb-4">
                                <p className="uppercase font-light text-gray-700 dark:text-gray-100">Pregunta 1</p>
                                <p className="font-semibold text-lg">¿Quién está considerado como uno de los padres de internet?</p>
                            </div>
                            <ul>
                                <button className="w-full">
                                    <li className="transition duration-200 flex items-center bg-gray-100 hover:bg-gray-100 focus:bg-yellowlight py-4 px-8 border-b border-t">
                                        <span className="mr-4 px-3 p-1 rounded-full border bg-yellowmain border-yellowmain">A</span>
                                        <p>Tim Berners Lee</p>
                                    </li>
                                </button>
                                <button className="w-full">
                                    <li className="transition duration-200 flex items-center hover:bg-gray-100 focus:bg-yellowlight py-4 px-8 border-b border-t">
                                        <span className="mr-4 px-3 p-1 rounded-full border border-yellowmain">B</span>
                                        <p>Tim Berners Lee</p>
                                    </li>
                                </button>
                                <button className="w-full">
                                    <li className="transition duration-200 flex items-center hover:bg-gray-100 focus:bg-yellowlight py-4 px-8 border-b border-t">
                                        <span className="mr-4 px-3 p-1 rounded-full border border-yellowmain">C</span>
                                        <p>Tim Berners Lee</p>
                                    </li>
                                </button>
                                <button className="w-full">
                                    <li className="transition duration-200 flex items-center hover:bg-gray-100 focus:bg-yellowlight py-4 px-8 border-b border-t">
                                        <span className="mr-4 px-3 p-1 rounded-full border border-yellowmain">D</span>
                                        <p>Tim Berners Lee</p>
                                    </li>
                                </button>
                            </ul>
                        </div>
                    </li>
                </ul>

                <div className="mt-4">

                    <button
                        className='btn-secondary'>
                        Terminar intento
                </button>
                </div>
            </div>
        </div>
    )
}
