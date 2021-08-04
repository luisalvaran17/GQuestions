import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavbarStudent } from './NavBarStudent';
import backgroundGeneralYellowDark from "../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../assets/images/background-general-yellow_light.png";
import { Footer } from '../../components/home/Footer';

export const EncuestaStudent = () => {

    const navigation = [
        { name: 'Inicio', href: '#', current: false, id: 0 },
        { name: 'Mis calificaciones', href: '#', current: false, id: 1 },
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
                <title>Encuesta - GQuestions</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"></link>
            </Helmet>
            <div className="h-screen">
                <div className="sticky top-0">
                    <NavbarStudent navigation={navigation} />
                </div>

                <div
                    style={{ height: "80vh" }}
                    className='container max-w-7xl mx-auto sm:pl-12 sm:pr-8 px-6 py-8 dark:text-white'>

                    <div className="grid grid-rows">
                        
                        <div
                            style={{ height: "75vh" }}
                            className='container bg-gray-100 dark:bg-darkColor bg-opacity-20 dark:bg-opacity-40 rounded-xl shadow border 
                            border-gray-200 dark:border-gray-700 
                            
                            max-w-7xl mx-auto sm:pl-12 sm:pr-8 px-6 py-8 dark:text-white'>

                            <iframe
                                title="Encuesta usabilidad"
                                src="https://docs.google.com/forms/d/e/1FAIpQLSfMRBeuZRKdHb0oF0Go2QDmF3csaXvLCXdTfVHQoS3Uao0kSQ/viewform?embedded=true"
                                className="w-full h-full"
                                frameborder="0"
                                marginheight="0"
                                marginwidth="0">Cargando…
                        </iframe>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}