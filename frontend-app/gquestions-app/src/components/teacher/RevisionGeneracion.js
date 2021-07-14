import React, { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneralGreenDark from "../../assets/images/background-general-green_dark.png";
import backgroundGeneralGreenLight from "../../assets/images/background-general-green_light.png";
import { DropdownUser } from "../teacher/user/DropdownUser";
import { StepsProgress } from "./StepsProgress";
import { CreateTextoAPI } from "../../api/Textos/CreateTextoAPI";
import Scrollbars from "react-custom-scrollbars";
import ReactDOM from 'react-dom';
import { CreatePreguntaAPI } from "../../api/Preguntas/CreatePreguntaAPI";
import { CreateRespuestaCuerpoAPI } from "../../api/Preguntas/CreateRespuestaCuerpoAPI";
import { ExamenConfiguracion } from "./ExamenConfiguracion";
import { Helmet } from "react-helmet";
import { Dialog, Transition } from '@headlessui/react';
import { LoadingPage } from "../../containers/LoadingPage";
import { GenerateTextsAPI } from "../../api/Generacion/GenerateTextsAPI";

export const RevisionGeneracion = (props) => {

  const { v4: uuidv4 } = require("uuid"); // id aleatorio (uuuidv4)

  const [isLoading, setIsLoading] = useState(false);
  const [errorServer, setErrorServer] = useState({
    boolError: false,
  });
  const errorServerRef = useRef();

  const divRefErrorMessage = React.createRef(); // const ref error messages (div DOM)
  const textAreaRef = useRef();
  const preguntasAreaRef = useRef();
  const buttonTextRef = useRef();
  const buttonPreguntasRef = useRef();
  const [disabledTextArea, setDisabledTextArea] = useState(true)

  const [textButtonEditar, setTextButtonEditar] = useState("Editar texto")

  const [eventsButton, setEventsButton] = useState([])

  const [preguntas, setPreguntas] = useState(props.textosFromGenerate[0].preguntas) // Estado inicial seteado a las preguntas del primer texto (por defecto)

  // Hooks wait volver a generar
  const [isOpen, setIsOpen] = useState(false);

  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  //const [titleTextoRef, setTitleTextoRef] = useState("Texto 1") // Título que se setea cuando se presiona click en otro texto
  const Textos = props.textosFromGenerate;   // Estado que guarda todos los textos generados en la vista anterior (GenerateConfig), recibido por props

  const [irConfiguracionExamen, setIrConfiguracionExamen] = useState(false) // Estado que sirve para redireccionar a la siguiente vista al presionar el botón(RevisionPreguntas)

  // TEXTO
  const [TextoObjeto, setTextoObjeto] = useState({  // Estado que se usa para insertar texto por texto en la DB
    id_texto: "",
    cuerpo_texto: "",
    es_editado: false,
    es_regenerado: false,
    generacion: "",
  })

  // PREGUNTA
  const [preguntaObjeto, setPreguntaObjeto] = useState({  // Estado que se usa para insertar pregunta por pregunta de los textos en la DB
    id_pregunta: "",
    pregunta_cuerpo: "",
    respuesta_correcta: "",
    generacion_texto: "",
  })

  const [respuestaCuerpoObjeto, setRespuestaCuerpoObjeto] = useState({  // Estado que se usa para insertar el cuerpo de la respuesta de cada pregunta en la DB
    generacion_pregunta: "",
    resp_unica: "",
    opcion_multiple: "",
    completacion: "",
  })


  const [TextArea, setTextArea] = useState(Textos[0].cuerpo)  // Estado que guarda el value de TextArea dependiendo de cual texto se presione
  const [ValTemp, setValTemp] = useState("1") // Estado que sirve para guardar el id del texto de manera temporal

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
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
  }, [props.textosFromGenerate.length]);

  // Llamada a la Api para insertar los datos en la base de datos
  const setTextosDatabase = () => {
    let UUID_TEXTO = ""
    let splitUUID = []
    Textos.map(async texto => {   // Recorre cada texto y manda uno por uno a un POST con los campos necesarios
      setIsLoading(true);
      UUID_TEXTO = uuidv4();
      splitUUID = UUID_TEXTO.split("-");
      UUID_TEXTO = splitUUID[0] + "-" + splitUUID[1]; // Acorta el  UUID GENERADO POR LA FUNCION uuidv4()
      setTextoObjeto(
        Object.assign(TextoObjeto, {
          id_texto: UUID_TEXTO,
          cuerpo_texto: texto.cuerpo,
          es_editado: texto.es_editado,
          es_regenerado: texto.es_regenerado,
          generacion: props.UUID_GENERATE
        })
      )
      texto.id = UUID_TEXTO
      const response = await CreateTextoAPI(TextoObjeto); // POST a la tabla GeneracionTexto
      if (response === false) {
        setErrorServer(
          Object.assign(errorServer, {
            boolError: true,
          })
        );
      }
      return true;
    })
  }


  // Llamada a la Api para insertar los datos en la base de datos
  const setPreguntasDB = async () => {
    let preguntaDB = [];
    let lengthPreguntas = Textos[0].preguntas.length; // Captura la cantidad de preguntas de cada texto

    let UUID_PREGUNTA = ""
    let UUID_TEXTO = "" // utilizada para guardar temporalmente el uuid del texto base y crear la relacion con las preguntas de dicho texto
    let splitUUID = []

    for (let i = 0; i < Textos.length; i++) { //todo: acomodar length

      UUID_TEXTO = Textos[i].id;  // get UUID Texto generado en la vista anterior perteneciente a las preguntas generadas a partir de dicho texto

      for (let j = 0; j < lengthPreguntas; j++) {
        UUID_PREGUNTA = uuidv4();
        splitUUID = UUID_PREGUNTA.split("-");
        UUID_PREGUNTA = splitUUID[0] //+ "-" + splitUUID[1]; // Acorta el  UUID GENERADO POR LA FUNCION uuidv4()  

        preguntaDB = Textos[i].preguntas[j]   // Obtiene el elemento pregunta (individual)

        // Preparacion de data para insertar en la DB los campos requeridos
        setPreguntaObjeto(Object.assign(preguntaObjeto, {
          id_pregunta: UUID_PREGUNTA,
          pregunta_cuerpo: preguntaDB.pregunta_cuerpo,
          respuesta_correcta: preguntaDB.respuesta_correcta,
          generacion_texto: UUID_TEXTO,
        }))

        setRespuestaCuerpoObjeto(Object.assign(respuestaCuerpoObjeto, {
          generacion_pregunta: UUID_PREGUNTA,
          resp_unica: preguntaDB.respuestas_cuerpo.resp_unica,
          opcion_multiple: preguntaDB.respuestas_cuerpo.opcion_multiple,
          completacion: preguntaDB.respuestas_cuerpo.completacion,
        }))

        await CreatePreguntaAPI(preguntaObjeto);  // insert preguntas (una por una con un id diferente)
        await CreateRespuestaCuerpoAPI(respuestaCuerpoObjeto) // insert respuesta cuerpo de cada pregunta
      }
    }
    setIsLoading(false);
  }

  // Función llamada al presionar el botón de "generar preguntas"
  const handleClick = async () => {

    if (checkFieldsValidations() === true) {
      await setTextosDatabase();  // Llamada a función que inserta los textos en la DB
      await setPreguntasDB();     // Llamada a función que inserta los preguntas en la DB
      //setPreguntasFromResposeAPIFunction(); // Setea las preguntas en el estado preguntasDB para ser enviado a la revision de preguntas

      if (errorServer.boolError === false && isLoading === false) {
        setIrConfiguracionExamen(true); // se cambia a true para redireccionar a la siguientes vista (revision preguntas)
      }
      else {
        setIsLoading(true);
        errorServerRef.current.classList.remove('hidden');
      }
    }

    // Todo: Traer bool true or false si se efectuan todos los POST CORRECTAMENTE
    /* const boolTextos = setTextosDatabase();
    const boolTextosIntermedia = setTextosIntermediaDatabase();
 
    if (boolTextos && boolTextosIntermedia) setIrRevisionPreguntas(true) */
  }

  // Función utilizada cuando hay un cambio en el text area
  const handleTextArea = (e) => {
    let value = e.target.value; // obtiene el valor del textArea del dom

    Textos.map(texto => {
      if (texto.id === ValTemp) {
        Textos[parseInt(texto.id) - 1].cuerpo = value
        Textos[parseInt(texto.id) - 1].es_editado = true;
        setTextArea(value);
        return true;
      } else {
        return false;
      }
    })
  }

  // Función llamada al presionar un elemento de la lista de textos
  const onClickTextoList = (e) => {

    eventsButton.map(style => {
      style.backgroundColor = "white"
      style.color = "black"
      return true;
    })

    e.target.style.backgroundColor = "#FFE3C1";
    e.target.style.color = "#18191F"

    const updateEvents = [...eventsButton, e.target.style];
    setEventsButton(updateEvents);


    Textos.map(texto => {
      if (texto.id === e.target.id) {
        handleClickTexto();
        setTextArea(texto.cuerpo);
        setValTemp(texto.id);
        //setTitleTextoRef("Texto " + texto.id);
        setPreguntas(texto.preguntas)
        return true
      } else {
        return false
      }
    })
  }

  const handleClickTexto = () => {
    preguntasAreaRef.current.classList.add("hidden")
    textAreaRef.current.classList.remove("hidden")

    // button text
    buttonTextRef.current.classList.add("bg-yellowlight")
    buttonTextRef.current.classList.add("text-yellow-800")
    buttonTextRef.current.classList.add("border-yellowmain")

    buttonPreguntasRef.current.classList.remove("bg-yellowlight")
    buttonPreguntasRef.current.classList.remove("text-yellow-800")
    buttonPreguntasRef.current.classList.remove("border-yellowmain")
  }

  const handleClickPreguntas = () => {

    textAreaRef.current.classList.add("hidden")
    preguntasAreaRef.current.classList.remove("hidden")

    // button preguntas
    buttonPreguntasRef.current.classList.add("bg-yellowlight")
    buttonPreguntasRef.current.classList.add("text-yellow-800")
    buttonPreguntasRef.current.classList.add("border-yellowmain")

    buttonTextRef.current.classList.remove("bg-yellowlight")
    buttonTextRef.current.classList.remove("text-yellow-800")
    buttonTextRef.current.classList.remove("border-yellowmain")
  }

  const handleClickVolverGenerar = async e => {

    let id = e.target.id;
    let n_preguntas = Textos[0].preguntas.length
    
    let text = TextArea
    let sentence = ""
    let array_string = []
    for (let i = 0; i < 10; i++) {
      array_string = text.split(' ')
      sentence = sentence + ' ' + array_string[i]
    }
    
    let longit_texto = Math.floor((TextArea.length / 6) + 120)

    setIsOpen(true);
    const response_text = await GenerateTextsAPI(sentence, longit_texto);
    
    let preguntas = await getPreguntasFromNLP(response_text[0].generated_text, n_preguntas, "all")
    let element_text = {
      id: id,
      cuerpo: response_text[0].generated_text,
      es_editado: "false",
      es_regenerado: "false",
      preguntas: preguntas
    }

    // Elimina elemento a regenerar
    for (let i = 0; i < Textos.length; i++) {
      if (Textos[i].id === id) {
        Textos.splice(i, 1);
        Textos.splice(i, 0, element_text);
      }
    }

    setIsOpen(false);
    if (isOpen === false) {
      Textos.map(texto => {
        if (texto.id === e.target.id) {
          setTextArea(texto.cuerpo);
          setPreguntas(texto.preguntas)
          return true
        } else {
          return false
        }
      })
    }

  }

  const getPreguntasFromNLP = async (text, num_questions, answer_style) => {
    const response_questions = await fetch("https://gquestions-ai1-vn4rmyywka-uc.a.run.app/api/generacion/question-generator", {
      method: "POST",
      headers: {
        Authorization: "Basic Og==",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "text": text, "num_questions": num_questions, "answer_style": answer_style }),
    }).then((res) => res.json())
      .then((json) => {
        return json;
      }).catch(err => {
        console.log(err)
        return false;
      })
    return response_questions;
  }

  const checkFieldsValidations = () => {
    let boolEmpty = false;

    let p_empty = "";

    Textos.map(texto => {
      if (texto.cuerpo === "") {
        boolEmpty = true;
        p_empty = React.createElement('p', {}, '●  Hay textos vacíos, por favor verifique que no haya textos vacíos');
      }
      return true; // return map prototype
    })

    if (boolEmpty) {
      removeClassdivRefErrorMessage();
      const X = React.createElement('div', {}, [p_empty]);
      ReactDOM.render(X, document.getElementById('error_messages'));
      return false;
    }
    else {
      return true;
    }
  }

  const addClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.add("hidden");
  };

  const removeClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.remove("hidden");
  };

  const handleClickEditar = () => {
    if (disabledTextArea === false) {
      setDisabledTextArea(true);
      setTextButtonEditar("Editar texto");
    }
    else if (disabledTextArea) {
      setDisabledTextArea(false);
      setTextButtonEditar("Dejar de editar");
    }
  }

  function closeModal() {
    setIsOpen(true);
  }

  // Condicional para redireccionar con props en caso de que la generacion sea exitosa (Enviar al siguiente component funcional)
  if (!irConfiguracionExamen) {
    return (
      <div
        ref={darkModeRef}
        className="flex container h-screen w-screen font-manrope"
        style={{
          backgroundImage: `url(${darkModeBool ? backgroundGeneralGreenDark : backgroundGeneralGreenLight})`,
          width: "100%",
          height: "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "",
          minWidth: "100%",
        }}
      >
        <Helmet>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet"></link>
          <link rel="stylesheet" href="https://pagecdn.io/lib/font-awesome/5.10.0-11/css/all.min.css" integrity="sha256-p9TTWD+813MlLaxMXMbTA7wN/ArzGyW/L7c5+KkjOkM=" crossorigin="anonymous" />
        </Helmet>

        <Navbar className="" />

        <CustomScrollbars
          autoHide
          autoHideTimeout={900}
          autoHideDuration={400}
          style={{ height: "" }}
          className="container xl:mx-32 mx-4 md:mx-8 lg:mx-16 mt-8">

          <div className="pr-4">
            <div className="grid grid-rows space-y-8 mb-8">
              <h1 className="font-bold xl:text-5xl md:text-4xl sm:text-3xl text-xl  md:mb-10 mb-4 dark:text-white">
                Revisión de Generación
            </h1>
              <p className="text-gray-500 font-semibold text-sm md:text-base dark:text-white">
                Estos son los textos y preguntas generadas por el algoritmo, puede visualizar cada uno navegando a través de la lista de la izquierda. <br></br>
              </p>
            </div>

            <div className="container">
              <div className="grid grid-cols-12" style={{ height: '50vh' }}>
                <div className="col-span-2 sm:col-span-3">
                  <div className="flex h-full">
                    <CustomScrollbars
                      autoHide
                      autoHideTimeout={900}
                      autoHideDuration={400}
                      className="m-0 overflow-auto bg-white border shadow-md border-gray-300 md:rounded-xl 
                    rounded-r-none rounded-xl w-full 2xl:mr-16 xl:mr-4 lg:mr-4 md:mr-4 mr-0 md:text-base text-sm">
                      <ul className="divide-y divide-gray-300">
                        <li className="p-4 font-bold text-gray-500">
                          <p className="hidden sm:block">PAQUETES DE GENERACIONES</p>
                          <p className="sm:hidden block">#</p>
                        </li>

                        {
                          Textos.map((texto, contador = 1) => (
                            <div
                              key={texto.id}
                              className="">
                              <div className="flex">
                                <span
                                  id={texto.id}
                                  onClick={onClickTextoList}
                                  className="hidden rounded-r-lg cursor-pointer text-left sm:block transition 
                                  duration-500 py-4 w-full justify-between items-center px-5 focus:outline-none font-bold">
                                  Examen {contador = contador + 1}
                                </span>

                                <div className="hidden xl:px-4 2xl:mr-0 xl:mr-2 px-4 mr-2 sm:block self-center justify-items-end 
                                  place-content-end justify-self-center">
                                  <button
                                    id={texto.id}
                                    onClick={handleClickVolverGenerar}
                                    className="transition duration-300 text-darkGrayColor2  material-icons-outlined outline-none focus:outline-none hover:bg-green-200 rounded-full">
                                    &#xe863;
                                  </button>
                                </div>
                              </div>

                              <button
                                id={texto.id}
                                onClick={onClickTextoList}
                                className="sm:hidden block text-left transition duration-500 py-4 w-full justify-between items-center px-5 focus:outline-none font-bold">
                                {contador}
                              </button>
                            </div>
                          ))
                        }
                      </ul>
                    </CustomScrollbars>
                  </div>
                </div>

                <div className="grid col-span-10 sm:col-span-9">
                  <div className="box border md:rounded-xl rounded-l-none rounded-xl flex flex-col shadow bg-white">
                    <div className="grid grid-cols-12 items-center border-b">
                      <div className="sm:block col-span-6 font-bold text-base text-black">
                        <button
                          ref={buttonTextRef}
                          className="transition duration-500 md:text-base text-sm z-10 pl-1 w-full block focus:outline-none
                         bg-yellowlight text-yellow-800 border-yellowmain hover:bg-yellowlight focus:bg-yellowlight 
                         rounded-tl-xl border focus:border-yellowmain px-2 py-2 font-bold"
                          onClick={handleClickTexto}
                        >
                          Texto
                      </button>
                      </div>

                      <div className="sm:block col-span-6 font-bold text-base text-black">
                        <button
                          ref={buttonPreguntasRef}
                          className="transition duration-500 md:text-base text-sm z-10 pl-1 w-full block focus:outline-none
                         text-gray-800 hover:bg-yellowlight hover focus:bg-yellowlight 
                         rounded-tr-xl border focus:border-yellowmain px-2 py-2 font-bold"
                          onClick={handleClickPreguntas}
                        >
                          Preguntas
                      </button>
                      </div>
                    </div>

                    <CustomScrollbars
                      autoHide
                      autoHideTimeout={900}
                      autoHideDuration={400}
                      className={disabledTextArea ? 'transition duration-500 m-0 overflow-auto bg-gray-200' : 'transition duration-500 m-0 overflow-auto bg-white'}>
                      <textarea
                        ref={textAreaRef}
                        className="h-full px-5 py-4 w-full m-0 resize-none focus:border-gray-400  bg-transparent text-gray-600 text-sm md:text-base outline-none focus:outline-none"
                        value={TextArea}
                        disabled={disabledTextArea}
                        onChange={handleTextArea}
                      >

                      </textarea>
                      <div
                        ref={preguntasAreaRef}
                        className="hidden h-full w-full resize-none focus:border-gray-400 px-5 py-4 m-0 bg-transparent text-gray-600 text-sm md:text-base outline-none focus:outline-none"
                      >
                        {
                          preguntas.map((pregunta, contador = 1) => (
                            <div
                              className=""
                              key={pregunta.id_pregunta}>
                              <p><b>{contador = contador + 1}. Question:</b> {pregunta.pregunta_cuerpo}</p>
                              {pregunta.respuestas_cuerpo.opcion_multiple === 'null' &&
                                <p><b>Answer:</b> {pregunta.respuesta_correcta}</p>
                              }{pregunta.respuestas_cuerpo.opcion_multiple !== 'null' &&
                                <div>
                                  <span><b>Options: </b>
                                    {pregunta.respuestas_cuerpo.opcion_multiple.split(',').map(option => (
                                      <span className={disabledTextArea ? "bg-gray-300 border rounded-lg px-1 mx-1" : "bg-gray-100 border rounded-lg px-1 mx-1"}>{option}</span>
                                    ))}
                                  </span>
                                  <p><b>Answer:</b> {pregunta.respuesta_correcta}</p>
                                </div>
                              }
                              <br></br>
                            </div>
                          ))
                        }
                      </div>
                    </CustomScrollbars>
                    <hr></hr>
                    <div className="mt-2 px-4 sm:py-2 items-center">
                      <p className="hidden sm:block text-gray-500 text-xs md:text-sm">Generado por: GPT2 from Hugging Face & Question generator by AMontgomerie</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-rows items-end mt-4">
              <div className="flex md:flex-row flex-col gap-x-8 gap-y-2 justify-end">
                <div className="">
                  <button
                    type="submit"
                    className="btn-secondary"
                    onClick={handleClickEditar}
                  >
                    {textButtonEditar}
                  </button>
                </div>
                <div className="grid grid-rows items-end">
                  {!isLoading &&
                    <button
                      type="submit"
                      className="btn-primary"
                      onClick={handleClick}
                    >
                      Generar examénes
                </button>
                  }{isLoading &&
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      <span className="text-white my-0 mr-4 w-0 h-0">
                        <i className="fas fa-circle-notch fa-spin fa-x"></i>
                      </span>
                  Creando ...
                </button>}
                </div>
                <p ref={errorServerRef} className="hidden place-self-center text-sm px-2 text-red-600 dark:text-red-200">
                  Ha ocurrido un error de conexión
                </p>
              </div>
            </div>

            {/* Stepper progress bar */}
            <div className="py-2">
              <StepsProgress active={2} />
            </div>

            {/* Wait generación Modal */}
            {/* <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto font-manrope"
                onClose={closeModal}
              >
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
                    <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="md:text-xl text-xl text-center font-semibold  text-gray-900 select-none py-4"
                      >
                        Generando un nuevo examen, espera un momento ...
                        <div className="mr-12 py-2">

                          <LoadingPage />
                        </div>
                      </Dialog.Title>
                      <div className="mt">
                      </div>

                      <div className="mt-6">
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition> */}


            {/* Link exámenes Modal */}
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto font-manrope"
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
                    <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                        as="h3"
                        className="md:text-xl text-xl text-center font-semibold  text-gray-900 select-none py-4"
                      >
                        Generando un nuevo examen, espera un momento ...
                      </Dialog.Title>
                      <div className="mt-2">

                      </div>

                      <div className="mt-6">
                        <ul className="list-none space-y-4 md:text-justify">
                          <li className="mr-12">
                            <LoadingPage />
                          </li>
                          <div className="flex place-content-center select-none">
                          </div>
                          <li className="list-none">
                            <div className="grid grid-cols-12 text-sm  p-4 rounded-t-xl text-left border-gray-200">
                              <p className="col-span-11 p-1 font-semibold text-blue-600 underline outline-none focus:outline-none">
                      
                              </p>

                              <div className="tooltip place-self-center select-none">
                                <button
                                  className="ml-2 transition duration-500 col-span-1 p-1 
                                   material-icons-outlined mr-2 outline-none focus:outline-none"
                                >
                              </button>
                                <span className="tooltiptext"></span>
                              </div>
                            </div>
                            <div className="text-center px-4 bg-gray-100 rounded-xl border border-gray-200">
                              <p className="p-1 text-lg font-semibold text-gray-400 outline-none focus:outline-none">
                                Generando  ...
                              </p>
                            </div>

                          </li>
                        </ul>
                      </div>

                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>

            {/* Error messages */}
            <div
              ref={divRefErrorMessage}
              className="hidden animate-pulse mt-1 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg mb-12"
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
        </CustomScrollbars>
        <DropdownUser />  {/* Elemento menú del usuario */}
      </div>
    );
  } else if (irConfiguracionExamen) {
    return (
      <ExamenConfiguracion textos={Textos} />
    );
  }
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