import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../containers/Navbar';
import '../../assets/styles/tailwind.css';
import Scrollbars from "react-custom-scrollbars";
import { Helmet } from 'react-helmet';
import backgroundGeneralYellowDark from "../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../assets/images/background-general-yellow_light.png";
import { DropdownUser } from '../teacher/user/DropdownUser';

export const Calificaciones = () => {

  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      darkModeRef.current.classList.remove('dark')
    }
  }, [])

  return (
    <div
      ref={darkModeRef}
      className="flex container w-screen font-manrope"
      style={{
        backgroundImage: `url(${darkModeBool ? backgroundGeneralYellowDark : backgroundGeneralYellowLight})`,
        width: "100%",
        height: "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "",
        minWidth: "100%",
      }}>

      <Helmet>
        <title>Calficaciones - GQuestions</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"></link>
      </Helmet>

      <Navbar className="fixed" />

      <CustomScrollbars
        autoHide
        autoHideTimeout={900}
        autoHideDuration={400}
        data-aos="fade-right"
        style={{ height: "100vh" }}
        className='container lg:text-base text-sm dark:text-white'>

        <div className="grid grid-rows xl:pl-32 px-1 sm:px-8 py-8 md:px-8 lg:pl-16">
          <h1 className='font-black xl:text-5xl md:text-4xl text-2xl md:text-left md:mb-10 '>
            Calificaciones
          </h1>
          <p className="text-gray-500 font-semibold text-sm md:text-base dark:text-gray-200 sm:mb-10 mb-0">
            Aquí puedes visualizar las calificaciones de los estudiantes por examen.
          </p>
        </div>
      </CustomScrollbars>
      <DropdownUser />
    </div>
  );
}

// Funciones que cambian el estilo del scroll y otras props de una librería
const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: 'rgba(35, 49, 86, 0.8)'
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = props => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);
