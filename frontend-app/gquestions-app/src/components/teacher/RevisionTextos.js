import React, { useEffect, useState } from "react";
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneral from "../../assets/images/background-general-green.png";
import { DropdownUser } from "../user/DropdownUser";
import { StepsProgress } from "./StepsProgress";
import { CreateTextsAPI } from "../../api/CreateTextsAPI";
import { CreateTextsRelacionAPI } from "../../api/CreateTextsRelacionAPI";
import { RevisionPreguntas } from "./RevisionPreguntas";
import Scrollbars from "react-custom-scrollbars";
import ReactDOM from 'react-dom';

export const RevisionTextos = (props) => {

  const { v4: uuidv4 } = require("uuid"); // id aleatorio (uuuidv4)

  const divRefErrorMessage = React.createRef(); // const ref error messages (div DOM)

  const [titleTextoRef, setTitleTextoRef] = useState("Texto 1") // Título que se setea cuando se presiona click en otro texto
  const Textos = props.textosFromGenerate;   // Estado que guarda todos los textos generados en la vista anterior (GenerateConfig), recibido por props

  const [irRevisionPreguntas, setIrRevisionPreguntas] = useState(false) // Estado que sirve para redireccionar a la siguiente vista al presionar el botón(RevisionPreguntas)

  const [TextoObjeto, setTextoObjeto] = useState({  // Estado que se usa para insertar texto por texto en la DB
    id_texto: "",
    cuerpo_texto: "",
    es_editado: false,
    es_regenerado: false,
  })

  // Estado utilizado para llaves foraneas de relacion Generacion - Texto
  const [TextoGeneracionRelacion, setTextoGeneracionRelacion] = useState({
    generacion: props.UUID_GENERATE,
    generacion_texto: "",
  })

  const [TextArea, setTextArea] = useState(Textos[0].cuerpo)  // Estado que guarda el value de TextArea dependiendo de cual texto se presione
  const [ValTemp, setValTemp] = useState("1") // Estado que sirve para guardar el id del texto de manera temporal

  useEffect(() => {
    getPreguntas(); // eslint-disable-next-line react-hooks/exhaustive-deps
/* 
    window.onbeforeunload = function() {
      return "El progreso actual de la generación se perderá si recargas la página. ¿Deseas continuar?";
    };
 */
    // componentwillunmount
    return () => {
    }
  }, []);

  // Llamada a la Api para insertar los datos en la base de datos
  const setTextosDatabase = () => {
    let UUID_TEXTO = ""
    let splitUUID = []
    Textos.map(texto => {   // Recorre cada texto y manda uno por uno a un POST con los campos necesarios
      UUID_TEXTO = uuidv4();
      splitUUID = UUID_TEXTO.split("-");
      UUID_TEXTO = splitUUID[0] + "-" + splitUUID[1]; // Acorta el  UUID GENERADO POR LA FUNCION uuidv4()
      setTextoObjeto(
        Object.assign(TextoObjeto, {
          id_texto: UUID_TEXTO,
          cuerpo_texto: texto.cuerpo,
          es_editado: texto.es_editado,
          es_regenerado: texto.es_regenerado,
        })
      )
      texto.id = UUID_TEXTO
      CreateTextsAPI(TextoObjeto); // POST a la tabla GeneracionTexto
      return true;
    })
  }

  // Llamada a la Api para insertar los datos como relación en la base de datos
  const setTextosIntermediaDatabase = () => {
    Textos.map(texto => {   // Recorre cada texto y manda uno por uno a un POST con los campos necesarios
      setTextoGeneracionRelacion(
        Object.assign(TextoGeneracionRelacion, {
          //generacion: UUID_GENERATE, // No necesario porque ya es asignado en el estado inicial del Hook 
          generacion_texto: texto.id,
        })
      )
      CreateTextsRelacionAPI(TextoGeneracionRelacion); // POST a la tabla intermedia Generacion_GeneracionTexto
      return true;
    })
  }

  // Función llamada al presionar el botón de "generar preguntas"
  const handleClick = () => {

    setTextosDatabase();  // Llamada a función que inserta los textos en la DB
    setTextosIntermediaDatabase();  // Llamada a función que inserta las llaves foraneas (Tabla intermedia)

    //setPreguntasFromResposeAPIFunction(); // Setea las preguntas en el estado preguntasDB para ser enviado a la revision de preguntas
    setIrRevisionPreguntas(true); // se cambia a true para redireccionar a la siguientes vista (revision preguntas)

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
    Textos.map(texto => {
      if (texto.id === e.target.id) {
        setTextArea(texto.cuerpo);
        setValTemp(texto.id);
        setTitleTextoRef("Texto " + texto.id);
        return true
      } else {
        return false
      }
    })
  }

  const checkFieldsValidations = () => {
    let boolEmpty = false;

    let p_empty = "";

    Textos.map(texto => {
      if (texto.cuerpo === "") {
        boolEmpty = true;
        p_empty = React.createElement('p', {}, '●  Hay textos vacíos, por favor verifique que todos los textos no estén vacíos antes de continuar.');
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


  // *************************************************************//
  // *************************************************************//
  // Get and set data questions, send to RevisionPreguntas.js     //
  // ********************** API de prueba *********************** //
  // https://run.mocky.io/v3/e70eb6be-b785-46e9-a5a0-bf96ddb658ae //
  //  ************************************************************//
  // *************************************************************//
  const url = "https://run.mocky.io/v3/e70eb6be-b785-46e9-a5a0-bf96ddb658ae";  // Endpoint PREGUNTAS fake
  const [packagePreguntas, setPackagePreguntas] = useState([])
  const [preguntasStateInitial, setPreguntasStateInitial] = useState([])

  // get data Preguntas endpoint 
  const getPreguntas = async () => {

    let arrayTempPackagePreguntas = []
    for (let i = 0; i < Textos.length; i++) {
      const response = await fetch(url) // You can await here
        .then((res) => res.json())
        .then((json) => {
          return json
        })
        .catch(err => {
          console.log(err)
          return false;
        })
      arrayTempPackagePreguntas.push(response); // Se ingresa elemento response al array
    }
    setPackagePreguntas(arrayTempPackagePreguntas); // Asignación de conjunto de respuestas al estado packagePreguntas
    stateInitialPreguntas(arrayTempPackagePreguntas);

  }

  const stateInitialPreguntas = (arrayTempPackagePreguntas) => {
    let mapPackagePreguntas = []
    let lengthPreguntas = arrayTempPackagePreguntas[0].data[0].texto.length;

    for (let i = 0; i < lengthPreguntas; i++) {
      mapPackagePreguntas.push(arrayTempPackagePreguntas[0].data[0].texto[i])
    }

    setPreguntasStateInitial(mapPackagePreguntas);
  }

  const handleClickPrueba = () => {
    checkFieldsValidations();
  }

  // Condicional para redireccionar con props en caso de que la generacion sea exitosa (Enviar al siguiente component funcional)
  if (!irRevisionPreguntas) {
    return (
      <div
        className="flex container w-screen h-screen font-manrope"
        style={{
          backgroundImage: `url(${backgroundGeneral})`,
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
        <div className="container xl:mx-32 mx-4 md:mx-8 lg:mx-16 mt-8">
          <div className="grid grid-rows space-y-8 mb-8">
            <h1 className="font-bold xl:text-5xl md:text-4xl sm:text-3xl text-xl">
              Revisión de textos
            </h1>
            <p className="text-gray-500 font-semibold text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              ultricies lacus, vel porta libero. Nulla posuere erat sed quam
              dictum, eget ultrices ligula egestas. Sed non tortor non dui
              malesuada faucibus non at est. Mauris sodales sem mi.
            </p>
          </div>

          <div className="container">
            <div className="grid grid-cols-12">
              <div className="col-span-2 sm:col-span-3">
                <div className="flex ">
                  <CustomScrollbars autoHide autoHideTimeout={900} autoHideDuration={400} style={{ height: "50vh" }} className="m-0 overflow-auto bg-white border shadow-md border-gray-200 sm:rounded-md rounded-r-none w-full lg:mr-16 md:mr-8 mr-0 md:text-base text-sm">
                    <ul className="divide-y divide-gray-300">
                      <li className="p-4 font-light text-gray-500">
                        <p className="hidden sm:block">PAQUETES DE TEXTOS</p>
                        <p className="sm:hidden block">T</p>
                      </li>

                      {
                        Textos.map(texto => (
                          <li
                            key={texto.id}
                            id={texto.id}
                            onClick={onClickTextoList}
                            className="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                            <p id={texto.id} className="hidden sm:block">Texto {texto.id}</p>
                            <p id={texto.id} className="sm:hidden block">{texto.id}</p>
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
                        //className="md:text-base text-sm z-10 pl-1 sm:w-52 w-44 block focus:outline-none bg-green-400 hover:bg-green-500 focus:bg-green-500 text-black rounded-lg px-2 py-2 font-semibold"
                        className="md:text-base text-sm z-10 pl-1 sm:w-52 w-44 block focus:outline-none bg-gray-200 text-gray-400 rounded-lg px-2 py-2 font-normal"
                      >
                        Volver a generar
                      </button>
                    </div>
                  </div>
                  <textarea
                    placeholder=""
                    className="h-full resize-none focus:border-gray-400 p-2 m-1 bg-transparent text-gray-600 text-sm md:text-base "
                    value={TextArea}
                    onChange={handleTextArea}
                  >
                  </textarea>
                  <hr></hr>
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
                  onClick={handleClickPrueba}
                >
                  Pruebas
                      </button>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="md:text-base text-sm z-10 pl-1 w-52 block focus:outline-none bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500 text-black rounded-lg px-2 py-2 font-semibold"
                  onClick={handleClick}
                >
                  Generar preguntas
                      </button>
              </div>
            </div>
          </div>

          {/* Stepper progress bar */}
          <StepsProgress active={2} />

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
        <DropdownUser />  {/* Elemento menú del usuario */}
      </div>
    );
  } else if (irRevisionPreguntas) {
    return (
      <RevisionPreguntas packagePreguntas={packagePreguntas} preguntas={preguntasStateInitial} textos={Textos} />
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