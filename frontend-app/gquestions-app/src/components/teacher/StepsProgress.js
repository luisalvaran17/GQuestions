import React, { useEffect, useRef } from 'react'

export const StepsProgress = (active) => {

    const componentGeneracionCircleRef = useRef()
    const componentGeneracionTextRef = useRef()

    const componentTextosCircleRef = useRef()
    const componentTextosTextRef = useRef()

    const componentPreguntasCircleRef = useRef()
    const componentPreguntasTextRef = useRef()

    const componentConfirmarCircleRef = useRef()
    const componentConfirmarTextRef = useRef()

    // Refs lines stepper
    const refLine1 = useRef();
    const refLine2 = useRef();
    const refLine3 = useRef();

    const modifyRefGeneracion = () => {
        componentGeneracionCircleRef.current.classList.add("bg-yellowmain")
        componentGeneracionCircleRef.current.classList.add("text-white")
        componentGeneracionTextRef.current.classList.add("font-bold")
    }

    const modifyRefTextos = () => {
        componentTextosCircleRef.current.classList.add("bg-yellowmain")
        componentTextosCircleRef.current.classList.add("text-white")
        componentTextosTextRef.current.classList.add("font-bold")
        refLine1.current.classList.add("border-yellowmain")
    }

    const modifyRefPreguntas = () => {
        componentPreguntasCircleRef.current.classList.add("bg-yellowmain")
        componentPreguntasCircleRef.current.classList.add("text-white")
        componentPreguntasTextRef.current.classList.add("font-bold")
        refLine2.current.classList.add("border-yellowmain")
    }

    const modifyRefConfirmar = () => {
        componentConfirmarCircleRef.current.classList.add("bg-yellowmain")
        componentConfirmarCircleRef.current.classList.add("text-white")
        componentConfirmarTextRef.current.classList.add("font-bold")
        refLine3.current.classList.add("border-yellowmain")
    }

    useEffect(() => {
        const activeComponent = () => {
            if (active.active === 1) {
                modifyRefGeneracion();
            }
            else if (active.active === 2) {
                modifyRefGeneracion();
                modifyRefTextos();
            }
            else if (active.active === 3) {
                modifyRefGeneracion();
                modifyRefTextos();
                modifyRefPreguntas();
            } else if (active.active === 4) {
                modifyRefGeneracion();
                modifyRefTextos();
                modifyRefPreguntas();
                modifyRefConfirmar();
            }
        }
        activeComponent(); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="sm:py-5 px-0">
            <div className="sm:mx-4 mx-0 px-0 py-4 sm:py-4">
                <div className="flex items-center">
                    <div className="flex items-center text-gray-700 relative">
                        <div ref={componentGeneracionCircleRef} className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        </div>
                        <div ref={componentGeneracionTextRef} className="hidden sm:block absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Parámetros</div>
                    </div>
                    <div ref={refLine1} className="flex-auto border-t-2 transition duration-500 ease-in-out"></div>
                    <div className="flex items-center text-gray-700 relative">
                        <div ref={componentTextosCircleRef} className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-align-center"><line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line></svg>

                        </div>
                        <div ref={componentTextosTextRef} className="hidden sm:block absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Textos</div>
                    </div>
                    <div ref={refLine2} className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                    <div className="flex items-center text-gray-700 relative">
                        <div ref={componentPreguntasCircleRef} className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-help-circle"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>
                        <div ref={componentPreguntasTextRef} className="hidden sm:block absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase">Preguntas</div>
                    </div>
                    <div ref={refLine3} className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                    <div className="flex items-center text-gray-700 relative">
                        <div ref={componentConfirmarCircleRef} className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <div ref={componentConfirmarTextRef} className="hidden sm:block absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase">Confirmar</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
