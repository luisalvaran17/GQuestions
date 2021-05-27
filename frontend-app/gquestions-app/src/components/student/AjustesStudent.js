import React, { useEffect, useRef, useState } from 'react';
import '../../assets/styles/tailwind.css';
import backgroundGeneralYellowDark from "../../assets/images/background-general-yellow_dark.png";
import backgroundGeneralYellowLight from "../../assets/images/background-general-yellow_light.png";
import { Helmet } from 'react-helmet';
import { RadioGroup } from '@headlessui/react';
import { NavbarStudent } from './NavBarStudent';
import AOS from "aos";

const modes = [
  {
    id: 0,
    name: 'Modo Claro',
    description: 'Cambia toda la interfaz a modo claro',
    key: 'light_mode'
  },
  {
    id: 1,
    name: 'Modo oscuro',
    description: 'Cambia toda la interfaz a modo oscuro',
    key: 'dark_mode'
  },
]

export const AjustesStudent = () => {

  const navigation = [
    { name: 'Inicio', href: '#', current: false, id: 0 },
    { name: 'Mis calificaciones', href: '#', current: false, id: 1 },
    /* { name: 'Projects', href: '#', current: false }, */
    { name: 'Ajustes', href: '#', current: true, id: 2 },
  ];

  // Hooks dark mode
  const darkModeRef = useRef();
  const [darkModeBool, setDarkModeBool] = useState(localStorage.getItem('bool-dark'));
  const [selected, setSelected] = useState(modes[0])


  useEffect(() => {
    AOS.init({
      duration: 800,
    })

    if (localStorage.theme === 'dark') {
      setDarkModeBool(true);
      setSelected(modes[1])
      darkModeRef.current.classList.add('dark')
    } else {
      setDarkModeBool(false);
      setSelected(modes[0])
      darkModeRef.current.classList.remove('dark')
    }

    if (darkModeRef.current !== undefined) {
      if (localStorage.theme === 'dark') {
        darkModeRef.current.classList.add('dark');
        localStorage.setItem('bool-dark', true);
        setDarkModeBool(true);
      } else {
        darkModeRef.current.classList.remove('dark');
        setDarkModeBool(false);
      }
    }
  }, [])

  const handleDarkMode = (e) => {
    setSelected(modes[e.id])
    const key = e.key;
    console.log(key)

    if (key === 'dark_mode') {
      localStorage.setItem("theme", "dark");
      localStorage.setItem('bool-dark', true);
      darkModeRef.current.classList.add("dark");
      setDarkModeBool(true);
    }
    else if (key === 'light_mode') {
      localStorage.removeItem("theme", "dark");
      localStorage.removeItem('bool-dark');
      darkModeRef.current.classList.remove("dark");
      setDarkModeBool(false);
    }
  }

  return (
    <div className="">

      <div
        ref={darkModeRef}
        className="container h-screen w-screen font-manrope"
        style={{
          backgroundImage: `url(${darkModeBool ? backgroundGeneralYellowDark : backgroundGeneralYellowLight})`,
          width: "100%",
          height: "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "",
          minWidth: "100%",
        }}>
        <NavbarStudent navigation={navigation} />

        <Helmet>
          <title>Ajustes - GQuestions</title>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"></link>
        </Helmet>


        <div className='container mx-auto xl:pl-32 px-1 sm:px-8 py-8 md:px-8 lg:pl-16 sm:mr-32 dark:text-white' style={{ height: "80vh"}}>
          <h1 className='font-black xl:text-5xl md:text-4xl text-2xl md:text-left mb-4'>
            Ajustes
          </h1>
          <h1 className='font-black text-gray-500 dark:text-gray-400 xl:text-2xl md:text-xl text-lg md:text-left md:mb-10'>
            Preferencias de tema
          </h1>
          <p className="text-gray-500 font-semibold text-sm md:text-base dark:text-gray-200 sm:mb-6 mb-6">
            Seleccione un solo tema, cambie automáticamente entre temas diurnos y nocturnos.
        </p>
          <RadioGroup value={selected} onChange={handleDarkMode} className="xl:mr-96 lg:mr-52">
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2">
              {modes.map((mode) => (
                <RadioGroup.Option
                  key={mode.name}
                  value={mode}
                  className={({ active, checked }) =>
                    `${active
                      ? 'ring-2 ring-offset-2 ring-offset-yellowmain ring-white ring-opacity-60'
                      : ''
                    }
                  ${checked
                      ? 'bg-yellowlight text-black'
                      : 'bg-white dark:bg-darkGrayColor2 border border-yellowlight dark:border-gray-700'
                    }
                    text-whiterelative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${checked ? 'text-black' : 'text-gray-900 dark:text-gray-300'
                                }`}
                            >
                              {mode.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${checked ? 'text-yellow-900' : 'dark:text-gray-400 text-gray-600'
                                }`}
                            >
                              <span>{mode.description}

                              </span>
                              <span aria-hidden="true">&middot;</span>
                              <span></span>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="flex-shrink-0">
                            <CheckIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#000" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}