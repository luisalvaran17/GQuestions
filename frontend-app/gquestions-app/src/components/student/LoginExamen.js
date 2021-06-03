import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router';
import { Helmet } from "react-helmet";
import backgroundGeneralGreenDark from "../../assets/images/background-general-green_dark.png";
import backgroundGeneralGreenLight from "../../assets/images/background-general-green_light.png";
import emptyImage from '../../assets/images/empty_generaciones.png';
import { GetGeneracionExamen } from '../../api/Generacion/GetGeneracionExamen';
import { GetExamenAssignedAPI } from '../../api/Examen/GetExamenAssignedAPI';
import { UpdateExamenAPI } from '../../api/Examen/UpdateExamenAPI';
import { NavbarStudent } from './NavBarStudent';
import { useHistory } from 'react-router';
import { LoadingPage } from '../../containers/LoadingPage';

export const LoginExamen = () => {

    const navigation = [
        { name: 'Inicio', href: '#', current: true, id: 0 },
        { name: 'Mis calificaciones', href: '#', current: false, id: 1 },
        /* { name: 'Projects', href: '#', current: false }, */
        { name: 'Ajustes', href: '#', current: false, id: 2 },
    ];

    // Hooks Generacion 
    const [generacionExamen, setGeneracionExamen] = useState([])
    const [passwordExamen, setPasswordExamen] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [informacionExamen, setInformacionExamen] = useState([])

    const history = useHistory();
    const divRefErrorMessage = useRef();
    const [isLoading, setIsLoading] = useState(true);

    const [examenDisponible, setExamenDisponible] = useState(true);

    // Hooks dark mode
    const darkModeRef = useRef();
    const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

    const location = useLocation();
    const [messageAlert, setMessageAlert] = useState("")

    useEffect(() => {
        if (localStorage.theme === 'dark') {
            setDarkModeBool(true);
            darkModeRef.current.classList.add('dark')
        } else {
            setDarkModeBool(false);
            darkModeRef.current.classList.remove('dark')
        }
        setIsLoading(false);
        getCodeGeneracion();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCodeGeneracion = () => {
        let split_location = location.pathname.split("/");
        let cod_generacion = split_location[split_location.length - 1]

        getExamenes(cod_generacion)
    }

    const getExamenes = async (cod_generacion) => {
        setIsLoading(true);
        let generacion_response = await GetGeneracionExamen(cod_generacion);
        if (generacion_response !== false) {
            generacion_response.map(objeto => {
                let configuracion_examen = objeto.generacion_examenes[0]
                setPasswordExamen(configuracion_examen.contrasena_exam)
                setGeneracionExamen(configuracion_examen.examenes);
                

                // Comprueba que el examen aun esté disponible
                let dateNow = new Date();
                let dateInicio = new Date(configuracion_examen.fecha_hora_ini);
                let dateFin = new Date(configuracion_examen.fecha_hora_fin);
                let duracion = dateFin.getHours() - dateInicio.getHours()
                console.log(duracion)
                if (dateNow >= dateInicio && dateNow <= dateFin) {
                    setExamenDisponible(true);
                } else if (dateNow < dateInicio) {

                }
                else if (dateNow >= dateFin) {
                    setExamenDisponible(false);
                }
                setInformacionExamen(

                    Object.assign(informacionExamen, {
                        fecha: dateNow.toDateString(),
                        fecha_hora_ini: dateInicio.getHours() + ":" + dateInicio.getMinutes(),
                        fecha_hora_fin: dateFin.getHours() + ":" + dateFin.getMinutes(),
                        duracion: duracion,
                    })
                );

                return true;
            })
            setIsLoading(false);
        }
        else {
            generacion_response = []
        }
    }

    const handleClickLogin = async () => {
        //console.log(generacionExamen);
        let examen = {}
        let assigned_to = { assigned_to: null }

        if (passwordExamen === passwordInput) {

            for (let i = 0; i < generacionExamen.length; i++) {
                examen = generacionExamen[i];

                if (examen.assigned_to === null) {
                    setIsLoading(true);
                    const response_assigned = await GetExamenAssignedAPI(examen.id_examen);
                    if (response_assigned) {
                        assigned_to = { assigned_to: localStorage.getItem('id_user') }
                        const response = UpdateExamenAPI(examen.id_examen, assigned_to)
                        if (response) {
                            localStorage.setItem('id_examen', examen.id_examen);
                            history.push('/student/examen')
                            break;
                        }
                        setIsLoading(false);
                    }

                    else {
                        i = 0;
                    }
                } else {
                    setMessageAlert("Ya todos los exámenes fueron asignados")
                    removeClassdivRefErrorMessage();
                }
            }
        }
        else {
            setMessageAlert("La contraseña no coincide")
            removeClassdivRefErrorMessage();
        }
    }

    const handleChangePassword = (e) => {
        let value = e.target.value;
        setPasswordInput(value);
    }

    // Las dos siguientes funciones lo que haces es mostrar u ocultar un  div que contiene los mensajes de error (validaciones)
    // de los inputs 
    const addClassdivRefErrorMessage = () => {
        divRefErrorMessage.current.classList.add("hidden");
    };

    const removeClassdivRefErrorMessage = () => {
        divRefErrorMessage.current.classList.remove("hidden");
    };

    return (
        <div
            ref={darkModeRef}
            className="container w-screen h-screen font-manrope"
            style={{
                backgroundImage: `url(${darkModeBool ? backgroundGeneralGreenDark : backgroundGeneralGreenLight})`,
                width: "100%",
                height: "",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight: "",
                minWidth: "100%",
            }}
        >
            <Helmet>
                <title>Examen - GQuestions</title>
            </Helmet>
            <NavbarStudent className="fixed" navigation={navigation} />

            <div className="lg:mx-auto sm:mx-24 mx-8 max-w-4xl justify-center items-center" style={{ height: "60vh", marginTop: "12%" }}>
                {!isLoading &&

                    <div className="">

                        {examenDisponible === true &&
                            <div className="grid grid-cols-12 bg-gray-50 bg-opacity-40 dark:bg-darkGrayColor2 dark:bg-opacity-100 dark:border-gray-700 shadow rounded-3xl">
                                <div className="md:col-span-8 col-span-12 py-16 px-3 border-rdark:border-gray-700 border border-gray-200 dark:border-gray-600 md:rounded-l-3xl md:rounded-t-none rounded-t-3xl">
                                    <div className="grid cols-span-12 px-4 md:px-16">
                                        <h1 className="font-black xl:text-2xl text-center md:text-xl sm:text-xl text-xl mb-6 dark:text-gray-100 uppercase">
                                            ingresa al examen
                                    </h1>
                                    </div>

                                    <div className="grid text-center w-full sm:px-16 px-4 md:px-16 col-span-12">
                                        <input
                                            type="password"
                                            id="password"
                                            className="text-center text-md text-gray-700 font-semibold sm:col-span-6 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-green-300  px-4 py-2 border-green-300 outline-none focus:border-green-500 bg-white shadow"

                                            name="password"
                                            onChange={handleChangePassword}
                                            placeholder="Introduce la contraseña del examen"
                                        />
                                    </div>

                                    {/* Error messages */}
                                    <div className="sm:px-16 px-4 md:px-16 col-span-12 my-0">

                                        <div
                                            ref={divRefErrorMessage}
                                            className="hidden animate-pulse mt-2 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
                                            role="alert"
                                        >
                                            <div id="error_messages" className="text-sm md:text-base">
                                                <p>{messageAlert}</p>
                                            </div>

                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center mr-4"
                                                onClick={addClassdivRefErrorMessage}
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


                                    <div className="py-4 sm:px-16 px-4 md:px-16 col-span-12 my-0">
                                        <button
                                            type="submit"
                                            className="transition duration-500 text-base z-10 pl-1 block w-full mx-auto focus:outline-none bg-green-400 uppercase
                                            hover:bg-green-500 focus:bg-green-500 text-black rounded-lg px-2 py-2 font-semibold"
                                            onClick={handleClickLogin}
                                        >
                                            Ingresar
                                    </button>
                                    </div>
                                </div>
                                <div className="md:col-span-4 col-span-12 md:py-16 py-6 px-3 bg-green-400 dark:bg-green-500 md:rounded-r-3xl md:rounded-b-none rounded-b-3xl">
                                    <div className="grid cols-span-12 mx-4">
                                        <h1 className="font-black xl:text-xl  md:text-xl sm:text-xl text-xl mb-6 dark:text-black uppercase">
                                            Información
                                    </h1>
                                        <ul>
                                            <li className="text-left dark:text-black">
                                                <p>Fecha: {informacionExamen.fecha}</p>
                                                <p>Hora de inicio: {informacionExamen.fecha_hora_ini}</p>
                                                <p>Hora de finalización: {informacionExamen.fecha_hora_fin}</p>
                                                <p>Duración: {informacionExamen.duracion}</p>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                        }{examenDisponible === false &&
                            <div className='py-40 px-6 select-none'>
                                <p className="dark:text-gray-200 text-gray-800 text-center">Oops, llegaste tarde... este examen ya no se encuentra disponible</p>
                                <img src={emptyImage} alt="empty" className="md:w-96 py-8 sm:w-64 w-64" style={{ display: "block", margin: "auto" }}></img>
                            </div>
                        }
                    </div>
                }{isLoading &&
                    <div>
                        <LoadingPage />
                    </div>}
            </div>
        </div >
    )
}
