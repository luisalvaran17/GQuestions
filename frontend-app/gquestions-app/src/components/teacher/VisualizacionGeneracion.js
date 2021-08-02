import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import { Helmet } from "react-helmet";
import Scrollbars from "react-custom-scrollbars";
import Navbar from './Navbar';
import { DropdownUser } from './user/DropdownUser';
import { BASE_DIR } from '../../api/BaseDirURl';

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
        let generacion = await fetch(BASE_DIR + "api/generacion/get/" + id_generacion, {
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


            <Navbar className="" />

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

                                        <h1 className="uppercase font-asap pb-1 text-lg">Text</h1>
                                        <p className="bg-gray-50 p-4 font-m rounded-xl shadow border border-gray-50">{texto}</p>
                                        <br></br>
                                        <h1 ref={questionsTitle} className="uppercase font-asap pb-1 text-lg">Questions (5)</h1>
                                        <ul>
                                            <div className="bg-gray-50 p-4 font-m rounded-xl shadow border border-gray-50">
                                            {
                                                preguntas.map((pregunta, contador = 1) => (
                                                    <div
                                                        
                                                        key={pregunta.id_pregunta}>
                                                        <p><b>Question: </b>{pregunta.pregunta_cuerpo}</p>
                                                        {pregunta.respuestas_cuerpo.opcion_multiple === 'null' &&
                                                            <p><b>Answer:</b> {pregunta.respuesta_correcta}</p>
                                                        }{pregunta.respuestas_cuerpo.opcion_multiple !== 'null' &&
                                                            <div>
                                                                <span><b>Options: </b>
                                                                    {pregunta.respuestas_cuerpo.opcion_multiple.split(',').map(option => (
                                                                        <span className="bg-gray-200 border rounded-lg px-1 mx-1">{option}</span>
                                                                    ))}
                                                                </span>
                                                                <p><b>Answer:</b> {pregunta.respuesta_correcta}</p>
                                                            </div>
                                                        }
                                                        <br></br>
                                                    </div>
                                                ))
                                            }

                                            </div>
                                        </ul>
                                    </div>
                                </CustomScrollbars>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomScrollbars>
            <DropdownUser />
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