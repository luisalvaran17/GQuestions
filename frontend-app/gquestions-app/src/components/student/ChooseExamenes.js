import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router';
import { Helmet } from "react-helmet";
import backgroundGeneralGreenDark from "../../assets/images/background-general-green_dark.png";
import backgroundGeneralGreenLight from "../../assets/images/background-general-green_light.png";
import { GetGeneracionExamen } from '../../api/Generacion/GetGeneracionExamen';
import { GetExamenAPI } from '../../api/Examen/GetExamenAPI';
import { UpdateExamenAPI } from '../../api/Examen/UpdateExamenAPI';

export const ChooseExamenes = () => {

    // Hooks Generacion 
    const [generacionExamen, setGeneracionExamen] = useState([])
    const [passwordExamen, setPasswordExamen] = useState("")

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
        getCodeGeneracion();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCodeGeneracion = () => {
        let split_location = location.pathname.split("/");
        let cod_generacion = split_location[split_location.length - 1]

        getExamenes(cod_generacion)
    }

    const getExamenes = async (cod_generacion) => {
        const generacion_response = await GetGeneracionExamen(cod_generacion);

        generacion_response.map(objeto => {
            let configuracion_examen = objeto.generacion_examenes[0]
            setPasswordExamen(configuracion_examen.contrasena_exam)
            setGeneracionExamen(configuracion_examen.examenes);
            return true;
        })
    }

    const handleClick = async() => {
        console.log(generacionExamen);
        console.log(passwordExamen)
        let examen = {}
        let assigned_to = {assigned_to: null}

        for (let i = 0; i < generacionExamen.length; i++) {
            examen = generacionExamen[i];
            
            if (examen.assigned_to === null) {
                const response_assigned = await GetExamenAPI(examen.id_examen);
                if (response_assigned) {
                    assigned_to = {assigned_to:localStorage.getItem('id_user')}
                    const response = UpdateExamenAPI(examen.id_examen, assigned_to)
                    if (response) {
                        break;
                    }
                    // todo: update assigned value on db
                    console.log(response_assigned);
                }
                else {
                    i = 0;
                }
                // todo: update assigned value on db
            }
        }
    }

    return (
        <div
            ref={darkModeRef}
            className="flex container w-screen font-manrope"
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
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"></link>
            </Helmet>
            <div className="container mx-auto flex justify-center items-center" style={{ height: "100vh" }}>
                <div className="">
                    <div className="grid text-center cols-span-12 mx-4">
                        <h1 className="font-bold xl:text-5xl  md:text-4xl sm:text-3xl text-xl mb-8 dark:text-gray-100">
                            Contraseña del examen
                        </h1>
                    </div>

                    <div className="grid text-center w-full px-12 md:px-44 col-span-12">
                        <input
                            type="password"
                            id="cod_generado"
                            className="text-center text-md text-gray-700 font-semibold sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                                  focus:ring-green-300 w-96 px-4 py-2 border-green-300 outline-none focus:border-green-500 bg-white shadow"

                            name="cod_generado"
                            placeholder="Introduce la contraseña del examen"
                        />
                    </div>

                    <div className="py-4 px-12 md:px-44 col-span-12 my-0">
                        <button
                            type="submit"
                            className="transition duration-500 text-base z-10 pl-1 block w-full mx-auto focus:outline-none bg-green-400 uppercase
                             hover:bg-green-500 focus:bg-green-500 text-black rounded-lg px-2 py-2 font-semibold"
                            onClick={handleClick}
                        >
                            Ingresar
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
