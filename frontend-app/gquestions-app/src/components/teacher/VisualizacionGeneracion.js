import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import { Helmet } from "react-helmet";

export const VisualizacionGeneracion = () => {

    const [textosPreguntas, setTextosPreguntas] = useState([])
    const [preguntas, setPreguntas] = useState([])
    const [texto, setTexto] = useState("");

    const history = useHistory();

    const [examenTitle, setExamenTitle] = useState("Examen 1")
    const questionsTitle = useRef("Preguntas");

    useEffect(() => {
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

    /* const handleClickPrueba = () => {
        textosPreguntas.map(item => {
            item.preguntas.map(pregunta => {
                console.log(pregunta.id_pregunta)    
            })
        })
    } */

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
        <div className="container grid grid-rows md:mx-auto sm:px-16 px-8 my-10 font-manrope">
            <Helmet>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"></link>
                <link
                    href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
                    rel="stylesheet" type='text/css'></link>
            </Helmet>
            <button
                type="submit"
                className="justify-self-end md:text-base text-sm z-10 pl-1 block w-40 focus:outline-none bg-yellowlight hover:bg-yellowmain focus:bg-yellowmain text-black rounded-lg px-2 py-2 font-semibold"
                onClick={handleClickVolver}
            >
                Volver
                </button>

            <div className="w-full flex justify-center mb-16 py-6">
                <div className="w-full">
                    <div className="w-full flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full md:w-1/4 h-auto">
                            <div className="top flex items-center px-5 h-16 bg-yellowmain font-bold uppercase">
                                <div className="ml-3 flex flex-col text-2xl">
                                    Exámenes
                                </div>
                            </div>
                            <div className="bg-gray-100 w-full h-full sm:flex md:block">
                                {
                                    textosPreguntas.map((item, contador = 1) => (
                                        <button key={item.id_texto} id={item.id_texto} onClick={onClickExamen}
                                            className="py-4 w-full flex justify-between items-center px-5 hover:bg-gray-200 cursor-pointer focus:outline-none focus:bg-gray-200">
                                            <span ><i className="fa fa-book mr-2" aria-hidden="true"></i>Examen {contador = contador + 1}</span>
                                        </button>
                                    ))
                                }

                            </div>
                        </div>


                        <div className="w-full md:w-3/4">
                            <div className="top flex items-center px-5 h-16 bg-yellowlight text-2xl uppercase">
                                <div id="title-1" className="">
                                    <p>{examenTitle}</p>
                                </div>
                            </div>

                            <div className="w-full px-5 py-3 max-h-screen overflow-y-auto">
                                <h1 className="uppercase font-semibold">Texto</h1>
                                <p>{texto}</p>
                                <br></br>
                                <h1 ref={questionsTitle} className="uppercase font-semibold">Preguntas</h1>
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
        </div>
    )
}
