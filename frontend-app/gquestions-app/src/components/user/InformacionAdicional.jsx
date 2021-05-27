import React, { useEffect, useRef, useState } from 'react'
import { GetUserAPI } from '../../api/Usuario/GetUserAPI';
import { UpdateOrganizacionUserAPI } from '../../api/Usuario/UpdateOrganizacionUserAPI';

export const InformacionAdicional = () => {

    // State button edit
    const [disableEditInfo, setDisableEditInfo] = useState(true);

    const divRefSuccessMessage = useRef();

    const [organizacionRender, setOrganizacionRender] = useState("")
    const [tipoCuenta, setTipoCuenta] = useState("")

    const [informacionAdicional, setInformacionAdicional] = useState({
        organizacion: '',
    })

    useEffect(() => {
        getUser();// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeInfoAdicional = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInformacionAdicional(
            Object.assign(informacionAdicional, {
                [name]: value,
            })
        )
    }

    const getUser = async () => {
        const id_user = localStorage.getItem('id_user');
        const users = await GetUserAPI(id_user);
        const user = users.users;

        if (user === undefined) {
            //nothing
        }else{
            user.map(item => {
                setOrganizacionRender(item.organizacion);
                setTipoCuenta(item.rol);
                return true;
            })
        }
    }

    const handleClickUpdateInfoAdicional = async () => {
        const id_user = localStorage.getItem('id_user');
        const response = await UpdateOrganizacionUserAPI(id_user, informacionAdicional);

        if (response) {
            removeClassdivRefSuccessMessage();
            setDisableEditInfo(true);
        }
        else {
            console.log("Ha ocurrido un error en el servidor")
        }
    }

    const handleClickEdit = () => {
        if (disableEditInfo) setDisableEditInfo(false);
        if (!disableEditInfo) setDisableEditInfo(true);
    }

    const addClassdivRefSuccessMessage = () => {
        divRefSuccessMessage.current.classList.add("hidden");
    };

    const removeClassdivRefSuccessMessage = () => {
        divRefSuccessMessage.current.classList.remove("hidden");
    };

    return (
        <div className="sm:p-6 p-2 bg-white rounded-lg shadow-md dark:bg-darkColor border dark:border-gray-500">

            <div className="sm:ml-6 ml-2 pt-1">
                <div className="grid grid-cols-12">
                    <h4 className="col-span-9 sm:col-span-11 sm:text-xl text-lg text-gray-900 dark:text-gray-100 leading-tight">Información adicional</h4>

                    <div className="sm:col-span-1 col-span-3">
                        <button
                            type="submit"
                            className="transition duration-500 hover:bg-yellowlight hover:bg-opacity-40 rounded-full w-12 h-12 focus:outline-none dark:text-yellowlight"
                            onClick={handleClickEdit}
                        >
                            <span className="material-icons-outlined">&#xe3c9;</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-rows-2 grid-cols-1 md:flex -mx-3 mt-4">
                    <div className="w-full px-3 mb-3">
                        <label

                            className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
                        >
                            Organización
                        </label>
                        <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <i className="hidden sm:block mdi mdi-domain text-gray-400 text-lg"></i>
                            </div>
                            <input
                                type="text"
                                className={
                                    disableEditInfo
                                        ? "bg-gray-200 text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                        : "bg-white text-gray-900 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"}
                                defaultValue={organizacionRender}
                                onChange={onChangeInfoAdicional}
                                name="organizacion"
                                id="organizacion"
                                disabled={disableEditInfo}
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Tipo de cuenta */}
            <div className="sm:ml-6 ml-2">
                <label

                    className="text-xs font-semibold px-1 text-gray-500 dark:text-gray-300 self-end py-2"
                >
                    Tipo de cuenta
                        </label>
                <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="hidden sm:block mdi mdi-account-outline text-gray-400 text-lg"></i>

                    </div>
                    <input
                        type="text"
                        className="bg-gray-200 text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                        defaultValue={tipoCuenta}
                        disabled={true}
                    />
                </div>
            </div>

            {/* Success message */}
            <div

                ref={divRefSuccessMessage}
                className="hidden animate-pulse px-4 ml-6 mt-2 relative py-1 pl-4 pr-10 leading-normal text-green-700 bg-green-100 rounded-lg"
                role="alert"
            >

                <p>Información actualizada con éxito</p>
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

            {/* Button guardar */}
            <div className="grid grid-cols-12 sm:ml-6 ml-2 mt-8">
                <button
                    type="submit"
                    onClick={handleClickUpdateInfoAdicional}
                    disabled={false}
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
