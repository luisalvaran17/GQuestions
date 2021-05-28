import React, { useEffect, useRef, useState } from "react";
import "../../../assets/styles/tailwind.css";
import backgroundGeneralCyanDark from "../../../assets/images/background-general-cyan_dark.png";
import backgroundGeneralCyanLight from "../../../assets/images/background-general-cyan_light.png"
import { Helmet } from "react-helmet";
import { CambiarContrasena } from "./CambiarContrasena";
import { InformacionAdicional } from "./InformacionAdicional";
import { InformacionPersonal } from "./InformacionPersonal";
import { NavbarStudent } from "../NavBarStudent";

export const AjustesCuentaStudent = () => {

  const navigation = [
    { name: 'Inicio', href: '#', current: false, id: 0 },
    { name: 'Mis calificaciones', href: '#', current: false, id: 1 },
    /* { name: 'Projects', href: '#', current: false }, */
    { name: 'Ajustes', href: '#', current: false, id: 2 },
  ];

  const [pestaña, setpestaña] = useState("tab_perfil");

  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  useEffect(() => {

    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }
  }, []);


  // navigation tabs
  const clickOnContrasena = () => {
    setpestaña("tab_contrasena");
  }
  const clickOnPerfil = () => {
    setpestaña("tab_perfil");
  }
  const clickOnInfoAdicional = () => {
    setpestaña("tab_info_adicional");
  }

  if (pestaña === "tab_perfil") {
    return (
      <div
        ref={darkModeRef}
        className="container w-screen h-screen font-manrope"
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

        <NavbarStudent navigation={navigation} />
        <div
          className="container mx-auto xl:pl-32 px-4 sm:px-8 py-8 md:px-8 lg:pl-16 sm:mr-32 md:text-base text-sm">

          <div className="grid grid-rows ">

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
                <InformacionPersonal />
              </div>
            </div>
          </div>
        </div>
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
        className="container w-screen h-screen font-manrope"
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

        <NavbarStudent navigation={navigation} />

        <div
          style={{ height: "80vh" }}
          className="container mx-auto xl:pl-32 px-4 sm:px-8 py-8 md:px-8 lg:pl-16 sm:mr-32 md:text-base text-sm">
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
                <CambiarContrasena /> {/* Component */}
              </div>
            </div>

          </div>
        </div>
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
        className="container w-screen h-screen font-manrope"
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

        <NavbarStudent navigation={navigation} />

        <div
          style={{ height: "80vh" }}
          className="container mx-auto xl:pl-32 px-4 sm:px-8 py-8 md:px-8 lg:pl-16 sm:mr-32 md:text-base text-sm">
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
                <InformacionAdicional />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
