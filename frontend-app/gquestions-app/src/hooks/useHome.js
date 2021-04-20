import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const useHome = () => {
    const [logged, setLogged] = useState({})
    const checkLogged = () => {
        if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
            setLogged(false);
        }
        else {
            setLogged(true);
        }
    }

    useEffect(() => {
        checkLogged();

        AOS.init({
            duration: 500,
        });
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth',
                });
            })
        })
    }, []);

    return {
        logged
    }
}
