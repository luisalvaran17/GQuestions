import React, { useState } from 'react';
import '../../assets/styles/tailwind.css';
import ReactDOM from 'react-dom';
import { Helmet } from "react-helmet";
import { useHistory } from 'react-router';
import { LoginAPI } from '../../api/LoginAPI';
import { GetToken } from '../../api/GetToken';
import { GetIDUser } from '../../api/GetIDUser';
import { RegisterUserAPI } from '../../api/RegisterUserAPI';

export const RegisterWithGoogle = (response) => {

  const history = useHistory();
  const responseGoogle = response.response;
  const divRefErrorMessage = React.createRef();
  const [usuario, setusuario] = useState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      rol: 'Estudiante', // por defecto
      fecha_nac: '',
      edad: null,
    });
  
  const [confirmation_pass, setconfirmation_pass] = useState({
    password2: '',
  });

  const [credentials, setcredentials] = useState({username:"", password:""})

  const handleClickAccept = async () => {
    if (checkFieldsValidations() === true  ) {
      const profile = responseGoogle.profileObj;
      //console.log(profile)
      setusuario(
        Object.assign(usuario, {
          first_name: profile.givenName,
          last_name: profile.familyName,
          email: profile.email,
        })
      );

      setcredentials(
        Object.assign(credentials, {
          username: usuario.email,
          password: usuario.password,
        })
      )

      const response = await RegisterUserAPI(usuario);
      if(response === true){
        await LoginAPI(credentials);
        localStorage.setItem('token', await GetToken(credentials));
        localStorage.setItem('email', credentials.username);
        localStorage.setItem('id_user', await GetIDUser(credentials.username));
        history.push("teacher/generacion");
      }
      else{
        // nothing
      }
    }
  };

  const handleChange = e => {
    const user = usuario;
    user[e.target.name] = e.target.value;
    setusuario(user);
    //this.setState({ usuario: user });
  };

  const handleChangePassword = e => {
    const password_confirmation = confirmation_pass;
    password_confirmation[e.target.name] = e.target.value;
    setconfirmation_pass(password_confirmation);
    //this.setState({ confirmation_pass: password_confirmation });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const checkFieldsValidations = () => {

    let p_empty;
    let p_contrasenas;
    let p_strength_password;

    if (
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

    return (
      <div className='container mx-auto font-manrope'>
        <div className='min-w-screen min-h-screen flex items-center justify-center px-8 py-4 xl:px-64 md:py-32 text-xs sm:text-base'>
          <Helmet>
            <script
              src='https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js'
              defer
            ></script>
            <script src='https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js'></script>
            <script
              src='https://kit.fontawesome.com/51d411da80.js'
              crossorigin='anonymous'
            ></script>
            <style>
              @import
              url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')
              </style>
          </Helmet>
          <div className='text-sm md:text-md bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full md:w-1/2 overflow-hidden'>
            <div className='md:flex w-full'>
              <form
                onSubmit={handleSubmit}
                className='w-full py-10 px-5 lg:px-10'
              >
                <div className='text-center mb-10'>
                  <h1 className='font-black text-2xl md:text-3xl mb-8 text-center text-gray-600'>
                    TERMINAR REGISTRO
                  </h1>
                </div>
                <div>
                  <div className='grid grid-rows-2 grid-cols-1 -mx-3'>
                    <div className='w-full px-3 mb-3'>
                      <label
                        htmlFor=''
                        className='text-xs font-semibold px-1 text-gray-500 self-end py-2'
                      >
                        Contraseña nueva
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
                          <i className='mdi mdi-lock-outline text-gray-400 text-lg'></i>
                        </div>
                        <input
                          type='password'
                          id='password'
                          className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-yellow-500'
                          name='password'
                          placeholder='Contraseña'
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='w-full px-3 mb-3'>
                      <label
                        htmlFor=''
                        className='text-xs font-semibold px-1 text-gray-500 self-end py-2'
                      >
                        Confirmar contraseña
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
                          <i className='mdi mdi-lock-outline text-gray-400 text-lg'></i>
                        </div>
                        <input
                          type='password'
                          id='password2'
                          className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-yellow-500'
                          name='password2'
                          placeholder='Contraseña'
                          onChange={handleChangePassword}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rol y fecha de nacimiento */}
                  <div className='grid grid-rows-2 grid-cols-1 -mx-3'>
                    <div className='w-full px-3 mb-3'>
                      <label htmlFor='' className='text-xs font-semibold px-1'>
                        Tipo de cuenta
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
                          <i className='mdi mdi-account-outline text-gray-400 text-lg'></i>
                        </div>
                        <select
                          type='text'
                          id='rol'
                          className='bg-white w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-yellow-500'
                          name='rol'
                          placeholder='Ingresa tu nombre'
                          onChange={handleChange}
                        >
                          <option>Estudiante</option>
                          <option>Docente</option>
                        </select>
                      </div>
                    </div>
                    <div className='w-full px-3 mb-3'>
                      <label htmlFor='' className='text-xs font-semibold px-1'>
                        Fecha de nacimiento
                      </label>
                      <div className='flex'>
                        <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                        <input
                          type='date'
                          id='fecha_nacimiento'
                          className='w-full bg-white -ml-10 pl-4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-yellow-500'
                          placeholder='dd/mm/aaaa'
                          name='fecha_nac'
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Button registrarse */}
                  <div className='grid grid-rows-1 text-center items-center'>
                    <div className='py-1 col-span-12 my-0'>
                      <button
                        type='submit'
                        className='text-base z-10 pl-1 block w-full mx-auto mb-2 bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg px-2 py-2 font-semibold'
                        onClick={handleClickAccept}
                      >
                        TERMINAR
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }