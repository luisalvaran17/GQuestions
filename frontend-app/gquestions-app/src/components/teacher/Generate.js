import React from 'react';
import Navbar from '../Navbar';
import DropdownOracion from './DropdownOracion';
import '../../assets/styles/tailwind.css';
import backgroundGeneral from '../../assets/images/background-general_4x.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { v4: uuidv4 } = require('uuid');
    const UUID = uuidv4();
    this.state = {
      generacionConfiguracion: {
        id: UUID,
        n_examenes: 10,
        cantidad_textos: 10,
        longit_texto: 200,
        n_preguntas: 10,
        inicio_oracion: 'Aleatorio',
      },
      generacionTipoPregunta: {
        pregunta_abierta: true,
        opcion_multiple: true,
        completacion: false,
        generacion: UUID,
      },
      generacionUsuario: {
        generacion: UUID,
        account: 20, // GET ID CURRENT USER
      },
      token: '',
      first: false,
      second: false,
      third: false,
    };
    this.handleInputChangeTiposPregunta = this.handleInputChangeTiposPregunta.bind(
      this
    );
    console.log(this.state.generacionConfiguracion.id);
  }

  handleClick = e => {
    this.setState({ first: true });
    fetch('http://127.0.0.1:8000/api/generacion/configuracion/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.generacionConfiguracion),
    }).then(data => {
      if (data.ok === true) {
        fetch('http://127.0.0.1:8000/api/generacion/tipo-pregunta/', {
          method: 'POST',
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token') ,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state.generacionTipoPregunta),
        }).then(data => {
          //this.state.generacionUsuario.account = this.state.token;
          fetch('http://127.0.0.1:8000/api/generacion/generacion-usuario/', {
            method: 'POST',
            headers: {
              Authorization: 'Token ' + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.generacionUsuario),
          });
        });
      } else {
        // ... nothing
      }
    });
  };

  handleChangeConfiguracion = e => {
    const generacion_configuracion = this.state.generacionConfiguracion;
    generacion_configuracion[e.target.name] = parseInt(e.target.value);
    this.setState({ generacionConfiguracion: generacion_configuracion });

    console.log(this.state.generacionConfiguracion);
    console.log(this.state.generacionTipoPregunta);
    console.log(this.state.generacionUsuario);
    //console.log(e.target.value);
  };

  handleInputChangeTiposPregunta(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(
      Object.assign(this.state.generacionTipoPregunta, {
        [name]: value,
      })
    );
    console.log(this.state.generacionTipoPregunta);
  }

  handleSubmit = e => {
    e.preventDefault();
    //console.log('submitted');
  };

  checkFieldsEmpty() {
    if (
      this.state.generacionConfiguracion.cantidad_examenes === '' ||
      this.state.generacionConfiguracion.cantidad_textos === '' ||
      this.state.generacionConfiguracion.longitud_texto === '' ||
      this.state.generacionConfiguracion.cantidad_preguntas === '' ||
      this.state.generacionConfiguracion.inicio_oracion === ''
    ) {
      console.log('Hay campos vacíos');
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div
        className='flex container w-screen h-screen font-manrope'
        style={{
          backgroundImage: `url(${backgroundGeneral})`,
          width: '100%',
          height: '',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '',
          minWidth: '100%',
        }}
      >
        <div>
          <Navbar className='fixed' />
        </div>

        <div className='container lg:ml-32 mx-16 mt-8 lg:text-base text-sm'>
          <div className='grid grid-cols-12'>
            <div className='col-span-12'>
              <h1 className='font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left md:mb-10 text-sm'>
                Parámetros de generación
              </h1>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className='grid grid-cols-12  lg:gap-x-16 lg:mb-32 xl:mb-33 md:gap-x-16 md:mb-20'>
              <div className='grid grid-rows lg:mx-0 mx-auto sm:col-span-6 col-span-12 md:col-span-4'>
                <label className='pt-8 sm:pt-10 text-xs font-semibold px-1 text-gray-500 self-end py-2'>
                  Cantidad de exámenes
                </label>
                <div className='flex'>
                  <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                  <input
                    type='number'
                    id='cant_examenes'
                    className='transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                                    focus:ring-yellowlight w-full 2xl:w-96 -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
                    name='cantidad_examenes'
                    defaultValue='10'
                    placeholder=''
                    onChange={this.handleChangeConfiguracion}
                  />
                </div>
              </div>
              <div className='grid grid-rows lg:mx-0 mx-auto sm:col-span-6 col-span-12 md:col-span-4'>
                <label className='pt-6 sm:pt-10 text-xs font-semibold px-1 text-gray-500 self-end py-2'>
                  Cantidad de textos
                </label>
                <div className='flex'>
                  <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                  <input
                    type='number'
                    id='cant_textos'
                    className='transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                                    focus:ring-yellowlight w-full 2xl:w-96 -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
                    name='cantidad_textos'
                    defaultValue=''
                    placeholder='Por defecto 10'
                    onChange={this.handleChangeConfiguracion}
                  />
                </div>
              </div>

              <div className='grid grid-rows lg:mx-0 mx-auto sm:col-span-6 col-span-12 md:col-span-4'>
                <label className='pt-6 sm:pt-10 text-xs font-semibold px-1 text-gray-500 self-end py-2'>
                  Longitud de texto (mayor a 200)
                </label>
                <div className='flex'>
                  <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                  <input
                    type='number'
                    id='long_texto'
                    className='transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                                    focus:ring-yellowlight w-full 2xl:w-96 -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
                    name='longitud_texto'
                    defaultValue=''
                    placeholder='Por defecto 200'
                    onChange={this.handleChangeConfiguracion}
                  />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-12 lg:gap-x-16 lg:mb-8 md:gap-x-16'>
              <div className='grid grid-rows lg:mx-0 mx-auto sm:col-span-6 col-span-12 md:col-span-4'>
                <label className='pt-8 sm:pt-10 text-xs font-semibold px-1 text-gray-500 self-end py-2'>
                  Cantidad de preguntas
                </label>
                <div className='flex'>
                  <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                  <input
                    type='number'
                    id='cant_preguntas'
                    className='transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                                    focus:ring-yellowlight w-full 2xl:w-96 -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
                    name='cantidad_preguntas'
                    defaultValue=''
                    placeholder='Cantidad de preguntas'
                    onChange={this.handleChangeConfiguracion}
                  />
                </div>
              </div>
              <div className='grid grid-rows mx-auto md:mx-0 xl:w-full w-full sm:w-52 sm:col-span-6 col-span-12 md:col-span-4'>
                <label className='pt-8 sm:pt-10 text-xs font-semibold px-1 text-gray-500 self-end py-2'>
                  Inicio de oración
                </label>
                <div className='2xl:w-96'>
                  <div className='w-10 z-10 pl-1 text-center  pointer-events-none flex items-center justify-center'></div>
                  <DropdownOracion />
                </div>
              </div>
            </div>
          </form>
          <form>
            <div className='grid grid-rows lg:mx-0 mx-auto sm:col-span-6 col-span-12 md:col-span-4'>
              <label
                htmlFor='pregunta_abierta'
                className='sm:mx-0 mx-auto pt-8 sm:pt-10 text-xs font-semibold px-1 text-gray-500 self-end py-2'
              >
                Tipo de preguntas
              </label>
              <div className='flex sm:mx-0 mx-auto'>
                <div className='grid grid-rows'>
                  <div className='flex flex-col lg:text-base text-sm ml-1'>
                    <label className='inline-flex items-center mt-3 text-sm md:text-base'>
                      <input
                        type='checkbox'
                        id='pregunta_abierta'
                        name='pregunta_abierta'
                        className='form-checkbox h-5 w-5 text-yellow-500'
                        defaultChecked='true'
                        onChange={this.handleInputChangeTiposPregunta}
                      ></input>
                      <span className='ml-2 text-gray-700'>
                        Preguntas Abiertas
                      </span>
                    </label>

                    <label
                      htmlFor='opcion_multiple'
                      className='inline-flex items-center mt-3'
                    >
                      <input
                        type='checkbox'
                        id='opcion_multiple'
                        name='opcion_multiple'
                        className='form-checkbox h-5 w-5 text-yellow-500'
                        defaultChecked='true'
                        onChange={this.handleInputChangeTiposPregunta}
                      ></input>
                      <span className='ml-2 text-gray-700'>
                        Opción múltiple
                      </span>
                    </label>

                    <label
                      htmlFor='completacion'
                      className='inline-flex items-center mt-3'
                    >
                      <input
                        type='checkbox'
                        id='completacion'
                        name='completacion'
                        className='form-checkbox h-5 w-5 text-yellow-500'
                        onChange={this.handleInputChangeTiposPregunta}
                      ></input>
                      <span className='ml-2 text-gray-700'>Completación</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className='py-3 mt-4 w-full'>
            <p className='text-sm text-gray-600 my-1'>
              Tiempo de generación apróximado: 120s{' '}
            </p>
            <div className='bg-gray-300 w-full mb-4 h-1'>
              <div className='bg-yellowmain w-4/6 h-full'></div>
            </div>
          </div>
          <div className='grid grid-rows justify-end items-end'>
            <button
              type='submit'
              className='z-10 px-4 block focus:outline-none bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 mb-1 font-semibold'
              onClick={this.handleClick}
            >
              Generar textos
            </button>
            <label className='hidden text-red-600 text-xs md:text-base md:px-10 px-0 font-md'>
              Hay campos vacíos
            </label>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount = () => {
    //this.setState({token: localStorage.getItem('token')});
    //console.log(token);
  };
}

export default Home;
