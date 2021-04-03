import React, { Component } from 'react';
import Navbar from '../Navbar';
import DropdownOracion from './DropdownOracion';
import Footer from '../home/Footer';
import '../../assets/styles/tailwind.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: '',
  };

  render() {
    return (
      <div className='flex container w-screen h-screen font-manrope'>

        <div>
          <Navbar className='fixed' />
        </div>
        <div className='container lg:ml-32 mx-16 mt-8 lg:text-base text-sm'>
          <h1 className='font-black xl:text-5xl md:text-4xl text-2xl md:text-left md:mb-10'>
            Parámetros de generación
          </h1>
          <div className='grid grid-cols-12 xl:gap-x-32 lg:gap-x-16 lg:mb-32 xl:mb-44 md:gap-x-16'>
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
                                    focus:ring-yellowlight w-full -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
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
                                    focus:ring-yellowlight w-full -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
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
                                    focus:ring-yellowlight w-full -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
                  name=''
                  defaultValue=''
                  placeholder='Por defecto 200'
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-12 xl:gap-x-32 lg:gap-x-16 lg:mb-8 md:gap-x-16'>
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
                                    focus:ring-yellowlight w-full -ml-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow'
                  name=''
                  defaultValue=''
                  placeholder='Cantidad de preguntas'
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className='grid grid-rows mx-auto md:mx-0 xl:w-full w-52 sm:col-span-6 col-span-12 md:col-span-4'>
              <label className='pt-8 sm:pt-10 text-xs font-semibold px-1 text-gray-500 self-end py-2'>
                Inicio de oración
              </label>
              <div className=''>
                <div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'></div>
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
                <div class='flex flex-col lg:text-base text-sm ml-8'>
                  <label class='inline-flex items-center mt-3'>
                    <input
                      type='checkbox'
                      className='form-checkbox h-5 w-5 text-yellow-500'
                    ></input>
                    <span class='ml-2 text-gray-700'>Preguntas Abiertas</span>
                  </label>

                  <label class='inline-flex items-center mt-3'>
                    <input
                      type='checkbox'
                      className='form-checkbox h-5 w-5 text-yellow-500'
                    ></input>
                    <span class='ml-2 text-gray-700'>Opción múltiple</span>
                  </label>

                  <label class='inline-flex items-center mt-3'>
                    <input
                      type='checkbox'
                      className='form-checkbox h-5 w-5 text-yellow-500'
                    ></input>
                    <span class='ml-2 text-gray-700'>Completación</span>
                  </label>

                  <label class='inline-flex items-center mt-3'>
                    <input
                      type='checkbox'
                      className='form-checkbox h-5 w-5 text-yellow-500'
                    ></input>
                    <span class='ml-2 text-gray-700'>Todas</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
            <div class='py-3 mt-4 w-full'>
                <p className="text-sm text-gray-600 my-1">Tiempo de generación apróximado: 120s </p>
                <div class='bg-gray-300 w-full mb-4 h-1'>
                <div class='bg-yellowmain w-4/6 h-full'></div>
            </div>
                </div>
                <div className="flex justify-end">
                <button
                        type='submit'
                        className='z-10 block xl:w-1/6 w-1/2 sm:w-1/4 focus:outline-none bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 font-semibold'
                        onClick={this.handleClick}
                      >
                        Generar textos
                      </button>
                </div>
                
            </div>
            
        </div>
        
    );
  }
}

export default Home;
