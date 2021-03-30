import React, { Component } from 'react';
import '../assets/styles/tailwind.css';
import {Helmet} from "react-helmet";

class RegisterWithGoogle extends Component {
  constructor(props) {
    super(props);
    this.divRefEmptyFields = React.createRef();
    this.divRefPasswordsNoMatch = React.createRef();
    this.divRefUser = React.createRef();
    this.divPasswordStrength = React.createRef();
  }

  state = {
    usuario: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      rol: 'Estudiante', // por defecto
      fecha_nac: '',
      edad: null,
    },
    confirmation_pass: {
      password2: '',
    },
  };

  handleClickAccept = e => {
    if (
      !this.checkEmptyFields() &&
      this.checkPasswords() &&
      this.checkStrengthPassword()
    ) {
      const profile = this.props.response.profileObj;
      //console.log(profile)
      this.setState(
        Object.assign(this.state.usuario, {
          first_name: profile.givenName,
          last_name: profile.familyName,
          email: profile.email,
        })
      );

      fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(this.state.usuario),
      })
        .then(data => {
          if (data.ok === true) {
            console.log('Usuario registrado correctamente');
            this.removeClassUser();
          } else {
            // ... nothing
          }
        })
        .catch(error => console.error(error));
    }
  };

  handleChange = e => {
    const user = this.state.usuario;
    user[e.target.name] = e.target.value;
    this.setState({ usuario: user });
  };

  handleChangePassword = e => {
    const password_confirmation = this.state.confirmation_pass;
    password_confirmation[e.target.name] = e.target.value;
    this.setState({ confirmation_pass: password_confirmation });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  checkEmptyFields = () => {
    if (
      this.state.usuario.password === '' ||
      this.state.usuario.fecha_nac === '' ||
      this.state.usuario.edad === ''
    ) {
      this.removeClass();
      return true;
    }
    return false;
  };

  checkPasswords = () => {
    if (
      this.state.usuario.password === this.state.confirmation_pass.password2
    ) {
      return true;
    } else {
      console.log('las contraseñas no coinciden');
      this.removeClassPasswordsNoMatch();
      return false;
    }
  };

  checkStrengthPassword = () => {
    let password = this.state.usuario.password;

    /*         let strength = 0;

        if (password.match(/[a-z]+/)) {
          strength += 1;
        }
        else if (password.match(/[A-Z]+/)) {
          strength += 1;
        }
        else if (password.match(/[0-9]+/)) {
          strength += 1;
        }
        else if (password.match(/[$@#&!]+/)) {
          strength += 1;
        }
        else if (password.length < 6) {
          this.removeClassPasswordStrength()
          return false;
        } */

    if (password.length > 12) {
      this.removeClassPasswordStrength();
      return false;
    }
    return true;
  };

  addClass = () => {
    this.divRefEmptyFields.current.classList.add('hidden');
  };

  removeClass() {
    this.divRefEmptyFields.current.classList.remove('hidden');
  }

  addClassUser = () => {
    this.divRefUser.current.classList.add('hidden');
  };

  removeClassUser() {
    this.divRefUser.current.classList.remove('hidden');
  }

  addClassPasswordsNoMatch = () => {
    this.divRefPasswordsNoMatch.current.classList.add('hidden');
  };

  removeClassPasswordsNoMatch() {
    this.divRefPasswordsNoMatch.current.classList.remove('hidden');
  }

  addClassPasswordStrength = () => {
    this.divPasswordStrength.current.classList.add('hidden');
  };

  removeClassPasswordStrength() {
    this.divPasswordStrength.current.classList.remove('hidden');
  }

  render() {
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
                onSubmit={this.handleSubmit}
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
                          onChange={this.handleChange}
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
                          onChange={this.handleChangePassword}
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
                          onChange={this.handleChange}
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
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Button registrarse */}
                  <div className='grid grid-rows-1 text-center items-center'>
                    <div className='py-1 col-span-12 my-0'>
                      <button
                        type='submit'
                        className='text-base z-10 pl-1 mb-0 block w-full mx-auto mb-4 bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg px-2 py-2 font-semibold'
                        onClick={this.handleClickAccept}
                      >
                        TERMINAR
                      </button>
                    </div>
                  </div>
                  <div
                    ref={this.divRefEmptyFields}
                    className='hidden animate-pulse mt-0 relative py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg'
                    role='alert'
                  >
                    <p className='text-sm'>Hay campos vacíos</p>
                    <span
                      className='absolute inset-y-0 right-0 flex items-center mr-4'
                      onClick={this.addClass}
                    >
                      <svg
                        className='w-4 h-4 fill-current'
                        role='button'
                        viewBox='0 0 20 20'
                      >
                        <path
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                          fillRule='evenodd'
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div
                    ref={this.divRefPasswordsNoMatch}
                    className='hidden animate-pulse mt-0 relative py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg'
                    role='alert'
                  >
                    <p className='text-sm'>Las contraseñas no coinciden</p>
                    <span
                      className='absolute inset-y-0 right-0 flex items-center mr-4'
                      onClick={this.addClassPasswordsNoMatch}
                    >
                      <svg
                        className='w-4 h-4 fill-current bg'
                        role='button'
                        viewBox='0 0 20 20'
                      >
                        <path
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                          fillRule='evenodd'
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div
                    ref={this.divRefUser}
                    className='hidden animate-pulse mt-0 relative py-3 pl-4 pr-10 leading-normal text-green-700 bg-green-100 rounded-lg'
                    role='alert'
                  >
                    <p className='text-sm'>Usuario registrado exitosamente</p>
                    <span
                      className='absolute inset-y-0 right-0 flex items-center mr-4'
                      onClick={this.addClassUser}
                    >
                      <svg
                        className='w-4 h-4 fill-current'
                        role='button'
                        viewBox='0 0 20 20'
                      >
                        <path
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                          fillRule='evenodd'
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div
                    ref={this.divPasswordStrength}
                    className='hidden animate-pulse mt-0 relative py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg'
                    role='alert'
                  >
                    <p className='text-sm'>
                      La contraseña debe estar entre 6 y 12 caracteres
                    </p>
                    <span
                      className='absolute inset-y-0 right-0 flex items-center mr-4'
                      onClick={this.addClassPasswordStrength}
                    >
                      <svg
                        className='w-4 h-4 fill-current'
                        role='button'
                        viewBox='0 0 20 20'
                      >
                        <path
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                          fillRule='evenodd'
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
}

export default RegisterWithGoogle;
