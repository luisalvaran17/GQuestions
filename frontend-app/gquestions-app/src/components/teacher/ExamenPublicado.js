import React from "react";
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneral from "../../assets/images/background-general-green.png";

class ExamenPublicado extends React.Component {
  state = {
    token: "",
  };

  render() {
    return (
      <div
        className="flex container xl:justify-center xl:items-center w-screen h-screen font-manrope"
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
        <div className="xl:absolute xl:left-0">
          <Navbar className="fixed" />
        </div>
        <div className="container flex justify-center items-center">
          <div className="">
            <div className="grid text-center cols-span-12 mx-4">
              <h1 className="font-bold xl:text-5xl  md:text-4xl sm:text-3xl text-xl mb-10">
                Examen publicado con éxito
              </h1>
            </div>

            <div className="text-center self-end mb-3 col-span-12">
              <p className="text-gray-500 font-semibold text-sm">Código examen</p>
            </div>

            <div className="grid text-center px-12 md:px-20 col-span-12">
              <input
                  type="text"
                  id="cod_generado"
                  className="grid md:text-4xl text-2xl text-center font-bold sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-yellowlight w-full pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 bg-white shadow"
                  
                  name="cod_generado"
                  disabled="true"
                  placeholder="3552"
                  onChange={this.handleClick}
                />
            </div>


            <div className="py-4 px-12 md:px-20 col-span-12 my-0">
                <button
                  type="submit"
                  className="text-base z-10 pl-1 block w-full mx-auto focus:outline-none bg-green-400 hover:bg-green-500 focus:bg-green-500 text-black rounded-lg px-2 py-2 font-semibold"
                  onClick={this.handleClick}
                >
                  Aceptar
                </button>
              </div>
              
        </div>
      </div>
      </div>
    );
  }
}

export default ExamenPublicado;