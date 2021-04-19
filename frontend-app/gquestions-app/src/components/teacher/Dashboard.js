import React from 'react';
import Navbar from '../../containers/Navbar';
import '../../assets/styles/tailwind.css';
import { Helmet } from "react-helmet";
import backgroundGeneral from "../../assets/images/background-general_4x-register.png";
import AOS from "aos";

class Dashboard extends React.Component {

  state = {
    token: '',
  };

  render() {
    return (
      <div
        className="flex container w-screen h-screen font-manrope"
        style={{
          backgroundImage: `url(${backgroundGeneral})`,
          width: "100%",
          height: "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "",
          minWidth: "100%",
        }}
      >
        <Helmet>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"></link>
        </Helmet>
        <div>
          <Navbar className='fixed' />
        </div>
        <div data-aos="fade-right" className='container lg:ml-32 mx-16 mt-8 lg:text-base text-sm'>
          <h1 className='font-black xl:text-5xl md:text-4xl text-2xl md:text-left md:mb-10'>
            Dashboard
          </h1>
          <p className="text-gray-500 font-semibold text-sm md:text-base">
            Aquí puedes ver tus exámenes generados
          </p>
          <div className="mt-10">

            <p className=" font-light text-gray-500">HISTORIAL DE EXÁMENES</p>
          </div>
          <ul className="divide-y divide-gray-300">

            <li className="p-4 hover:bg-gray-50  font-bold">
              <div className="grid grid-rows-2">
                <p className="hidden sm:block hover:text-yellowmain cursor-pointer">1: Nombre examen</p>
                <div className="grid grid-cols-12">
                  <p className="col-span-8 text-gray-500 text-sm">Públicado - Febrero 22, 2021 | Número de textos: 10 | Número de preguntas: 100</p>
                  <div className="col-span-4 place-self-end">
                    {/* <span className="material-icons mr-2">&#xe872;</span> */}
                    <span className="material-icons mr-2">&#xe8f4;</span>
                    <span className="material-icons mr-2">&#xe8b8;</span>
                    <span className="material-icons mr-2">&#xf090;</span>
                  </div>
                </div>
              </div>

            </li>
            <li className="p-4 hover:bg-gray-50  font-bold">
              <div className="grid grid-rows-2">
                <p className="hidden sm:block hover:text-yellowmain cursor-pointer">2: Nombre examen</p>
                <div className="grid grid-cols-12">
                  <p className="col-span-8 text-gray-500 text-sm">Públicado - Febrero 22, 2021 | Número de textos: 5 | Número de preguntas: 50</p>
                  <div className="col-span-4 place-self-end">
                    {/* <span className="material-icons mr-2">&#xe872;</span> */}
                    <span className="material-icons mr-2">&#xe8f4;</span>
                    <span className="material-icons mr-2">&#xe8b8;</span>
                    <span className="material-icons mr-2">&#xf090;</span>
                  </div>
                </div>
              </div>

            </li>
          </ul>

        </div>
      </div>
    );
  }  
  componentDidMount() {
    AOS.init({
      duration: 400,
    });
  }
}

export default Dashboard;
