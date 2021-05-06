import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router';

export const PrintGeneracion = (props) => {

    const textosPreguntas = props.generacion
    const history = useHistory();

    useEffect(() => {
        window.print();
        history.push("/teacher/generacion")
    }, [history]);


    return (
        <div>
            <Helmet>
                <title>Exámenes generados</title>
            </Helmet>
            <div id="divToPrint" className="mt4 font-manrope" styles={{
                backgroundColor: '#f5f5f5',
                width: '210mm',
                minHeight: '297mm',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                <div className="container mx-auto mb-10">
                    <p className="py-5 px-16 text-gray-200 text-xs">Textos y preguntas generados por algoritmos de PLN</p>
                    {
                        textosPreguntas.map((item, contador = 1) => (
                            <div key={item.id_texto} className="text-justify px-16">
                                <h1 className="text-lg font-bold uppercase">Examen {contador = contador + 1}</h1>
                                <p>{item.cuerpo_texto}</p>
                                <br></br>
                                <ul>
                                    {item.preguntas.map(pregunta => (
                                        <li key={pregunta.id_pregunta}>
                                            <p>{pregunta.pregunta_cuerpo}</p>
                                            <br></br>
                                        </li>
                                    ))}
                                </ul>
                                <hr></hr>
                                <br></br>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

