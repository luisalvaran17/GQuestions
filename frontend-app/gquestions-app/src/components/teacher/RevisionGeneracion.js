import React, { useEffect, useRef, useState } from "react";
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
    /* 
        window.onbeforeunload = function() {
          return "El progreso actual de la generación se perderá si recargas la página. ¿Deseas continuar?";
        };
     */
    // componentwillunmount
    return () => {
    }
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
              <h1 className="font-bold xl:text-5xl md:text-4xl sm:text-3xl text-xl dark:text-white">
                Revisión de Generación
            </h1>
              <p className="text-gray-500 font-semibold text-sm md:text-base dark:text-white">
                Estos son los textos y preguntas generadas por el algoritmo, puede visualizar cada uno navegando a través de la lista de la izquierda. <br></br>
              </p>
            </div>

            <div className="container">
              <div className="grid grid-cols-12">
                <div className="col-span-2 sm:col-span-3">
                  <div className="flex">
                    <CustomScrollbars
                      autoHide
                      autoHideTimeout={900}
                      autoHideDuration={400}
                      style={{ height: "45vh" }}
                      className="m-0 overflow-auto bg-white border shadow-md border-gray-300 md:rounded-lg 
                    rounded-r-none rounded-lg w-full xl:mr-16 lg:mr-8 md:mr-8 mr-0 md:text-base text-sm">
                      <ul className="divide-y divide-gray-300">
                        <li className="p-4 font-bold text-gray-500">
                          <p className="hidden sm:block">PAQUETES DE GENERACIONES</p>
                          <p className="sm:hidden block">T</p>
                        </li>

                        {
                          Textos.map((texto, contador = 1) => (
                            <div
                              key={texto.id}
                              className="">
                              <button
                                key={texto.id}
                                id={texto.id}
                                onClick={onClickTextoList}
                                className="hidden text-left sm:block transition duration-500 py-4 w-full justify-between items-center px-5 focus:outline-none font-bold">
                                Examen {contador = contador + 1}
                              </button>
                              <button
                                key={texto.id + contador}
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
                  <div className="box border md:rounded-lg rounded-l-none rounded-lg flex flex-col shadow bg-white">
                    <div className="grid grid-cols-12 items-center border-b">
                      <div className="sm:block col-span-6 font-bold text-base text-black">
                        <button
                          ref={buttonTextRef}
                          className="transition duration-500 md:text-base text-sm z-10 pl-1 w-full block focus:outline-none
                         bg-yellowlight text-yellow-800 border-yellowmain hover:bg-yellowlight focus:bg-yellowlight 
                         rounded-t-lg border focus:border-yellowmain px-2 py-2 font-bold"
                          onClick={handleClickTexto}
                        >
                          Texto
                      </button>
                      </div>

                      <div className="sm:block col-span-6 font-bold text-base text-black">
                        <button
                          ref={buttonPreguntasRef}
                          className="transition duration-500 md:text-base text-sm z-10 pl-1 w-full block focus:outline-none
                         bg-gray-100 text-gray-800 hover:bg-yellowlight hover focus:bg-yellowlight 
                         rounded-t-lg border focus:border-yellowmain px-2 py-2 font-bold"
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
                      className={disabledTextArea ? 'transition duration-500 m-0 overflow-auto bg-gray-200' : 'transition duration-500 m-0 overflow-auto bg-white'}
                      style={{ height: "34vh" }}>
                      <textarea
                        ref={textAreaRef}
                        className="h-full pl-6 py-4 w-11/12 m-0 resize-none focus:border-gray-400  bg-transparent text-gray-600 text-sm md:text-base outline-none focus:outline-none"
                        value={TextArea}
                        disabled={disabledTextArea}
                        onChange={handleTextArea}
                      >

                      </textarea>
                      <div
                        ref={preguntasAreaRef}
                        className="hidden h-full w-full resize-none focus:border-gray-400 p-2 m-1 bg-transparent text-gray-600 text-sm md:text-base outline-none focus:outline-none"
                      >
                        {
                          preguntas.map(pregunta => (
                            <div
                              className=""
                              key={pregunta.id_pregunta}>
                              <p>{pregunta.pregunta_cuerpo}</p>
                              <p>{pregunta.respuesta_correcta}</p>
                              <br></br>
                            </div>
                          ))
                        }
                      </div>
                    </CustomScrollbars>
                    <hr></hr>
                    <div className="grid grid-cols-12 mt-2 px-4 items-center">
                      <p className="col-span-7 hidden md:block text-gray-500 text-xs md:text-sm">Cite: GPT2 Algorithm from Hugging Face</p>

                      <div className="md:col-span-5 col-span-12 place-self-end">
                        <button
                          className="transition duration-500 md:text-base text-sm z-10 pl-1 sm:w-52 w-40 block focus:outline-none outline-none 
                        bg-white border border-green-400 text-green-700 hover:bg-green-500 focus:bg-green-500 hover:text-white
                         rounded-lg px-2 py-2 font-semibold"
                        >
                          Volver a generar
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-rows justify-end items-end mt-4">
              <div className="flex md:flex-row flex-col gap-x-8 gap-y-2 box__title bg-grey-lighter py-2 items-center self-center">
                <div className="">
                  <button
                    type="submit"
                    className="transition duration-500 shadow-md md:text-base text-sm text-darkGrayColor text-center focus:outline-none
                  z-10 mx-auto w-52 bg-yellowlight focus:bg-yellowlightdark hover:bg-yellowlightdark rounded-lg px-2 py-2 font-semibold outline-none focus:outline-none;"
                    onClick={handleClickEditar}
                  >
                    {textButtonEditar}
                  </button>
                </div>
                <div className="grid grid-rows justify-end items-end">
                  {!isLoading &&
                    <button
                      type="submit"
                      className="transition duration-500 shadow-md md:text-base text-sm text-white text-center 
                  z-10 mx-auto outline-none focus:outline-none w-52 block bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg px-2 py-2 font-semibold"
                      onClick={handleClick}
                    >
                      Generar examénes
                </button>
                  }{isLoading &&
                    <button
                      type="submit"
                      className="transition duration-500 shadow-md md:text-base text-sm text-white text-center 
                  z-10 mx-auto outline-none focus:outline-none w-52 block bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 rounded-lg px-2 py-2 font-semibold"
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
            <div className="pr-4 sm:pr-0">
              <StepsProgress active={2} />
            </div>

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