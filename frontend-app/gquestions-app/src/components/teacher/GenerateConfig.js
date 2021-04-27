import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneral from "../../assets/images/background-general_4x.png";
import AOS from "aos";
import { DropdownUser } from "../user/DropdownUser";
import { CreateGeneracionConfigAPI } from "../../api/CreateGeneracionConfigAPI";
import { CreateGeneracionTipoPreguntaAPI } from "../../api/CreateGeneracionTipoPreguntaAPI";
import { CreateGeneracionUsuarioAPI } from "../../api/CreateGeneracionUsuarioAPI";
import { StepsProgress } from "./StepsProgress";
import { useHistory } from "react-router";
import { RevisionTextos } from "./RevisionTextos";

export const GenerateConfig = () => {
  const divRefErrorMessage = React.createRef();
  const { v4: uuidv4 } = require("uuid");
  const UUID_GENERATE = uuidv4(); // uuid autogenerado para id de Generacion

  // Hooks
  const history = useHistory();
  const [_isMounted, set_isMounted] = useState(false);
  // Fetch data textos generados en DB
  const [Textos, setTextos] = useState([])
  const [irRevisionTexto, setIrRevisionTexto] = useState(false)

  // ********************** API de prueba *********************** //
  // https://run.mocky.io/v3/d3287804-d069-482d-b770-3156f369a631//
  //  ************************************************************//
  const url = "https://run.mocky.io/v3/d3287804-d069-482d-b770-3156f369a631"; // Endpoint TEXTOS fake


  // Estado utilizado para campos de configuración de Generación de textos
  const [generacionConfiguracion, setgeneracionConfiguracion] = useState({
    id: UUID_GENERATE,
    n_examenes: 10,
    cantidad_textos: 10,
    longit_texto: 200,
    n_preguntas: 0,
    inicio_oracion: "Aleatorio",
  });

  // Estado utilizado para campos de configuración de tipo de preguntas en Generación de textos
  const [generacionTipoPregunta, setgeneracionTipoPregunta] = useState({
    pregunta_abierta: true,
    opcion_multiple: true,
    completacion: false,
    generacion: UUID_GENERATE,
  });

  // Estado utilizado para llaves foraneas de relacion Generacion - Usuario
  const [generacionUsuario, setgeneracionUsuario] = useState({
    generacion: UUID_GENERATE,
    account: 0,
  });

  useEffect(() => {
    getTextos();  // Obtiene los textos desde el endpoint (url)
    AOS.init({
      duration: 800,
    })
    set_isMounted(true);

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

  // Función al presionar el botón "Generar textos", esta función hace los POST  a tres tablas
  // (Generacion, GeneracionTipoPregunta y GeneracionUsuario), además llama a dos funciones que,
  // inserta los textos generados y la relación entre la Generación y estos Textos
  const handleClick = async () => {
    setgeneracionUsuario(
      Object.assign(generacionUsuario, {
        account: localStorage.getItem("id_user")
      })
    );

    if (checkFieldsValidations() === true) {    // Si todos los campos cumplen las validaciones entonces hace los POST

      if (_isMounted) {
        const responseGeneracionConfig = await CreateGeneracionConfigAPI(generacionConfiguracion);   // POST a Generacion

        const responseGeneracionTipoPregunta = await CreateGeneracionTipoPreguntaAPI(generacionTipoPregunta);    // POST a GeneracionTipoPregunta

        const responseGeneracionUsuario = await CreateGeneracionUsuarioAPI(generacionUsuario);    // POST a GeneracionUsuario

        if (responseGeneracionConfig && responseGeneracionTipoPregunta && responseGeneracionUsuario) {    // Si todas las peticiones son ok
          // Llamado a función que inserta los textos en la DB DJANGO

          //history.push("/teacher/revision-textos");
          setIrRevisionTexto(true);
          /* return(
            <RevisionTextos props={Textos,UUID_GENERATE} />
          ) */
          /* history.push({
            pathname: '/teacher/revision-textos',
            //search: '?query=abc',
            state: { textosFromGenerate: Textos, UUID_GENERATE: generacionConfiguracion.id }
          }) */
        }
        else {
          console.log("Ha occurido un error");
          history.push("/teacher/home")
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
    setgeneracionConfiguracion(generacion_configuracion);
  }

  const handleChangeInicioOracion = (e) => {
    e.target.name = e.target.value;
    setgeneracionConfiguracion(
      Object.assign(generacionConfiguracion, {
        inicio_oracion: e.target.value
      })
    );
  }

  const handleInputChangeTiposPregunta = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setgeneracionTipoPregunta(
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


  // CONDICIONAL PARA REDIRECCIONAR CON PROPS EN CASO DE QUE LA GENERACIÓN SEA EXITOSA (ENVIAR A SIGUIENTE COMPONENT FUNCTIONAL)
  if (!irRevisionTexto) {
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
        <div>
          <Navbar className="fixed" />
        </div>

        <div data-aos="fade-right" className="container xl:mx-32 mx-4 md:mx-8 lg:mx-16 mt-8">
          <div className="grid grid-rows">
            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left mb-12 lg:mb-20 text-2xl">
              Parámetros de generación
            </h1>
            <div className="grid grid-cols-12 sm:mb-44 mb-0">
              <div className="grid sm:col-span-4 col-span-12 sm:mr-8 mr-0 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2">
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
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2">
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
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2">
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
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2">
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
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2">
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
                  className="sm:mx-0 pt-8 sm:pt-10 text-xs font-semibold px-1 text-gray-500 self-end py-2"
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
                        <span className="ml-2 text-gray-700">
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
                        <span className="ml-2 text-gray-700">
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
                        <span className="ml-2 text-gray-700">Completación</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <div className="py-3 mt-4 w-full">
              <p className="text-sm text-gray-600 my-1">
                Tiempo de generación apróximado: 120s{" "}
              </p>
              <div className="bg-gray-300 w-full mb-4 h-1">
                <div className="bg-yellowmain w-4/6 h-full"></div>
              </div>
            </div>
            <div className="grid grid-rows justify-end items-end">
              <button
                type="submit"
                className="z-10 px-4 block focus:outline-none bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 mb-1 font-semibold"
                onClick={handleClick}
              >
                Generar textos
              </button>
            </div>


            <StepsProgress active={1} />
          </div>

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
  } else if (irRevisionTexto) {
    return(
      <RevisionTextos textosFromGenerate={Textos} UUID_GENERATE={generacionConfiguracion.id} />
    )
  }
}
