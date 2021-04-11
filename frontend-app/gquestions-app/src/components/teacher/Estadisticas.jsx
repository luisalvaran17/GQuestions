import React, { Component } from 'react';
import Navbar from '../Navbar';
import '../../assets/styles/tailwind.css';

class TestNavigation extends Component {

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
            Estadisticas
          </h1>
          
          </div>
        </div>
    );
  }
}

export default TestNavigation;
