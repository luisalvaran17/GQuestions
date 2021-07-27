import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/tailwind.css";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import ReactDOM from 'react-dom';
import { RegisterWithGoogle } from "../components/login/RegisterWithGoogle";
import GoogleRegister from "react-google-login";
import { ModalRegister } from "../components/login/ModalRegister";
import AOS from "aos";
import "aos/dist/aos.css";
import imageStudent from "../assets/images/image-register.png";
import { LoginAPI } from "../api/Usuario/LoginAPI";
import { RegisterUserAPI } from "../api/Usuario/RegisterUserAPI";
import { GetToken } from "../api/Usuario/GetToken";
import { GetDataUser } from "../api/Usuario/GetDataUser";
import backgroundGeneralCyanDark from "../assets/images/background-general-cyan_dark.png";
import backgroundGeneralCyanLight from "../assets/images/background-general-cyan_light.png";
import { BASE_DIR } from "../api/BaseDirURl";

/* CITAR FREEPIK
<a href='https://www.freepik.com/vectors/banner'>Banner vector created by upklyak - www.freepik.com</a>
*/
export const Register = () => {

  const divRefErrorMessage = React.createRef();

  const [isLoading, setIsLoading] = useState(true);

  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  // Hooks
  const [_isMounted, set_isMounted] = useState(false);
  const [usuario, setusuario] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    rol: "Docente", // por defecto
    fecha_nac: null,
    edad: null,
  });
  const [confirmation_pass, setconfirmation_pass] = useState({
    password2: "",
  });
  const [redirect, setredirect] = useState(false);
  const [response, setresponse] = useState(null);
  const [modalShow, setmodalShow] = useState(false);
  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  useEffect(() => {
    AOS.init({
      duration: 800,
    });

    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }
    setIsLoading(false);
    set_isMounted(true);

    // componentwillunmount
    return () => {
      set_isMounted(false);
    }
  }, []);

  // Método llamado al presionar el botón de Register (API)
  const handleClickRegister = async () => {
    let response = false;

    // verifica las diferentes validaciones de los inputs
    if (checkFieldsValidations() === true) {
      setIsLoading(true);
      // Verifica si el usuario existe para mostrar un modal o no
      await fetch(
        BASE_DIR + "api/exist-user/" + usuario.email,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then((data) => {
        if (_isMounted) {
          if (data.ok === true) {
            response = true;
            setmodalShow(true);
          }
        }
      }).catch((error) => console.error(error));
      // si el usuario no existe entonces procede a hacer el registro si todos los campos cumplen las validaciones
      if (!response) {
        if (_isMounted) {
          const response = await RegisterUserAPI(usuario);
          if (response === true) {
            setcredentials(
              Object.assign(credentials, {
                username: usuario.email,
                password: usuario.password,
              })
            );
            await LoginAPI(credentials);
            localStorage.setItem('token', await GetToken(credentials));
            localStorage.setItem('email', credentials.username);

            const data_user = await GetDataUser(credentials.username);
            localStorage.setItem('name', data_user.first_name);
            localStorage.setItem('id_user', data_user.id);

            // IDS unicos para roles
            /* Docente    ->  72eea687168b8c450afdeefa69c9d478b9ca90bfdcda1efb0029c9352ae4c70d
               Estudiante -> 	3d8388c45fc7f48e40800ff051117af34b204bb4a29098332f504774858e49db
            */
            if (data_user.rol === "Docente") {
              localStorage.setItem('rol', '72eea687168b8c450afdeefa69c9d478b9ca90bfdcda1efb0029c9352ae4c70d');
            } else if (data_user.rol === "Estudiante") {
              localStorage.setItem('rol', '3d8388c45fc7f48e40800ff051117af34b204bb4a29098332f504774858e49db');
            }

            setIsLoading(false);

            if (isLoading === false && data_user.rol === "Docente") {
              history.push("teacher/generacion");
            }
            else if (isLoading === false && data_user.rol === "Estudiante") {
              history.push("student/home");
            }
          }
          else {
            setIsLoading(true); // En caso de que el server no responda o no tenga conexión el usuario
          }
        }
      }
    }
  }

  // Función que registra al usuario con cuenta de google
  const responseGoogle = (response) => {
    fetch(BASE_DIR + "api/exist-user/" + response.profileObj.email, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((data) => {
      if (data.ok === true) {
        // Si el usuario ya está registrado con ese correo entonces muestra un modal informando
        setmodalShow(true);
      } else {
        setredirect(true);
        setresponse(response);
      }
    });
  };

  const handleChange = (e) => {
    const user = usuario;
    user[e.target.name] = e.target.value;
    setusuario(user);
  };

  const handleChangePassword = (e) => {
    const password_confirmation = confirmation_pass;
    password_confirmation[e.target.name] = e.target.value;
    setconfirmation_pass(password_confirmation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Valida que la contraseña sea fuerte
  /*     const strengthPassword = () => {
      let password = usuario.password;
      let strength = 0;
  
      if (password.match(/[a-z]+/)) {
        //strength += 1;
      }
      if (password.match(/[A-Z]+/)) {
        //strength += 1;
      }
      if (password.match(/[0-9]+/)) {
        //strength += 1;
      }
      if (password.match(/[$@#&!]+/)) {
        //strength += 1;
      } 
    }; */

  const checkFieldsValidations = () => {

    let p_empty;
    let p_contrasenas;
    let p_strength_password;

    if (
      usuario.name === "" ||
      usuario.last_name === "" ||
      usuario.first_name === "" ||
      usuario.last_name === "" ||
      usuario.email === "" ||
      usuario.password === "" ||
      usuario.rol === ""
      /* usuario.fecha_nac === "" */
      //usuario.edad: null,

    ) {
      removeClassdivRefErrorMessage();
      p_empty = React.createElement('p', {id:'campos-vacios'}, 'Hay campos vacíos');
      const X = React.createElement('div', {}, [p_empty]);
      ReactDOM.render(X, document.getElementById('error_messages'));
      return false;
    }

    if (usuario.password.length < 6) {
      removeClassdivRefErrorMessage();
      p_strength_password = React.createElement('p', {id:'pass-short'}, 'La contraseña debe tener al menos 6 carácteres');
      const X = React.createElement('div', {}, [p_strength_password]);
      ReactDOM.render(X, document.getElementById('error_messages'));
      return false;
    }

    else if (usuario.password !== confirmation_pass.password2) {
      removeClassdivRefErrorMessage();
      p_contrasenas = React.createElement('p', {id:'pass-no-match'}, 'Las contraseñas no coinciden');
      const X = React.createElement('div', {}, [p_contrasenas]);
      ReactDOM.render(X, document.getElementById('error_messages'));
      return false;
    }

    // AGREGAR VALIDACIÓN DE FECHA DE NACIMIENTO
    else {
      return true;
    }
  };

  const addClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.add("hidden");
  };

  const removeClassdivRefErrorMessage = () => {
    divRefErrorMessage.current.classList.remove("hidden");
  };

  const onClickBackHome = () => {
    history.push("");
  }

  if (redirect === false && modalShow === false) {
    return (
      <div
        ref={darkModeRef} className="xl:px-60 lg:px-32 sm:px-16 px-2 min-h-screen mx-auto font-manrope"
        style={{
          backgroundImage: `url(${darkModeBool ? backgroundGeneralCyanDark : backgroundGeneralCyanLight})`,
          width: "",
          height: "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "",
          minWidth: "",
        }}
      >
        <Helmet>
          <title>Registrarse - GQuestions</title>
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
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"></link>
        </Helmet>

        <div
          data-aos="fade-left"
          className="min-w-screen min-h-screen flex items-center justify-center px-4 sm:px-0 py-4 md:mx-16 lg:mx-4 2xl:mx-52 xl:mx-4 text-xs sm:text-base"
        >

          <div className="border md:mt-0 mt-16 border-gray-300 border-opacity-20 text-sm md:text-md bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden dark:bg-darkColor dark:text-white">

            {/* Button back to home */}
            <div className="">
              <span className="hidden sm:block absolute right-18 md:top-16 top-8 hover:text-white text-base">
                <button
                  className="btn-back"
                  onClick={onClickBackHome}>
                  <span
                    className="material-icons mr-2"
                  >&#xe88a;
                    </span>Inicio
                  </button>
              </span>
            </div>

            <div className="md:flex w-full">
              <div className="hidden lg:block  w-1/2 bg-yellowlight dark:bg-darkGrayColor2 border-r border-opacity-40 border-gray-300">
                <div className="flex items-center mt-32 ">
                  <img className="w-full" src={imageStudent} style={{ width: '1000' }} alt=""></img>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full lg:w-1/2 py-10 px-5 lg:px-10"
              >
                <div className="text-center mb-10">
                  <h1 className="font-black text-2xl md:text-3xl mb-8 text-center text-gray-600 dark:text-gray-200 uppercase">
                    Registrarse
                  </h1>
                </div>
                <div>
                  <div className="grid grid-rows-2 grid-cols-1 md:flex -mx-3 ">
                    <div className="md:w-1/2 px-3 mb-3">
                      <label
                        htmlFor=""
                        className="text-xs font-semibold px-1"
                      >
                        Primer nombre
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="text"
                          id="first_name"
                          className="input-style"
                          name="first_name"
                          placeholder="Ingresa tu nombre"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="md:w-1/2 px-3 mb-3">
                      <label
                        htmlFor=""
                        className="text-xs font-semibold px-1"
                      >
                        Apellido
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="text"
                          id="last_name"
                          className="input-style"
                          name="last_name"
                          placeholder="Ingresa tu apellido"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="-mx-3">
                    <div className="w-full px-3 mb-3">
                      <label
                        htmlFor=""
                        className="text-xs font-semibold px-1 self-end py-2"
                      >
                        Correo electrónico
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="email"
                          id="email"
                          className="input-style"
                          name="email"
                          placeholder="Ingresa tu email"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-rows-2 grid-cols-1 sm:flex -mx-3">
                    <div className="w-full px-3 mb-3">
                      <label
                        htmlFor=""
                        className="text-xs font-semibold px-1 self-end py-2"
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
                          className="input-style"
                          name="password"
                          placeholder="Contraseña"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="w-full px-3 mb-3">
                      <label
                        htmlFor=""
                        className="text-xs font-semibold px-1 self-end py-2"
                      >
                        Confirmar contraseña
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="password"
                          id="password2"
                          className="input-style"
                          name="password2"
                          placeholder="Contraseña"
                          onChange={handleChangePassword}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rol y fecha de nacimiento */}
                  <div className="flex -mx-3">
                    <div className="w-1/2 px-3 mb-3">
                      <label
                        htmlFor=""
                        className="text-xs font-semibold px-1"
                      >
                        Tipo de cuenta
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <select
                          type="text"
                          id="rol"
                          className="input-style"
                          name="rol"
                          defaultValue="Docente"
                          placeholder="Ingresa tu nombre"
                          onChange={handleChange}
                        >
                          <option>Estudiante</option>
                          <option>Docente</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-1/2 px-3 mt-1">
                      <label
                        htmlFor=""
                        className="hidden sm:block text-xs font-semibold px-1"
                      >
                        Fecha nac. (opcional)
                      </label>
                      <label
                        htmlFor=""
                        className="sm:hidden block text-xs font-semibold px-1"
                      >
                        Cumpleaños (opc.)
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input
                          type="date"
                          id="fecha_nacimiento"
                          className="dark:text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                          focus:ring-yellowlight w-full -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow;"
                          placeholder="dd/mm/aaaa"
                          name="fecha_nac"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Button registrarse */}
                  <div className="grid grid-rows-1 text-center items-center">
                    <div className="py-1 col-span-12 my-0">
                      {!isLoading &&
                        <button
                          type="submit"
                          className="btn-primary"
                          onClick={handleClickRegister}
                        >
                          REGISTRARSE
                    </button>
                      }{isLoading &&
                        <button
                          type="submit"
                          className="btn-primary"
                        >
                          <span className="text-white my-0 w-0 h-0">
                            <i className="fas fa-circle-notch fa-spin fa-x"></i>
                          </span>

                        </button>}

                    </div>
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

                  <div className="py-1 col-span-12 my-0 text-center text-sm">
                    <span className="flex items-center justify-center space-x-2">
                      <span className="h-px bg-gray-400 w-14"></span>
                      <span className="font-normal text-gray-500">
                        {" "}
                        Registrar con
                      </span>
                      <span className="h-px bg-gray-400 w-14"></span>
                    </span>
                  </div>
                  <div className="py-1 col-span-12 my-0 text-center">
                    <GoogleRegister
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className="w-full flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-500 border border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-md group hover:bg-gray-800 focus:outline-none"
                        >
                          <span>
                            <i className="fab fa-google mr-2"></i>
                          </span>
                          <span className="text-sm font-medium text-gray-800 group-hover:text-white dark:text-white">
                            Google
                          </span>
                        </button>
                      )}
                      clientId="1016385449655-s27qeebm0kc4lfuedk7o665lhmtd70qp.apps.googleusercontent.com"
                      buttonText="GOOGLE"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                    />
                  </div>
                  <div className="text-center">
                    <label
                      htmlFor=""
                      className="text-xs font-semibold px-1 text-gray-500 py-1"
                    >
                      ¿Ya tienes cuenta?
                    </label>
                    <span>
                      <Link
                        to="/login"
                        className="text-xs font-semibold px-1 text-blue-500 underline"
                      >
                        Iniciar sesión
                      </Link>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (modalShow === true) {
    return (
      <div>
        <Register />
        <ModalRegister />
      </div>
    );
  }
  if (redirect === true) {
    return <RegisterWithGoogle response={response} />;
  }
}