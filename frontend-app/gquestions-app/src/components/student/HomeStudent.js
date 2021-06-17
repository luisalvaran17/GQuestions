import React, { useEffect, useRef, useState } from 'react';
import { NavbarStudent } from './NavBarStudent';
import { Helmet } from "react-helmet";
import bbcEnglishImage from "../../assets/images/bbc_english.png";
import { useHistory } from 'react-router';
import { Footer } from '../../components/home/Footer';
import { GetUserAPI } from '../../api/Usuario/GetUserAPI';
import backgroundGeneralYellowDark from "../../assets/images/background-general-cyan_dark.png";
import backgroundGeneralYellowLight from "../../assets/images/background-general-cyan_light.png";

export const HomeStudent = () => {

    const darkModeRef = useRef();
    const history = useHistory();
    const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));
    const [nombreEstudiante, setNombreEstudiante] = useState('')

    useEffect(() => {
        if (localStorage.theme === 'dark') {
            setDarkModeBool(true);
            darkModeRef.current.classList.add('dark')
        } else {
            setDarkModeBool(false);
            darkModeRef.current.classList.remove('dark')
        }
        getEstudiante();
    }, []);

    // Hooks dark mode
    const navigation = [
        { name: 'Inicio', href: '#', current: true, id: 0 },
        { name: 'Mis calificaciones', href: '#', current: false, id: 1 },
        /* { name: 'Projects', href: '#', current: false }, */
        { name: 'Ajustes', href: '#', current: false, id: 2 },
    ];

    const getEstudiante = async () => {
        let id_user = localStorage.getItem('id_user');
        let user = await GetUserAPI(id_user);
        let name_user = user.first_name + " " + user.last_name;
        name_user = name_user.toLowerCase();
        setNombreEstudiante(name_user);
    }

    return (
        <div ref={darkModeRef} className="h-screen font-manrope"
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

                <div className="sticky top-0">
                    <NavbarStudent navigation={navigation} />
                </div>

                {/* Toolbar */}

                <div className='h-screen w-full flex overflow-hidden select-none container max-w-7xl mx-auto sm:pl-12 sm:pr-8 px-6 py-8 dark:text-white'
                    style={{ height: "80vh" }}>
                    <main
                        className="my-1 py-12 pb-2 px-10 flex-1 border-l border-t border-b bg-white dark:border-gray-800 dark:bg-transparent rounded-l-xl transition duration-500 ease-in-out overflow-y-auto">
                        <div className="flex flex-col text-3xl">
                            <span className="font-semibold">Hello,</span>
                            <span className="capitalize">{nombreEstudiante}</span>
                        </div>

                        <div className="flex">
                            <div
                                className="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col bg-white dark:bg-gray-600 rounded-lg">
                                <h3
                                    className="flex items-center pt-1 pb-1 px-4 text-lg font-semibold capitalize dark:text-gray-300">
                                    <span>recommended lessons</span>
                                    {/*                                     
                                    <button className="ml-2">
                                        <svg className="h-5 w-5 fill-current" viewBox="0 0 256 512">
                                            <path
                                                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
                                                0l-22.6-22.6c-9.4-9.4-9.4-24.6
                                                0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
                                                0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
                                                136c9.5 9.4 9.5 24.6.1 34z">
                                            </path>
                                        </svg>
                                    </button> */}
                                </h3>

                                <div>
                                    <ul className="pt-1 pb-2 px-3 overflow-y-auto">
                                        <li className="mt-2">
                                            <a
                                                className="p-5 flex flex-col justify-between bg-gray-100 dark:bg-gray-200 rounded-lg"
                                                href="/">
                                                <div
                                                    className="flex items-center justify-between font-semibold capitalize dark:text-gray-700">
                                                    <span>english lesson</span>

                                                    <div className="flex items-center">
                                                        {/* <svg
                                                            className="h-5 w-5 fill-current mr-1 text-gray-600"
                                                            viewBox="0 0 24 24">
                                                            <path
                                                                d="M14 12l-4-4v3H2v2h8v3m12-4a10
                                                                10 0 01-19.54 3h2.13a8 8 0
                                                                100-6H2.46A10 10 0 0122 12z">
                                                            </path>
                                                        </svg>
                                                        <span>4.2 mi</span> */}
                                                    </div>
                                                </div>

                                                <p
                                                    className="text-sm font-medium leading-snug text-gray-600 my-3">
                                                    Study basic grammar | Study intermediate grammar | Study upper-intermediate grammar |
                                                    Study advanced grammar | The Grammar Gameshow | 6 Minute Grammar - basic |
                                                    6 Minute Grammar - intermediate
                                                </p>

                                                <div className="flex justify-between">
                                                    <div className="flex">
                                                        {/* <img
                                                            className="h-6 w-6 rounded-full mr-3"
                                                            src="https://i.pinimg.com/originals/b7/06/0b/b7060b60f6ee1beeedf7d648dabd89a1.jpg"
                                                            alt="Issue" /> */}
                                                        <span>
                                                            <span
                                                                className="text-red-500 font-semibold">
                                                                BBC English
                                                            </span>
                                                            <span className="ml-2 text-darkGrayColor font-semibold">
                                                                Grammar
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <p
                                                        className="text-sm font-medium leading-snug text-gray-600">
                                                        Last month
									                </p>
                                                </div>

                                            </a>
                                        </li>
                                        <li className="mt-2">
                                            <a
                                                className="p-5 flex flex-col justify-between bg-gray-100 dark:bg-gray-200 rounded-lg"
                                                href="/">
                                                <div
                                                    className="flex items-center justify-between font-semibold capitalize dark:text-gray-700">
                                                    <span>english lesson</span>

                                                    <div className="flex items-center">
                                                        {/*   <svg
                                                            className="h-5 w-5 fill-current mr-1 text-gray-600"
                                                            viewBox="0 0 24 24">
                                                            <path
                                                                d="M14 12l-4-4v3H2v2h8v3m12-4a10
                                                                10 0 01-19.54 3h2.13a8 8 0
                                                                100-6H2.46A10 10 0 0122 12z">
                                                            </path>
                                                        </svg>
                                                        <span>4.2 mi</span> */}
                                                    </div>
                                                </div>

                                                <p
                                                    className="text-sm font-medium leading-snug text-gray-600 my-3">
                                                    Study basic vocabulary | Study intermediate vocabulary |
                                                    Improve your basic pronunciation | Improve your intermediate pronunciation
                                                </p>

                                                <div className="flex justify-between">
                                                    <div className="flex">
                                                        {/* <img
                                                            className="h-6 w-6 rounded-full mr-3"
                                                            src="https://i.pinimg.com/originals/b7/06/0b/b7060b60f6ee1beeedf7d648dabd89a1.jpg"
                                                            alt="Issue" /> */}
                                                        <span>
                                                            <span
                                                                className="text-red-500 font-semibold">
                                                                BBC English
                                                            </span>
                                                            <span className="ml-2 text-darkGrayColor font-semibold">
                                                                Vocabulary
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <p
                                                        className="text-sm font-medium leading-snug text-gray-600">
                                                        Last month
									                </p>
                                                </div>
                                            </a>
                                        </li>

                                        <div className="mt-2">
                                            <a
                                                href="https://www.bbc.co.uk/learningenglish/"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex justify-center text-sm font-semibold text-blue-500 dark:text-blue-200 w-full 
                                                transition duration-500 hover:bg-cyanlight py-2 px-8 hover:text-darkColor 
                                                rounded-lg dark:hover:text-darkColor outline-none focus:outline-none">
                                                <span>See more</span>
                                            </a>
                                        </div>
                                    </ul>

                                </div>
                            </div>

                            <div
                                className="mr-6 w-1/2 mt-8 py-2 flex-shrink-0 flex flex-col
				                bg-cyanlight rounded-lg text-white">
                                <h3
                                    className="flex items-center pt-1 pb-1 px-8 text-lg font-bold capitalize">
                                    <span className="text-darkColor">scheduled lessons</span>
                                    <button className="ml-2">
                                        <svg className="text-darkColor h-5 w-5 fill-current" viewBox="0 0 256 512">
                                            <path
                                                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
                                                0l-22.6-22.6c-9.4-9.4-9.4-24.6
                                                0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
                                                0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
                                                136c9.5 9.4 9.5 24.6.1 34z">
                                            </path>
                                        </svg>
                                    </button>
                                </h3>

                                <div className="flex flex-col items-center mt-12">
                                    <img
                                        className="w-80"
                                        src={bbcEnglishImage}
                                        alt="bbc english" />

                                    <span className="font-semibold mt-8 text-cyanmain">Practice your english</span>

                                    {/* <span className="text-cyanmain">
                                        learning english
					                </span> */}

                                    <div className="w-1/2">
                                        <a
                                            href="https://www.bbc.co.uk/learningenglish/"
                                            className="btn-primary mt-8"
                                            target="_blank"
                                            rel="noreferrer">
                                            Go
					                </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    <aside
                        className="w-1/4 my-1 mr-1 px-6 py-12 flex flex-col bg-gray-50 border-t border-r border-b dark:border-gray-700 
                        dark:bg-darkGrayColor2 dark:text-gray-400 rounded-r-xl overflow-y-auto">

                        <span className="mt-4 text-gray-600 dark:text-gray-400 font-black uppercase">Monthly exams</span>
                        <span className="mt-1 text-3xl font-semibold">18</span>

                        <button
                            className="transition duration-500 mt-8 flex items-center py-4 px-3 text-darkColor rounded-lg hover:bg-cyanmain hover:bg-opacity-500
			                bg-cyanlight shadow focus:outline-none"
                            onClick={() => { history.push('/student/ajustes') }}
                        >
                            <svg className="h-5 w-5 fill-current mr-6 ml-3" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
                            <span>Settings</span>
                        </button>

                        <div className="mt-12 flex items-center">
                            <span onClick={() => history.push('/student/calificaciones')}>Exams</span>
                            <button className="ml-2 focus:outline-none" onClick={() => history.push('/student/calificaciones')}>
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 256 512">
                                    <path
                                        d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
                                        0l-22.6-22.6c-9.4-9.4-9.4-24.6
                                        0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3
                                        103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1
                                        34z">
                                    </path>
                                </svg>
                            </button>
                        </div>

                        <a
                            href="/"
                            className="mt-8 p-4 flex justify-between bg-gray-300 rounded-lg
			                font-semibold capitalize">
                            <div className="flex">
                                <div className="flex flex-col ml-4">
                                    <span>Exam general</span>
                                    <span className="text-sm text-gray-600">english</span>
                                </div>
                            </div>
                            <span>4.25</span>
                        </a>

                        <a
                            href="/"
                            className="mt-2 p-4 flex justify-between bg-gray-300 rounded-lg
			                font-semibold capitalize">
                            <div className="flex">
                                <div className="flex flex-col ml-4">
                                    <span>Exam analysis</span>
                                    <span className="text-sm text-gray-600">english</span>
                                </div>
                            </div>
                            <span>5.0</span>
                        </a>

                        <a
                            href="/"
                            className="mt-2 p-4 flex justify-between bg-gray-300 rounded-lg
			                font-semibold capitalize">
                            <div className="flex">
                                <div className="flex flex-col ml-4">
                                    <span>Exam analysis</span>
                                    <span className="text-sm text-gray-600">english</span>
                                </div>
                            </div>
                            <span>5.0</span>
                        </a>

                        <div className="mt-4 flex justify-center">
                            <button className="w-full text-sm font-semibold text-blue-600 transition duration-500 hover:bg-cyanlight py-2 px-8 rounded-lg hover:text-darkColor
                            outline-none focus:outline-none"
                                onClick={() => history.push('/student/calificaciones')}
                            >See all</button>
                        </div>

                    </aside>
                </div>
                <Footer />
            </div>
        </div>
    )
}
