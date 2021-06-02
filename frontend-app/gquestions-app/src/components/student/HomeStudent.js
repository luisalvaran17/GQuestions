import React, { useEffect, useRef } from 'react';
import { NavbarStudent } from './NavBarStudent';
import { Helmet } from "react-helmet";

export const HomeStudent = () => {

    const darkModeRef = useRef();

    useEffect(() => {
        if (localStorage.theme === 'dark') {
            darkModeRef.current.classList.add('dark')
        } else {
            darkModeRef.current.classList.remove('dark')
        }
    }, []);

    // Hooks dark mode
    const navigation = [
        { name: 'Inicio', href: '#', current: true, id: 0 },
        { name: 'Mis calificaciones', href: '#', current: false, id: 1 },
        /* { name: 'Projects', href: '#', current: false }, */
        { name: 'Ajustes', href: '#', current: false, id: 2 },
    ];

    return (
        <div ref={darkModeRef} className="h-screen">
            <Helmet>
                <title>Inicio - GQuestions</title>
            </Helmet>
            <div className="h-screen bg-white dark:bg-darkColor">
                <div className="font-manrope">
                    <NavbarStudent navigation={navigation} />

                </div>
            </div>
        </div>
    )
}
