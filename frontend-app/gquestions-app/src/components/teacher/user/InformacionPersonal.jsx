import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom';
import { GetUserAPI } from '../../../api/Usuario/GetUserAPI';
import { UpdateInfoPerfilUserAPI } from '../../../api/Usuario/UpdateInfoPerfilUserAPI';

export const InformacionPersonal = () => {

    // State button edit
    const [disableEditInfo, setDisableEditInfo] = useState(true);

    const divRefSuccessMessage = useRef();
    const divRefErrorMessage = useRef();

    // data user
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [fechaNac, setFechaNac] = useState("")
    const [email, setEmail] = useState("")

    // State info perfil
    const [informacionPerfil, setInformacionPerfil] = useState({
        first_name: '',
        last_name: '',
        fecha_nac: ''
    })

    useEffect(() => {
        getUser();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getUser = async () => {
        const id_user = localStorage.getItem('id_user');
        const user = await GetUserAPI(id_user);

        if (user === undefined) {
            //nothing
        } else {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setFechaNac(user.fecha_nac);
            setEmail(user.email);

            setInformacionPerfil(
                Object.assign(informacionPerfil, {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    fecha_nac: user.fecha_nac,
                })
            )
        }
    }

    const onChangeInfoPerfil = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInformacionPerfil(
            Object.assign(informacionPerfil, {
                [name]: value,
            })
        )
    }

    const handleClickUpdatePerfil = async () => {
        if (checkFieldsValidations() === true) {
            const id_user = localStorage.getItem('id_user');
            const response = await UpdateInfoPerfilUserAPI(id_user, informacionPerfil);

            if (response) {
                setDisableEditInfo(true);
                removeClassdivRefSuccessMessage();
            } else {
                console.log("Ha ocurrido un error") //todo: mostrar en el dom
            }
        } else {
            removeClassdivRefErrorMessage();
        }
    }

    const handleClickEdit = () => {
        if (disableEditInfo) setDisableEditInfo(false);
        if (!disableEditInfo) setDisableEditInfo(true);
    }

    const checkFieldsValidations = () => {

        let p_empty;

        if (informacionPerfil.first_name === "" ||
            informacionPerfil.last_name === "" ||
            informacionPerfil.fecha_nac === ""
        ) {
            removeClassdivRefErrorMessage();
            p_empty = React.createElement('p', { key: 'empty' }, 'Hay campos vac??os');
            const X = React.createElement('div', {}, [p_empty]);
            ReactDOM.render(X, document.getElementById('error_messages'));
            return false;
        }
        // AGREGAR VALIDACI??N DE FECHA DE NACIMIENTO
        else {
            return true;
        }
    };

    const addClassdivRefSuccessMessage = () => {
        divRefSuccessMessage.current.classList.add("hidden");
    };

    const removeClassdivRefSuccessMessage = () => {
        divRefSuccessMessage.current.classList.remove("hidden");
    };

    const addClassdivRefErrorMessage = () => {
        divRefErrorMessage.current.classList.add("hidden");
    };

    const removeClassdivRefErrorMessage = () => {
        divRefErrorMessage.current.classList.remove("hidden");
    };

    return (
        <div className="sm:p-6 p-2 bg-white dark:bg-darkColor border dark:border-gray-700 rounded-xl shadow-md">
            {/* Nombre y fecha de nacimiento */}
            <div className="sm:ml-6 ml-2 pt-1">
                <div className="grid grid-cols-12">
                    <h4 className="col-span-9 sm:col-span-11 sm:text-xl text-lg text-gray-900 dark:text-gray-100 leading-tight">Informaci??n personal</h4>

                    <div className="sm:col-span-1 col-span-3">
                        <button
                            className="transition duration-500 hover:bg-yellowlight hover:bg-opacity-40 rounded-full w-12 h-12 focus:outline-none dark:text-yellowlight"
                            id='btn-editar'
                            onClick={handleClickEdit}
                        >
                            <span className="material-icons-outlined">&#xe3c9;</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-rows-2 grid-cols-1 md:flex -mx-3 mt-4">
                    <div className="md:w-1/2 px-3 mb-3">
                        <label
                            className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
                        >
                            Nombres
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id="first_name"
                                className={
                                    disableEditInfo
                                        ? "bg-gray-200 text-gray-500 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                        : "bg-white text-gray-900 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                }
                                disabled={disableEditInfo}
                                onChange={onChangeInfoPerfil}
                                name="first_name"
                                defaultValue={firstName}
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 px-3 mb-3">
                        <label
                            className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
                        >
                            Apellidos
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id="apellidos"
                                className={
                                    disableEditInfo
                                        ? "bg-gray-200 text-gray-500 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                        : "bg-white text-gray-900 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                }
                                disabled={disableEditInfo}
                                onChange={onChangeInfoPerfil}
                                name="last_name"
                                defaultValue={lastName}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-rows-2 grid-cols-1 md:flex -mx-3 ">
                    <div className="md:w-1/2 px-3 mb-3">
                        <label
                            className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
                        >
                            Fecha nacimiento
                        </label>
                        <div className="flex">
                            <input
                                type="date"
                                className={
                                    disableEditInfo
                                        ? "bg-gray-200 text-gray-500 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                        : "bg-white text-gray-900 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                }
                                defaultValue={fechaNac}
                                onChange={onChangeInfoPerfil}
                                name="fecha_nac"
                                disabled={disableEditInfo}
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 px-3 mb-3">
                        <label
                            className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
                        >
                            Correo electr??nico
                        </label>
                        <div className="flex">
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-200 text-gray-500 text-sm md:text-base sm:col-span-4 col-span-12 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                        focus:ring-yellowlight w-full 2xl:w-96 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"

                                name="email"
                                disabled={true}
                                defaultValue={email}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Success message */}
            <div

                ref={divRefSuccessMessage}
                className="hidden animate-pulse sm:ml-6 ml-2 mt-2 relative py-1 pl-4 pr-10 leading-normal text-green-700 bg-green-100 rounded-lg"
                role="alert"
            >

                <p>Informaci??n actualizada con ??xito</p>
                <span
                    className="absolute inset-y-0 right-0 flex items-center mr-4"
                    onClick={addClassdivRefSuccessMessage}
                >
                    <svg
                        className="w-4 h-4 fill-current"
                        role="button"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                </span>
            </div>


            {/* Error messages */}
            <div
                ref={divRefErrorMessage}
                className="hidden animate-pulse sm:ml-6 ml-2 mt-2 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
                role="alert"
            >
                <div id="error_messages" className="text-sm md:text-base">
                </div>
                <span
                    className="absolute inset-y-0 right-0 flex items-center mr-4"
                    onClick={addClassdivRefErrorMessage}
                >
                    <svg
                        className="w-4 h-4 fill-current"
                        role="button"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                </span>
            </div>

            {/* Button guardar */}
            <div className="grid grid-cols-12 md:ml-6 sm:ml-4 mt-8">
                <button
                    type="submit"
                    onClick={handleClickUpdatePerfil}
                    disabled={false}
                    id='btn-guardar'
                    className={
                        !disableEditInfo
                            ? "transition duration-500 col-start-0 ml-2 md:col-start-7 md:col-span-6 col-span-12 z-10 px-4 focus:outline-none bg-yellowmain hover:bg-yellow-600 focus:bg-yellow-600 text-white rounded-lg py-2 mb-1 font-semibold"
                            : "pointer-events-none transition duration-500 col-start-0 ml-2 md:col-start-7 md:col-span-6 col-span-12 z-10 px-4 focus:outline-none bg-gray-200 text-gray-600 rounded-lg py-2 mb-1 font-semibold"
                    }

                >
                    Guardar
                </button>
            </div>
        </div>
    )
}
