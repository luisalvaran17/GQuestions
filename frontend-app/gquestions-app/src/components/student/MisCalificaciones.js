import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavbarStudent } from './NavBarStudent';
import backgroundGeneralYellowDark from "../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../assets/images/background-general-yellow_light.png";

export const MisCalificaciones = () => {

    const navigation = [
        { name: 'Inicio', href: '#', current: false, id: 0 },
        { name: 'Mis calificaciones', href: '#', current: true, id: 1 },
        /* { name: 'Projects', href: '#', current: false }, */
        { name: 'Ajustes', href: '#', current: false, id: 2 },
    ];

    const darkModeRef = useRef();
    const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));

    useEffect(() => {
        if (localStorage.theme === 'dark') {
            setDarkModeBool(true);
            darkModeRef.current.classList.add('dark')
        } else {
            setDarkModeBool(false);
            darkModeRef.current.classList.remove('dark')
        }
    }, [])

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
            </Helmet>
            <div className="h-screen">
                <div className="">
                    <NavbarStudent navigation={navigation} />

                </div>
                <div
                    style={{ height: "80vh" }}
                    className='container mx-auto xl:pl-32 px-1 sm:px-8 py-8 md:px-8 lg:pl-16 sm:mr-32 dark:text-white'>

                    <div className="grid grid-rows">
                        <h1 className='font-black xl:text-5xl md:text-4xl text-2xl md:text-left md:mb-10 '>
                            Calificaciones
                        </h1>
                        <p className="text-gray-500 font-semibold text-sm md:text-base dark:text-gray-200 sm:mb-10 mb-0">
                            Aquí puedes visualizar tus calificaciones por examen.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

