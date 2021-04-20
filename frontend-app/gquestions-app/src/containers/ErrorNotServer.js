import React from 'react';
import '../assets/styles/tailwind.css';
import backgroundGeneral from '../assets/images/background-general_4x-register.png';
import { useHistory } from 'react-router';

export const ErrorNotServer = () => {

  const history = useHistory();

  const backHome = () => {
    history.push('/')
  }
  
  return (
    <div className='flex container w-screen h-screen font-manrope'
      style={{
        backgroundImage: `url(${backgroundGeneral})`,
        width: '100%',
        height: '',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '',
        minWidth: "100%",
      }}>

      <div className='container md:mx-auto mx-4 items-center place-self-center'>
        <h1 className="text-5xl font-bold">UPS... ERROR SERVER</h1>
        <p className="text-sm">ERR_CONNECTION_REFUSED</p>
        <button
          type='submit'
          className='mt-8 w-52 focus:outline-none mx-auto bg-cyanlight hover:bg-cyanmain focus:bg-cyanmain text-gray-900 border border-gray-900 rounded-lg py-2 font-semibold'
          onClick={backHome}
        >
          Volver
                </button>
        
      </div>
    </div>
  );
}
