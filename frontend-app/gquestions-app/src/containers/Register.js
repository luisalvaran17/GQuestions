import React, { useEffect, useState } from "react";
import "../assets/styles/tailwind.css";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import ReactDOM from 'react-dom';
import { RegisterWithGoogle } from "../components/login/RegisterWithGoogle";
import GoogleRegister from "react-google-login";
import ModalRegister from "../components/login/ModalRegister";
import AOS from "aos";
import "aos/dist/aos.css";
import backgroundGeneral from "../assets/images/background-general_4x-register.png";
import imageStudent from "../assets/images/image-register2.png";
import { LoginAPI } from "../api/LoginAPI";
import { RegisterUserAPI } from "../api/RegisterUserAPI";
import { getToken } from "../api/getToken";
import { GetIDUser } from "../api/GetIDUser";

export const Register = () => {

  const divRefErrorMessage = React.createRef();

  // Hooks
  const [_isMounted, set_isMounted] = useState(false);
  const [usuario, setusuario] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    rol: "Docente", // por defecto
    fecha_nac: "",
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

      // Verifica si el usuario existe para mostrar un modal o no
      await fetch(
        "http://127.0.0.1:8000/api/exist-user/" + usuario.email,
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
            localStorage.setItem('token', await getToken(credentials));
            localStorage.setItem('email', credentials.username);
            localStorage.setItem('id_user', await GetIDUser(credentials.username));
            history.push("teacher/home");
          }
          else {
            // nothing
          }
        }
      }
    }
  }

  // Función que registra al usuario con cuenta de google
  const responseGoogle = (response) => {
    fetch("http://127.0.0.1:8000/api/exist-user/" + response.profileObj.email, {
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
      usuario.rol === "" ||
      usuario.fecha_nac === ""
      //usuario.edad: null,

    ) {
      removeClassdivRefErrorMessage();
      p_empty = React.createElement('p', {}, 'Hay campos vacíos');
      const X = React.createElement('div', {}, [p_empty]);
      ReactDOM.render(X, document.getElementById('error_messages'));
      return false;
    }

    if (usuario.password.length < 6) {
      removeClassdivRefErrorMessage();
      p_strength_password = React.createElement('p', {}, 'La contraseña debe tener al menos 6 carácteres');
      const X = React.createElement('div', {}, [p_strength_password]);
      ReactDOM.render(X, document.getElementById('error_messages'));
      return false;
    }

    else if (usuario.password !== confirmation_pass.password2) {
      removeClassdivRefErrorMessage();
      p_contrasenas = React.createElement('p', {}, 'Las contraseñas no coinciden');
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


  if (redirect === false && modalShow === false) {
    return (
      <div
        className="xl:px-60 lg:px-32 sm:px-16 px-2 min-h-screen mx-auto font-manrope"
        style={{
          backgroundImage: `url(${backgroundGeneral})`,
          width: "",
          height: "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "",
          minWidth: "",
        }}
      >
        <div
          data-aos="fade-left"
          className="min-w-screen min-h-screen flex items-center justify-center px-4 sm:px-0 py-4 md:mx-16 lg:mx-4 2xl:mx-52 xl:mx-4 text-xs sm:text-base"
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
          </Helmet>
          <div className="text-sm md:text-md bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden">
            <div className="md:flex w-full">
              <div className="hidden lg:block  w-1/2 bg-yellowBackground">
                <div className="flex items-center mt-20 p-10">
                  <img className="" src={imageStudent} alt=""></img>
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="w-full lg:w-1/2 py-10 px-5 lg:px-10"
              >
                <div className="text-center mb-10">
                  <h1 className="font-black text-2xl md:text-3xl mb-8 text-center text-gray-600">
                    REGISTRARSE
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
                        className="text-xs font-semibold px-1 text-gray-500 self-end py-2"
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
                        className="text-xs font-semibold px-1 text-gray-500 self-end py-2"
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
                        className="text-xs font-semibold px-1 text-gray-500 self-end py-2"
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
                        Fecha de nacimiento
                      </label>
                      <label
                        htmlFor=""
                        className="sm:hidden block text-xs font-semibold px-1"
                      >
                        Cumpleaños
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"></div>
                        <input
                          type="date"
                          id="fecha_nacimiento"
                          className="transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
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
                      <button
                        type="submit"
                        className="text-base z-10 pl-1 block w-full mx-auto mb-2 focus:outline-none bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg px-2 py-2 font-semibold"
                        onClick={handleClickRegister}
                      >
                        REGISTRARSE
                      </button>
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
                          className="w-full flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
                        >
                          <span>
                            <i className="fab fa-google mr-2"></i>
                          </span>
                          <span className="text-sm font-medium text-gray-800 group-hover:text-white">
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