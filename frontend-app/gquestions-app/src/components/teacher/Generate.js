import React from "react";
import ReactDOM from 'react-dom'
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneral from "../../assets/images/background-general_4x.png";
import AOS from "aos";

class Generate extends React.Component {
  constructor(props) {
    super(props);
    const { v4: uuidv4 } = require("uuid");
    const UUID = uuidv4();
    this.divRefErrorMessage = React.createRef();


    this.state = {
      generacionConfiguracion: {
        id: UUID,
        n_examenes: 10,
        cantidad_textos: 10,
        longit_texto: 200,
        n_preguntas: 0,
        inicio_oracion: "Aleatorio",
      },
      generacionTipoPregunta: {
        pregunta_abierta: true,
        opcion_multiple: true,
        completacion: false,
        generacion: UUID,
      },
      generacionUsuario: {
        generacion: UUID,
        account: 0,
      },
      token: "",
      first: false,
      second: false,
      third: false,
    };
    this.handleInputChangeTiposPregunta = this.handleInputChangeTiposPregunta.bind(
      this
    );
    //console.log(this.state.generacionConfiguracion.id);
  }

  handleClick = async () => {
    
    this.setState(
      Object.assign(this.state.generacionUsuario, {
        account: localStorage.getItem('id_user')
      })
    );

    if (this.checkFieldsValidations() === true) {
      await fetch("http://127.0.0.1:8000/api/generacion/configuracion/", {
        method: "POST",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.generacionConfiguracion),
      });
      await fetch("http://127.0.0.1:8000/api/generacion/tipo-pregunta/", {
        method: "POST",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.generacionTipoPregunta),
      });

      await fetch("http://127.0.0.1:8000/api/generacion/generacion-usuario/", {
        method: "POST",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.generacionUsuario),
      });
    }
  };

  handleChangeConfiguracion = (e) => {
    const generacion_configuracion = this.state.generacionConfiguracion;
    generacion_configuracion[e.target.name] = parseInt(e.target.value);
    this.setState({ generacionConfiguracion: generacion_configuracion });

    console.log(this.state.generacionConfiguracion);
    /* console.log(this.state.generacionTipoPregunta);
    console.log(this.state.generacionUsuario);  */
    //console.log(e.target.value);
  };

  handleChangeInicioOracion = (e) => {
    e.target.name = e.target.value;
    this.setState(
      Object.assign(this.state.generacionConfiguracion, {
        inicio_oracion: e.target.value,
      })
    );
  }

  handleInputChangeTiposPregunta(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      Object.assign(this.state.generacionTipoPregunta, {
        [name]: value,
      })
    );
    console.log(this.state.generacionTipoPregunta);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log('submitted');
  };

  checkFieldsValidations = () => {
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
      this.state.generacionConfiguracion.n_examenes === 0 ||
      this.state.generacionConfiguracion.cantidad_textos === 0 ||
      this.state.generacionConfiguracion.longit_texto === 0 ||
      this.state.generacionConfiguracion.n_preguntas === 0
    ) {
      console.log("Hay campos con valores en cero");
      boolZero = true;
      p_zero = React.createElement('p', {}, '●  Hay campos con valores en cero');

    }
    if (this.state.generacionConfiguracion.cantidad_textos < this.state.generacionConfiguracion.n_examenes) {
      boolTextosMenor = true;
      p_textosMenor = React.createElement('p', {}, '●  La cantidad de textos debe ser mayor o igual a la cantidad de exámenes');
    }
    if (this.state.generacionConfiguracion.longit_texto < 200) {
      boolLongTexto = true;
      p_longTexto = React.createElement('p', {}, '●  La longitud del texto debe ser mayor a 200 carácteres');
      console.log("longitud menor a 200")
    }
    if (this.state.generacionConfiguracion.n_preguntas > 10) {
      boolCantidadPreguntas = true;
      p_cantidadPreguntas = React.createElement('p', {}, '●  La cantidad de preguntas no debe exceder 10');
      console.log("longitud menor a 200")
    }
    if(this.state.generacionTipoPregunta.pregunta_abierta === false &&
      this.state.generacionTipoPregunta.completacion === false &&
      this.state.generacionTipoPregunta.opcion_multiple === false){
        boolTipoPregunta = true;
        p_tiposPreguntas = React.createElement('p', {}, '●  Debe seleccionar al menos un tipo de pregunta');
    }
    if(boolZero || boolCantidadPreguntas || boolLongTexto || boolTextosMenor || boolTipoPregunta){
      this.removeClassdivRefErrorMessage();
      const X = React.createElement('div', {}, [p_zero, p_textosMenor, p_longTexto, p_cantidadPreguntas, p_tiposPreguntas]);
      ReactDOM.render(X, document.getElementById('error_messages'));
      return false;
    }
    else {
      return true;
    }
  };

  addClassdivRefErrorMessage = () => {
    this.divRefErrorMessage.current.classList.add("hidden");
  };

  removeClassdivRefErrorMessage = () => {
    this.divRefErrorMessage.current.classList.remove("hidden");
  };

  render() {
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



        <div  data-aos="fade-right" className="container md:mx-auto mx-10 mt-8">
          <div className="grid grid-rows">
            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left mb-12 lg:mb-20 text-2xl">
              Parámetros de generación
            </h1>
            <div className="grid grid-cols-12 sm:mb-44 mb-0">
              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
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
                  onChange={this.handleChangeConfiguracion}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
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
                  onChange={this.handleChangeConfiguracion}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
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
                  onChange={this.handleChangeConfiguracion}
                />
              </div>
            </div>

            <div className="grid grid-cols-12">
              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
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
                  onChange={this.handleChangeConfiguracion}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
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
                  onChange={this.handleChangeInicioOracion}
                >
                  <option>Aleatorio</option>
                  <option>Personalizado</option>
                  <option>Completo</option>
                </select>
              </div>
            </div>

            <form>
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
                          onChange={this.handleInputChangeTiposPregunta}
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
                          onChange={this.handleInputChangeTiposPregunta}
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
                          onChange={this.handleInputChangeTiposPregunta}
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
                onClick={this.handleClick}
              >
                Generar textos
              </button>
            </div>
          </div>


          {/* Error messages */}
          <div

            ref={this.divRefErrorMessage}
            className="hidden animate-pulse mt-1 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            <div id="error_messages" className="text-sm md:text-base">
            </div>

            <span
              className="absolute inset-y-0 right-0 flex items-center mr-4"
              onClick={this.addClassdivRefErrorMessage}
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
      </div>
    );
  }
  componentDidMount() {
    AOS.init({
      duration: 400,
    });
  }
}

export default Generate;
