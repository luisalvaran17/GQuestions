import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavbarStudent } from './NavBarStudent';
import backgroundGeneralYellowDark from "../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../assets/images/background-general-yellow_light.png";
import { GetExamenesEstudianteAPI } from '../../api/Examen/GetExamenesEstudianteAPI';
import { GetConfiguracionExamenAPI } from '../../api/Examen/GetConfiguracionExamenAPI';
import Scrollbars from "react-custom-scrollbars";
import { LoadingPage } from '../../containers/LoadingPage';
import { GetCalificacionExamenAPI } from '../../api/Calificacion/GetCalificacionExamenAPI';
import { useHistory } from 'react-router';

export const MisCalificaciones = () => {

    const navigation = [
        { name: 'Inicio', href: '#', current: false, id: 0 },
        { name: 'Mis calificaciones', href: '#', current: true, id: 1 },
        /* { name: 'Projects', href: '#', current: false }, */
        { name: 'Ajustes', href: '#', current: false, id: 2 },
    ];

    const darkModeRef = useRef();
    const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

    const [ExamenesUsuario, setExamenesUsuario] = useState([])

    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        if (localStorage.theme === 'dark') {
            setDarkModeBool(true);
            darkModeRef.current.classList.add('dark')
        } else {
            setDarkModeBool(false);
            darkModeRef.current.classList.remove('dark')
        }
        setIsLoading(false);
        getExamenesUsuarioFromDB();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getExamenesUsuarioFromDB = async () => {

        setIsLoading(true);

        let account = localStorage.getItem('id_user');
        let examenes = await GetExamenesEstudianteAPI(account);
        console.log(examenes)
        let examen_usuario = {}

        examenes.map(async examen => {
            const response_configuracion_examen = await GetConfiguracionExamenAPI(examen.examen_configuracion);
            const response_calificacion = await GetCalificacionExamenAPI(examen.id_examen);
            if (response_calificacion.length !== 0) {
                examen_usuario = {
                    id_examen: examen.id_examen,
                    title_exam: response_configuracion_examen[0].title_exam,
                    contestado: examen.fecha_contestado,
                    n_intentos: response_configuracion_examen[0].n_intentos,
                    duracion: response_configuracion_examen[0].duracion,
                    calificacion: response_calificacion[0].nota,
                }

                setExamenesUsuario(response_configuracion_examen => [...response_configuracion_examen, examen_usuario]);
            }
        })

        ExamenesUsuario.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.fecha_hora_ini) - new Date(b.fecha_hora_ini);
          });
        
        
        console.log(ExamenesUsuario)
        setIsLoading(false);
        return examenes;
    }
    

    function FormatDateFunction(date) {
        var dateFormat = require('dateformat');
        var now = date;
        var date_custom = dateFormat(now);
        return date_custom;
    }

    const handleTestClick = () => {
        console.log(ExamenesUsuario)
    }

    const handleClickExamen  = e => {
        let id_examen = e.target.id;
        localStorage.setItem('id_examen', id_examen);
        history.push('/user/revision-examen');
        console.log(id_examen);
    }

    return (
        <div ref={darkModeRef}
            className="h-screen font-manrope"
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
                <title>Inicio - GQuestions</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"></link>
            </Helmet>
            <div className="h-screen">
                <div className="">
                    <NavbarStudent navigation={navigation} />

                </div>
                <div
                    style={{ height: "80vh" }}
                    className='container max-w-7xl mx-auto sm:pl-12 sm:pr-8 px-6 py-8 dark:text-white'>

                    <div className="grid grid-rows">
                        <h1 className='font-black xl:text-5xl md:text-4xl text-2xl md:text-left mb-4 '>
                            Calificaciones
                        </h1>
                        <p className="text-gray-500 font-semibold text-sm md:text-base dark:text-gray-200 mb-4">
                            Aquí puedes visualizar tus calificaciones por examen.
                        </p>
                        <div className="grid grid-cols-12 bg-yellowlight rounded-t-xl border-t">

                            <div className="col-span-10 pl-4 bg-yellowlight rounded-t-xl py-2 text-yellow-900 font-semibold " onClick={handleTestClick}>Todos los exámenes</div>
                            <div className="col-span-2 pl-4 bg-yellowlight rounded-tr-xl py-2 text-yellow-900 font-semibold text-center"></div>

                        </div>

                        <CustomScrollbars
                            /* className={generacionesEmpty ? 'hidden' : 'container'} */
                            className="bg-white bg-opacity-50 dark:bg-darkColor dark:bg-opacity-100 border dark:border-gray-800 rounded-b-xl"
                            autoHide
                            autoHideTimeout={900}
                            autoHideDuration={400}
                            style={{ height: '60vh' }}>


                            {!isLoading &&
                                <ul>
                                    {
                                        ExamenesUsuario.map((examen, contador = 1) => (
                                            <li
                                                key={contador}
                                                id={examen.id_examen}
                                                onClick={handleClickExamen}
                                                className="duration-500 pt-6 pb-4 hover:bg-gray-200 pl-4 pr-8 hover:bg-opacity-40 
                                                cursor-pointer font-bold border-b border-gray-300 dark:border-gray-700 dark:hover:bg-opacity-10">
                                                <div className="grid transition pointer-events-none" >
                                                    <div className="grid grid-cols-12">
                                                        <div className="sm:col-span-10 col-span-12">
                                                            <p className="hidden sm:block">Examen {examen.title_exam}</p>
                                                            <p className="col-span-12 mb-4 sm:col-span-8 text-gray-500 text-sm dark:text-gray-400">Contestado: {FormatDateFunction(examen.contestado)} | Intentos: {examen.n_intentos} | Duración: {examen.duracion / 3600} h</p>
                                                        </div>

                                                        <div className="sm:col-span-2 col-span-12 sm:justify-self-end place-self-center ">
                                                            <div className="flex mr-2">

                                                                <div className="tooltip select-none">
                                                                    <p className="ml-2 transition duration-500 hover:text-yellow-800 font-semibold text-gray-900 dark:text-gray-50 dark:hover:text-yellowlight mr-2">
                                                                        {examen.calificacion}
                                                                    </p>
                                                                    <span className="tooltiptext text-sm">Nota</span>

                                                                </div>
                                                                <div className="tooltip select-none">
                                                                    <span
                                                                        className="ml-2 transition duration-500 hover:text-yellowmain text-yellow-900 dark:text-gray-50 dark:hover:text-yellowmain material-icons mr-2"
                                                                    >&#xe5cc;
                                                                 </span>
                                                                    <span className="tooltiptext text-sm">Visualizar</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </li>)
                                        )
                                    }
                                </ul>
                            }{isLoading &&
                                <div className="pt-52">
                                    <LoadingPage />
                                </div>}
                        </CustomScrollbars>
                    </div>
                </div>
            </div>
        </div>
    )
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