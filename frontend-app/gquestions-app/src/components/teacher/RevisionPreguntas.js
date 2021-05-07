import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneralGreenDark from "../../assets/images/background-general-green_dark.png";
import backgroundGeneralGreenLight from "../../assets/images/background-general-green_light.png";
import { DropdownUser } from "../user/DropdownUser";
import { StepsProgress } from "./StepsProgress";
import { Scrollbars } from 'react-custom-scrollbars';
import { CreatePreguntaAPI } from "../../api/Preguntas/CreatePreguntaAPI";
import { CreateRespuestaCuerpoAPI } from "../../api/Preguntas/CreateRespuestaCuerpoAPI";
import { ExamenConfiguracion } from "./ExamenConfiguracion";

export const RevisionPreguntas = (props) => {


  const divRefErrorMessage = React.createRef(); // const ref error messages (div DOM)
  const Textos = props.textos // Estado que guarda todos los textos generados en la vista anterior (GenerateConfig), recibido por props

  const { v4: uuidv4 } = require("uuid"); // id aleatorio (uuuidv4)

  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  const [irConfiguracionExamen, setIrConfiguracionExamen] = useState(false);  // Estado que sirve para redireccionar a la siguiente vista al presionar el botón(RevisionPreguntas)
  const [titleTextoRef, setTitleTextoRef] = useState("Preguntas texto 1")   // Título que se setea cuando se presiona click en otro texto
  const packagePreguntas = props.packagePreguntas // Recibe el paquete de preguntas obtenidas en la vista de revision de textos al presionar el botón de continuar
  const [preguntas, setPreguntas] = useState(props.preguntas)

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

  // Llamada a la Api para insertar los datos en la base de datos
  const setPreguntasDB = async () => {
    let preguntaDB = [];
    let lengthPreguntas = packagePreguntas[0].data[0].texto.length; // Captura la cantidad de preguntas de cada texto

    let UUID_PREGUNTA = ""
    let UUID_TEXTO = "" // utilizada para guardar temporalmente el uuid del texto base y crear la relacion con las preguntas de dicho texto
    let splitUUID = []

    for (let i = 0; i < Textos.length; i++) { //todo: acomodar length

      UUID_TEXTO = Textos[i].id;  // get UUID Texto generado en la vista anterior perteneciente a las preguntas generadas a partir de dicho texto

      for (let j = 0; j < lengthPreguntas; j++) {
        UUID_PREGUNTA = uuidv4();
        splitUUID = UUID_PREGUNTA.split("-");
        UUID_PREGUNTA = splitUUID[0] //+ "-" + splitUUID[1]; // Acorta el  UUID GENERADO POR LA FUNCION uuidv4()  

        preguntaDB = packagePreguntas[i].data[0].texto[j]   // Obtiene el elemento pregunta (individual)

        // Preparacion de data para insertar en la DB los campos requeridos
        setPreguntaObjeto(Object.assign(preguntaObjeto, {
          id_pregunta: UUID_PREGUNTA,
          pregunta_cuerpo: preguntaDB.pregunta_cuerpo,
          respuesta_correcta: preguntaDB.respuesta_cuerpo.respuesta_correcta,
          generacion_texto: UUID_TEXTO,
        }))

        setRespuestaCuerpoObjeto(Object.assign(respuestaCuerpoObjeto, {
          generacion_pregunta: UUID_PREGUNTA,
          resp_unica: preguntaDB.respuesta_cuerpo.resp_unica,
          opcion_multiple: preguntaDB.respuesta_cuerpo.opcion_multiple,
          completacion: preguntaDB.respuesta_cuerpo.completacion,
        }))

        await CreatePreguntaAPI(preguntaObjeto);  // insert preguntas (una por una con un id diferente)
        await CreateRespuestaCuerpoAPI(respuestaCuerpoObjeto) // insert respuesta cuerpo de cada pregunta
      }
    }
  }

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }
    // componentwillunmount
    return () => {
    }
  }, []);

  // Función llamada al presionar un elemento de la lista de preguntas
  const onClickPregunta = (e) => {
    let id_num = parseInt(e.target.id);

    let mapPackagePreguntas = []
    let lengthPreguntas = packagePreguntas[0].data[0].texto.length;
    setTitleTextoRef("Preguntas texto " + (id_num + 1).toString());

    for (let i = 0; i < lengthPreguntas; i++) {
      mapPackagePreguntas.push(packagePreguntas[id_num].data[0].texto[i])   // se hace push del elemento de la lista correspondiente a las preguntas seleccionadas 
    }
    setPreguntas(mapPackagePreguntas);
  }

  const handleClickPruebas = () => {
  }

  const handleClickGenerarExamen = () => {
    setPreguntasDB();
    setIrConfiguracionExamen(true);
  }

  const addClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.add("hidden");
  };

  /*   const removeClassdivRefErrorMessage = () => {
      divRefErrorMessage.current.classList.remove("hidden");
    }; */

  if (!irConfiguracionExamen) {
    return (
      <div
        ref={darkModeRef}
        className="flex container w-screen h-screen font-manrope"
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
        <div className="">
          <Navbar className="fixed" />
        </div>
        <div className="container xl:mx-32 mx-4 md:mx-8 lg:mx-16 min-h-screen">
          <div className="grid grid-rows space-y-8 mb-8">
            <h1 className="font-bold xl:text-5xl md:text-4xl sm:text-3xl text-xl mt-8 dark:text-white">
              Preguntas generadas
            </h1>
            <p className="text-gray-500 font-semibold text-sm md:text-base dark:text-white">
              Estas son los preguntas generadas para cada texto, puede visualizar cada paquete de preguntas navegando a través de la lista de la izquierda. <br></br>
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
                    style={{ height: "50vh" }}
                    className="m-0 overflow-auto bg-white dark:bg-darkColor dark:text-gray-200 border shadow-md 
                            border-gray-500 sm:rounded-md rounded-r-none w-full lg:mr-16 md:mr-8 mr-0 md:text-base text-sm">
                    <ul className="divide-y divide-gray-300">
                    <li className="p-4 font-bold text-gray-500 dark:text-white dark:font-bold">
                        <p className="hidden sm:block">PAQUETES DE PREGUNTAS</p>
                        <p className="sm:hidden block">Q</p>
                      </li>
                      {
                        packagePreguntas.map((preguntas, contador) => (
                          <li
                            key={contador}
                            id={contador}
                            onClick={onClickPregunta}
                            className="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold dark:hover:bg-darkGrayColor dark:hover:text-yellowlight">
                            <p id={contador} className="hidden sm:block">Preguntas {contador = contador + 1}</p>
                            <p id={contador} className="sm:hidden block">{contador}</p>
                          </li>
                        ))
                      }

                    </ul>
                  </CustomScrollbars>
                </div>
              </div>

              <div className="grid col-span-9">
                <div className="box border rounded flex flex-col shadow bg-white">
                  <div className="grid grid-cols-12 box__title bg-grey-lighter px-3 py-2 border-b items-center">
                    <h3 className="hidden sm:block col-span-6 font-bold text-base text-black">
                      {titleTextoRef}
                    </h3>
                    <div className="col-span-12 sm:col-span-6 place-self-end">
                      <button
                        type="submit"
                        //className="md:text-base text-sm z-10 pl-1 sm:w-52 w-40 block focus:outline-none bg-green-400 hover:bg-green-500 focus:bg-green-500 text-black rounded-lg px-2 py-2 font-semibold"
                        className="md:text-base text-sm z-10 pl-1 sm:w-52 w-40 block focus:outline-none bg-gray-200 text-gray-400 rounded-lg px-2 py-2 font-normal"
                      //onClick={this.handleClick}
                      >
                        Ver texto base
                      </button>
                    </div>
                  </div>
                  <div className="" style={{ height: "40vh" }}>
                    <CustomScrollbars autoHide autoHideTimeout={900} autoHideDuration={400} className="m-0 overflow-auto">

                      <div className="h-full resize-none focus:border-gray-400 p-2 m-1 bg-transparent text-gray-600 text-sm md:text-base ">
                        {
                          preguntas.map(pregunta => (
                            <p key={pregunta.id_pregunta}>{pregunta.pregunta_cuerpo}<br></br>{pregunta.respuesta_cuerpo.respuesta_correcta}<br></br><br></br></p>
                          ))
                        }
                      </div>

                    </CustomScrollbars>
                    <hr></hr>
                    <div className="flex mt-2 px-4 items-center"><p className="hidden sm:block text-gray-500 text-sm md:text-sm">Cite: Questions Generator Algorithm - HuggingFace</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-rows justify-end items-end mt-4">
            <div className="flex md:flex-row flex-col gap-x-8 gap-y-2 box__title bg-grey-lighter px-3  py-2 items-center self-center">
              <div className="">
                <button
                  type="submit"
                  className="md:text-base text-sm z-10 pl-1 block w-52 focus:outline-none bg-red-200 hover:bg-red-300 focus:bg-red-300 text-black rounded-lg px-2 py-2 font-semibold"
                  onClick={handleClickPruebas}
                >
                  Pruebas
                      </button>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="transition duration-500 md:text-base text-sm z-10 pl-1 w-52 block focus:outline-none bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 text-black rounded-lg px-2 py-2 font-semibold"
                  onClick={handleClickGenerarExamen}
                >
                  Generar exámenes
                      </button>
              </div>
            </div>
          </div>

          {/* Stepper progress bar */}
          <StepsProgress active={3} />

          {/* Error messages */}
          <div
            ref={divRefErrorMessage}
            className="hidden animate-pulse mt-1 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
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
      </div >
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
    backgroundColor: 'rgba(35, 49, 86, 0.8)'
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