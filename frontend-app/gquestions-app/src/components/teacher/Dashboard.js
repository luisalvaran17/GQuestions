import React, { useEffect, useState } from 'react';
import Navbar from '../../containers/Navbar';
import '../../assets/styles/tailwind.css';
import { Helmet } from "react-helmet";
import AOS from "aos";
import backgroundGeneral from "../../assets/images/background-general_4x-register.png";
import { DropdownUser } from '../user/DropdownUser';
import { GetGeneracionesUsuarioAPI } from '../../api/Dashboard/GetGeneracionesUsuarioAPI';
import { useHistory } from 'react-router';
import { PrintGeneracion } from './PrintGeneracion';

export const Dashboard = () => {

  const [generaciones, setGeneraciones] = useState([])
  const history = useHistory();
  const [irDownload, setIrDownload] = useState(false)
  const [downloadGeneracion, setDownloadGeneracion] = useState([])

  useEffect(() => {
  }, []);

  const getGeneracionFromDB = async (id_generacion) => {
    let generacion = await fetch("http://127.0.0.1:8000/api/generacion/get/" + id_generacion, {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify()
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      }).catch(err => {
        console.log(err)
        return false;
      })
    return generacion;
  }


  useEffect(() => {
    AOS.init({
      duration: 800,
    })
    getGeneracionesFromDB();
  }, []);

  const getGeneracionesFromDB = async () => {

    setGeneraciones(await GetGeneracionesUsuarioAPI(localStorage.getItem('id_user')));
  }

  const onClickVerGeneracion = (e) => {
    history.push({
      pathname: '/teacher/visualizar-generacion',
      //search: '?query=abc',
      state: { id_generacion: e.target.id }
    })
  }

  const onClickDownload = async (e) => {
    let id_generacion = e.target.id;
    let generacion = await getGeneracionFromDB(id_generacion);
    console.log(generacion[0].generaciones_texto)
    setDownloadGeneracion(generacion[0].generaciones_texto)
    setIrDownload(true)
    console.log(downloadGeneracion.ir)
  }

  if (irDownload === false) {
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
          {/* <button
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
              generaciones.map((generacion, contador = 1) => (
                <li
                  key={contador}
                  className="py-4 rounded-xl hover:bg-gray-300 px-4 hover:bg-opacity-40 cursor-pointer font-bold">
                  <div className="grid grid-rows-">
                    <p className="hidden sm:block">Generación número: {contador = contador + 1}</p>
                    <div className="grid grid-cols-12">
                      <p className="col-span-12 mb-4 sm:col-span-8 text-gray-500 text-sm">Públicado - {generacion.fecha_generacion} | Número de examenes: {generacion.n_examenes} | Número de preguntas: {generacion.n_preguntas * generacion.n_examenes}</p>
                      <div className="col-span-12 sm:col-span-4 place-self-center sm:place-self-end">

                        <span
                          className="hover:text-yellow-600 text-gray-900 material-icons mr-2"
                          onClick={onClickVerGeneracion}
                          id={generacion.id}
                        >&#xe8f4;</span>
                        
                        <span
                          className="hover:text-yellow-600 text-gray-900 material-icons mr-2 border-l border-black px-2"
                          onClick={onClickDownload}
                          id={generacion.id}
                        >&#xe8ad;
                        <span 
                          className=" text-gray-900 material-icons mr-2 hover:text-yellow-600"
                          onClick={onClickDownload}
                          id={generacion.id}
                        >&#xf090;</span>
                      </span>
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
  }if (irDownload === true){
    return (
      <PrintGeneracion generacion={downloadGeneracion}/>
    )
  }


}


/*


*/