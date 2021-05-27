import React from 'react'
import { NavbarStudent } from './NavBarStudent'

export const HomeStudent = () => {
    const navigation = [
        { name: 'Inicio', href: '#', current: true, id:0 },
        { name: 'Mis calificaciones', href: '#', current: false, id:1 },
        /* { name: 'Projects', href: '#', current: false }, */
        { name: 'Ajustes', href: '#', current: false, id:2 },
      ];

    return (
        <div>
            <NavbarStudent navigation={navigation} />
        </div>
    )
}
