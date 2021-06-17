import React, { useEffect, useRef, useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { useHistory, useLocation } from 'react-router';
import { Helmet } from "react-helmet";
import { LoadingPage } from './LoadingPage';
import { GetExamenAPI } from '../api/Examen/GetExamenAPI';
import { GetTextoAPI } from '../api/Textos/GetTextoAPI';
import Navbar from '../components/teacher/Navbar';
import { NavbarStudent } from '../components/student/NavBarStudent';
import Scrollbars from "react-custom-scrollbars";
import { DropdownUser } from '../components/teacher/user/DropdownUser';
import { GetRespuestasUsuarioExamenAPI } from '../api/Calificacion/GetRespuestasUsuarioExamenAPI';
import { GetCalificacionExamenAPI } from '../api/Calificacion/GetCalificacionExamenAPI';
import { GetUserAPI } from '../api/Usuario/GetUserAPI';
/* import { useSpeechSynthesis } from 'react-speech-kit'; */ // todo: uninstall

export const RevisionExamen = () => {

    const navigation = [
        { name: 'Inicio', href: '#', current: false, id: 0 },
        { name: 'Mis calificaciones', href: '#', current: true, id: 1 },
        /* { name: 'Projects', href: '#', current: false }, */
        { name: 'Ajustes', href: '#', current: false, id: 2 },
    ];

    // Hooks dark mode
    const history = useHistory();
    const location = useLocation();

    // Hooks Dark mode
    const darkModeRef = useRef();
    const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

    // Hook preguntas
    const [preguntas, setPreguntas] = useState([]);

    // Hooks rol
    const [rol, setRol] = useState('');
    const [rolBool, setRolBool] = useState();

    const [estudiante, setEstudiante] = useState({
        nombre: "",
        correo: "",
    })

    /* Hooks for text to speech text exam */
    const [speaking, setSpeaking] = useState(false);
    const [speakingFirst, setSpeakingFirst] = useState(true);

    // Hook calificacion
    const [califacionExamen, setCalifacionExamen] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    // Hook Texto
    const [textoExamen, setTextoExamen] = useState("");

    useEffect(() => {
        if (localStorage.theme === 'dark') {
            setDarkModeBool(true);
            darkModeRef.current.classList.add('dark')
        } else {
            setDarkModeBool(false);
            darkModeRef.current.classList.remove('dark')
        }
        setIsLoading(false);
        identifyRole();
        getExamen();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getExamen = async () => {
        setIsLoading(true);

        let split_location = location.pathname.split("/");
        let id_examen = split_location[split_location.length - 1];

        const response_examen = await GetExamenAPI(id_examen);
        const respuestas_usuario = await GetRespuestasUsuarioExamenAPI(id_examen);

        if (response_examen.length === 0) {
            history.push('/student/home')
        } else if (response_examen !== false) {
            let id_texto = response_examen[0].texto;

            const response_texto = await GetTextoAPI(id_texto);
            AddTipoPregunta(response_texto[0].preguntas, respuestas_usuario);
            setTextoExamen(response_texto[0].cuerpo_texto);
            getEstudiante(response_examen[0].assigned_to);
            getCalificacionesExamen();

            setIsLoading(false);
        }
        else {
            setIsLoading(true);
        }
    }

    const getCalificacionesExamen = async () => {
        let split_location = location.pathname.split("/");
        let id_examen = split_location[split_location.length - 1];
        const response_calificacion = await GetCalificacionExamenAPI(id_examen);

        setCalifacionExamen(response_calificacion[0].nota);
    }

    const getEstudiante = async (id_user) => {
        let user = await GetUserAPI(id_user);

        let name_user = user.first_name + " " + user.last_name;
        name_user = capitalizeTheFirstLetterOfEachWord(name_user);

        let email = user.email;

        setEstudiante(
            Object.assign(estudiante, {
                nombre: name_user,
                correo: email,
            })
        );
    }

    function capitalizeTheFirstLetterOfEachWord(words) {
        var separateWord = words.toLowerCase().split(' ');
        for (var i = 0; i < separateWord.length; i++) {
            separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
                separateWord[i].substring(1);
        }
        return separateWord.join(' ');
    }

    const identifyRole = () => {
        let rol_estudiante = '3d8388c45fc7f48e40800ff051117af34b204bb4a29098332f504774858e49db';
        let rol_docente = '72eea687168b8c450afdeefa69c9d478b9ca90bfdcda1efb0029c9352ae4c70d'
        let id_rol = localStorage.getItem('rol');

        if (rol_estudiante === id_rol) {
            setRol('estudiante');
            setRolBool(true);
        } else if (rol_docente === id_rol) {
            setRol('docente');
            setRolBool(false);
        }
    }

    const AddTipoPregunta = (preguntas, respuestas_usuario) => {
        let preguntasTemporal = []
        let respuestasTemporal = []

        preguntas.map((pregunta, i = 0) => {
            let element_respuesta = respuestas_usuario.find((element) => { return element.generacion_pregunta === pregunta.id_pregunta })

            let completacion = pregunta.respuestas_cuerpo.completacion
            let opcion_multiple = pregunta.respuestas_cuerpo.opcion_multiple
            let pregunta_abierta = pregunta.respuestas_cuerpo.resp_unica

            let calificacion_format = parseFloat(element_respuesta.calificacion_pregunta).toFixed(2);

            if (completacion === "null" && opcion_multiple === "null") {
                preguntasTemporal.push({
                    generacion_texto: pregunta.generacion_texto,
                    id_pregunta: pregunta.id_pregunta,
                    pregunta_cuerpo: pregunta.pregunta_cuerpo,
                    respuesta_correcta: pregunta.respuesta_correcta,
                    respuesta_usuario: element_respuesta.respuesta_usuario,
                    calificacion_pregunta: calificacion_format,
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
                    respuesta_usuario: element_respuesta.respuesta_usuario,
                    calificacion_pregunta: calificacion_format,
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
                    respuesta_usuario: element_respuesta.respuesta_usuario,
                    calificacion_pregunta: calificacion_format,
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
            i = i + 1;
            return true;
        })
        setPreguntas(preguntasTemporal);
    }

    const onClickVolver = () => {
        history.goBack();
    }

    const getLetter = (letter) => {
        if (letter === 0) return "A"
        if (letter === 1) return "B"
        if (letter === 2) return "C"
        if (letter === 3) return "D"
        if (letter === 4) return "E"
    }

    /* Text to speech text examen */
    const handleClickPlayStop = () => {
        if (speaking === true) {
            setSpeaking(false);
            speechSynthesis.pause();
        } else if (speaking === false) {
            setSpeaking(true);
            speechSynthesis.resume();
        }
    }

    const handleClickPlayInit = () => {
        let msg = new SpeechSynthesisUtterance();

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
            speechSynthesis.speak(newUtt);
        }, 0);
    };

    return (
        <div ref={darkModeRef} className={rolBool ? 'mx-auto font-manrope' : 'flex mx-auto font-manrope'}
            style={{
                backgroundColor: `${darkModeBool ? '#18191F' : '#ffffff'}`,
                width: "100%",
                height: "",
                minHeight: "",
                minWidth: "100%",
            }}
        >

            <Helmet>
                <title>Revisión examen - GQuestions</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"></link>
            </Helmet>

            {rol === 'docente' &&
                <Navbar className="" />
            }{rol === 'estudiante' &&
                <span>
                </span>
            }

            {/* Validar si es docente o estudiante */}
            <CustomScrollbars
                autoHide
                autoHideTimeout={900}
                autoHideDuration={400}
                style={{ height: `${rolBool ? '100vh' : '100vh'}` }}
                className="">

                {rol === 'docente' &&
                    <span></span>
                }{rol === 'estudiante' &&
                    <div className="fixed right-0 left-0">
                        <NavbarStudent navigation={navigation} />
                    </div>
                }

                {!isLoading &&
                    <div className="container mx-auto 2xl:px-96 xl:px-80 lg:px-40 md:px-32 sm:px-16 px-8 py-8" style={{ marginTop: `${rolBool ? '10vh' : '0vh'}` }}>
                        {/* Texto disclosure */}

                        <div className="w-full">
                            <div className="w-full py-2 mx-auto dark:bg-darkColor rounded-xl">
                                <Disclosure >
                                    {({ open }) => (
                                        <div id='texto'>
                                            <Disclosure.Button className={`${open ? "rounded-t-xl" : "rounded-xl"} flex justify-between w-full px-4 py-2 text-base font-medium text-left 
                                            text-yellow-900 bg-yellowlight focus:outline-none 
                                            focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-75 `}>
                                                <div className="grid grid-cols-12 w-full">
                                                    <p className="col-span-11">Text</p>
                                                </div>
                                                <span >
                                                    <svg
                                                        className={`${open ? 'transform rotate-180' : 'animate-pulse'} w-5 h-5 text-yellow-500`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                                                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
                                                    </svg>
                                                </span>
                                            </Disclosure.Button>
                                            <Transition
                                                enter="transition duration-100 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-75 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
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
                        {/* <div id="navigate" className="hidden md:block">
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
                                                    href={"revision-examen#" + (i = i + 1)}
                                                    onClick={scrollAnimation}
                                                >&#xe061;
                                                </a>
                                                <div className="transition duration-500 opacity-0 w-32 h-9 bg-black text-white text-center text-sm rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-32 -top-1 px-4 pointer-events-none">
                                                    Question {i}
                                                    <svg className="absolute text-black h-2 w-full left-16 top-3 transform -rotate-90" x="0px" y="0px" viewBox="0 0 255 255" ><polygon className="fill-current" points="0,0 127.5,127.5 255,0" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div> */}

                        {/* Questions */}
                        <ul className="space-y-6">
                            {/* Multiple choice question */}
                            {
                                preguntas.map((pregunta, contador = 1) => (
                                    pregunta.respuestas_cuerpo.tipo_pregunta === "opcion_multiple" ?
                                        <li key={pregunta.id_pregunta} id={contador = contador + 1} className="pointer-events-none ">
                                            <div className="border rounded-xl shadow pt-8 bg-white">
                                                <div className="px-8 pb-4">
                                                    <p className="uppercase font-light text-gray-700">Question {contador}</p>
                                                    <p className="font-semibold text-lg">{pregunta.pregunta_cuerpo}</p>
                                                </div>
                                                <ul>
                                                    {
                                                        pregunta.respuestas_cuerpo.opcion_multiple.map((opcion, letter = "A") => (
                                                            <button key={opcion} id={pregunta.id_pregunta} className="w-full outline-none focus:outline-none select-none">
                                                                {pregunta.respuesta_correcta === opcion && pregunta.respuesta_usuario === pregunta.respuesta_correcta &&
                                                                    <li id={pregunta.id_pregunta + " " + letter} className="transition duration-200 flex items-center py-4 px-8 border bg-green-100 border-green-300">
                                                                        <span className="font-semibold mr-4 px-3 p-1 rounded-full border border-green-400 bg-green-400 text-white">{getLetter(letter)}</span>
                                                                        <p>{opcion}</p>
                                                                    </li>
                                                                }{pregunta.respuesta_correcta !== pregunta.respuesta_usuario && pregunta.respuesta_usuario === opcion &&
                                                                    <li id={pregunta.id_pregunta + " " + letter} className="transition duration-200 flex items-center py-4 px-8 border bg-red-100 border-red-300">
                                                                        <span className="font-semibold mr-4 px-3 p-1 rounded-full border border-red-500 bg-red-500 text-white">{getLetter(letter)}</span>
                                                                        <p>{opcion}</p>
                                                                    </li>
                                                                }
                                                                {pregunta.respuesta_correcta === pregunta.respuesta_usuario && pregunta.respuesta_usuario !== opcion &&
                                                                    <li id={pregunta.id_pregunta + " " + letter} className="transition duration-200 flex items-center py-4 px-8 border-t">
                                                                        <span className="font-semibold mr-4 px-3 p-1 rounded-full border border-gray-300">{getLetter(letter)}</span>
                                                                        <p>{opcion}</p>
                                                                    </li>
                                                                }{pregunta.respuesta_correcta !== pregunta.respuesta_usuario && pregunta.respuesta_usuario !== opcion &&
                                                                    <li id={pregunta.id_pregunta + " " + letter} className="transition duration-200 flex items-center py-4 px-8 border-t">
                                                                        <span className="font-semibold mr-4 px-3 p-1 rounded-full border border-gray-300">{getLetter(letter)}</span>
                                                                        <p>{opcion}</p>
                                                                    </li>
                                                                }

                                                            </button>
                                                        ))
                                                    }
                                                </ul>

                                                <div className="px-8 py-4 border-t">
                                                    <p className="text-green-700 text-sm font-semibold md:text-sm py-1">Respuesta correcta</p>
                                                    <div className="bg-gray-50 rounded-t-xl p-4 border border-green-200">
                                                        <p className="text-gray-600 text-sm md:text-base">{pregunta.respuesta_correcta}</p>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-b-xl px-4 py-2 border border-gray-200">
                                                        <p className="text-base">Calificacion: <b>{pregunta.calificacion_pregunta}</b></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        : pregunta.respuestas_cuerpo.tipo_pregunta === "pregunta_abierta" ?
                                            <li key={pregunta.id_pregunta} id={contador = contador + 1}>
                                                <div className="border rounded-xl shadow pt-8 bg-white">
                                                    <div className="px-8 pb-4">
                                                        <p className="uppercase font-light text-gray-700">Question {contador}</p>
                                                        <p className="font-semibold text-lg">{pregunta.pregunta_cuerpo}</p>
                                                    </div>
                                                    <ul>
                                                        <div className="px-8 pb-4">
                                                            <p className="text-gray-600 text-sm font-semibold md:text-sm py-1">Respuesta dada</p>
                                                            <textarea
                                                                name={pregunta.id_pregunta}
                                                                disabled={true}
                                                                value={pregunta.respuesta_usuario}
                                                                className="w-full resize-y h-32 p-4 border rounded-xl focus:border-gray-400  bg-gray-100 text-gray-600 text-sm md:text-base outline-none focus:outline-none"
                                                            >
                                                            </textarea>
                                                        </div>
                                                        <div className="px-8 pb-4">
                                                            <p className="text-green-700 text-sm font-semibold md:text-sm py-1">Respuesta correcta</p>
                                                            <div className="bg-gray-50 rounded-t-xl p-4 border border-green-200">
                                                                <p className="text-gray-600 text-sm md:text-base">{pregunta.respuesta_correcta}</p>
                                                            </div>
                                                            <div className="bg-gray-50 rounded-b-xl px-4 py-2 border border-gray-200">
                                                                <p className="text-base">Calificacion: <b>{pregunta.calificacion_pregunta}</b></p>
                                                            </div>
                                                        </div>
                                                    </ul>
                                                </div>
                                            </li>
                                            : <div>otra</div>
                                ))
                            }
                            <li>
                                <div className="pb-1">
                                    <div className="grid grid-cols-12 bg-white rounded-t-xl py-4 px-8 border border-yellow-900 border-opacity-20 shadow-sm">
                                        <p className="sm:col-span-11 col-span-10 font-semibold text-xl text-yellow-900">Calificación total</p>
                                        <p className="place-self-end mr-2 sm:col-span-1 col-span-2 font-semibold text-yellow-900 text-lg">{califacionExamen}</p>
                                    </div>
                                    <div className="bg-white rounded-b-xl py-2 px-8 border border-yellow-900 border-opacity-20 shadow-sm text-sm">
                                        <p className="sm:col-span-11 col-span-10"><b>Estudiante: </b>{estudiante.nombre}</p>
                                        <p className="sm:col-span-11 col-span-10"><b>Correo: </b>{estudiante.correo}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <div className="mt-4">
                            <button
                                className='btn-primary'
                                onClick={onClickVolver}
                            >
                                Volver
                        </button>
                        </div>
                    </div>
                }{isLoading &&
                    <div className="pt-52">
                        <LoadingPage />
                    </div>}
            </CustomScrollbars>
            {rol === 'docente' &&

                <DropdownUser />
            }{rol === 'estudiante' &&
                <span>
                </span>
            }
        </div>
    )
}


// Funciones que cambian el estilo del scroll y otras props de una librería
const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        backgroundColor: 'rgba(35, 49, 86, 0.8)',
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = props => (
    <Scrollbars
        renderThumbHorizontal={renderThumb}
        renderThumbVertical={renderThumb}
        {...props}
    />
);