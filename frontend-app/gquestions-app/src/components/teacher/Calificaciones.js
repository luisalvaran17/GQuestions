import React from 'react';
import Navbar from '../../containers/Navbar';
import '../../assets/styles/tailwind.css';
import { DropdownUser } from '../user/DropdownUser';

export const Calificaciones = () => {

  return (
    <div className='flex container w-screen h-screen font-manrope'>
      <div>
        <Navbar className='fixed' />
      </div>
      <div className='container lg:ml-32 mx-16 mt-8 lg:text-base text-sm'>
        <h1 className='font-black xl:text-5xl md:text-4xl text-2xl md:text-left md:mb-10'>
          Calificaciones
          </h1>

      </div>
      <DropdownUser />
    </div>
  );
}
