import React, { Component } from 'react';
import Navbar from '../Navbar';
import DropdownOracion from './DropdownOracion';
import '../../assets/styles/tailwind.css';
import backgroundGeneral from '../../assets/images/background-general_4x.png';

class Home extends Component {

  state = {
    token: '',
  };

  render() {
    return (
      <div className='flex container w-screen h-screen font-manrope'
      style={{
        backgroundImage: `url(${ backgroundGeneral })`,
        width: '100%',
        height: '',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '',
        minWidth: "100%",
        }}>
        
        <div>
          <Navbar className='fixed' />
        </div>

        <div className='container lg:ml-32 mx-16 mt-8 lg:text-base text-sm'>
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <h1 className='font-black xl:text-5xl md:text-4xl sm:text-2xl md:text-left md:mb-10 text-sm'>
                Parámetros de generación
              </h1>
            </div>

          </div>

          <div className='grid grid-cols-12  lg:gap-x-16 lg:mb-32 xl:mb-33 md:gap-x-16 md:mb-20'>
            <div className='grid grid-rows lg:mx-0 mx-auto sm:col-span-6 col-span-12 md:col-span-4'>
              <label className='pt-8 sm:pt-10 text-xs font-semibold px-1 text-gray-500 self-end py-2'>
                Cantidad de exámenes
              </label>
              <div className='flex'>
                <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
                <input
                  type='number'
                  id=''
                  className='transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                                    focus:ring-yellowlight w-full 2xl:w-96 -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
                  name=''
                  defaultValue='10'
                  placeholder=''
                  onChange={this.handleChange}
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
                  id=''
                  className='transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                                    focus:ring-yellowlight w-full 2xl:w-96 -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
                  name=''
                  defaultValue=''
                  placeholder='Por defecto 10'
                  onChange={this.handleChange}
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
                  id=''
                  className='transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                                    focus:ring-yellowlight w-full 2xl:w-96 -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
                  name=''
                  defaultValue=''
                  placeholder='Por defecto 200'
                  onChange={this.handleChange}
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
                  id=''
                  className='transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 
                                    focus:ring-yellowlight w-full 2xl:w-96 -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
                  name=''
                  defaultValue=''
                  placeholder='Cantidad de preguntas'
                  onChange={this.handleChange}
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
          <div className='grid grid-rows lg:mx-0 mx-auto sm:col-span-6 col-span-12 md:col-span-4'>
            <label className='sm:mx-0 mx-auto pt-8 sm:pt-10 text-xs font-semibold px-1 text-gray-500 self-end py-2'>
              Tipo de preguntas
            </label>
            <div className='flex sm:mx-0 mx-auto'>
              <div className='grid grid-rows'>
                <div className='flex flex-col lg:text-base text-sm ml-1'>
                  <label className='inline-flex items-center mt-3 text-sm md:text-base'>
                    <input
                      type='checkbox'
                      className='form-checkbox h-5 w-5 text-yellow-500'
                    ></input>
                    <span className='ml-2 text-gray-700'>Preguntas Abiertas</span>
                  </label>

                  <label className='inline-flex items-center mt-3'>
                    <input
                      type='checkbox'
                      className='form-checkbox h-5 w-5 text-yellow-500'
                    ></input>
                    <span className='ml-2 text-gray-700'>Opción múltiple</span>
                  </label>

                  <label className='inline-flex items-center mt-3'>
                    <input
                      type='checkbox'
                      className='form-checkbox h-5 w-5 text-yellow-500'
                    ></input>
                    <span className='ml-2 text-gray-700'>Completación</span>
                  </label>

                  <label className='inline-flex items-center mt-3'>
                    <input
                      type='checkbox'
                      className='form-checkbox h-5 w-5 text-yellow-500'
                    ></input>
                    <span className='ml-2 text-gray-700'>Todas</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className='py-3 mt-4 w-full'>
            <p className='text-sm text-gray-600 my-1'>
              Tiempo de generación apróximado: 120s{' '}
            </p>
            <div className='bg-gray-300 w-full mb-4 h-1'>
              <div className='bg-yellowmain w-4/6 h-full'></div>
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='z-10 block xl:w-1/6 w-40 sm:w-1/4 focus:outline-none bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 mb-8 font-semibold'
              onClick={this.handleClick}
            >
              Generar textos
            </button>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const token = localStorage.getItem('token');
    console.log(token)
  }
}

export default Home;