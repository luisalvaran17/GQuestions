import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom'
import Navbar from "./Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneralYellowDark from "../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../assets/images/background-general-yellow_light.png";
import AOS from "aos";
import { Helmet } from 'react-helmet'
import { DropdownUser } from "../teacher/user/DropdownUser";
import { CreateGeneracionConfiguracionAPI } from "../../api/Generacion/CreateGeneracionConfiguracionAPI";
import { CreateGeneracionTipoPreguntaAPI } from "../../api/Generacion/CreateGeneracionTipoPreguntaAPI";
import { StepsProgress } from "./StepsProgress";
import { useHistory } from "react-router";
import { RevisionGeneracion } from "./RevisionGeneracion";
import { Dialog, Transition, Popover } from '@headlessui/react';
import { Fragment } from 'react'
import { GetUserAPI } from '../../api/Usuario/GetUserAPI';
import { UpdateTerminosUserAPI } from "../../api/Usuario/UpdateTerminosUserAPI";
import Scrollbars from "react-custom-scrollbars";
import { ErrorModal } from "../../containers/ErrorModal";
import { GenerateTextsAPI } from "../../api/Generacion/GenerateTextsAPI";

export const GenerateConfig = () => {
  const divRefErrorMessage = useRef();
  const { v4: uuidv4 } = require("uuid");
  const UUID_GENERATE = uuidv4(); // uuid autogenerado para id de Generacion

  const [isLoading, setIsLoading] = useState(false);

  // Hooks Dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  // Hooks
  const history = useHistory();
  const [_isMounted, set_isMounted] = useState(false);
  // Fetch data textos generados en DB
  const [Textos, setTextos] = useState([])
  const [irRevisionTexto, setIrRevisionTexto] = useState(false)

  // Hooks Terminos y condiciones
  const [isOpen, setIsOpen] = useState(false)
  const [terminos, setTerminos] = useState({
    terminos_condiciones: false,
  })

  // Hook tiempo de generaci??n 
  const [tiempoGeneracion, setTiempoGeneracion] = useState("0 minutos")
  const [porcentajeGeneracion, setPorcentajeGeneracion] = useState(0.00 )

  // Hook error modal
  const [isOpenError, setIsOpenError] = useState(false)

  // *********************** API de Demo ************************ //
  // https://085ccb55-b52c-46cf-963e-8a0c5ee42562.mock.pstmn.io   //
  //  ************************************************************//
  const url = "https://085ccb55-b52c-46cf-963e-8a0c5ee42562.mock.pstmn.io"; // Endpoint TEXTOS Y PREGUNTAS DEMO

  // Estado utilizado para campos de configuraci??n de Generaci??n de textos
  const [generacionConfiguracion, setGeneracionConfiguracion] = useState({
    id: UUID_GENERATE,
    n_examenes: 10,
    cantidad_textos: 10,
    longit_texto: 300,
    n_preguntas: 0,
    inicio_oracion: "Aleatorio",
    account: ""
  });

  // Estado utilizado para campos de configuraci??n de tipo de preguntas en Generaci??n de textos
  const [generacionTipoPregunta, setGeneracionTipoPregunta] = useState({
    pregunta_abierta: true,
    opcion_multiple: true,
    completacion: false,
    generacion: UUID_GENERATE,
  });

  useEffect(() => {
    getTerminos();
    AOS.init({
      duration: 800,
    })
    set_isMounted(true);

    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }
    setIsLoading(false);

    // componentwillunmount
    return () => {
      set_isMounted(false);
    }
  }, []);

  // get data Textos endpoint 
  const getTextos = async () => {

    setIsLoading(true);
    // You can await here
    const response = await fetch(url)
      .then((res) => res.json())
      .then((json) => {
        return json
      })
      .catch(err => {
        console.log(err)
        return false;
      })

    // Asignaci??n de respuesta al stado Textos
    setTextos(response.data);
    setIsLoading(false);
  }

  const getTerminos = async () => {
    const id_user = localStorage.getItem('id_user');
    const user_response = await GetUserAPI(id_user)
    if (user_response === false) {
      // nothing
    } else {
      const terminos_condiciones = user_response.terminos_condiciones
      setIsOpen(!terminos_condiciones)
    }
  }

  // Funci??n al presionar el bot??n "Generar textos", esta funci??n hace los POST  a tres tablas
  // (Generacion, GeneracionTipoPregunta y GeneracionUsuario), adem??s llama a dos funciones que,
  // inserta los textos generados y la relaci??n entre la Generaci??n y estos Textos
  const handleClickDemo = async () => {
    await getTextos();  // Obtiene los textos desde el endpoint (url)
    setGeneracionConfiguracion(
      Object.assign(generacionConfiguracion, {
        account: localStorage.getItem("id_user")
      })
    );

    setGeneracionConfiguracion(
      Object.assign(generacionConfiguracion, {
        n_examenes: 10,
        cantidad_textos: 10,
        longit_texto: 300,
        n_preguntas: 5,
        inicio_oracion: "Aleatorio",
      })
    )

    setGeneracionTipoPregunta(
      Object.assign(generacionTipoPregunta, {
        pregunta_abierta: true,
        opcion_multiple: true,
        completacion: false
      })
    )

    if (_isMounted) {
      setIsLoading(true);
      const responseGeneracionConfig = await CreateGeneracionConfiguracionAPI(generacionConfiguracion);   // POST a Generacion

      const responseGeneracionTipoPregunta = await CreateGeneracionTipoPreguntaAPI(generacionTipoPregunta);    // POST a GeneracionTipoPregunta

      if (responseGeneracionConfig && responseGeneracionTipoPregunta) {    // Si todas las peticiones son ok

        // Llamado a funci??n que inserta los textos en la DB DJANGO
        localStorage.setItem('uuid_generacion', generacionConfiguracion.id);
        setIsLoading(false);
        setIrRevisionTexto(true);
      }
      else {
        setIsOpenError(true);
      }
    }
  }

  // Handles inputs
  const handleChangeConfiguracion = (e) => {
    const generacion_configuracion = generacionConfiguracion;
    generacion_configuracion[e.target.name] = parseInt(e.target.value);
    setGeneracionConfiguracion(generacion_configuracion);

    let tiempo_promedio_texto = 0.6 // promedio de 35 segundos por generaci??n de texto
    let tiempo_promedio_pregunta = 0.30 // 18 segundos cada pregunta

    if (Number.isNaN(generacionConfiguracion.n_examenes)) {
      setGeneracionConfiguracion(
        Object.assign(generacionConfiguracion, {
          n_examenes: 10,
        })
      );
    } if (Number.isNaN(generacionConfiguracion.longit_texto)) {
      setGeneracionConfiguracion(
        Object.assign(generacionConfiguracion, {
          longit_texto: 300,
        })
      );
    }

    let tiempo_generacion = (((tiempo_promedio_texto * generacionConfiguracion.n_examenes * generacionConfiguracion.longit_texto) / 300) +
      (tiempo_promedio_pregunta * generacionConfiguracion.n_preguntas * generacionConfiguracion.n_examenes)) +
      (generacionConfiguracion.n_examenes / 5)
    setTiempoGeneracion(tiempo_generacion.toFixed(0).toString() + " minutos");


  }

  const handleChangeInicioOracion = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setGeneracionConfiguracion(
      Object.assign(generacionConfiguracion, {
        [name]: value
      })
    );
  }

  const handleInputChangeTiposPregunta = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setGeneracionTipoPregunta(
      Object.assign(generacionTipoPregunta, {
        [name]: value
      })
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Funci??n que valida los diferentes tipos de inputs y errores que podr??a cometer el usuario al rellenarlos
  const checkFieldsValidations = () => {
    let boolZero = false;
    let boolTextosMenor = false;
    let boolLongTexto = false;
    let boolCantidadPreguntas = false;
    let boolTipoPregunta = false;
    let p_zero;
    let p_longTexto;
    let p_cantidadPreguntas;
    let p_tiposPreguntas;
    if (
      generacionConfiguracion.n_examenes === 0 ||
      generacionConfiguracion.cantidad_textos === 0 ||
      generacionConfiguracion.longit_texto === 0 ||
      generacionConfiguracion.n_preguntas === 0 ||
      Number.isNaN(generacionConfiguracion.n_preguntas)
    ) {
      boolZero = true;
      p_zero = React.createElement('p', {}, '???  Hay campos vac??os');
    }
    if (Number.isNaN(generacionConfiguracion.n_examenes)) {
      setGeneracionConfiguracion(
        Object.assign(generacionConfiguracion, {
          n_examenes: 10,
        })
      );
    }
    if (Number.isNaN(generacionConfiguracion.longit_texto)) {
      setGeneracionConfiguracion(
        Object.assign(generacionConfiguracion, {
          longit_texto: 300,
        })
      );
    }
    if (generacionConfiguracion.longit_texto < 300 || generacionConfiguracion.longit_texto > 500) {
      boolLongTexto = true;
      p_longTexto = React.createElement('p', {}, '???  La longitud del texto debe estar entre 300 y 500 car??cteres');
    }
    if (generacionConfiguracion.n_preguntas > 10) {
      boolCantidadPreguntas = true;
      p_cantidadPreguntas = React.createElement('p', {}, '???  La cantidad de preguntas no debe exceder 10');
    }
    if (generacionTipoPregunta.pregunta_abierta === false &&
      generacionTipoPregunta.completacion === false &&
      generacionTipoPregunta.opcion_multiple === false) {
      boolTipoPregunta = true;
      p_tiposPreguntas = React.createElement('p', {}, '???  Debe seleccionar al menos un tipo de pregunta');
    }
    if (boolZero || boolCantidadPreguntas || boolLongTexto || boolTextosMenor || boolTipoPregunta) {
      removeClassdivRefErrorMessage();
      const X = React.createElement('div', {}, [p_zero, p_longTexto, p_cantidadPreguntas, p_tiposPreguntas]);
      ReactDOM.render(X, document.getElementById('error_messages'));
      return false;
    }
    else {
      return true;
    }
  };

  // Las dos siguientes funciones lo que haces es mostrar u ocultar un  div que contiene los mensajes de error (validaciones)
  // de los inputs 
  const addClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.add("hidden");
  };

  const removeClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.remove("hidden");
  };

  function closeModalNoAccept() {
    history.push('/teacher/dashboard')
    setIsOpen(false)
  }

  const closeModalAccept = async () => {
    const id_user = localStorage.getItem('id_user');
    setIsOpen(false)
    setTerminos(
      Object.assign(terminos, {
        terminos_condiciones: true,
      })
    )
    await UpdateTerminosUserAPI(id_user, terminos)
  }

  function notCloseModal() {
    setIsOpen(true)
  }

  const handleClickGetTexts = async () => {
    if (checkFieldsValidations() === true) {    // Si todos los campos cumplen las validaciones entonces hace los POST

      let json = require('./sentences.json'); //(with path)
      let textos_response = { data: [] }
      let contador_progreso = 0
      let min = 0;
      let max = 5000;
      let randoms = []

      localStorage.setItem('longit_texto', generacionConfiguracion.longit_texto);

      setIsLoading(true)
      if (generacionConfiguracion.inicio_oracion === 'Aleatorio') {
        // Aleatorio texto
        for (let i = 0; i < generacionConfiguracion.n_examenes; i++) {
          let random = Math.floor(Math.random() * (+max - +min)) + +min;
          randoms.push(random)
        }

        /* Tipos de preguntas */
        let tipo_pregunta = "all"
        if (generacionTipoPregunta.opcion_multiple && !generacionTipoPregunta.pregunta_abierta) {
          tipo_pregunta = "multiple_choice";
        }
        if (!generacionTipoPregunta.opcion_multiple && generacionTipoPregunta.pregunta_abierta) {
          tipo_pregunta = "sentences";
        }
        if (generacionTipoPregunta.opcion_multiple && generacionTipoPregunta.pregunta_abierta) {
          tipo_pregunta = "all";
        }
        for (let i = 0; i < randoms.length; i++) {
          let response_text = await GenerateTextsAPI(json[randoms[i]].text, generacionConfiguracion.longit_texto);

          response_text = await checkLongitudTexto(response_text);  // Verifica que la longitud del texto est?? correcta 

          contador_progreso = contador_progreso + 1
          let preguntas = await getPreguntasFromNLP(response_text[0].generated_text, generacionConfiguracion.n_preguntas, tipo_pregunta, contador_progreso)
          let element_text = {
            id: (i + 1).toString(),
            cuerpo: response_text[0].generated_text,
            es_editado: "false",
            es_regenerado: "false",
            preguntas: preguntas
          }
          textos_response.data.push(element_text)
        }
      }

      if (generacionConfiguracion.inicio_oracion !== 'Aleatorio') {
        let length_json = Object.keys(json).length;
        let list_objects = [];
        for (let i = 0; i < length_json; i++) {
          if (json[i].area === generacionConfiguracion.inicio_oracion) {
            list_objects.push(json[i])
          }
        }
        min = 0;
        max = list_objects.length;
        for (let i = 0; i < generacionConfiguracion.n_examenes; i++) {
          let random = Math.floor(Math.random() * (+max - +min)) + +min;
          randoms.push(random)
        }
        for (let i = 0; i < randoms.length; i++) {
          let response_text = await GenerateTextsAPI(list_objects[randoms[i]].text, generacionConfiguracion.longit_texto);
          
          response_text = await checkLongitudTextoArea(response_text, list_objects);  // Verifica que la longitud del texto est?? correcta 

          contador_progreso = contador_progreso + 1
          let preguntas = await getPreguntasFromNLP(response_text[0].generated_text, generacionConfiguracion.n_preguntas, "all", contador_progreso)
          let element_text = {
            id: (i + 1).toString(),
            cuerpo: response_text[0].generated_text,
            es_editado: "false",
            es_regenerado: "false",
            preguntas: preguntas
          }
          textos_response.data.push(element_text)
        }
      }
      setGeneracionConfiguracion(
        Object.assign(generacionConfiguracion, {
          account: localStorage.getItem("id_user")
        })
      );

      if (_isMounted) {
        setIsLoading(true);
        setTextos(textos_response.data)
        const responseGeneracionConfig = await CreateGeneracionConfiguracionAPI(generacionConfiguracion);   // POST a Generacion

        const responseGeneracionTipoPregunta = await CreateGeneracionTipoPreguntaAPI(generacionTipoPregunta);    // POST a GeneracionTipoPregunta

        if (responseGeneracionConfig && responseGeneracionTipoPregunta) {    // Si todas las peticiones son ok

          // Llamado a funci??n que inserta los textos en la DB DJANGO
          localStorage.setItem('uuid_generacion', generacionConfiguracion.id);
          setIsLoading(false);
          setIrRevisionTexto(true);
        }
        else {
          setIsOpenError(true);
        }
      }
    }
  }

  const getPreguntasFromNLP = async (text, num_questions, answer_style, contador_progreso) => {

    const response_questions = await fetch("https://gquestions-ai1-vn4rmyywka-uc.a.run.app/api/generacion/question-generator", {
      method: "POST",
      headers: {
        Authorization: "Basic Og==",
      },
      body: new URLSearchParams({ "text": text, "num_questions": num_questions, "answer_style": answer_style }),
    }).then((res) => res.json())
      .then((json) => {
        return json;
      }).catch(err => {
        console.log(err)
        return false;
      })
    updatePorcentajeGeneracion(contador_progreso)
    return response_questions;
  }

  const updatePorcentajeGeneracion = (contador_progreso) => {
    let n_examenes = generacionConfiguracion.n_examenes
    if (contador_progreso / n_examenes <= 0.125) {
      setPorcentajeGeneracion(0.0)
    } else if (contador_progreso / n_examenes <= 0.25) {
      setPorcentajeGeneracion(0.25)
    } else if (contador_progreso / n_examenes <= 0.375) {
      setPorcentajeGeneracion(0.375)
    } else if (contador_progreso / n_examenes <= 0.50) {
      setPorcentajeGeneracion(0.50)
    } else if (contador_progreso / n_examenes <= 0.625) {
      setPorcentajeGeneracion(0.625)
    } else if (contador_progreso / n_examenes <= 0.75) {
      setPorcentajeGeneracion(0.75)
    } else if (contador_progreso / n_examenes <= 0.875) {
      setPorcentajeGeneracion(0.875)
    } else if (contador_progreso / n_examenes <= 1.0) {
      setPorcentajeGeneracion(1.0)
    }
  }

  const checkLongitudTexto = async (response_text) => {

    let json = require('./sentences.json'); //(with path)

    // Aleatorio texto
    let min = 0;
    let max = 5000;

    for (let i = 0; i < 5; i++) {
      if (response_text[0].generated_text.split(" ").length < (generacionConfiguracion.longit_texto - 150)) {
        let random = Math.floor(Math.random() * (+max - +min)) + +min;
        response_text = await GenerateTextsAPI(json[random].text, generacionConfiguracion.longit_texto);
      }else{
        break;
      }      
    }
    //console.log(response_text[0].generated_text.split(" ").length);
    return response_text;
  }

  const checkLongitudTextoArea = async (response_text, list_objects) => {

    // Aleatorio texto
    let min = 0;
    let max = list_objects.length;

    for (let i = 0; i < 3; i++) { // Genera un nuevo texto que cumpla con la longitud deseada, se intenta 3 veces
      if (response_text[0].generated_text.split(" ").length < (generacionConfiguracion.longit_texto - 150)) {
        let random = Math.floor(Math.random() * (+max - +min)) + +min;
        response_text = await GenerateTextsAPI(list_objects[random].text, generacionConfiguracion.longit_texto);
      }else{
        break;
      }      
    }
    //console.log(response_text[0].generated_text.split(" ").length);
    return response_text;
  }

  // CONDICIONAL PARA REDIRECCIONAR CON PROPS EN CASO DE QUE LA GENERACI??N SEA EXITOSA (ENVIAR A SIGUIENTE COMPONENT FUNCTIONAL)
  if (!irRevisionTexto) {
    return (

      <div
        ref={darkModeRef}
        className="flex container w-screen font-manrope"
        style={{
          backgroundImage: `url(${darkModeBool ? backgroundGeneralYellowDark : backgroundGeneralYellowLight})`,
          width: "100%",
          height: "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "",
          minWidth: "100%",
        }}
      >
        <Helmet>
          <title>Generaci??n - GQuestions</title>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
            rel="stylesheet"></link>
          <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM=" crossorigin="anonymous" />
        </Helmet>

        <Navbar className="" />

        <CustomScrollbars
          autoHide
          autoHideTimeout={900}
          autoHideDuration={400}
          style={{ height: "100vh" }}
          data-aos="fade-right"
          className="">

          <div className="container grid grid-rows xl:px-32 px-6 py-8 md:px-8 lg:px-16">
            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left text-2xl md:mb-8 mb-4 dark:text-white">
              Par??metros de generaci??n
            </h1>
            <p className="text-gray-500 font-semibold text-sm md:text-base dark:text-gray-200 sm:mb-4 mb-0">
              Aqu?? puedes configurar los par??metros de la generaci??n.
            </p>

            <div className="bg-gray-50 shadow-sm bg-opacity-40 dark:bg-darkColor dark:bg-opacity-80 border dark:border-gray-800 
            rounded-t-xl xl:py-12 md:py-10 py-6 px-2 sm:px-4 md:px-8 lg:px-16">
              <div className="grid grid-cols-12 sm:mb-12 mb-0 ">
                <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-0 mb-2">
                  <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                    Cantidad de ex??menes
                </label>
                  <input
                    type="number"
                    id="cant_examenes"
                    className="grid text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-80 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                    name="n_examenes"
                    placeholder="Por defecto 10"
                    onChange={handleChangeConfiguracion}
                  />
                </div>

                <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-0 mb-2">
                  <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                    Longitud de texto
                  </label>
                  <div className="grid sm:col-span-4 col-span-12">
                    <div className="flex">
                      <input
                        type="number"
                        id="long_texto"
                        className="grid text-sm md:text-base transition duration-500 border rounded-l-lg 
                        focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full 2xl:w-72 
                        pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                        name="longit_texto"
                        placeholder="Por defecto 300"
                        onChange={handleChangeConfiguracion}
                      />

                      {/* Popup information */}
                      <Popover className="">
                        {({ open }) => (
                          <div className="bg-white h-full rounded-r-lg border-r border-t border-b  border-gray-300 outline-none shadow">
                            <Popover.Overlay
                              className={`${open ? 'opacity-40 fixed inset-0' : 'opacity-0'
                                } bg-black`}
                            />
                            <Popover.Button
                              className={`
                              ${open ? '' : 'text-opacity-90'}
                              text-white group bg-orange-700 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                              <span
                                className="mt-2 transition duration-500 px-1 hover:text-cyanmain text-gray-400
                                   material-icons-outlined outline-none focus:outline-none"
                              >&#xe88e;
                          </span>
                            </Popover.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel className="absolute ml-10 z-10 mt-0 transform -translate-x-1/2 left-1/2 sm:px-0 max-w-xs">
                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                  <div className="p-2 bg-gray-50">
                                    <span
                                      className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 
                                      focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                    >
                                      <span className="flex items-center">
                                        <span className="font-semibold text-gray-900 text-sm">
                                          Recomendaci??n
                                      </span>
                                      </span>
                                      <span className="block text-sm text-gray-700 bg-gray-50 p-2 rounded-t-lg text-justify 
                                      border-t border-l border-r border-gray-200">
                                        Tenga en cuenta que la longitud de texto influye en la cantidad de preguntas que se pueden generar, se recomienda una longitud de texto de 400 para 10 preguntas
                                      </span>
                                      <span className="block text-sm text-gray-700 text-justify bg-gray-50 p-2 rounded-b-lg
                                       border border-gray-200">
                                        Importante: La longitud de texto debe estar entre 300 y 500
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </div>
                        )}
                      </Popover>
                    </div>
                  </div>
                </div>

                <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-0 mb-2">
                  <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                    Cantidad de preguntas
                </label>
                  <input
                    type="number"
                    id="cant_preguntas"
                    className="grid text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-80 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                    name="n_preguntas"
                    defaultValue=""
                    placeholder="Cantidad de preguntas"
                    onChange={handleChangeConfiguracion}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12">
                <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-0 mb-2">
                  <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2 dark:text-gray-300">
                    Tema del texto
                </label>
                  <select
                    type="text"
                    id="ini_oracion"
                    className="grid text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-80 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow text-gray-500"
                    name="inicio_oracion"
                    defaultValue="Aleatorio"
                    onChange={handleChangeInicioOracion}
                  >
                    <option>Aleatorio</option>
                    <option> Digital control </option>
                    <option> Analog signal processing </option>
                    <option> Data structures </option>
                    <option> Parallel computing </option>
                    <option> Image processing </option>
                    <option> Stealth Technology </option>
                    <option> Machine learning </option>
                    <option> Electrical circuits </option>
                    <option> Algorithm design </option>
                    <option> Computer-aided design </option>
                    <option> Problem-solving </option>
                    <option> Ambient Intelligence </option>
                    <option> Computer programming </option>
                    <option> Electrical generator </option>
                    <option> Relational databases </option>
                    <option> Computer vision </option>
                    <option> Electrical network </option>
                    <option> Software engineering </option>
                    <option> Bioinformatics </option>
                    <option> Operating systems </option>
                    <option> Control engineering </option>
                    <option> Cryptography </option>
                    <option> Computer graphics </option>
                    <option> Distributed computing </option>
                    <option> Highway Network System </option>
                    <option> Structured Storage </option>
                  </select>
                </div>

                <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-0 mb-2">
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
              >

                <div className="grid grid-rows lg:mx-0 sm:col-span-6 col-span-12 md:col-span-4">
                  <label
                    className="sm:mx-0 pt-4 sm:pt-10 text-xs font-semibold px-1 text-gray-500 dark:text-gray-300 self-end py-2"
                  >
                    Tipo de preguntas
                  </label>
                  <div className="flex flex-col ml-1 text-sm md:text-base rounded-lg
                                  2xl:w-80 2xl:border-gray-300 2xl:bg-white 2xl:divide-y
                                  w-full border-gray-300 bg-white divide-y border
                                  md:border-transparent md:bg-transparent md:divide-y-0
                                 text-gray-500 md:dark:text-gray-100 2xl:dark:text-gray-500 2xl:text-gray-500"
                  >
                    <label
                      htmlFor="pregunta_abierta"
                      className="inline-flex items-center"
                    >
                      <div className="flex items-center transition duration-500 w-full px-4 py-2 rounded-t-xl">
                        <input
                          type="checkbox"
                          id="pregunta_abierta"
                          name="pregunta_abierta"
                          className="form-checkbox h-5 w-5 cursor-pointer"
                          defaultChecked="true"
                          onChange={handleInputChangeTiposPregunta}
                        ></input>
                        <span className="ml-6">
                          Pregunta abierta
                            </span>
                      </div>
                    </label>

                    <label
                      htmlFor="opcion_multiple"
                      className="inline-flex items-center  "
                    >
                      <div className="flex items-center transition duration-500 w-full px-4 py-2 rounded-t-xl">
                        <input
                          type="checkbox"
                          id="opcion_multiple"
                          name="opcion_multiple"
                          className="form-checkbox h-5 w-5 text-yellow-500"
                          defaultChecked="true"
                          onChange={handleInputChangeTiposPregunta}
                        ></input>
                        <span className="ml-6">
                          Opci??n m??ltiple
                        </span>
                      </div>
                    </label>

                    <label
                      htmlFor="completacion"
                      className="inline-flex items-center  "
                    >
                      <div className="flex items-center transition duration-500 w-full px-4 py-2 rounded-t-xl">
                        <input
                          type="checkbox"
                          id="completacion"
                          disabled={true}
                          name="completacion"
                          className="form-checkbox h-5 w-5 text-yellow-500"
                          onChange={handleInputChangeTiposPregunta}
                        ></input>
                        <span className="ml-6">Completaci??n (soon)</span>
                      </div>
                    </label>
                  </div>

                </div>
              </form>
              <div className="text-gray-500 font-semibold sm:text-sm text-xs sm:text-left text-justify dark:text-gray-200 mt-4">
              <span className="text-xs bg-yellowlight rounded-md px-1 font-semibold text-yellow-900 border border-yellow-300">Demo</span> Si presionas el bot??n demo puedes realizar el proceso de generaci??n en manera de demostraci??n, sin tiempos de espera.
            </div>
            </div>
            
            <div className="container py-3 w-full px-2 sm:px-4 md:px-8 lg:px-16 bg-gray-50 shadow-sm 
            bg-opacity-60 dark:bg-darkColor border-b border-l border-r dark:border-gray-800 rounded-b-xl">
              <p className="sm:text-sm text-xs text-gray-600 dark:text-gray-300 my-1 font-semibold">
                Tiempo aproximado de generaci??n: ~ {tiempoGeneracion}
              </p>
              <div className="bg-gray-300 w-full mb-4 h-2 rounded-xl">
                {porcentajeGeneracion === 0 &&
                  <div className="bg-yellowmain w-0 h-full text-right rounded-xl">
                    <p className="text-gray-700 dark:text-white font-bold p-1 py-2 sm:text-sm text-xs">0%</p>
                  </div>
                }{porcentajeGeneracion === 0.125 &&
                  <div className="bg-yellowmain w-1/12 h-full text-right rounded-xl">
                    <p className="text-gray-700 dark:text-white font-bold p-1 py-2 sm:text-sm text-xs">12.5%</p>
                  </div>
                }{porcentajeGeneracion === 0.25 &&
                  <div className="bg-yellowmain w-1/5 h-full text-right rounded-xl">
                    <p className="text-gray-700 dark:text-white font-bold p-1 py-2 sm:text-sm text-xs">25%</p>
                  </div>
                }{porcentajeGeneracion === 0.375 &&
                  <div className="bg-yellowmain w-1/3 h-full text-right rounded-xl">
                    <p className="text-gray-700 dark:text-white font-bold p-1 py-2 sm:text-sm text-xs">37.5%</p>
                  </div>
                }{porcentajeGeneracion === 0.5 &&
                  <div className="bg-yellowmain w-1/2 h-full text-right rounded-xl">
                    <p className="text-gray-700 dark:text-white font-bold p-1 py-2 sm:text-sm text-xs">50%</p>
                  </div>
                }{porcentajeGeneracion === 0.625 &&
                  <div className="bg-yellowmain w-2/3 h-full text-right rounded-xl">
                    <p className="text-gray-700 dark:text-white font-bold p-1 py-2 sm:text-sm text-xs">62.5%</p>
                  </div>
                }{porcentajeGeneracion === 0.75 &&
                  <div className="bg-yellowmain w-10/12 h-full text-right rounded-xl">
                    <p className="text-gray-700 dark:text-white font-bold p-1 py-2 sm:text-sm text-xs">75%</p>
                  </div>
                }{porcentajeGeneracion === 0.875 &&
                  <div className="bg-yellowmain w-11/12 h-full text-right rounded-xl">
                    <p className="text-gray-700 dark:text-white font-bold p-1 py-2 sm:text-sm text-xs">87.5%</p>
                  </div>
                }{porcentajeGeneracion === 1.00 &&
                  <div className="bg-yellowmain w-full h-full text-right rounded-xl">
                    <p className="text-gray-700 dark:text-white font-bold p-1 py-2 sm:text-sm text-xs">100%</p>
                  </div>
                }
              </div>
            </div>


            <div className="flex pt-4 sm:justify-self-end">

              {!isLoading &&
                <div className="sm:space-x-4 w-full sm:space-y-0 space-y-2">
                  <button
                    type="submit"
                    className="transition duration-500 inline-block shadow-md md:text-base text-sm text-yellow-900 text-center sm:w-44 w-full
                    z-10 mx-auto bg-yellowlight focus:bg-yellowlightdark hover:bg-yellowlightdark rounded-lg px-12 py-2 font-semibold 
                    outline-none focus:outline-none"
                    onClick={handleClickDemo}
                    id='btn-demo'
                  >
                    Demo
                  </button>
                  <button
                    type="submit"
                    className="transition duration-500 inline-block shadow-md md:text-base text-sm text-white text-center sm:w-64 w-full
                    z-10 mx-auto bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg px-12 py-2 font-semibold 
                    outline-none focus:outline-none"
                    onClick={handleClickGetTexts}
                  >
                    Generar
                </button>
                </div>
              }{isLoading &&
                <div className="sm:space-x-4 w-full sm:space-y-0 space-y-2">
                  <button
                    type="submit"
                    className="transition duration-500 inline-block shadow-md md:text-base text-sm text-yellow-900 text-center sm:w-44 w-full
                    z-10 mx-auto bg-yellowlight focus:bg-yellowlightdark hover:bg-yellowlightdark rounded-lg px-12 py-2 font-semibold 
                    outline-none focus:outline-none">
                    <span className="text-yellow-800 my-0 w-0 h-0">
                      <i className="fas fa-circle-notch fa-spin fa-x"></i>
                    </span>
                  </button>
                  <button
                    type="submit"
                    className="transition duration-500 inline-block shadow-md md:text-base text-sm text-white text-center sm:w-64 w-full
                    z-10 mx-auto bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg px-12 py-2 font-semibold 
                    outline-none focus:outline-none"
                  >
                    <span className="text-white my-0 mr-4 w-0 h-0">
                      <i className="fas fa-circle-notch fa-spin fa-x"></i>
                    </span>
                Generando ...
              </button>
                </div>}
            </div>

            {/* Error messages */}
            <div className="container">
              <div
                ref={divRefErrorMessage}
                className="hidden animate-pulse mt-2 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
                role="alert"
              >
                <div id="error_messages" className="text-sm md:text-base">
                </div>

                <span
                  className="absolute inset-y-0 right-0 flex items-center mr-4"
                  onClick={addClassdivRefErrorMessage}
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            {/* StepProgress */}
            <div className="container">
              <StepsProgress active={1} />
            </div>
          </div>

          {/* T??rminos y condiciones Modal */}
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={notCloseModal}
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
                  <div className="inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-black font-manrope leading-6 text-gray-900"
                    >
                      T??rminos y condiciones
                    </Dialog.Title>
                    <div className="mt-2">
                      <ul className="bg-gray-100 text-sm shadow rounded-xl list-none space-y-2 md:text-justify">
                        <div className="text-gray-700 p-4 pb-1">
                          <li className="mb-2">
                            <p>
                              Debido a que los modelos de lenguaje a gran escala como GPT-2 no distinguen la realidad de la ficci??n, el texto generado no debe ser considerado
                              verdadero.
                          </p>
                          </li>
                          <li className="mb-2">
                            <p>
                              El uso de GPT-2 en esta aplicaci??n web tiene el prop??sito de ayudar en el aprendizaje del idioma Ingl??s (ayuda gramatical, vocabulario, lectura y escritura).
                          </p>
                          </li>
                          <li className="mb-2">
                            <p>
                              Es importante mencionar que el modelo GPT-2 puede reflejar sesgos inherentes a los sistemas en los que fueron entrenados, sin embargo, se ha implementado una estrategia que intenta reducir los posibles sesgos que pueda presentar el sistema en esta implementaci??n.
                          </p>
                          </li>
                        </div>
                        <li className="list-none">
                          <p className="text-sm text-gray-500 p-4 border-t border-gray-200 bg-gray-100 rounded-b-xl md:text-justify">
                            "No encontramos diferencias estad??sticamente significativas en las sondas de sesgo de g??nero, raza y religi??n entre 774M y 1.5B, lo que implica que todas las versiones de GPT-2 deben abordarse con niveles similares de precauci??n en los casos de uso que son sensibles a los sesgos en torno a los atributos humanos."
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
                      <div className="flex mt-4 pr-6 justify-end space-x-4">
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

          {/* Modal case error */}
          <ErrorModal isOpen={isOpenError} />
        </CustomScrollbars>
        <DropdownUser />
      </div>
    );
  } else if (irRevisionTexto) {
    return (
      <RevisionGeneracion textosFromGenerate={Textos} UUID_GENERATE={generacionConfiguracion.id} />
    )
  }
}

// Funciones que cambian el estilo del scroll y otras props de una librer??a
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