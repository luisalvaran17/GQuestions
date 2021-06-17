import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import { Helmet } from "react-helmet";
import Scrollbars from "react-custom-scrollbars";

export const VisualizacionGeneracion = () => {

    const [textosPreguntas, setTextosPreguntas] = useState([])
    const [preguntas, setPreguntas] = useState([])
    const [texto, setTexto] = useState("");

    const history = useHistory();

    const [examenTitle, setExamenTitle] = useState("Examen 1")
    const questionsTitle = useRef("Preguntas");


    // Hooks dark mode
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
        getGeneracionFromDB();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getGeneracionFromDB = async () => {
        const id_generacion = history.location.state.id_generacion;
        let generacion = await fetch("http://127.0.0.1:8000/api/generacion/get/" + id_generacion, {
            method: "GET",
            headers: {
                Authorization: "Token " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify()
        })
            .then((res) => res.json())
            .then((json) => {
                return json;
            }).catch(err => {
                console.log(err)
                return false;
            })

        setTextosPreguntas(generacion[0].generaciones_texto)
        setPreguntas(generacion[0].generaciones_texto[0].preguntas)
        setTexto(generacion[0].generaciones_texto[0].cuerpo_texto)
        return generacion;
    }

    const onClickExamen = e => {
        let id_texto = e.target.id;
        let contador = 0;
        textosPreguntas.map(async item => {
            contador = contador + 1
            if (id_texto === item.id_texto) {
                setPreguntas(item.preguntas);
                setTexto(item.cuerpo_texto)
                setExamenTitle("Examen " + contador)
            }
            return true;
        })
    }

    const handleClickVolver = () => {
        history.goBack();
    }

    return (
        <div
            ref={darkModeRef}
            className="flex container w-screen h-screen font-manrope"
            style={{
                backgroundColor: `${darkModeBool ? '#18191F' : '#ffffff'}`,
                width: "100%",
                height: "",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight: "",
                minWidth: "100%",
            }}>

            <CustomScrollbars
                autoHide
                autoHideTimeout={900}
                autoHideDuration={400}
                style={{ height: "90vh" }}
                className="container grid grid-rows md:mx-auto sm:px-16 px-8 my-10">
                <Helmet>
                    <title>Ver Generaciones - GQuestions</title>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"></link>
                    <link
                        href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
                        rel="stylesheet" type='text/css'></link>
                </Helmet>

                <div className="justify-self-end w-44 px-8">
                    <button
                        type="submit"
                        className="btn-back"
                        onClick={handleClickVolver}
                    >
                        Volver
                </button>

                </div>

                <div className="w-full flex justify-center mb-16 py-6 px-8">
                    <div className="w-full">
                        <div className="w-full flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg border dark:border-gray-700">
                            <div className="w-full md:w-1/4 ">
                                <div className="top flex items-center px-5 h-16 bg-yellowmain font-bold uppercase">
                                    <div className="ml-3 flex flex-col text-2xl">
                                        Exámenes
                                    </div>
                                </div>

                                <CustomScrollbars
                                    autoHide
                                    autoHideTimeout={900}
                                    autoHideDuration={400}
                                    style={{ height: "60vh" }}
                                    className="bg-gray-100 w-full h-full sm:flex md:block dark:bg-darkColor dark:text-white">
                                    {
                                        textosPreguntas.map((item, contador = 1) => (
                                            <button key={item.id_texto} id={item.id_texto} onClick={onClickExamen}
                                                className="transition duration-500 py-4 w-full flex justify-between items-center px-5 focus:outline-none hover:bg-gray-50 cursor-pointer
                                             hover:text-yellowmain font-bold dark:hover:bg-darkGrayColor dark:hover:text-yellowlight dark:focus:text-yellowlight
                                             dark:focus:bg-darkGrayColor focus:bg-gray-200">
                                                <span ><i className="fa fa-book mr-2" aria-hidden="true"></i>Examen {contador = contador + 1}</span>
                                            </button>
                                        ))
                                    }

                                </CustomScrollbars>
                            </div>


                            <div className="w-full md:w-3/4">
                                <div className="top flex items-center px-5 h-16 bg-yellowlight text-2xl uppercase">
                                    <div id="title-1" className="">
                                        <p>{examenTitle}</p>
                                    </div>
                                </div>

                                <CustomScrollbars
                                    autoHide
                                    autoHideTimeout={900}
                                    autoHideDuration={400}
                                    style={{ height: "60vh" }}
                                >
                                    <div className="w-full px-5 py-3 max-h-screen overflow-y-auto bg-white h-full">

                                        <h1 className="uppercase font-semibold">Text</h1>
                                        <p>{texto}</p>
                                        <br></br>
                                        <h1 ref={questionsTitle} className="uppercase font-semibold">Questions</h1>
                                        <ul>
                                            {
                                                preguntas.map(pregunta => (
                                                    <li key={pregunta.id_pregunta}>
                                                        <p>{pregunta.pregunta_cuerpo}</p>
                                                        <p>{pregunta.respuesta_correcta}</p>
                                                        <br></br>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </CustomScrollbars>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {
                textosPreguntas.map((item, contador = 1) => (
                    <div key={contador} className="grid grid-rows rounded-lg shadow-md my-1 p-4 gap-y-2">

                        <h1 className='font-black text-2xl uppercase'>Examen {contador = contador + 1}</h1>

                        <h1 className='text-xl uppercase'>Texto</h1>

                        <p>{item.cuerpo_texto}</p>

                        <h1 className='text-xl uppercase mt-2'>Preguntas</h1>

                        {
                            item.preguntas.map(pregunta => (

                                <div key={pregunta.id_pregunta} className="pb-2">
                                    <ul>
                                        <li className="border-b pb-2" >
                                            <p>{pregunta.pregunta_cuerpo}</p>
                                            <p>{pregunta.respuesta_correcta}</p>
                                        </li>
                                    </ul>
                                </div>
                            ))
                        }


                    </div>
                ))
            } */}
            </CustomScrollbars>
        </div>
    )
}

// Funciones que cambian el estilo del scroll y otras props de una librería
const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        borderRadius: 6,
        backgroundColor: 'rgba(35, 49, 86, 0.8)'
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = props => (
    <Scrollbars
        renderThumbHorizontal={renderThumb}
        renderThumbVertical={renderThumb}
        {...props}
    />
);