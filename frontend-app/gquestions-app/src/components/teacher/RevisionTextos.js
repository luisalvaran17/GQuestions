import React from "react";
import Navbar from "../../containers/Navbar";
import "../../assets/styles/tailwind.css";
import backgroundGeneral from "../../assets/images/background-general-green.png";

class RevisionTextos extends React.Component {
  state = {
    token: "",
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
        <div className="">
          <Navbar className="fixed" />
        </div>
        <div className="container xl:mx-32 mx-4 md:mx-8 lg:mx-16 mt-8">
          <div className="grid grid-rows space-y-8 mb-8">
            <h1 className="font-bold xl:text-5xl md:text-4xl sm:text-3xl text-xl">
              Revisión de textos
            </h1>
            <p className="text-gray-500 font-semibold text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              ultricies lacus, vel porta libero. Nulla posuere erat sed quam
              dictum, eget ultrices ligula egestas. Sed non tortor non dui
              malesuada faucibus non at est. Mauris sodales sem mi.
            </p>
          </div>

          <div className="container">
            <div className="grid grid-cols-12">
              <div className="col-span-2 sm:col-span-3">
                <div class="flex ">
                  <div class="bg-white border shadow-md border-gray-200 sm:rounded-md rounded-r-none w-full lg:mr-16 md:mr-8 mr-4 md:text-base text-sm">
                    <ul class="divide-y divide-gray-300">
                    <li class="p-4 font-light text-gray-500">
                        <p className="hidden sm:block">PAQUETES DE TEXTOS</p>
                        <p className="sm:hidden block">T</p>
                      </li>
                      <li class="p-4 bg-blue-50 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                        <p className="hidden sm:block">Texto 1</p>
                        <p className="sm:hidden block">1</p>
                      </li>
                      <li class="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                      <p className="hidden sm:block">Texto 2</p>
                        <p className="sm:hidden block">2</p>
                      </li>
                      <li class="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                      <p className="hidden sm:block">Texto 3</p>
                        <p className="sm:hidden block">3</p>
                      </li>
                      <li class="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                      <p className="hidden sm:block">Texto 4</p>
                        <p className="sm:hidden block">4</p>
                      </li>
                      <li class="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                      <p className="hidden sm:block">Texto 5</p>
                        <p className="sm:hidden block">5</p>
                      </li>
                      <li class="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                      <p className="hidden sm:block">Texto 6</p>
                        <p className="sm:hidden block">6</p>
                      </li>
                      <li class="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                      <p className="hidden sm:block">Texto 7</p>
                        <p className="sm:hidden block">7</p>
                      </li>
                      <li class="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                      <p className="hidden sm:block">Texto 8</p>
                        <p className="sm:hidden block">8</p>
                      </li>
                      <li class="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                      <p className="hidden sm:block">Texto 9</p>
                        <p className="sm:hidden block">9</p>
                      </li>
                      <li class="p-4 hover:bg-gray-50 cursor-pointer hover:text-yellowmain font-bold">
                      <p className="hidden sm:block">Texto 10</p>
                        <p className="sm:hidden block">10</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid col-span-9">
                <div className="box border rounded flex flex-col shadow bg-white">
                  <div className="grid grid-cols-12 box__title bg-grey-lighter px-3 py-2 border-b items-center">
                    <h3 className="hidden sm:block col-span-6 font-bold text-base text-green-700">
                      Texto 1
                    </h3>
                    <div className="col-span-12 sm:col-span-6 place-self-end">
                      <button
                        type="submit"
                        className="md:text-base text-sm z-10 pl-1 sm:w-52 w-44 block focus:outline-none bg-green-400 hover:bg-green-500 focus:bg-green-500 text-black rounded-lg px-2 py-2 font-semibold"
                        onClick={this.handleClick}
                      >
                        Volver a generar
                      </button>
                    </div>
                  </div>
                  <textarea
                    placeholder="hey"
                    className="h-full resize-none focus:border-gray-400 p-2 m-1 bg-transparent text-gray-600 text-sm md:text-base "
                    defaultValue="
                  
                    Computer science is the study of algorithmic processes
                    vernacular terms for computer-science research. It is a
                    discipline that has been recognized as a source of new
                    knowledge in the field of computer science and with which
                    many companies are seeking to develop new and exciting
                    products. The research literature has been extensively
                    reviewed by experts in computer science. The review of
                    computer science literature has led to several key
                    developments in research and application of computer science
                    to computer science and related fields. As a result of these
                    developments, the field of computer science has become a
                    central focus of scientific research and has been the
                    subject of a number of recent publications and articles. In
                    particular, computer science has been cited by many
                    researchers as the key to understanding how computers work,
                    their interactions, and their own lives, and has been used
                    to inform and inspire new concepts in computer science. In
                    recent years, there have been more advances in the field of
                    computer science such as the development of the first
                    full-scale computer system (CDS) that is capable of running."
                    >
                  </textarea>
                  <hr></hr>
{/*                   <div className="flex md:flex-row flex-col gap-y-2 md:gap-x-16 box__title bg-grey-lighter px-3  py-2 items-center self-center">
                    <div className="">
                      <button
                        type="submit"
                        className="text-base z-10 pl-1 block w-52 focus:outline-none bg-blue-200 hover:bg-blue-300 focus:bg-blue-300 text-black rounded-lg px-2 py-2 font-semibold"
                        onClick={this.handleClick}
                      >
                        Editar
                      </button>
                    </div>
                    <div className="">
                      <button
                        type="submit"
                        className="text-base z-10 pl-1 w-52 block focus:outline-none bg-blue-200 hover:bg-blue-300 focus:bg-blue-300 text-black rounded-lg px-2 py-2 font-semibold"
                        onClick={this.handleClick}
                      >
                        Volver a generar
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>



        <div className="grid grid-rows justify-end items-end mt-4">
          <div className="flex md:flex-row flex-col gap-x-8 gap-y-2 box__title bg-grey-lighter px-3  py-2 items-center self-center">
                    <div className="">
                      <button
                        type="submit"
                        className="md:text-base text-sm z-10 pl-1 block w-52 focus:outline-none bg-red-200 hover:bg-red-300 focus:bg-red-300 text-black rounded-lg px-2 py-2 font-semibold"
                        onClick={this.handleClick}
                      >
                        Cancelar
                      </button>
                    </div>
                    <div className="">
                      <button
                        type="submit"
                        className="md:text-base text-sm z-10 pl-1 w-52 block focus:outline-none bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500 text-black rounded-lg px-2 py-2 font-semibold"
                        onClick={this.handleClick}
                      >
                        Generar preguntas
                      </button>
                    </div>
                  </div>
            </div>

          {/* Error messages */}
          <div

            ref={this.divRefErrorMessage}
            className="hidden animate-pulse mt-1 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            <div id="error_messages" className="text-sm md:text-base">
            </div>

            <span
              className="absolute inset-y-0 right-0 flex items-center mr-4"
              onClick={this.addClassdivRefErrorMessage}
            >
              <svg
                className="w-4 h-4 fill-current"
                role="button"
                viewBox="0 0 20 20"
              >
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </span>

            </div>

        </div>
      </div>
    );
  }
}

export default RevisionTextos;