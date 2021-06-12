import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react';
import { useHistory } from 'react-router';
import Logo from '../../assets/images/logo.png';
import { Helmet } from "react-helmet";
import { GetExamenAPI } from "../../api/Examen/GetExamenAPI";
import { GetTextoAPI } from "../../api/Textos/GetTextoAPI";
import stringSimilarity from "string-similarity";
import { LoadingPage } from '../../containers/LoadingPage';
import ImageExceededTime from "../../assets/images/exceeded_time.png";
import { CreateCalificacionAPI } from "../../api/Calificacion/CreateCalificacionAPI";
import { CreateRespuestaPreguntaAPI } from "../../api/Calificacion/CreateRespuestaPreguntaAPI";
import { UpdateExamenUsuarioAPI } from '../../api/Examen/UpdateExamenUsuarioAPI';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Examen = () => {

    // Hooks dark mode
    const darkModeRef = useRef();
    const history = useHistory();

    // Hook preguntas
    const [preguntas, setPreguntas] = useState([]);
    const [respuestasUsuario, setRespuestasUsuario] = useState([]);
    const [configuracionExamen, setConfiguracionExamen] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    /* Hooks Modals */
    // Hook advertencia preguntas sin responder
    const [isOpen, setIsOpen] = useState(false);

    // Hook exito examen resuelto
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);

    // Hook tiempo excedido al terminar entrega examen resuelto
    const [isOpenExceeded, setIsOpenExceeded] = useState(false);

    // Hook Texto
    const [textoExamen, setTextoExamen] = useState("");

    // Hook object calificacion REGISTER API
    const [calificacion, setCalificacion] = useState({
        examen: '',
        nota: '',
        retroalim: '',
    })

    // Hook object respuesta pregunta calificacion REGISTER API
    const [respuestaPreguntaUsuario, setRespuestaPreguntaUsuario] = useState({
        examen: '',
        generacion_pregunta: '',
        respuesta_usuario: '',
        calificacion_pregunta: '',
    })

    // Utilizado para actualizar como contestado el examen en la DB
    const [Resuelto, setResuelto] = useState({
        contestado: '',
        fecha_contestado: '',
    })

    useEffect(() => {
        if (localStorage.theme === 'dark') {
            darkModeRef.current.classList.add('dark')
        } else {
            darkModeRef.current.classList.remove('dark')
        }
        setIsLoading(false);

        // Alert Reload page
        window.onbeforeunload = function () {
            return true;
        };
        return () => {
            window.onbeforeunload = null;
        };
    }, []);

    useEffect(() => {
        getExamen();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getExamen = async () => {
        setIsLoading(true);

        let id_examen = localStorage.getItem('id_examen');
        const response_examen = await GetExamenAPI(id_examen);

        console.log(response_examen)

        if (response_examen.length === 0) {
            history.push('/student/home')
        } else if (response_examen !== false) {
            getConfiguracionExamen(); // obtiene la configuracion del examen
            let id_texto = response_examen[0].texto;

            const response_texto = await GetTextoAPI(id_texto);

            AddTipoPregunta(response_texto[0].preguntas)
            setTextoExamen(response_texto[0].cuerpo_texto)

            setIsLoading(false);
        }
        else {
            setIsLoading(true);
        }
    }

    const getConfiguracionExamen = () => {

        let conf_examen_temp = JSON.parse(localStorage.getItem('conf_examen'))
        let duracion_convertida = conf_examen_temp.duracion / 3600
        let dateNow = new Date(localStorage.getItem('h_inicio'));
        let hour = dateNow.getHours() + parseInt(duracion_convertida);
        let minutes = dateNow.getMinutes() + (duracion_convertida % 1) * 60;

        // validacion para cuando la suma supere los 60 minutos (asi se le suma 1 a la hora)
        if (minutes >= 60) {
            minutes = minutes - 60
            hour = hour + 1
        }

        setConfiguracionExamen({
            id_examen: conf_examen_temp.id_examen,
            title_exam: conf_examen_temp.title_exam,
            duracion: duracion_convertida,
            n_intentos: conf_examen_temp.n_intentos,
            fecha_hora_ini: conf_examen_temp.fecha_hora_ini,
            fecha_hora_fin: conf_examen_temp.fecha_hora_fin,
            finalizacion: hour.toString() + ":" + minutes.toString(),
        })
    }

    const AddTipoPregunta = (preguntas) => {
        let preguntasTemporal = []
        let respuestasTemporal = []

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
                    respuesta: "",
                    tipo_pregunta: "pregunta_abierta"
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
                    respuesta: "",
                    tipo_pregunta: "opcion_multiple"
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
                    respuesta: "",
                    nota: 0,
                    tipo_pregunta: "completacion"
                })
            }
            return true;
        })
        setPreguntas(preguntasTemporal)

        if (localStorage.getItem('respuestas_usuario') !== null) {
            respuestasTemporal = JSON.parse(localStorage.getItem('respuestas_usuario'))
            setRespuestasUsuario(respuestasTemporal)
        } else {
            setRespuestasUsuario(respuestasTemporal)
        }
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
                localStorage.removeItem('conf_examen');
                history.push('/');
            }
        }))
            .catch(err => err)
    }

    const onClickAjustes = () => {
        history.push('/student/ajustes-cuenta')
    }

    const onClickTerminarIntento = async () => {
        let id_examen = localStorage.getItem('id_examen');
        if (validationTimeEndExam() === true) {
            if (CheckValidationsRespuestas() === false) {
                if (await setCalificacionDB() === true) { // si se registra exitosamente en la db
                    console.log(respuestasUsuario);
                    console.log(preguntas)

                    setResuelto(
                        Object.assign(Resuelto, {
                            contestado: true,
                            fecha_contestado: new Date(),
                        })
                    )
                    await UpdateExamenUsuarioAPI(id_examen, Resuelto);

                    localStorage.removeItem('id_examen');
                    localStorage.removeItem('respuestas_usuario');
                    localStorage.removeItem('conf_examen');
                    localStorage.removeItem('h_inicio');
                    setIsOpenSuccess(true);
                }
                else {
                    console.log("Ha ocurrido un error con la calificación, intentalo de nuevo")
                }
            }
        }
        else {
            setIsOpenExceeded(true);
            console.log("Se pasó del tiempo limite de entrega")
        }
    }

    const handleChangePreguntaAbierta = (e) => {
        respuestasUsuario.map(respuesta => {
            if (respuesta.id_pregunta === e.target.name) {
                respuesta.respuesta = e.target.value
            }
            return true;
        })

        // Put the object into storage
        localStorage.setItem('respuestas_usuario', JSON.stringify(respuestasUsuario));
    }

    const CheckValidationsRespuestas = () => {
        let bool_empty = false;

        for (let i = 0; i < respuestasUsuario.length; i++) {
            if (respuestasUsuario[i].respuesta === "") {
                bool_empty = true;
                setIsOpen(bool_empty);
                break;
            }
            else {
                bool_empty = false;
            }
        }
        return bool_empty;
    }

    const validationTimeEndExam = () => {
        let hora_finalizacion = configuracionExamen.finalizacion
        let dateNow = new Date();
        let hora_actual = dateNow.getHours() + ':' + dateNow.getMinutes();

        let str_finalizacion = hora_finalizacion.split(':');
        let str_hora_actual = hora_actual.split(':');


        console.log('fin: ', str_finalizacion)
        console.log('hora actual: ', str_hora_actual)

        if (str_finalizacion[0] < str_hora_actual[0]) {  // horas
            console.log("Oops, te pasaste de la hora límite de entrega");
            return false;
        }
        else if (str_finalizacion[0] === str_hora_actual[0]) {  // horas
            if (str_finalizacion[1] > str_hora_actual[1]) { // minutos
                console.log("Dentro del tiempo minutos")
                return true;
            } else if (str_finalizacion[1] === str_hora_actual[1]) {
                console.log("Dentro del tiempo minutos")
                return true;
            }
        }
        else {
            console.log("Dentro del tiempo")
            return true;
        }
    }

    const getOptionAnswer = (e) => {

        let str = e.target.id;
        let array_str = str.split(" ");
        let id_pregunta = array_str[0]; //todo: revisar si es necesario usar un tokenizer
        let option_position = array_str[1];
        let length_opciones = 0

        preguntas.map(pregunta => {
            if (pregunta.id_pregunta === id_pregunta) {
                console.log(pregunta.respuestas_cuerpo.opcion_multiple.length);
                length_opciones = pregunta.respuestas_cuerpo.opcion_multiple.length
            }
            return true;
        })

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
            element.classList.remove('border-yellowmain');
        }
        let element = document.getElementById(str);
        element.classList.add('bg-yellowlight');
        element.classList.add('border-yellowmain');


        // Salva las respuestas en caso de que recargue la página, cierre de pestaña, falla de internet, demás

        // Put the object into storage
        /*         localStorage.setItem('respuestas_usuario', JSON.stringify(respuestasUsuario));
        
                // Retrieve the object from storage
                var retrievedObject = localStorage.getItem('respuestas_usuario');
        
                console.log('retrievedObject: ', JSON.parse(retrievedObject)); */

    }

    const getCalificacion = async () => {
        let nota = 0.0;
        for (let i = 0; i < respuestasUsuario.length; i++) {
            if (respuestasUsuario[i].tipo_pregunta === "pregunta_abierta") {

                let compare = stringSimilarity.compareTwoStrings(
                    respuestasUsuario[i].respuesta,
                    preguntas[i].respuesta_correcta
                );
                if (compare <= 0.9) {
                    compare = compare + 0.07
                    respuestasUsuario[i].nota = compare.toFixed(2)
                    nota = nota + compare;
                    console.log("Question " + (i + 1) + ": " + compare);    // asignación de nota de la pregunta en el objeto
                } else {
                    respuestasUsuario[i].nota = compare.toFixed(2)
                    nota = nota + compare;
                    console.log("Question " + (i + 1) + ": " + compare);    // asignación de nota de la pregunta en el objeto

                }

            } else if (respuestasUsuario[i].tipo_pregunta === "opcion_multiple") {
                if (respuestasUsuario[i].respuesta === preguntas[i].respuesta_correcta) {
                    nota = nota + 1;
                    respuestasUsuario[i].nota = 1.0
                    console.log("Question " + (i + 1) + ": " + 1.0)
                } else {
                    nota = nota + 0;
                    respuestasUsuario[i].nota = 0.0
                    console.log("Question " + (i + 1) + ": " + 0.0)
                }
            }

            /* if (respuestasUsuario[i].respuesta === preguntas[i].respuesta_correcta) {
                calificacion = calificacion + 1.0;    
            } */
        }
        nota = (nota / respuestasUsuario.length) * 5;
        return nota;
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

    async function closeModalContinue() { // to to: acomodar igual a terminar intento, seria bueno unificar las dos funciones
        let id_examen = localStorage.getItem('id_examen');
        if (validationTimeEndExam() === true) {
            if (await setCalificacionDB() === true) { // si se registra exitosamente en la db
                console.log(respuestasUsuario);
                console.log(preguntas)

                setResuelto(
                    Object.assign(Resuelto, {
                        contestado: true,
                        fecha_contestado: new Date(),
                    })
                )
                await UpdateExamenUsuarioAPI(id_examen, Resuelto);

                console.log(respuestasUsuario);
                console.log(preguntas)
                getCalificacion();
                localStorage.removeItem('id_examen');
                localStorage.removeItem('respuestas_usuario');
                localStorage.removeItem('conf_examen');
                localStorage.removeItem('h_inicio');
                localStorage.removeItem('conf_examen');
                setIsOpen(false);
                history.push('/student/calificaciones')
            }
            else {
                console.log("Ha ocurrido un error con la calificación, intentalo de nuevo")
            }
        } else {
            setIsOpenExceeded(true);
            console.log("Se pasó del tiempo de entrega");
        }
    }

    function closeModal() {
        setIsOpen(false);
        setIsOpenSuccess(false);
        setIsOpenExceeded(false);
    }

    function closeModalCalificaciones() {
        history.push('/student/calificaciones');
    }

    function closeModalCalificacionesExceeded (){

        history.push('/student/calificaciones');
        localStorage.removeItem('id_examen');
        localStorage.removeItem('respuestas_usuario');
        localStorage.removeItem('conf_examen');
        localStorage.removeItem('h_inicio');
        localStorage.removeItem('conf_examen');
    }

    function closeModalHome() {
        history.push('/student/home');
    }

    const setCalificacionDB = async () => {
        let nota_examen = await getCalificacion();
        let id_examen = localStorage.getItem('id_examen');
        let response_ok = true;

        setCalificacion(
            Object.assign(calificacion, {
                examen: id_examen,
                nota: nota_examen.toFixed(2),
                retroalim: 'Sin descripción',
            })
        )
        const response_calificacion = await CreateCalificacionAPI(calificacion);

        respuestasUsuario.map(async (respuesta_usuario) => {
            console.log(respuesta_usuario)
            setRespuestaPreguntaUsuario(
                Object.assign(respuestaPreguntaUsuario, {
                    examen: id_examen,
                    generacion_pregunta: respuesta_usuario.id_pregunta,
                    respuesta_usuario: respuesta_usuario.respuesta,
                    calificacion_pregunta: respuesta_usuario.nota,
                })
            )
            const response_respuesta_pregunta = await CreateRespuestaPreguntaAPI(respuestaPreguntaUsuario);
            if (response_respuesta_pregunta === false) {
                response_ok = false;
            }
            return true;
        })

        if (response_calificacion === true && response_ok === true) {
            console.log(response_ok)
            response_ok = true;
        } else {
            console.log(response_ok)
            response_ok = false;
        }
        return response_ok;
    }

/*     const handleClickTest = async () => {
        console.log(await (await getCalificacion()).toFixed(2));
    }
 */
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
                <p className="text-black text-lg dark:text-gray-200">Tu examen finaliza a las: <b>{configuracionExamen.finalizacion}</b></p>
            </div>

            {/* TopBar */}
            <div className="border-b shadow-sm dark:bg-darkColor dark:border-gray-700">
                <nav className="container py-4 mx-auto h-36">
                    <div className="sm:pr-0 pr-20 2xl:ml-16 xl:ml-28 lg:ml-16 md:ml-16 sm:ml-12 ml-8 text-sm sm:text-base dark:text-gray-200">
                        <p className="uppercase font-light text-gray-600 dark:text-gray-100">Inglés - Universidad del Valle</p>
                        <p className="font-black text-gray-600 dark:text-gray-200 md:text-3xl text-2xl">Examen {configuracionExamen.title_exam}</p>
                        <p className="font-black text-gray-600 dark:text-gray-200 md:text-xl text-xl">Tiempo para el examen: {configuracionExamen.duracion} h</p> {/* to do: traer atributo duracion cuando lo agregue*/}
                        <p>Intentos: {configuracionExamen.n_intentos}</p>
                    </div>

                    {/* Profile dropdown */}
                    <Menu as="div" className="absolute top-12 2xl:right-64 xl:right-44 lg:right-50 md:right-20 sm:right-12 right-8">
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
                {!isLoading &&
                    <div className="container mx-auto 2xl:px-96 xl:px-80 lg:px-40 md:px-32 sm:px-16 px-8 pt-8 pb-32 ">
                        {/* Texto disclosure */}

                        <div className="w-full">
                            <div className="w-full py-2 mx-auto dark:bg-darkColor rounded-xl">
                                <Disclosure defaultOpen={true} >
                                    {({ open }) => (
                                        <div id='texto'>
                                            <Disclosure.Button className={`${open ? "rounded-t-xl" : "rounded-xl" } flex justify-between w-full px-4 py-2 text-base font-medium text-left 
                                            text-yellow-900 bg-yellowlight bg-opacity-50 dark:bg-opacity-100 focus:outline-none 
                                            focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75`}>
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
                                                enter="transition duration-200 ease-in"
                                                enterFrom="transform scale-100 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-200 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-100 opacity-0"
                                            >
                                                <Disclosure.Panel className="px-4 py-4 text-base bg-white text-gray-500 border rounded-b-xl select-none">
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

                                        <div key={i + 1000} className="relative py-1 sm:mx-auto">
                                            <div className="group cursor-pointer relative inline-block border-gray-400 w-12 text-center">
                                                <a className="ml-2 transition duration-500 hover:text-yellowmain text-gray-400 dark:text-gray-600 dark:hover:text-yellowmain material-icons mr-2"
                                                    href={"examen#" + (i = i + 1)}
                                                    onClick={scrollAnimation}
                                                >&#xe061;
                                                </a>
                                                <div className="transition duration-500 opacity-0 w-32 h-9 bg-darkColor font-semibold text-white text-center text-sm rounded-xl py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-32 -top-1 px-4 pointer-events-none">
                                                    Question {i}
                                                    <svg className="absolute text-black h-2 w-full left-16 top-3 transform -rotate-90" x="0px" y="0px" viewBox="0 0 255 255" ><polygon className="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
                                                </div>
                                            </div>
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
                                        <li key={pregunta.id_pregunta} id={contador = contador + 1}>
                                            <div className="border rounded-xl shadow pt-8 bg-white">
                                                <div className="px-8 pb-4">
                                                    <p className="uppercase font-light text-gray-700">Question {contador}</p>
                                                    <p className="font-semibold text-lg select-none">{pregunta.pregunta_cuerpo}</p>
                                                </div>
                                                <ul>
                                                    {
                                                        pregunta.respuestas_cuerpo.opcion_multiple.map((opcion, letter = "A") => (
                                                            <button key={opcion} id={pregunta.id_pregunta} className="w-full outline-none focus:outline-none" onClick={getOptionAnswer}>
                                                                <li id={pregunta.id_pregunta + " " + letter} className="transition duration-200 flex items-center hover:bg-yellowlight rounded-xl py-4 px-8 border border-gray-100">
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
                                            <li key={pregunta.id_pregunta} id={contador = contador + 1}>
                                                <div className="border rounded-xl shadow pt-8 bg-white">
                                                    <div className="px-8 pb-4">
                                                        <p className="uppercase font-light text-gray-700">Question {contador}</p>
                                                        <p className="font-semibold text-lg select-none">{pregunta.pregunta_cuerpo}</p>
                                                    </div>
                                                    <ul>
                                                        <div className="px-8 pb-4">
                                                            <textarea
                                                                name={pregunta.id_pregunta}
                                                                onChange={handleChangePreguntaAbierta}
                                                                defaultValue={respuestasUsuario[contador - 1].respuesta}
                                                                className="transition duration-500 w-full resize-y p-2 h-32 border rounded-xl focus:border-yellowmain focus:border-opacity-50 bg-white text-gray-600 text-sm md:text-base outline-none focus:outline-none"
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
                            {/* <button
                                className='btn-primary mt-2'
                                onClick={handleClickTest}
                            >
                                Tests
                            </button> */}
                        </div>

                        {/* Preguntas sin responder Modal (mensaje de advertencia) */}
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
                                        <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl font-manrope">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-xl font-semibold leading-6 text-gray-900"
                                            >
                                                Hay preguntas sin contestar
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <ul className="list-none space-y-2 md:text-justify">
                                                    <li>
                                                        <p className="text-base text-gray-500">
                                                            Quedarán preguntas sin contestar, ¿Desea Continuar?
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="flex mt-4 justify-end space-x-4">
                                                <button
                                                    type="button"
                                                    className="transition duration-500 sm:w-auto w-28 inline-flex justify-center px-12 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent 
                                                    rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                    onClick={closeModal}
                                                >
                                                    No
                                                    </button>
                                                <button
                                                    type="button"
                                                    className="transition duration-500 sm:w-auto w-28 inline-flex justify-center px-12 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent 
                                                    rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                    onClick={closeModalContinue}
                                                >
                                                    Sí
                                                </button>
                                            </div>
                                        </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>

                        {/* Preguntas respondidas Modal (mensaje de éxito) */}
                        <Transition appear show={isOpenSuccess} as={Fragment}>
                            <Dialog
                                as="div"
                                className="fixed inset-0 z-10 overflow-y-auto"
                                onClose={closeModalCalificaciones}
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
                                        <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl font-manrope">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-xl font-semibold leading-6 text-gray-900"
                                            >
                                                Respuestas guardadas con éxito
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <ul className="list-none space-y-2 md:text-justify">
                                                    <li>
                                                        <p className="text-base text-gray-500">
                                                            Puede ir ahora mismo a calificaciones para ver la nota de su examen
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="flex mt-4 justify-end space-x-4">
                                                <button
                                                    type="button"
                                                    className="transition duration-500 sm:w-auto w-28 inline-flex justify-center px-12 py-2 text-sm font-medium text-yellow-900 bg-white border border-yellowmain 
                                                    rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                    onClick={closeModalHome}
                                                >
                                                    Después
                                                    </button>
                                                <button
                                                    type="button"
                                                    className="transition duration-500 sm:w-auto w-28 inline-flex justify-center px-12 py-2 text-sm font-medium text-green-900 bg-green-100 border border-green-500 
                                                    rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                    onClick={closeModalCalificaciones}
                                                >
                                                    Ir ahora
                                                </button>
                                            </div>
                                        </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>

                        {/* Tiempo excedido al terminar intento Modal (mensaje informativo) */}
                        <Transition appear show={isOpenExceeded} as={Fragment}>
                            <Dialog
                                as="div"
                                className="fixed inset-0 z-10 overflow-y-auto"
                                onClose={closeModalCalificacionesExceeded}
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
                                        <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl font-manrope">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-xl font-semibold leading-6 text-gray-900"
                                            >
                                                Tiempo excedido
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <ul className="list-none space-y-2 md:text-justify">
                                                    <li>
                                                        <p className="text-base text-gray-500">
                                                            Has excedido el tiempo máximo que tenías para responder el examen
                                                        </p>
                                                    </li>
                                                    <div className="flex place-content-center select-none">
                                                        <img src={ImageExceededTime} alt="exceeded" className="w-72"></img>
                                                    </div>
                                                </ul>
                                            </div>

                                            <div className="mt-4 w-full space-x-4">
                                                <button
                                                    type="button"
                                                    className="transition duration-500 w-full inline-flex justify-center px-12 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent 
                                                    rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                    onClick={closeModalCalificacionesExceeded}
                                                >
                                                    Cerrar
                                                    </button>
                                            </div>
                                        </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                }{isLoading &&
                    <div className="pt-52">
                        <LoadingPage />
                    </div>}
            </div>
        </div>
    )
}
