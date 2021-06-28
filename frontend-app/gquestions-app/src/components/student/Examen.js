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

    // Hooks Terminos y condiciones
    const [isOpenCondiciones, setIsOpenCondiciones] = useState(false);

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

    /* Hooks for text to speech text exam */
    const synth = window.speechSynthesis;
    const msg = new SpeechSynthesisUtterance();
    const [speaking, setSpeaking] = useState(false);
    const [speakingFirst, setSpeakingFirst] = useState(true);

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

        if (response_examen.length === 0) {
            history.push('/student/home') // Si el examen no existe entonces redirige al usuario al home
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

        let conf_examen_temp = JSON.parse(localStorage.getItem('conf_examen'));
        let duracion_convertida = conf_examen_temp.duracion / 3600; // pasa de segundos a horas
        let dateNow = new Date(localStorage.getItem('h_inicio'));
        let hour = dateNow.getHours() + parseInt(duracion_convertida);
        let minutes = dateNow.getMinutes() + (duracion_convertida % 1) * 60; // obtiene los decimales

        // validacion para cuando la suma supere los 60 minutos (asi se le suma 1 a la hora)
        if (minutes >= 60) {
            minutes = minutes - 60
            hour = hour + 1
        }

        if (minutes < 10) {
            minutes = '0' + minutes.toString();
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
            let completacion = pregunta.respuestas_cuerpo.completacion;
            let opcion_multiple = pregunta.respuestas_cuerpo.opcion_multiple;
            let pregunta_abierta = pregunta.respuestas_cuerpo.resp_unica;

            if (completacion === "null" && opcion_multiple === "null") { // si ambos son null entonces el tipo de pregunta es abierta
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
            else if (completacion === "null" && pregunta_abierta === "null") {  // si ambos son null entonces el tipo de pregunta es mcq
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

        if (localStorage.getItem('respuestas_usuario') !== null) {  // si ya existen respuestas de ese examen en el localstorage
            respuestasTemporal = JSON.parse(localStorage.getItem('respuestas_usuario'));
            setRespuestasUsuario(respuestasTemporal);
        } else {
            setRespuestasUsuario(respuestasTemporal);
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
        })).catch(err => err)
    }

    const onClickAjustes = () => {
        history.push('/student/ajustes-cuenta');
    }

    const handleChangePreguntaAbierta = (e) => {
        respuestasUsuario.map(respuesta => {
            if (respuesta.id_pregunta === e.target.name) {
                respuesta.respuesta = e.target.value
            }
            return true;
        })
        /* console.log(respuestaPreguntaUsuario); */
        // Put the object into storage
        localStorage.setItem('respuestas_usuario', JSON.stringify(respuestasUsuario)); // guarda en el localStorage las respuestas
    }

    const CheckValidationsRespuestas = () => {
        let bool_empty = false;

        for (let i = 0; i < respuestasUsuario.length; i++) {    // Verifica si hay preguntas sin responser
            if (respuestasUsuario[i].respuesta === "") {
                bool_empty = true;
                setIsOpen(bool_empty);  // si hay sin responder entonces muestra el modal de advertencia
                break;
            }
            else {
                bool_empty = false;
            }
        }
        return bool_empty;
    }

    const validationTimeEndExam = () => {
        let hora_finalizacion = configuracionExamen.finalizacion;
        let dateNow = new Date();
        let hora_actual = dateNow.getHours() + ':' + dateNow.getMinutes();

        let str_finalizacion = hora_finalizacion.split(':');
        let str_hora_actual = hora_actual.split(':');

        /* console.log('fin: ', str_finalizacion)
        console.log('hora actual: ', str_hora_actual) */

        if (str_finalizacion[0] < str_hora_actual[0]) {  // si la hora de finalizacion es menor entonces se pasó de la hora límite
            /* console.log("Oops, te pasaste de la hora límite de entrega"); */
            return false;
        }
        else if (str_finalizacion[0] === str_hora_actual[0]) {  // Si las horas son iguales entonces compara los minutos
            if (str_finalizacion[1] > str_hora_actual[1]) { //
                /* console.log("Dentro del tiempo minutos") */
                return true;
            } else if (str_finalizacion[1] === str_hora_actual[1]) {
                /* console.log("Dentro del tiempo minutos") */
                return true;
            }
        }
        else {
            /* console.log("Dentro del tiempo") */
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
                /* console.log(pregunta.respuestas_cuerpo.opcion_multiple.length); */
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
                if (compare <= 0.9) { // No tiene bonificacion si la calificacion está por encima de 0.9
                    compare = compare + 0.07
                    respuestasUsuario[i].nota = compare.toFixed(2)
                    nota = nota + compare;
                    /* console.log("Question " + (i + 1) + ": " + compare);  */   // asignación de nota de la pregunta en el objeto
                } else {
                    respuestasUsuario[i].nota = compare.toFixed(2)
                    nota = nota + compare;
                    /* console.log("Question " + (i + 1) + ": " + compare); */    // asignación de nota de la pregunta en el objeto

                }

            } else if (respuestasUsuario[i].tipo_pregunta === "opcion_multiple") {
                if (respuestasUsuario[i].respuesta === preguntas[i].respuesta_correcta) {
                    nota = nota + 1;
                    respuestasUsuario[i].nota = 1.0
                    /* console.log("Question " + (i + 1) + ": " + 1.0) */
                } else {
                    nota = nota + 0;
                    respuestasUsuario[i].nota = 0.0
                    /* console.log("Question " + (i + 1) + ": " + 0.0) */
                }
            }
        }
        nota = (nota / respuestasUsuario.length) * 5;
        return nota;

        // ******************* Example compare strings ************************ //
        // ********************************** ********************************* //
        /* let compare = stringSimilarity.compareTwoStrings(
            "Olive-green table for sale, in extremely good condition.",
            "For sale: table in very good  condition, olive green in colour."
            ); */
        // ********************************** ********************************* //
        // ********************************** ********************************* //

    }

    const getLetter = (letter) => {
        if (letter === 0) return "A"
        if (letter === 1) return "B"
        if (letter === 2) return "C"
        if (letter === 3) return "D"
        if (letter === 4) return "E"
    }

    const onClickTerminarIntento = async () => {
        let id_examen = localStorage.getItem('id_examen');
        if (validationTimeEndExam() === true) { // Valida que el examen esté dentro del tiempo válido al terminar el intento
            if (CheckValidationsRespuestas() === false) {   // Valida que las respuestas no estén vacías
                if (await setCalificacionDB() === true) {   // si se registra exitosamente en la db
                    /* console.log(respuestasUsuario);
                    console.log(preguntas) */

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
                    /* console.log("Ha ocurrido un error con la calificación, intentalo de nuevo"); */
                }
            }
        }
        else {
            setIsOpenExceeded(true);
            /*  console.log("Se pasó del tiempo limite de entrega"); */
        }
    }

    async function closeModalContinue() { // to to: acomodar igual a terminar intento, seria bueno unificar las dos funciones
        let id_examen = localStorage.getItem('id_examen');
        if (validationTimeEndExam() === true) {
            if (await setCalificacionDB() === true) { // si se registra exitosamente en la db

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
                localStorage.removeItem('conf_examen');
                setIsOpen(false);
                history.push('/student/calificaciones')
            }
            else {
                /* console.log("Ha ocurrido un error con la calificación, intentalo de nuevo") */
            }
        } else {
            setIsOpenExceeded(true);
            /* console.log("Se pasó del tiempo de entrega"); */
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

    function closeModalCalificacionesExceeded() {

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

    function closeModalCondiciones() {
        setIsOpenCondiciones(false);
    }

    function onClickCondicionesUso(){
        setIsOpenCondiciones(true);
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
            response_ok = true;
        } else {
            response_ok = false;
        }
        return response_ok;
    }

    /*     const handleClickTest = async () => {
            console.log(await (await getCalificacion()).toFixed(2));
        }
     */

    /* Text to speech text examen */
    const handleClickPlayStop = () => {
        if (speaking === true) {
            setSpeaking(false);
            synth.pause();
        } else if (speaking === false) {
            setSpeaking(true);
            synth.resume();
        }
    }

    const handleClickPlayInit = () => {
        msg.volume = 1;
        msg.rate = 0.9;
        msg.pitch = 0.8;
        msg.text = textoExamen;
        msg.lang = 'en-US';
        setSpeakingFirst(false);
        setSpeaking(true);

        speechUtteranceChunker(msg, {
            chunkLength: 120
        }, function () {
            console.log('done');
        });
    }

    /* función que toma chunks del texto y lo va reproduciendo para que no se pause automáticamente en textos largos */
    var speechUtteranceChunker = function (utt, settings, callback) {
        settings = settings || {};
        var newUtt;
        var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);

        var chunkLength = (settings && settings.chunkLength) || 160;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var chunkArr = txt.match(pattRegex);

        if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
            //call once all text has been spoken...
            if (callback !== undefined) {
                callback();
            }
            return;
        }
        var chunk = chunkArr[0];
        newUtt = new SpeechSynthesisUtterance(chunk);
        var x;
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
                return;
            }
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length - 1;
            speechUtteranceChunker(utt, settings, callback);
        });

        if (settings.modifier) {
            settings.modifier(newUtt);
        }
        console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
        //placing the speak invocation inside a callback fixes ordering and onend issues.
        setTimeout(function () {

            newUtt.lang = 'en-US';
            synth.speak(newUtt);
        }, 0);
    };

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
                {/* Términos y condiciones Modal */}
                <Transition appear show={isOpenCondiciones} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={closeModalCondiciones}
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
                                                onClick={closeModalCondiciones}
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

            <div className="dark:bg-darkColor">
                {!isLoading &&
                    <div className="container mx-auto 2xl:px-96 xl:px-80 lg:px-40 md:px-32 sm:px-16 px-8 pt-8 pb-32 ">
                        {/* Texto disclosure */}

                        <div className="w-full">
                            <div className="w-full py-2 mx-auto dark:bg-darkColor rounded-xl">
                                <Disclosure defaultOpen={true} >
                                    {({ open }) => (
                                        <div id='texto'>
                                            <Disclosure.Button className={`${open ? "rounded-t-xl" : "rounded-xl"} flex justify-between w-full px-4 py-2 text-base font-medium text-left 
                                            text-yellow-900 bg-yellowlight focus:outline-none 
                                            focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75 `}>
                                                <div className="grid grid-cols-12 w-full">
                                                    <p className="col-span-11">Text to answer the questions</p>
                                                </div>
                                                <span >
                                                    <svg
                                                        className={`${open ? 'transform rotate-180' : 'animate-pulse'} transition duration-500 w-5 h-5 text-yellow-500`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                                                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                                                    </svg>
                                                </span>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-200 ease-in"
                                                enterFrom="transform scale-100 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-200 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-100 opacity-0"
                                            >
                                                <Disclosure.Panel className="text-base bg-white text-gray-500 border rounded-b-xl">
                                                    <p className="px-4 py-4">{textoExamen}</p>
                                                    {/* Text to speech buttons */}
                                                    <div className="bg-gray-100 border-t border-gray-200 rounded-xl px-4 py-2">
                                                        {speaking && speakingFirst === false && (
                                                            <div className="text-center">
                                                                <button
                                                                    type="button"
                                                                    className="transition duration-500 xl:w-72 inline-flex justify-center px-12 py-2 text- font-medium text-yellow-900 bg-yellow-100 border border-yellow-500 
                                                                    rounded-md hover:bg-yellowlight focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                                    onClick={handleClickPlayStop}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#7B350F"><g><rect fill="none" height="24" width="24" /></g><g><g><path d="M9,16h2V8H9V16z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8 s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z M13,16h2V8h-2V16z" /></g></g></svg>
                                                                    <span className="ml-4">Pause</span>
                                                                </button>
                                                            </div>
                                                        )}{speaking === false && speakingFirst === false && (
                                                            <div className="text-center">
                                                                <button
                                                                    type="button"
                                                                    className="transition duration-500 xl:w-72 inline-flex justify-center px-12 py-2 text- font-medium text-green-900 bg-green-100 border border-green-500 
                                                                    rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                                    onClick={handleClickPlayStop}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1D8239"><path d="M10.8 15.9l4.67-3.5c.27-.2.27-.6 0-.8L10.8 8.1c-.33-.25-.8-.01-.8.4v7c0 .41.47.65.8.4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                                                                    <span className="ml-4">Resume</span>
                                                                </button>
                                                            </div>
                                                        )}
                                                        {speakingFirst === true &&
                                                            (
                                                                <div className="text-center">
                                                                    <button
                                                                        className="transition duration-500 xl:w-72 inline-flex justify-center px-12 py-2 text- font-medium text-green-900 bg-green-100 border border-green-500 
                                                                    rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                                        onClick={handleClickPlayInit}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#1D8239"><path d="M10.8 15.9l4.67-3.5c.27-.2.27-.6 0-.8L10.8 8.1c-.33-.25-.8-.01-.8.4v7c0 .41.47.65.8.4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                                                                        <span className="ml-4">Listen</span>
                                                                    </button>
                                                                </div>
                                                            )
                                                        }
                                                        <span className="text-xs text-center text-gray-500">It only works in chrome, if you have problems with playback close this tab and open a new tab.</span>
                                                    </div>
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
                                                    rounded-md hover:bg-yellowlight focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
                                                    <p className="hidden sm:block">Ir ahora</p>
                                                    <p className="sm:hidden block">Ir</p>
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
