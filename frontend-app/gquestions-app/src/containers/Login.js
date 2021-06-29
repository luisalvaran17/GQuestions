import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import backgroundGeneralYellowDark from "../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../assets/images/background-general-yellow_light.png";
import imageStudent from "../assets/images/image-register.png";
import { LoginAPI } from "../api/Usuario/LoginAPI";
import { GetDataUser } from "../api/Usuario/GetDataUser";
import { GetToken } from "../api/Usuario/GetToken";
import ReactDOM from 'react-dom';

export const Login = () => {

  const divRefErrorMessage = React.createRef();

  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  const [isLoading, setIsLoading] = useState(true);

  // Hooks
  const [_isMounted, set_isMounted] = useState(false);

  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  // Método llamado al presionar el botón de Login (API)
  const handleClickLogin = async () => {
    
    if (checkInputsEmpty() === true) {
      // Obtiene el token y lo guarda en el estado
      // Redirecciona al home sí el usuario existe y es correcto
      if (_isMounted) {
        const response = await LoginAPI(credentials);
        
        if (response === true) {
          setIsLoading(true);
          localStorage.setItem('token', await GetToken(credentials));
          localStorage.setItem('email', credentials.username);
          const data_user = await GetDataUser(credentials.username);
          localStorage.setItem('id_user', data_user.id);
          localStorage.setItem('name', data_user.first_name);

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
        else if (response === false) {
          checkCredencialesIncorrectas();
        }
      }
    }
  }

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
    return () => {
      set_isMounted(false);
    }
  }, []);

  const checkCredencialesIncorrectas = () => {
    let p_credenciales_incorrectas;
    removeClassdivRefErrorMessage();
    p_credenciales_incorrectas = React.createElement('p', {}, 'Credenciales incorrectos');
    const X = React.createElement('div', {}, [p_credenciales_incorrectas]);
    ReactDOM.render(X, document.getElementById('error_messages'));
    return false;
  }

  const checkInputsEmpty = () => {

    let p_empty;

    if (credentials.username === "" || credentials.password === "") {
      removeClassdivRefErrorMessage();
      p_empty = React.createElement('p', {}, 'Hay campos vacíos');
      const X = React.createElement('div', {}, [p_empty]);
      ReactDOM.render(X, document.getElementById('error_messages'));
      return false;
    }
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

  // Obtiene y actualiza el estado actual de los inputs
  const handleChange = (e) => {
    const cred = credentials;
    cred[e.target.name] = e.target.value;
    setcredentials(cred);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onClickBackHome = () => {
    history.push("");
  }

  return (
    <div
      ref={darkModeRef} className="xl:px-64 lg:px-32 sm:px-16 px-2 min-h-screen mx-auto font-manrope"
      style={{
        backgroundImage: `url(${darkModeBool ? backgroundGeneralYellowDark : backgroundGeneralYellowLight})`,
        width: "",
        height: "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "",
        minWidth: "",
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
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"></link>
        <title>Iniciar sesión - GQuestions</title>
      </Helmet>

      <div
        data-aos="fade-left"
        className="min-w-screen min-h-screen flex items-center justify-center px-8 py-4 xl:px-20 2xl:px-44 text-xs sm:text-base"
      >
        
          <div className="border border-gray-300 border-opacity-20 text-sm md:text-base bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full md:w-full overflow-hidden dark:bg-darkColor dark:text-white">

            {/* Button back to home */}
            <div className="">
              <span className="hidden sm:block absolute right-18 top-16 hover:text-white">
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

            <div className="md:flex md:w-full">
              <div className="hidden md:block w-1/2 bg-yellowlight dark:bg-darkGrayColor2 border-r border-opacity-40 border-gray-300">
                <div className="flex items-center mt-20 ">
                  <img className="" src={imageStudent} alt=""></img>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full md:w-1/2 py-10 px-5 md:px-10"
              >
                <div className="text-center mb-10">
                  <h1 className="font-black text-2xl md:text-3xl mb-8 text-center text-gray-600 dark:text-gray-200">
                    INICIAR SESIÓN
                  </h1>
                </div>
                <div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
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
                          id="login"
                          className="input-style"
                          name="username"
                          placeholder="Ingresa tu email"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-12">
                      <label
                        htmlFor=""
                        className="text-xs font-semibold px-1 self-end py-2"
                      >
                        Contraseña
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="password"
                          id="password"
                          className="dark:text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 pl-10 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                          name="password"
                          placeholder="Ingresa tu contraseña"
                          onChange={handleChange}
                        />
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

                      {/* <div>
                        <label
                          htmlFor=''
                          className='text-xs font-semibold px-1 text-gray-500 self-end py-2'
                        >
                          ¿Olvidaste tu contraseña?
                        </label>
                        <span>
                          <Link
                            to='/password_reset/'
                            className='text-xs font-semibold px-1 text-blue-500 underline'
                          >
                            Recuperar
                          </Link>
                        </span>
                      </div> */}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-x-2 grid-rows text-center items-center">
                    <div className="py-1 lg:py-0 col-span-12">
                      {!isLoading &&
                        <button
                          type="submit"
                          className="btn-primary"
                          onClick={handleClickLogin}
                        >
                          INICIAR SESIÓN
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

                    <div className="py-1 lg:py-4 col-span-12">
                      {/*<GoogleLogin className="z-10 block w-full max-w-xs mx-auto border-blue-200 border-2 hover:bg-blue-300 focus:bg-blue-400 rounded-lg px-2 py-2 font-semibold"
                    clientId="1016385449655-s27qeebm0kc4lfuedk7o665lhmtd70qp.apps.googleusercontent.com"
                    buttonText="INICIAR CON GOOGLE"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    /> */}
                    </div>
                  </div>

                  <div className="text-center">
                    <label
                      htmlFor=""
                      className="text-xs font-semibold px-1 text-gray-500 py-1"
                    >
                      ¿No tienes cuenta?
                    </label>
                    <span>
                      <Link
                        to="/register"
                        className="text-xs font-semibold px-1 text-blue-500 underline"
                      >
                        Crear cuenta
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