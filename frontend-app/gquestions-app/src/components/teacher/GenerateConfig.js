import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom'
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneralYellowDark from "../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../assets/images/background-general-yellow_light.png";
import AOS from "aos";
import { Helmet } from 'react-helmet'
import { DropdownUser } from "../user/DropdownUser";
import { CreateGeneracionConfiguracionAPI } from "../../api/Generacion/CreateGeneracionConfiguracionAPI";
import { CreateGeneracionTipoPreguntaAPI } from "../../api/Generacion/CreateGeneracionTipoPreguntaAPI";
import { StepsProgress } from "./StepsProgress";
import { useHistory } from "react-router";
import { RevisionGeneracion } from "./RevisionGeneracion";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { GetUserAPI } from '../../api/Usuario/GetUserAPI';
import { UpdateTerminosUserAPI } from "../../api/Usuario/UpdateTerminosUserAPI";

export const GenerateConfig = () => {
  const divRefErrorMessage = React.createRef();
  const { v4: uuidv4 } = require("uuid");
  const UUID_GENERATE = uuidv4(); // uuid autogenerado para id de Generacion

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

  // ********************** API de prueba *********************** //
  // https://run.mocky.io/v3/e8993735-eacf-4d85-b78d-9b0babb17c89//
  //  ************************************************************//
  const url = "https://run.mocky.io/v3/e8993735-eacf-4d85-b78d-9b0babb17c89"; // Endpoint TEXTOS Y PREGUNTAS fake

  // Estado utilizado para campos de configuración de Generación de textos
  const [generacionConfiguracion, setGeneracionConfiguracion] = useState({
    id: UUID_GENERATE,
    n_examenes: 10,
    cantidad_textos: 10,
    longit_texto: 200,
    n_preguntas: 0,
    inicio_oracion: "Aleatorio",
    account: ""
  });

  // Estado utilizado para campos de configuración de tipo de preguntas en Generación de textos
  const [generacionTipoPregunta, setGeneracionTipoPregunta] = useState({
    pregunta_abierta: true,
    opcion_multiple: true,
    completacion: false,
    generacion: UUID_GENERATE,
  });

  useEffect(() => {
    getTextos();  // Obtiene los textos desde el endpoint (url)
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

    // componentwillunmount
    return () => {
      set_isMounted(false);
    }
  }, []);

  // get data Textos endpoint 
  const getTextos = async () => {

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

    // Asignación de respuesta al stado Textos
    setTextos(response.data);
  }

  const getTerminos = async () => {
    const id_user = localStorage.getItem('id_user');
    const user = await GetUserAPI(id_user)
    console.log(user)
    const terminos_condiciones = user.users[0].terminos_condiciones
    setIsOpen(!terminos_condiciones)
  }

  // Función al presionar el botón "Generar textos", esta función hace los POST  a tres tablas
  // (Generacion, GeneracionTipoPregunta y GeneracionUsuario), además llama a dos funciones que,
  // inserta los textos generados y la relación entre la Generación y estos Textos
  const handleClick = async () => {
    setGeneracionConfiguracion(
      Object.assign(generacionConfiguracion, {
        account: localStorage.getItem("id_user")
      })
    );

    if (checkFieldsValidations() === true) {    // Si todos los campos cumplen las validaciones entonces hace los POST

      if (_isMounted) {
        const responseGeneracionConfig = await CreateGeneracionConfiguracionAPI(generacionConfiguracion);   // POST a Generacion

        const responseGeneracionTipoPregunta = await CreateGeneracionTipoPreguntaAPI(generacionTipoPregunta);    // POST a GeneracionTipoPregunta

        if (responseGeneracionConfig && responseGeneracionTipoPregunta) {    // Si todas las peticiones son ok

          // Llamado a función que inserta los textos en la DB DJANGO
          localStorage.setItem('uuid_generacion', generacionConfiguracion.id);
          setIrRevisionTexto(true);
        }
        else {
          console.log("Ha occurido un error");
          history.push("/teacher/generacion")
          /* TODO
          MOSTRAR MODAL CON MENSAJE DE QUE HA OCURRIDO UN ERROR Y SE RECARGA LA PÁGINA PARA QUE LO INTENTE DE NUEVO */
        }
      }
    }
  }

  // Handles inputs
  const handleChangeConfiguracion = (e) => {
    const generacion_configuracion = generacionConfiguracion;
    generacion_configuracion[e.target.name] = parseInt(e.target.value);
    setGeneracionConfiguracion(generacion_configuracion);
  }

  const handleChangeInicioOracion = (e) => {
    e.target.name = e.target.value;
    setGeneracionConfiguracion(
      Object.assign(generacionConfiguracion, {
        inicio_oracion: e.target.value
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

  // Función que valida los diferentes tipos de inputs y errores que podría cometer el usuario al rellenarlos
  const checkFieldsValidations = () => {
    let boolZero = false;
    let boolTextosMenor = false;
    let boolLongTexto = false;
    let boolCantidadPreguntas = false;
    let boolTipoPregunta = false;
    let p_zero;
    let p_textosMenor;
    let p_longTexto;
    let p_cantidadPreguntas;
    let p_tiposPreguntas;
    if (
      generacionConfiguracion.n_examenes === 0 ||
      generacionConfiguracion.cantidad_textos === 0 ||
      generacionConfiguracion.longit_texto === 0 ||
      generacionConfiguracion.n_preguntas === 0
    ) {
      boolZero = true;
      p_zero = React.createElement('p', {}, '●  Hay campos con valores en cero');
    }
    if (generacionConfiguracion.cantidad_textos < generacionConfiguracion.n_examenes) {
      boolTextosMenor = true;
      p_textosMenor = React.createElement('p', {}, '●  La cantidad de textos debe ser mayor o igual a la cantidad de exámenes');
    }
    if (generacionConfiguracion.longit_texto < 200) {
      boolLongTexto = true;
      p_longTexto = React.createElement('p', {}, '●  La longitud del texto debe ser mayor a 200 carácteres');
    }
    if (generacionConfiguracion.n_preguntas > 10) {
      boolCantidadPreguntas = true;
      p_cantidadPreguntas = React.createElement('p', {}, '●  La cantidad de preguntas no debe exceder 10');
    }
    if (generacionTipoPregunta.pregunta_abierta === false &&
      generacionTipoPregunta.completacion === false &&
      generacionTipoPregunta.opcion_multiple === false) {
      boolTipoPregunta = true;
      p_tiposPreguntas = React.createElement('p', {}, '●  Debe seleccionar al menos un tipo de pregunta');
    }
    if (boolZero || boolCantidadPreguntas || boolLongTexto || boolTextosMenor || boolTipoPregunta) {
      removeClassdivRefErrorMessage();
      const X = React.createElement('div', {}, [p_zero, p_textosMenor, p_longTexto, p_cantidadPreguntas, p_tiposPreguntas]);
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

  // CONDICIONAL PARA REDIRECCIONAR CON PROPS EN CASO DE QUE LA GENERACIÓN SEA EXITOSA (ENVIAR A SIGUIENTE COMPONENT FUNCTIONAL)
  if (!irRevisionTexto) {
    return (
      <div
        ref={darkModeRef}
        className="flex container w-screen h-screen font-manrope"
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
          <title>Generación - GQuestions</title>
        </Helmet>
        <div>
          <Navbar className="fixed" />
        </div>

        <div data-aos="fade-right" className="container xl:mx-32 mx-4 md:mx-8 lg:mx-16 mt-8">

          {/* Términos y condiciones Modal */}
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
                      className="text-xl font-medium leading-6 text-gray-900"
                    >
                      Términos y condiciones
                </Dialog.Title>
                    <div className="mt-2">
                      <ul className="px-6 list-disc space-y-2 md:text-justify">
                        <li>
                          <p className="text-sm text-gray-500">
                            Debido a que los modelos de lenguaje a gran escala como GPT-2 no distinguen la realidad de la ficción, el texto generado no debe ser considerado
                            verdadero.
                        </p>
                        </li>
                        <li>
                          <p className="text-sm text-gray-500">
                            El uso de GPT-2 en esta aplicación web tiene el propósito de ayudar en el aprendizaje del idioma Inglés (ayuda gramatical, vocabulario, lectura y escritura).
                          </p>
                        </li>
                        <li>
                          <p className="text-sm text-gray-500">
                            Es importante mencionar que el modelo GPT-2 puede reflejar sesgos inherentes a los sistemas en los que fueron entrenados, sin embargo, se ha implementado una estrategia que intenta reducir los posibles sesgos que pueda presentar el sistema en esta implementación.
                        </p>
                        </li>
                        <li className="list-none">
                          <p className="text-sm text-gray-500 p-4 bg-gray-100 rounded-xl text-left">
                            "No encontramos diferencias estadísticamente significativas en las sondas de sesgo de género, raza y religión entre 774M y 1.5B, lo que implica que todas las versiones de GPT-2 deben abordarse con niveles similares de precaución en los casos de uso que son sensibles a los sesgos en torno a los atributos humanos."
                            <b> Model card GPT-2</b><br></br>
                            <a className="text-blue-600 underline outline-none focus:outline-none" 
                            href="https://github.com/openai/gpt-2/blob/master/model_card.md#out-of-scope-use-cases" 
                            target="_blank" rel="noreferrer">
                              https://github.com/openai/gpt-2/blob/master/model_card.md#out-of-scope-use-cases
                            </a>
                          </p>
                        </li>
                      </ul>
                    </div>

                    <div className="flex mt-4 pr-6 justify-end space-x-4">
                      <button
                        type="button"
                        className="transition duration-500 inline-flex justify-center px-12 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent 
                        rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModalNoAccept}
                      >
                        No acepto
                      </button>
                      <button
                        type="button"
                        className="transition duration-500 inline-flex justify-center px-12 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent 
                        rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModalAccept}
                      >
                        Acepto
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>

          <div className="grid grid-rows">
            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left mb-12 lg:mb-20 text-2xl dark:text-white">
              Parámetros de generación
            </h1>
            <div className="grid grid-cols-12 sm:mb-44 mb-0">
              <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-0 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                  Cantidad de exámenes
                </label>
                <input
                  type="number"
                  id="cant_examenes"
                  className="grid text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  name="n_examenes"
                  defaultValue="10"
                  placeholder=""
                  onChange={handleChangeConfiguracion}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-0 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                  Cantidad de textos
                </label>
                <input
                  type="number"
                  id="cant_textos"
                  className="grid text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  name="cantidad_textos"
                  defaultValue=""
                  placeholder="Por defecto 10"
                  onChange={handleChangeConfiguracion}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-0 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                  Longitud de texto
                </label>
                <input
                  type="number"
                  id="long_texto"
                  className="grid text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  name="longit_texto"
                  defaultValue=""
                  placeholder="Por defecto 200"
                  onChange={handleChangeConfiguracion}
                />
              </div>
            </div>

            <div className="grid grid-cols-12">
              <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-0 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2 dark:text-gray-300">
                  Cantidad de preguntas
                </label>
                <input
                  type="number"
                  id="cant_preguntas"
                  className="grid text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  name="n_preguntas"
                  defaultValue=""
                  placeholder="Cantidad de preguntas"
                  onChange={handleChangeConfiguracion}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-0 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2">
                  Inicio oración
                </label>
                <select
                  type="text"
                  id="ini_oracion"
                  className="grid text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  name="inicio_oracion"
                  defaultValue="Aleatorio"
                  onChange={handleChangeInicioOracion}
                >
                  <option>Aleatorio</option>
                  <option>Personalizado</option>
                  <option>Completo</option>
                </select>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
            >

              <div className="grid grid-rows lg:mx-0 sm:col-span-6 col-span-12 md:col-span-4">
                <label
                  htmlFor="pregunta_abierta"
                  className="sm:mx-0 pt-8 sm:pt-10 text-xs font-semibold px-1 text-gray-500 dark:text-gray-300 self-end py-2"
                >
                  Tipo de preguntas
                </label>
                <div className="flex sm:mx-0">
                  <div className="grid grid-rows">
                    <div className="flex flex-col lg:text-base text-sm ml-1">
                      <label
                        htmlFor="pregunta_abierta"
                        className="inline-flex items-center mt-3"
                      >
                        <input
                          type="checkbox"
                          name="pregunta_abierta"
                          className="form-checkbox h-5 w-5 text-yellow-500"
                          defaultChecked="true"
                          onChange={handleInputChangeTiposPregunta}
                        ></input>
                        <span className="ml-2 text-gray-700 dark:text-gray-100">
                          Pregunta abierta
                        </span>
                      </label>

                      <label
                        htmlFor="opcion_multiple"
                        className="inline-flex items-center mt-3"
                      >
                        <input
                          type="checkbox"
                          name="opcion_multiple"
                          className="form-checkbox h-5 w-5 text-yellow-500"
                          defaultChecked="true"
                          onChange={handleInputChangeTiposPregunta}
                        ></input>
                        <span className="ml-2 text-gray-700 dark:text-gray-100">
                          Opción múltiple
                        </span>
                      </label>

                      <label
                        htmlFor="completacion"
                        className="inline-flex items-center mt-3"
                      >
                        <input
                          type="checkbox"
                          name="completacion"
                          className="form-checkbox h-5 w-5 text-yellow-500"
                          onChange={handleInputChangeTiposPregunta}
                        ></input>
                        <span className="ml-2 text-gray-700 dark:text-gray-100">Completación</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="py-3 mt-4 w-full">
              <p className="text-sm text-gray-600 dark:text-gray-300 my-1">
                Tiempo de generación apróximado: 120s{" "}
              </p>
              <div className="bg-gray-300 w-full mb-4 h-1">
                <div className="bg-yellowmain w-4/6 h-full"></div>
              </div>
            </div>
            <div className="grid justify-end items-end">
              <button
                type="submit"
                className="btn-primary"
                onClick={handleClick}
              >
                Generar
              </button>
            </div>

            {/* StepProgress */}
            <StepsProgress active={1} />
          </div>

          {/* Error messages */}
          <div>

          </div>
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
                role="button"
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
        <DropdownUser />
      </div>
    );
  } else if (irRevisionTexto) {
    return (
      <RevisionGeneracion textosFromGenerate={Textos} UUID_GENERATE={generacionConfiguracion.id} />
    )
  }
}
