import React, { useEffect, useState } from "react";
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneralCyanLight from "../../assets/images/background-general-cyan_dark.png";
import backgroundGeneralCyanDark from "../../assets/images/background-general-cyan_light.png"
import { Helmet } from "react-helmet";
import AOS from "aos";
import { DropdownUser } from "./DropdownUser";

export const AjustesCuenta = () => {

  const divRefErrorMessage = React.createRef();
  const [pestaña, setpestaña] = useState("tab_perfil")


  const handleClick = async () => {
    /* if (checkFieldsValidations() === true) {
      await fetch("", {
        method: "POST",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.generacionConfiguracion),
      });
    }; */
  }

  const handleChange = () => {
    
  }

  useEffect(() => {
    AOS.init({
      duration: 400,
    })
  }, []);

  const addClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.add("hidden");
  };

/*   const removeClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.remove("hidden");
  }; */

  const clickOnContrasena = () => {
    setpestaña("tab_contrasena");
  }
  const clickOnPerfil = () => {
    setpestaña("tab_perfil");
  }

  if (pestaña === "tab_perfil") {
    return (
      <div
        className="flex container w-screen h-screen font-manrope"
        style={{
          backgroundImage: `url(${backgroundGeneralCyanLight})`,
          width: "100%",
          height: "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "",
          minWidth: "100%",
        }}
      >

        <Helmet>
          <script
            src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"
            defer
          ></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js"></script>
          <script
            src="https://kit.fontawesome.com/51d411da80.js"
            crossorigin="anonymous"
          ></script>
          <style>
            @import
            url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')
              </style>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
            rel="stylesheet"></link>
        </Helmet>

        <div>
          <Navbar className="absolute left-0 bottom-0" />
        </div>
        <div data-aos="" className="container 2xl:mx-auto md:mx-8 mx-4 mt-8 md:text-base text-sm">


          <div className="grid grid-rows">

            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left mb-12 lg:mb-10 text-2xl">
              Ajustes de cuenta
            </h1>


            {/* Nav bar Tab */}
            <ul className="flex border-b">
              <li className="-mb-px mr-1">
                <button className="bg-white focus:outline-none outline-none inline-block border-l border-t border-r rounded-t py-2 px-4 text-yellow-600 font-semibold"
                  onClick={clickOnPerfil}
                >Perfil</button>
              </li>
              <li className="mr-1">
                <button className="bg-white inline-block focus:outline-none outline-none py-2 px-4 text-gray-500 hover:text-yellow-600 font-semibold"
                  onClick={clickOnContrasena}>Contraseña</button>
              </li>

            </ul>

            <div className="grid grid-cols-12 md:gap-x-16">
              {/* Información personal */}
              <div className="md:col-span-6 col-span-12 mt-10">
                <div className="sm:p-6 p-2 bg-white rounded-lg shadow-md">

                  {/* Nombre y fecha de nacimiento */}
                  <div className="sm:ml-6 ml-2 pt-1">
                    <div className="grid grid-cols-12">
                      <h4 className="col-span-9 sm:col-span-11 sm:text-xl text-lg text-gray-900 leading-tight">Información personal</h4>

                      <div className="sm:col-span-1 col-span-3">
                        <button
                          type="submit"
                          className="px-4 focus:outline-none py-2 mb-1"
                          onClick={handleClick}
                        >
                          <span className="material-icons-outlined mr-2">&#xe3c9;</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-rows-2 grid-cols-1 md:flex -mx-3 mt-4">
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2"
                        >
                          Nombre
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="hidden sm:block mdi mdi-account-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            className="text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                            focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                            placeholder="Luis Albarán Vélez"
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2"
                        >
                          Fecha nacimiento
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            id="fecha_hora_inicio"
                            className="text-gray-500 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"

                            name="fecha_hora_inicio"
                            disabled={true}
                            placeholder="1996/08/18"
                            onChange={handleClick}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Correo electrónico */}
                  <div className="sm:ml-6 ml-2">
                    <label
                      htmlFor=""
                      className="text-xs font-semibold px-1 text-gray-500 self-end py-2"
                    >
                      Correo electrónico
                        </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="hidden sm:block mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="email"
                        id="email"
                        className="text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                        focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"

                        placeholder={localStorage.getItem('email')}
                        name="email"
                        disabled={true}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Button guardar */}
                  <div className="grid grid-cols-12 sm:ml-6 ml-2 mt-8">
                    <button
                      type="submit"
                      className="col-start-0 md:col-start-7 md:col-span-6 col-span-12 z-10 px-4 focus:outline-none bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 mb-1 font-semibold"
                      onClick={handleClick}
                    >
                      Guardar
                    </button>
                  </div>

                </div>
              </div>


              {/* Otra información */}
              <div className="md:col-span-6 col-span-12 mt-10">

                <div className="sm:p-6 p-2 bg-white rounded-lg shadow-md">

                  {/* Organización y otro */}
                  <div className="sm:ml-6 ml-2 pt-1">
                    <div className="grid grid-cols-12">
                      <h4 className="col-span-9 sm:col-span-11 sm:text-xl text-lg text-gray-900 leading-tight">Otra información</h4>

                      <div className="sm:col-span-1 col-span-3">
                        <button
                          type="submit"
                          className="px-4 focus:outline-none py-2 mb-1"
                          onClick={handleClick}
                        >
                          <span className="material-icons-outlined mr-2">&#xe3c9;</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-rows-2 grid-cols-1 md:flex -mx-3 mt-4">
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2"
                        >
                          Organización
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="hidden sm:block mdi mdi-domain text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            className="text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                            focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                            placeholder="Ingrese su organización"
                            disabled={true}
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2"
                        >
                          Lipsum
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            className="text-gray-500 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"

                            placeholder="Otro campo"
                            disabled={true}
                            onChange={handleClick}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tipo de cuenta */}
                  <div className="sm:ml-6 ml-2">
                    <label
                      htmlFor=""
                      className="text-xs font-semibold px-1 text-gray-500 self-end py-2"
                    >
                      Tipo de cuenta
                        </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="hidden sm:block mdi mdi-account-outline text-gray-400 text-lg"></i>

                      </div>
                      <input
                        type="text"
                        className="text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                        focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                        placeholder="Docente"
                        disabled={true}
                      //onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Button guardar */}
                  <div className="grid grid-cols-12 sm:ml-6 ml-2 mt-8">
                    <button
                      type="submit"
                      className="col-start-0 md:col-start-7 md:col-span-6 col-span-12 z-10 px-4 focus:outline-none bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 mb-1 font-semibold"
                      onClick={handleClick}
                    >
                      Guardar
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>


          {/* Error messages */}
          <div

            ref={divRefErrorMessage}
            className="hidden mt-20 animate-pulse relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            <div id="error_messages" className="text-sm md:text-base">
              <p>"hidden animate-pulse mt-1 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"</p>
              <p>"hidden animate-pulse mt-1 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"</p>
              <p>"hidden animate-pulse mt-1 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"</p>
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
  }

  /* *************************** */
  /* *************************** */
  /* Vista pestaña de Contraseña */
  /* *************************** */
  /* *************************** */
  if (pestaña) {
    return (
      <div
        className="flex container w-screen h-screen font-manrope"
        style={{
          backgroundImage: `url(${backgroundGeneralCyanLight})`,
          width: "100%",
          height: "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "",
          minWidth: "100%",
        }}
      >
        <Helmet>
          <script
            src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"
            defer
          ></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js"></script>
          <script
            src="https://kit.fontawesome.com/51d411da80.js"
            crossorigin="anonymous"
          ></script>
          <style>
            @import
            url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')
            </style>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
            rel="stylesheet"></link>
        </Helmet>

        <div>
          <Navbar className="fixed" />
        </div>
        <div data-aos="fade-right" className="container 2xl:mx-auto md:mx-8 mx-4 mt-8 md:text-base text-sm">
          <div className="grid grid-rows">

            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left mb-12 lg:mb-10 text-2xl">
              Ajustes de cuenta
          </h1>
            {/* Nav bar Tab */}
            <ul className="flex border-b">
              <li className="mr-1">
                <button className="bg-white inline-block focus:outline-none outline-none py-2 px-4 text-gray-500 hover:text-yellow-600 font-semibold"
                  onClick={clickOnPerfil}
                >Perfil</button>
              </li>
              <li className="-mb-px mr-1">
                <button className="bg-white inline-block focus:outline-none outline-none border-l border-t border-r rounded-t py-2 px-4 
                  text-yellow-600 font-semibold"
                  onClick={clickOnContrasena}>Contraseña</button>
              </li>

            </ul>

            <div className="grid grid-cols-12 md:gap-x-16">
              {/* Contraseña */}
              <div className="md:col-span-6 col-span-12 mt-10">
                <div className="sm:p-6 p-2 bg-white rounded-lg shadow-md">

                  <div className="sm:ml-6 ml-2 pt-1">
                    <div className="grid grid-cols-12">
                      <h4 className="col-span-9 sm:col-span-11 sm:text-xl text-lg text-gray-900 leading-tight">Cambiar contraseña</h4>

                      <div className="sm:col-span-1 col-span-3">
                        <button
                          type="submit"
                          className="px-4 focus:outline-none py-2 mb-1"
                          onClick={handleClick}
                        >
                          <span className="material-icons-outlined mr-2">&#xe3c9;</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-rows-2 grid-cols-1 md:flex -mx-3 mt-4">
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2"
                        >
                          Contraseña actual
                      </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="password"
                            id="password"
                            className="transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 pl-10 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                            name="password"
                            placeholder="* * * * * * * * *"
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 mb-2"
                        >
                          Contraseña nueva
                      </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="password"
                            id="password"
                            className="transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 pl-10 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Confirmar contraseña nueva */}
                  <div className="sm:ml-6 ml-2">
                    <label
                      htmlFor=""
                      className="text-xs font-semibold px-1 text-gray-500 self-end py-2"
                    >
                      Confirmar contraseña nueva
                      </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        id="password"
                        className="transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 pl-10 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                      />
                    </div>
                  </div>

                  {/* Button guardar */}
                  <div className="grid grid-cols-12 sm:ml-6 ml-2 mt-8">
                    <button
                      type="submit"
                      className="col-start-0 md:col-start-7 md:col-span-6 col-span-12 z-10 px-4 focus:outline-none bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 mb-1 font-semibold"
                      onClick={handleClick}
                    >
                      Guardar
                  </button>
                  </div>
                </div>
              </div>
            </div>

          </div>


          {/* Error messages */}
          <div

            ref={divRefErrorMessage}
            className="hidden mt-20 animate-pulse relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            <div id="error_messages" className="text-sm md:text-base">
              <p>"hidden animate-pulse mt-1 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"</p>
              <p>"hidden animate-pulse mt-1 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"</p>
              <p>"hidden animate-pulse mt-1 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"</p>
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
  }
}