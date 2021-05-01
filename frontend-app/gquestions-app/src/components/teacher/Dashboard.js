import React, { useEffect, useState } from 'react';
import Navbar from '../../containers/Navbar';
import '../../assets/styles/tailwind.css';
import { Helmet } from "react-helmet";
import AOS from "aos";
import backgroundGeneral from "../../assets/images/background-general_4x-register.png";
import { DropdownUser } from '../user/DropdownUser';
import { GetGeneracionesUsuarioAPI } from '../../api/Dashboard/GetGeneracionesUsuarioAPI';
import { GetGeneracionUsuarioAPI } from '../../api/Dashboard/GetGeneracionUsuarioAPI';
import { GetTextosUsuarioAPI } from '../../api/Textos/GetTextosUsuarioAPI';
import { GetTextoAPI } from '../../api/Textos/GetTextoAPI';
import { GetPreguntasTextosAPI } from '../../api/Preguntas/GetPreguntasTextosAPI';
import { GetPreguntaAPI } from '../../api/Preguntas/GetPreguntaAPI';

export const Dashboard = () => {

  const [Generaciones, setGeneraciones] = useState([])

  const [textos, setTextos] = useState([])

  const [textosPreguntas, setTextosPreguntas] = useState([])
  const [preguntas, setPreguntas] = useState([])

  /*   const handleClickPrueba = () => {
      
    } */

  useEffect(() => {
    AOS.init({
      duration: 800,
    })
    getGeneracionesFromDB();
  }, []);

  const getGeneracionesFromDB = async () => {
    const generacionesDB = await GetGeneracionesUsuarioAPI(localStorage.getItem('id_user'));
    const arrayGeneracionesObject = [];
    let contador = 0;
    generacionesDB.map(async generacion => {
      arrayGeneracionesObject.push(await GetGeneracionUsuarioAPI(generacion.generacion))
      contador = contador + 1;
      if (contador === generacionesDB.length) {
        setGeneraciones(arrayGeneracionesObject);
      }
      return true;
    })
  }

  const viewGeneracion = async (e) => {
    const id_generacion = e.target.id
    const TextosUsuario = await GetTextosUsuarioAPI(id_generacion)

    const arrayTextosUsuarioObject = [];
    const arrayPreguntasTexto = [];
    const arrayPreguntas = []
    const arrayPreguntasPaquete = []
    const arrayIDs = []

    let contador = 0;
    let id_texto = ""
    let id_pregunta = "";

    TextosUsuario.map(async generacion => {
      id_texto = generacion.generacion_texto
      arrayTextosUsuarioObject.push(await GetTextoAPI(id_texto));
      arrayPreguntasTexto.push(await GetPreguntasTextosAPI(id_texto));

      contador = contador + 1;
      if (contador === TextosUsuario.length) {

        setTextos(arrayTextosUsuarioObject);
        setPreguntas(arrayPreguntasTexto);
      }
      return true;
    })

    let arrayTextosPreguntas = []
    textos.map(texto => {
      arrayTextosPreguntas.push({ texto: texto[0].cuerpo_texto, preguntas: {} })
      return true;
    })
    setTextosPreguntas(arrayTextosPreguntas);
    //console.log(arrayIDs)
  }

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
        {/*  <button
          type="submit"
          className="md:text-base text-sm z-10 pl-1 block w-52 focus:outline-none bg-red-200 hover:bg-red-300 focus:bg-red-300 text-black rounded-lg px-2 py-2 font-semibold"
          onClick={handleClickPrueba}
        >
          Pruebas
                      </button> */}
        <div className="mt-10">

          <p className=" font-light text-gray-500">HISTORIAL DE GENERACIONES</p>
        </div>
        <ul className="divide-y divide-gray-300">
          {
            Generaciones.map((generacion, contador = 1) => (
              <li
                key={contador}
                className="py-4 rounded-xl hover:bg-gray-300 px-4 hover:bg-opacity-40 cursor-pointer font-bold">
                <div className="grid grid-rows-">
                  <p className="hidden sm:block">Generación número: {contador = contador + 1}</p>
                  <div className="grid grid-cols-12">
                    <p className="col-span-12 mb-4 sm:col-span-8 text-gray-500 text-sm">Públicado - {generacion[0].fecha_generacion} | Número de examenes: {generacion[0].n_examenes} | Número de preguntas: {generacion[0].n_preguntas * generacion[0].n_examenes}</p>
                    <div className="col-span-12 sm:col-span-4 place-self-center sm:place-self-end">
                      {/* <span className="material-icons mr-2">&#xe872;</span> */}
                      <span
                        className="hover:text-yellow-600 text-gray-900 material-icons mr-2"
                        onClick={viewGeneracion}
                        id={generacion[0].id}
                      >&#xe8f4;</span>

                      <span className="hover:text-yellow-600 text-gray-900 material-icons mr-2">&#xe8b8;</span>
                      <span className="hover:text-yellow-600 text-gray-900 material-icons mr-2">&#xf090;</span>
                    </div>
                  </div>
                </div>
              </li>)
            )
          }
        </ul>
      </div>
      <DropdownUser />
    </div>
  );


}