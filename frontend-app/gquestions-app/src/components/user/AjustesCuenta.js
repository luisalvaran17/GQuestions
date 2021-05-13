import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneralCyanDark from "../../assets/images/background-general-cyan_dark.png";
import backgroundGeneralCyanLight from "../../assets/images/background-general-cyan_light.png"
import { Helmet } from "react-helmet";
import AOS from "aos";
import { DropdownUser } from "./DropdownUser";
import { UpdateInfoPerfilUserAPI } from "../../api/Usuario/UpdateInfoPerfilUserAPI";
import { GetUserAPI } from "../../api/Usuario/GetUserAPI";

export const AjustesCuenta = () => {

  const divRefErrorMessage = React.createRef();
  const divRefSuccessMessage = useRef();
  const [pestaña, setpestaña] = useState("tab_perfil");

  // State button edit
  const [disableEditInfo, setDisableEditInfo] = useState(true);

  // data user
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [fechaNac, setFechaNac] = useState("")
  const [email, setEmail] = useState("")

  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  const [informacionPerfil, setInformacionPerfil] = useState({
    first_name: '',
    last_name: '',
    fecha_nac: ''
  })

  useEffect(() => {
    AOS.init({
      duration: 400,
    })

    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }
    getUser();
  }, []);

  const getUser = async () => {
    const id_user = localStorage.getItem('id_user');
    const users = await GetUserAPI(id_user);
    const user = users.users;
    
    user.map(item => {
      setFirstName(item.first_name);
      setLastName(item.last_name);
      setFechaNac(item.fecha_nac);
      setEmail(item.email);
      return true;
    })
  }

  const addClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.add("hidden");
  };

  /*   const removeClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.remove("hidden");
  }; */

  const addClassdivRefSuccessMessage = () => {
    divRefSuccessMessage.current.classList.add("hidden");
  };

  const removeClassdivRefSuccessMessage = () => {
    divRefSuccessMessage.current.classList.remove("hidden");
  };

  const clickOnContrasena = () => {
    setpestaña("tab_contrasena");
  }
  const clickOnPerfil = () => {
    setpestaña("tab_perfil");
  }
  const clickOnInfoAdicional = () => {
    setpestaña("tab_info_adicional");
  }

  const onChangeInfoPerfil = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInformacionPerfil(
      Object.assign(informacionPerfil, {
        [name]: value,
      })
    )
  }

  const handleClickUpdatePerfil = async () => {
    const id_user = localStorage.getItem('id_user');
    const response = await UpdateInfoPerfilUserAPI(id_user, informacionPerfil);

    if (response) {
      setDisableEditInfo(true);
      removeClassdivRefSuccessMessage();
    }
  }

  const handleClickEdit = () => {
    if (disableEditInfo) setDisableEditInfo(false);
    if (!disableEditInfo) setDisableEditInfo(true);
  }

  if (pestaña === "tab_perfil") {
    return (
      <div
        ref={darkModeRef}
        className="flex container w-screen h-screen font-manrope"
        style={{
          backgroundImage: `url(${darkModeBool ? backgroundGeneralCyanDark : backgroundGeneralCyanLight})`,
          width: "100%",
          height: "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "",
          minWidth: "100%",
        }}
      >

        <Helmet>
          <title>Ajustes de cuenta - GQuestions</title>
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

            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left mb-12 lg:mb-10 text-2xl dark:text-white">
              Ajustes de cuenta
            </h1>


            {/* Nav bar Tab */}
            <ul className="flex border-b flex-col sm:flex-row">
              <li className="-mb-px mr-1 ">
                <button className="bg-white w-full dark:bg-darkColor focus:outline-none outline-none inline-block border-l border-t border-r rounded-t py-2 px-4 text-yellowmain font-semibold"
                  onClick={clickOnPerfil}
                >Perfil</button>
              </li>
              <li className="mr-1">
                <button className="bg-white w-full dark:bg-darkColor inline-block focus:outline-none outline-none py-2 px-4 text-gray-500 hover:text-yellowmain font-semibold"
                  onClick={clickOnContrasena}>Contraseña</button>
              </li>
              <li className="mr-1">
                <button className="bg-white w-full dark:bg-darkColor inline-block focus:outline-none outline-none py-2 px-4 text-gray-500 hover:text-yellowmain font-semibold"
                  onClick={clickOnInfoAdicional}>Información adicional</button>
              </li>
            </ul>

            <div className="grid grid-cols-12 md:gap-x-16">
              {/* Información personal */}
              <div className="xl:col-span-6 lg:col-span-7 sm:col-span-10 col-span-12 mt-10">
                <div className="sm:p-6 p-2 bg-white dark:bg-darkColor border dark:border-gray-500 rounded-lg shadow-md">

                  {/* Nombre y fecha de nacimiento */}
                  <div className="sm:ml-6 ml-2 pt-1">
                    <div className="grid grid-cols-12">
                      <h4 className="col-span-9 sm:col-span-11 sm:text-xl text-lg text-gray-900 dark:text-gray-100 leading-tight">Información personal</h4>

                      <div className="sm:col-span-1 col-span-3">
                        <button
                          type="submit"
                          className="transition duration-500 hover:bg-yellowlight hover:bg-opacity-40 rounded-full w-12 h-12 focus:outline-none dark:text-yellowlight"
                          onClick={handleClickEdit}
                        >
                          <span className="material-icons-outlined">&#xe3c9;</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-rows-2 grid-cols-1 md:flex -mx-3 mt-4">
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
                        >
                          Nombres
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="hidden sm:block mdi mdi-account-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            className={
                              disableEditInfo
                                ? "bg-gray-200 text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                : "bg-white text-gray-900 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"}
                            defaultValue={firstName}
                            onChange={onChangeInfoPerfil}
                            name="first_name"
                            disabled={disableEditInfo}
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
                        >
                          Apellidos
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            id="apellidos"
                            className={
                              disableEditInfo
                                ? "bg-gray-200 text-gray-500 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                : "bg-white text-gray-900 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                            }
                            disabled={disableEditInfo}
                            onChange={onChangeInfoPerfil}
                            name="last_name"
                            defaultValue={lastName}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-rows-2 grid-cols-1 md:flex -mx-3 ">
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
                        >
                          Fecha nacimiento
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="hidden sm:block mdi mdi-account-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="date"
                            className={
                              disableEditInfo
                                ? "bg-gray-200 text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                : "bg-white text-gray-900 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                            }
                            defaultValue={fechaNac}
                            onChange={onChangeInfoPerfil}
                            name="fecha_nac"
                            disabled={disableEditInfo}
                          />
                        </div>
                      </div>
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
                        >
                          Correo electrónico
                        </label>
                        <div className="flex">
                          <input
                            type="email"
                            id="email"
                            className="bg-gray-200 text-gray-500 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"

                            name="email"
                            disabled={true}
                            defaultValue={email}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Success message */}
                  <div

                    ref={divRefSuccessMessage}
                    className="hidden animate-pulse px-4 ml-6 mt-2 relative py-1 pl-4 pr-10 leading-normal text-green-700 bg-green-100 rounded-lg"
                    role="alert"
                  >

                    <p>Información actualizada con éxito</p>
                    <span
                      className="absolute inset-y-0 right-0 flex items-center mr-4"
                      onClick={addClassdivRefSuccessMessage}
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

                  {/* Button guardar */}
                  <div className="grid grid-cols-12 sm:ml-6 ml-2 mt-8">

                    <button
                      type="submit"
                      onClick={handleClickUpdatePerfil}
                      disabled={false}
                      className={
                        !disableEditInfo
                          ? "transition duration-500 col-start-0 ml-2 md:col-start-7 md:col-span-6 col-span-12 z-10 px-4 focus:outline-none bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 mb-1 font-semibold"
                          : "pointer-events-none transition duration-500 col-start-0 ml-2 md:col-start-7 md:col-span-6 col-span-12 z-10 px-4 focus:outline-none bg-gray-200 text-gray-600 rounded-lg py-2 mb-1 font-semibold"
                      }

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
  if (pestaña === "tab_contrasena") {
    return (
      <div
        ref={darkModeRef}
        className="flex container w-screen h-screen font-manrope"
        style={{
          backgroundImage: `url(${darkModeBool ? backgroundGeneralCyanDark : backgroundGeneralCyanLight})`,
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

            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left mb-12 lg:mb-10 text-2xl dark:text-white">
              Ajustes de cuenta
          </h1>
            {/* Nav bar Tab */}
            <ul className="flex border-b flex-col sm:flex-row">
              <li className="mr-1">
                <button className="bg-white w-full dark:bg-darkColor inline-block focus:outline-none outline-none py-2 px-4 text-gray-500 hover:text-yellowmain font-semibold"
                  onClick={clickOnPerfil}
                >Perfil</button>
              </li>
              <li className="-mb-px mr-1">
                <button className="bg-white w-full dark:bg-darkColor inline-block focus:outline-none outline-none border-l border-t border-r rounded-t py-2 px-4 
                  text-yellowmain font-semibold"
                  onClick={clickOnContrasena}>Contraseña</button>
              </li>
              <li className="mr-1">
                <button className="bg-white w-full dark:bg-darkColor inline-block focus:outline-none outline-none py-2 px-4 text-gray-500 hover:text-yellowmain font-semibold"
                  onClick={clickOnInfoAdicional}>Información adicional</button>
              </li>
            </ul>

            <div className="grid grid-cols-12 md:gap-x-16">
              {/* Contraseña */}
              <div className="xl:col-span-6 lg:col-span-7 sm:col-span-10 col-span-12 mt-10">
                <div className="sm:p-6 p-2 bg-white rounded-lg shadow-md dark:bg-darkColor border dark:border-gray-500">

                  <div className="sm:ml-6 ml-2 pt-1">
                    <div className="grid grid-cols-12">
                      <h4 className="col-span-9 sm:col-span-11 sm:text-xl text-lg text-gray-900 dark:text-gray-100 leading-tight">Cambiar contraseña</h4>

                      <div className="sm:col-span-1 col-span-3">
                        <button
                          type="submit"
                          className="px-4 focus:outline-none py-2 mb-1 dark:text-yellowlight"
                          onClick={handleClickEdit}
                        >
                          <span className="material-icons-outlined mr-2">&#xe3c9;</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-rows-2 grid-cols-1 md:flex -mx-3 mt-4">
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
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
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
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
                      className="text-xs font-semibold px-1 text-gray-500 dark:text-gray-300 self-end py-2"
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
                      className="transition duration-500 col-start-0 md:col-start-7 md:col-span-6 col-span-12 z-10 px-4 focus:outline-none
                      bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 mb-1 font-semibold"
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
  /* Vista pestaña de Info Adicional */
  /* *************************** */
  /* *************************** */
  if (pestaña === "tab_info_adicional") {
    return (
      <div
        ref={darkModeRef}
        className="flex container w-screen h-screen font-manrope"
        style={{
          backgroundImage: `url(${darkModeBool ? backgroundGeneralCyanDark : backgroundGeneralCyanLight})`,
          width: "100%",
          height: "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "",
          minWidth: "100%",
        }}
      >
        <Helmet>
          <title>Ajustes de cuenta - GQuestions</title>
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

            <h1 className="font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left mb-12 lg:mb-10 text-2xl dark:text-white">
              Ajustes de cuenta
            </h1>

            {/* Nav bar Tab */}
            <ul className="flex border-b flex-col sm:flex-row">
              <li className="mr-1">
                <button className="bg-white w-full dark:bg-darkColor inline-block focus:outline-none outline-none py-2 px-4 text-gray-500 hover:text-yellowmain font-semibold"
                  onClick={clickOnPerfil}
                >Perfil</button>
              </li>
              <li className="mr-1">
                <button className="bg-white w-full dark:bg-darkColor inline-block focus:outline-none outline-none py-2 px-4 text-gray-500 hover:text-yellowmain font-semibold"
                  onClick={clickOnContrasena}
                >Contraseña</button>
              </li>
              <li className="-mb-px mr-1">
                <button className="bg-white w-full dark:bg-darkColor inline-block focus:outline-none outline-none border-l border-t border-r rounded-t py-2 px-4 
                  text-yellowmain font-semibold"
                  onClick={clickOnInfoAdicional}>Información adicional</button>
              </li>

            </ul>



            <div className="grid grid-cols-12 md:gap-x-16">
              {/* Organización */}
              <div className="xl:col-span-6 lg:col-span-7 sm:col-span-10 col-span-12 mt-10">
                <div className="sm:p-6 p-2 bg-white rounded-lg shadow-md dark:bg-darkColor border dark:border-gray-500">

                  <div className="sm:ml-6 ml-2 pt-1">
                    <div className="grid grid-cols-12">
                      <h4 className="col-span-9 sm:col-span-11 sm:text-xl text-lg text-gray-900 dark:text-gray-100 leading-tight">Información adicional</h4>

                      <div className="sm:col-span-1 col-span-3">
                        <button
                          type="submit"
                          className="px-4 focus:outline-none py-2 mb-1 dark:text-yellowlight"
                          onClick={handleClickEdit}
                        >
                          <span className="material-icons-outlined mr-2">&#xe3c9;</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-rows-2 grid-cols-1 md:flex -mx-3 mt-4">
                      <div className="md:w-1/2 px-3 mb-3">
                        <label
                          htmlFor=""
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
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
                          className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
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
                            onChange={handleClickEdit}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tipo de cuenta */}
                  <div className="sm:ml-6 ml-2">
                    <label
                      htmlFor=""
                      className="text-xs font-semibold px-1 text-gray-500 dark:text-gray-300 self-end py-2"
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
                      className="transition duration-500 col-start-0 md:col-start-7 md:col-span-6 col-span-12 z-10 px-4 focus:outline-none
                      bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 mb-1 font-semibold"
                      onClick={handleClickEdit}
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