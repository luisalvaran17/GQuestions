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

export const RevisionTextos = (props) => {
  // ********************** API de prueba *********************** //
  // https://run.mocky.io/v3/5f20f0b6-6152-4437-9817-8089fd64737f//
  //  ************************************************************//

  const url = "https://run.mocky.io/v3/5f20f0b6-6152-4437-9817-8089fd64737f";  // API PREGUNTAS fake
  const divRefErrorMessage = React.createRef();
  const [titleTextoRef , setTitleTextoRef ] = useState("Texto 1")
  const Textos = props.textosFromGenerate;

  const [irRevisionPreguntas, setIrRevisionPreguntas] = useState(false)

  const [TextoObjeto, setTextoObjeto] = useState({
    id_texto: "",
    cuerpo_texto: "",
    es_editado: false,
    es_regenerado: false,
  })

  // Estado utilizado para llaves foraneas de relacion Generacion - Texto
  const [TextoGeneracionRelacion, setTextoGeneracionRelacion] = useState({
    generacion: props.UUID,
    generacion_texto: "",
  })


  const [TextArea, setTextArea] = useState(Textos[0].cuerpo)
  const [ValTemp, setValTemp] = useState("1")


  const handleClickPrueba = async () => {
    console.log(props.textosFromGenerate);
    console.log(props.UUID);
  }

  useEffect(() => {
    //setTextArea(Textos[0].cuerpo)
  }, []);

  // Llamada a la Api para insertar los datos en la base de datos
  const setTextosDatabase = () => {

    Textos.map(texto => {   // Recorre cada texto y manda uno por uno a un POST con los campos necesarios
      setTextoObjeto(
        Object.assign(TextoObjeto, {
          id_texto: texto.id,
          cuerpo_texto: texto.cuerpo,
          es_editado: texto.es_editado,
          es_regenerado: texto.es_regenerado
        })
      )
      CreateTextsAPI(TextoObjeto); // POST a la tabla GeneracionTexto
      return true;
    })
  }

  // Llamada a la Api para insertar los datos como relación en la base de datos
  const setTextosIntermediaDatabase = () => {

    Textos.map(texto => {   // Recorre cada texto y manda uno por uno a un POST con los campos necesarios
      setTextoGeneracionRelacion(
        Object.assign(TextoGeneracionRelacion, {
          //generacion: UUID, // No necesario porque ya es asignado en el estado inicial del Hook 
          generacion_texto: texto.id,
        })
      )
      CreateTextsRelacionAPI(TextoGeneracionRelacion); // POST a la tabla intermedia Generacion_GeneracionTexto
      return true;
    })
  }

  const handleClick = () => {
    setTextosDatabase();
    setTextosIntermediaDatabase();
    setIrRevisionPreguntas(true);

    // Todo: Traer bool true or false si se efectuan todos los POST CORRECTAMENTE
    /* const boolTextos = setTextosDatabase();
    const boolTextosIntermedia = setTextosIntermediaDatabase();

    if (boolTextos && boolTextosIntermedia) setIrRevisionPreguntas(true) */
  }

  const handleTextArea = (e) => {
    let value = e.target.value;
    setTextArea(value);
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
    console.log(Textos)
    console.log(ValTemp)
  }

  const onClickTexto = (e) => {
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

  const addClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.add("hidden");
  };

  /*   const removeClassdivRefErrorMessage = () => {
      divRefErrorMessage.current.classList.remove("hidden");
    }; */

  // CONDICIONAL PARA REDIRECCIONAR CON PROPS EN CASO DE QUE LA GENERACIÓN SEA EXITOSA (ENVIAR A SIGUIENTE COMPONENT FUNCTIONAL)
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
                <CustomScrollbars autoHide autoHideTimeout={900} autoHideDuration={400} style={{height:"50vh"}} className="m-0 overflow-auto bg-white border shadow-md border-gray-200 sm:rounded-md rounded-r-none w-full lg:mr-16 md:mr-8 mr-4 md:text-base text-sm">
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
                            onClick={onClickTexto}
                            className="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                            <p id={texto.id} className="hidden sm:block">Texto {texto.id}</p>
                            <p id={texto.id} className="sm:hidden block">1</p>
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
                    <h3 className="hidden sm:block col-span-6 font-bold text-base text-green-700">
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
                  {/*                   <div className="flex md:flex-row flex-col gap-y-2 md:gap-x-16 box__title bg-grey-lighter px-3  py-2 items-center self-center">
                    <div className="">
                      <button
                        type="submit"
                        className="text-base z-10 pl-1 block w-52 focus:outline-none bg-blue-200 hover:bg-blue-300 focus:bg-blue-300 text-black rounded-lg px-2 py-2 font-semibold"
                        onClick={this.handleClick}
                      >
                        Editar
                      </button>
                    </div>
                    <div className="">
                      <button
                        type="submit"
                        className="text-base z-10 pl-1 w-52 block focus:outline-none bg-blue-200 hover:bg-blue-300 focus:bg-blue-300 text-black rounded-lg px-2 py-2 font-semibold"
                        onClick={this.handleClick}
                      >
                        Volver a generar
                      </button>
                    </div>
                  </div> */}
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
        <DropdownUser />
      </div>
    );
  } else if (irRevisionPreguntas) {
    return(
      <RevisionPreguntas />
    );
  }
}

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