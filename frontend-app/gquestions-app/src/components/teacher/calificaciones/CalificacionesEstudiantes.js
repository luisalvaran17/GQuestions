import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar';
import '../../../assets/styles/tailwind.css';
import Scrollbars from "react-custom-scrollbars";
import { Helmet } from 'react-helmet';
import backgroundGeneralYellowDark from "../../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../../assets/images/background-general-yellow_light.png";
import { DropdownUser } from '../user/DropdownUser';
import { LoadingPage } from '../../../containers/LoadingPage';
import { GetExamenesFromConfiguracionAPI } from '../../../api/Examen/GetExamenesFromConfiguracionAPI';
import { GetCalificacionExamenAPI } from '../../../api/Calificacion/GetCalificacionExamenAPI';
import { GetUserAPI } from '../../../api/Usuario/GetUserAPI';
import { useHistory, useLocation } from 'react-router';

export const CalificacionesEstudiantes = () => {

    const darkModeRef = useRef();
    const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

    const [isLoading, setIsLoading] = useState(true);

    const [examenes, setCalificaciones] = useState([])

    const location = useLocation();
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
        getExamenesFromDB();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getExamenesFromDB = async () => {

        setIsLoading(true);

        let split_location = location.pathname.split("/");
        let id_configuracion_examen = split_location[split_location.length - 1];
        const response_examen = await GetExamenesFromConfiguracionAPI(id_configuracion_examen);

        if (response_examen !== false) {
            response_examen.map(async examen => {
                let nombre_estudiante = '-';
                let correo_estudiante = '-';
                let nota = '-';
                let fecha_contestado = '-';

                if (examen.assigned_to !== null) {
                    let user = await GetUserAPI(examen.assigned_to);
                    nombre_estudiante = user.first_name + " " + user.last_name;
                    nombre_estudiante = capitalizeTheFirstLetterOfEachWord(nombre_estudiante);
                    correo_estudiante = user.email;
                } else {
                }

                if (examen.contestado === true) {
                    let examen_response = await GetCalificacionExamenAPI(examen.id_examen);
                    if (examen_response.length !== 0) {    // to do: revisar
                        nota = examen_response[0].nota;
                    }
                }

                if (examen.fecha_contestado === null) {
                    fecha_contestado = '-';
                } else {
                    fecha_contestado = examen.fecha_contestado;
                }

                let examen_usuario = {
                    assigned_to: examen.assigned_to,
                    contestado: examen.contestado,
                    id_examen: examen.id_examen,
                    fecha_contestado: fecha_contestado,
                    id_texto: examen.texto,
                    usuario: {
                        nombre: nombre_estudiante,
                        correo: correo_estudiante,
                    },
                    nota: nota,
                }
                setCalificaciones(response_examen => [...response_examen, examen_usuario]);
            })
            setIsLoading(false);
        }
    }

    const handleClickTest = () => {
        console.log(examenes)
    }

    function capitalizeTheFirstLetterOfEachWord(words) {
        var separateWord = words.toLowerCase().split(' ');
        for (var i = 0; i < separateWord.length; i++) {
            separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
                separateWord[i].substring(1);
        }
        return separateWord.join(' ');
    }

    function FormatDateFunction(date) {
        var dateFormat = require('dateformat');
        var now = date;
        var date_custom = dateFormat(now);
        return date_custom;
    }

    const handleClickExamen = e => {
        let id_examen = e.target.id;
        console.log(id_examen);
        history.push('/user/revision-examen/' + id_examen);
    }

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
                <title>Calficaciones examen - GQuestions</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"></link>
            </Helmet>

            <Navbar className="fixed" />
            <CustomScrollbars
                autoHide
                autoHideTimeout={900}
                autoHideDuration={400}
                style={{ height: "100vh" }}
                data-aos="fade-in"
                className='lg:text-base text-sm dark:text-white xl:mr-28'>


                <div className="grid grid-rows xl:pl-32 px-8 py-8 md:px-8 lg:pl-16">
                    <h1 className='font-black xl:text-5xl md:text-4xl text-2xl md:text-left md:mb-10 '>
                        Calificaciones
                    </h1>


                    <CustomScrollbars
                        className='container bg-white bg-opacity-50 dark:bg-darkColor dark:bg-opacity-50 border dark:border-gray-800 rounded-xl shadow-b'
                        autoHide
                        autoHideTimeout={900}
                        autoHideDuration={400}
                        style={{ height: "70vh" }}>

                        {/* <button className="btn-secondary" onClick={handleClickTest}>press me</button> */}
                        {!isLoading &&

                            <table className="min-w-max w-full table-auto">
                                <thead onClick={handleClickTest}>
                                    <tr className="text-gray-600 uppercase text-sm leading-normal border-b border-gray-200 dark:border-gray-800 dark:bg-darkGrayColor dark:text-white dark:bg-opacity-40">
                                        <th className="py-4 px-6 text-left">#</th>
                                        <th className="py-4 px-6 text-left">Fecha</th>
                                        <th className="py-4 px-6 text-left">Estudiante</th>
                                        <th className="py-4 px-6 text-center">Estado</th>
                                        <th className="py-4 px-6 text-center">Calificación</th>
                                        <th className="py-4 px-6 text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {
                                        examenes.reverse().map((examen, contador) => (
                                            <tr key={examen.id_examen} className={`${contador % 2 === 0 ? 'bg-gray-50 dark:bg-darkGrayColor2' : 'bg-gray-100 dark:bg-darkColor'} border-b bg-gray-50 border-gray-200 hover:bg-gray-100  dark:text-gray-300 dark:hover:bg-darkGrayColor`}>
                                                <td className="py-2 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="font-medium">{contador = contador + 1}</span>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-6 text-left">
                                                    <div className="flex items-center">
                                                        <span>{FormatDateFunction(examen.fecha_contestado)}</span>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-6 text-left">
                                                    <div className="items-center">
                                                        {/* <div className="mr-2">
                                                            <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" />
                                                        </div> */}
                                                        <p className="font-semibold">{examen.usuario.nombre}</p>
                                                        <p>{examen.usuario.correo}</p>
                                                    </div>
                                                </td>

                                                {examen.contestado === true &&
                                                    <td className="py-2 px-6 text-center">
                                                        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Contestado</span>
                                                    </td>
                                                }{examen.contestado === null && examen.assigned_to !== null &&
                                                    <td className="py-2 px-6 text-center">
                                                        <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">Sin contestar</span>
                                                    </td>
                                                }{examen.assigned_to === null &&
                                                    <td className="py-2 px-6 text-center">
                                                        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Sin asignar</span>
                                                    </td>
                                                }

                                                <td className="py-2 px-6 text-center">
                                                    <div className="flex items-center justify-center">
                                                        <p>{examen.nota}</p>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-6 text-center">
                                                    <div className="flex item-center justify-center">
                                                        {examen.contestado === true &&
                                                            <div className="flex">
                                                                <div className="w-5 mr-2 transform hover:text-yellow-500 hover:scale-110 cursor-pointer" id={examen.id_examen}
                                                                    onClick={handleClickExamen}>
                                                                    <svg
                                                                        className="pointer-events-none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none" viewBox="0 0 24 24"
                                                                        stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="w-5 mr-2 transform hover:text-yellow-500 hover:scale-110 cursor-pointer">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        }
                                                        {examen.contestado === null && examen.assigned_to !== null &&
                                                            <div className="w-5 mr-2 transform hover:text-yellow-500 hover:scale-110 cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </div>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                        }{isLoading &&
                            <div className="pt-52">
                                <LoadingPage />
                            </div>}
                    </CustomScrollbars>
                </div>
            </CustomScrollbars>
            <DropdownUser />
        </div >
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
