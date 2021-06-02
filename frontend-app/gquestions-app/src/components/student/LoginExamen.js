import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router';
import { Helmet } from "react-helmet";
import backgroundGeneralGreenDark from "../../assets/images/background-general-green_dark.png";
import backgroundGeneralGreenLight from "../../assets/images/background-general-green_light.png";
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

    const history = useHistory();
    const divRefErrorMessage = useRef();
    const [isLoading, setIsLoading] = useState(true);

    // Hooks dark mode
    const darkModeRef = useRef();
    const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

    const location = useLocation();

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

                            /*
                            // Put the object into storage
                            localStorage.setItem('examen', JSON.stringify(examen));

                            // Retrieve the object from storage
                            var retrievedObject = localStorage.getItem('examen');

                            console.log('retrievedObject: ', JSON.parse(retrievedObject)); 
                            */

                            history.push('/student/examen')
                            break;
                        }
                        setIsLoading(false);
                    }

                    else {
                        i = 0;
                    }
                    // todo: update assigned value on db
                }else{
                    console.log("Ya todos los exámenes fueron asignados") // todo: mostrar mensaje de que no hay exámenes disponibles
                }
            }
        }
        else {
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

            <div className="container mx-auto flex justify-center items-center" style={{ height: "80vh" }}>
                {!isLoading &&

                    <div className="">
                        <div className="grid text-center cols-span-12 mx-4">
                            <h1 className="font-bold xl:text-4xl  md:text-3xl sm:text-3xl text-xl mb-8 dark:text-gray-100">
                                Contraseña del examen
                        </h1>
                        </div>

                        <div className="grid text-center w-full px-12 md:px-16 col-span-12">
                            <input
                                type="password"
                                id="password"
                                className="text-center text-md text-gray-700 font-semibold sm:col-span-6 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-green-300 lg:w-96 md:w-80 px-4 py-2 border-green-300 outline-none focus:border-green-500 bg-white shadow"

                                name="password"
                                onChange={handleChangePassword}
                                placeholder="Introduce la contraseña del examen"
                            />
                        </div>

                        {/* Error messages */}
                        <div className="px-12 md:px-16 col-span-12 my-0">

                            <div
                                ref={divRefErrorMessage}
                                className="hidden animate-pulse mt-2 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
                                role="alert"
                            >
                                <div id="error_messages" className="text-sm md:text-base">
                                    <p>Contraseña incorrecta</p>
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


                        <div className="py-4 px-12 md:px-16 col-span-12 my-0">
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
                }{isLoading &&
                    <div>
                        <LoadingPage />
                    </div>}
            </div>
        </div >
    )
}
