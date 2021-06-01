import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useHistory } from 'react-router';
import Logo from '../../assets/images/logo.png';
import { Helmet } from "react-helmet";
import { GetExamenAPI } from "../../api/Examen/GetExamenAPI";
import { GetTextoAPI } from "../../api/Textos/GetTextoAPI";
import  stringSimilarity  from "string-similarity";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Examen = () => {

    // Hooks dark mode
    const darkModeRef = useRef();
    const history = useHistory();

    // Hook preguntas
    const [preguntas, setPreguntas] = useState([]);
    const [respuestasUsuario, setRespuestasUsuario] = useState([])

    // Hook Texto
    const [textoExamen, setTextoExamen] = useState("");

    useEffect(() => {
        if (localStorage.theme === 'dark') {
            darkModeRef.current.classList.add('dark')
        } else {
            darkModeRef.current.classList.remove('dark')
        }
        getExamen();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getExamen = async () => {
        let id_examen = localStorage.getItem('id_examen');
        const response_examen = await GetExamenAPI(id_examen);

        let id_texto = response_examen[0].texto;

        const response_texto = await GetTextoAPI(id_texto);

        AddTipoPregunta(response_texto[0].preguntas)
        setTextoExamen(response_texto[0].cuerpo_texto)
    }

    const AddTipoPregunta = (preguntas) => {
        const preguntasTemporal = []
        const respuestasTemporal = []

        preguntas.map(pregunta => {
            let completacion = pregunta.respuestas_cuerpo.completacion
            let opcion_multiple = pregunta.respuestas_cuerpo.opcion_multiple
            let pregunta_abierta = pregunta.respuestas_cuerpo.resp_unica

            if (completacion === "null" && opcion_multiple === "null") {
                preguntasTemporal.push({
                    generacion_texto: pregunta.generacion_texto,
                    id_pregunta: pregunta.id_pregunta,
                    pregunta_cuerpo: pregunta.pregunta_cuerpo,
                    respuesta_correcta: pregunta.respuesta_correcta,
                    respuestas_cuerpo: {
                        completacion: pregunta.respuestas_cuerpo.completacion,
                        generacion_pregunta: pregunta.respuestas_cuerpo.generacion_pregunta,
                        opcion_multiple: pregunta.respuestas_cuerpo.opcion_multiple,
                        resp_unica: pregunta.respuestas_cuerpo.resp_unica,
                        tipo_pregunta: "pregunta_abierta"
                    }
                })
                respuestasTemporal.push({
                    id_pregunta: pregunta.id_pregunta,
                    respuesta: ""
                })
            }
            else if (completacion === "null" && pregunta_abierta === "null") {
                let str = pregunta.respuestas_cuerpo.opcion_multiple;
                let options_question_mcm = str.split(", "); //todo: revisar si es necesario usar un tokenizer

                preguntasTemporal.push({
                    generacion_texto: pregunta.generacion_texto,
                    id_pregunta: pregunta.id_pregunta,
                    pregunta_cuerpo: pregunta.pregunta_cuerpo,
                    respuesta_correcta: pregunta.respuesta_correcta,
                    respuestas_cuerpo: {
                        completacion: pregunta.respuestas_cuerpo.completacion,
                        generacion_pregunta: pregunta.respuestas_cuerpo.generacion_pregunta,
                        opcion_multiple: options_question_mcm,
                        resp_unica: pregunta.respuestas_cuerpo.resp_unica,
                        tipo_pregunta: "opcion_multiple"
                    }
                })
                respuestasTemporal.push({
                    id_pregunta: pregunta.id_pregunta,
                    respuesta: ""
                })
            } else {
                preguntasTemporal.push({
                    generacion_texto: pregunta.generacion_texto,
                    id_pregunta: pregunta.id_pregunta,
                    pregunta_cuerpo: pregunta.pregunta_cuerpo,
                    respuesta_correcta: pregunta.respuesta_correcta,
                    respuestas_cuerpo: {
                        completacion: pregunta.respuestas_cuerpo.completacion,
                        generacion_pregunta: pregunta.respuestas_cuerpo.generacion_pregunta,
                        opcion_multiple: pregunta.respuestas_cuerpo.opcion_multiple,
                        resp_unica: pregunta.respuestas_cuerpo.resp_unica,
                        tipo_pregunta: "completacion"
                    }
                })
                respuestasTemporal.push({
                    id_pregunta: pregunta.id_pregunta,
                    respuesta: ""
                })
            }
            return true;
        })
        setPreguntas(preguntasTemporal)
        setRespuestasUsuario(respuestasTemporal)
    }

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


    /* functions for dropdown user */
    const onClickLogout = async () => {
        await fetch(
            "http://localhost:8000/api/logout/",
            {
                method: "POST",
                headers: {
                    Authorization: 'Token ' + localStorage.getItem('token'),
                    "Content-Type": "application/json"
                },
            }
        ).then((data => {
            if (data.ok) {
                localStorage.removeItem('email');
                localStorage.removeItem('token');
                localStorage.removeItem('uuid_generacion');
                localStorage.removeItem('id_user');
                localStorage.removeItem('rol');
                history.push('/');
            }
        }))
            .catch(err => err)
    }

    const onClickAjustes = () => {
        history.push('/student/ajustes-cuenta')
    }

    const onClickTerminarIntento = () => {
        //history.push('/student/home')
        getCalificacion();
        if (CheckValidationsRespuestas() === false) {
            console.log(respuestasUsuario);
            console.log(preguntas)
        }
    }

    const handleChangePreguntaAbierta = (e) => {
        respuestasUsuario.map(respuesta => {
            if (respuesta.id_pregunta === e.target.name) {
                respuesta.respuesta = e.target.value
            }
            return true;
        })
    }

    const CheckValidationsRespuestas = () => {
        let bool_empty = false;

        for (let i = 0; i < respuestasUsuario.length; i++) {
            if (respuestasUsuario[i].respuesta === "") {
                bool_empty = true;
                console.log("Hay preguntas sin contestar, ¿desea continuar?")
                break;
            }
            else{
                bool_empty = false;
            }
        }
        return bool_empty;
    }

    const getOptionAnswer = (e) => {

        let str = e.target.id;
        let array_str = str.split(" ");
        let id_pregunta = array_str[0]; //todo: revisar si es necesario usar un tokenizer
        let option_position = array_str[1];
        let length_opciones = preguntas[0].respuestas_cuerpo.opcion_multiple.length

        // assign answer option selected
        respuestasUsuario.map(respuesta => {
            preguntas.map(pregunta => {
                if (respuesta.id_pregunta === id_pregunta && pregunta.id_pregunta === id_pregunta) {
                    respuesta.respuesta = pregunta.respuestas_cuerpo.opcion_multiple[option_position]
                }
                return true;
            })
            return true;
        })

        // background color option selected
        for (let i = 0; i < length_opciones; i++) {
            let element = document.getElementById(id_pregunta + " " + i);
            element.classList.remove('bg-yellowlight');
        }
        let element = document.getElementById(str);
        element.classList.add('bg-yellowlight');
    }

    const getCalificacion = async () => {
        let calificacion = 0.0;
        for (let i = 0; i < respuestasUsuario.length; i++) {
            let compare = stringSimilarity.compareTwoStrings(
                respuestasUsuario[i].respuesta,
                preguntas[i].respuesta_correcta
              );
            console.log("Question " + (i+1) + ": " + compare)
            if (compare <= 0.9) {
                
                calificacion = calificacion + (compare + 0.1);
            }else{
                calificacion = calificacion + compare;
            }

            /* if (respuestasUsuario[i].respuesta === preguntas[i].respuesta_correcta) {
                calificacion = calificacion + 1.0;    
            } */
        }
        console.log((calificacion/5) * 5);

        /* Example */
        /* let compare = stringSimilarity.compareTwoStrings(
            "Olive-green table for sale, in extremely good condition.",
            "For sale: table in very good  condition, olive green in colour."
          ); */
        
    }

    const getLetter = (letter) => {
        if (letter === 0) return "A"
        if (letter === 1) return "B"
        if (letter === 2) return "C"
        if (letter === 3) return "D"
        if (letter === 4) return "E"
    }

    return (
        <div ref={darkModeRef} className="font-manrope">

            <Helmet>
                <title>Examen - GQuestions</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"></link>
            </Helmet>


            {/* Toolbar */}
            <div className="flex justify-center items-center bg-gray-200 dark:bg-darkGrayColor2 text-white py-3 px-4 text-center fixed left-0 bottom-0 right-0 z-40">
                <img className="h-12 self-center " src={Logo} alt="GQuestions" />
                <p className="font- text-black dark:text-gray-200">Tiempo restante: 36:55 s</p>
            </div>

            {/* TopBar */}
            <div className="border-b shadow-sm dark:bg-darkColor dark:border-gray-700">
                <nav className="container py-4 mx-auto h-36">
                    <div className="sm:pr-0 pr-20 text-sm sm:text-base dark:text-gray-200">
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

                </nav>
            </div>

            <div className="dark:bg-darkColor">
                <div className="container mx-auto xl:px-96 md:px-32 sm:px-16 px-8 pt-8 pb-32 ">
                    {/* Texto disclosure */}
                    <div className="w-full">
                        <div className="w-full py-2 mx-auto dark:bg-darkColor rounded-lg">
                            <Disclosure >
                                {({ open }) => (
                                    <div id='texto'>
                                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-base font-medium text-left 
                                            text-yellow-900 bg-yellowlight bg-opacity-50 dark:bg-opacity-100 rounded-t-xl focus:outline-none 
                                            focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75">
                                            <span>Text to answer the questions</span>
                                            <svg
                                                className={`${open ? 'transform rotate-180' : 'animate-pulse'} w-5 h-5 text-yellow-500`}
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
                                            <Disclosure.Panel className="px-4 py-4 text-base bg-white text-gray-500 border rounded-b-xl">
                                                {textoExamen}
                                            </Disclosure.Panel>
                                        </Transition>
                                    </div>
                                )}

                            </Disclosure>
                        </div>
                    </div>

                    {/* Navigation questions */}
                    <div id="navigate" className="hidden md:block">
                        <div className="fixed xl:right-64 lg:right-20 md:right-16 grid grid-rows text-darkColor" style={{ top: "45vh" }}>
                            <div className="tooltip place-self-center select-none">
                                <a
                                    className="ml-2 transition duration-500 hover:text-green-500 text-green-300 material-icons mr-2"
                                    href="#texto"
                                    onClick={scrollAnimation}
                                >&#xe061;
                            </a>
                                <span className="tooltiptext text-sm">Text</span>
                            </div>
                            {
                                [...Array(preguntas.length)].map((x, i) =>
                                    <div key={i + 1000} className="tooltip-examen place-self-center select-none">
                                        <a
                                            className="ml-2 transition duration-500 hover:text-yellowmain text-gray-400 dark:text-gray-600 dark:hover:text-yellowmain material-icons mr-2"
                                            href={"examen#" + i}
                                            onClick={scrollAnimation}
                                        >&#xe061;
                                        </a>
                                        <span className="tooltiptext-examen text-sm">Question {i + 1}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>



                    {/* Questions */}
                    <ul className="space-y-6">
                        {/* Multiple choice question */}
                        {
                            preguntas.map((pregunta, contador = 1) => (
                                pregunta.respuestas_cuerpo.tipo_pregunta === "opcion_multiple" ?
                                    <li key={pregunta.id_pregunta} id={contador}>
                                        <div className="border rounded-lg shadow pt-8 bg-white">
                                            <div className="px-8 pb-4">
                                                <p className="uppercase font-light text-gray-700">Question {contador = contador + 1}</p>
                                                <p className="font-semibold text-lg">{pregunta.pregunta_cuerpo}</p>
                                            </div>
                                            <ul>
                                                {
                                                    pregunta.respuestas_cuerpo.opcion_multiple.map((opcion, letter = "A") => (
                                                        <button key={opcion} id={pregunta.id_pregunta} className="w-full outline-none focus:outline-none" onClick={getOptionAnswer}>
                                                            <li id={pregunta.id_pregunta + " " + letter} className="transition duration-200 flex items-center hover:bg-yellowlight py-4 px-8 border-t">
                                                                <span className="font-semibold mr-4 px-3 p-1 rounded-full border border-yellowmain">{getLetter(letter)}</span>
                                                                <p>{opcion}</p>
                                                            </li>
                                                        </button>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </li>

                                    : pregunta.respuestas_cuerpo.tipo_pregunta === "pregunta_abierta" ?
                                        <li key={pregunta.id_pregunta} id={contador}>
                                            <div className="border rounded-lg shadow pt-8 bg-white">
                                                <div className="px-8 pb-4">
                                                    <p className="uppercase font-light text-gray-700">Question {contador = contador + 1}</p>
                                                    <p className="font-semibold text-lg">{pregunta.pregunta_cuerpo}</p>
                                                </div>
                                                <ul>
                                                    <div className="px-8 pb-4">
                                                        <textarea
                                                            name={pregunta.id_pregunta}
                                                            onChange={handleChangePreguntaAbierta}
                                                            className="w-full resize-y p-2 border rounded-lg focus:border-gray-400  bg-white text-gray-600 text-sm md:text-base outline-none focus:outline-none"
                                                        >
                                                        </textarea>
                                                    </div>
                                                </ul>
                                            </div>
                                        </li>
                                        : <div>otra</div>
                            ))
                        }

                    </ul>

                    <div className="mt-4">

                        <button
                            className='btn-secondary'
                            onClick={onClickTerminarIntento}
                        >
                            Terminar intento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
