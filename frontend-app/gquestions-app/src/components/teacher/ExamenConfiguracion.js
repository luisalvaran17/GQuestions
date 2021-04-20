import React from "react";
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneral from "../../assets/images/background-general_4x-register.png";
import { DropdownUser } from "../user/DropdownUser";

class ExamenConfiguracion extends React.Component {
  constructor(props) {
    super(props);
    const { v4: uuidv4 } = require("uuid");
    const UUID = uuidv4();
    this.divRefErrorMessage = React.createRef();


    this.state = {
      ExamenConfiguracion: {
        id: UUID,
        fecha_hora_inicio: '',
        fecha_hora_fin: '',
        contrasena_examen: '',
        cod_generacion: '',
        numero_intentos: 1,
      },
      token: "",
    };
  }

  handleClick = async () => {
    if (this.checkFieldsValidations() === true) {
      await fetch("", {
        method: "POST",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.generacionConfiguracion),
      });
    };
  }

    handleChangeConfiguracion = (e) => {
    const examen_configuracion = this.state.ExamenConfiguracion;
    examen_configuracion[e.target.name] = e.target.value;
    this.setState({ ExamenConfiguracion: examen_configuracion });

    console.log(this.state.ExamenConfiguracion);
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  checkFieldsValidations = () => {
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
        <div className="container md:mx-auto mx-10 mt-8">
          <div className="grid grid-rows">
            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left mb-12 lg:mb-20 text-2xl">
              Configuración examen
            </h1>
            <div className="grid grid-cols-12 sm:mb-44 mb-0">
              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2">
                  Fecha y hora de inicio
                </label>
                <input 
                  type="datetime-local"
                  id="fecha_hora_inicio"
                  className="text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  placeholder="dd/mm/aaaa"
                  name="fecha_hora_inicio"
                  onChange={this.handleClick}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2">
                  Fecha y hora de finalización
                </label>
                <input 
                  type="datetime-local"
                  id="fecha_hora_fin"
                  className="text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  placeholder="dd/mm/aaaa"
                  name="fecha_hora_fin"
                  onChange={this.handleClick}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2">
                  Contraseña del examen
                </label>
                <input
                  type="password"
                  id="constrasena_examen"
                  className="grid text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  
                  name="constrasena_examen"
                  placeholder="Contraseña"
                  onChange={this.handleClick}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 mb-44 ">
              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2">
                  Código autogenerado
                </label>
                <input
                  type="text"
                  id="cod_generado"
                  className="grid text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  
                  name="cod_generado"
                  placeholder="12554"
                  onChange={this.handleClick}
                />
              </div>

              <div className="grid sm:col-span-4 col-span-12 mr-8 mb-2">
                <label className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2">
                  Número de intentos
                </label>
                <input
                  type="number"
                  id="numero_intentos"
                  className="grid text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  name="numero_intentos"
                  placeholder="Por defecto 1"
                  onChange={this.handleClick}
                />
              </div>
            </div>

            <div className="py-3 mt-4 w-full">
              <hr></hr>
            </div>
            <div className="grid grid-rows justify-end items-end">
              <button
                type="submit"
                className="z-10 px-4 block focus:outline-none bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 mb-1 font-semibold"
                onClick={this.handleClick}
              >
                Terminar y públicar
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
        <DropdownUser />
      </div>
    );
  }
}

export default ExamenConfiguracion;
