import React, { useRef, useState } from 'react'
import { UpdatePasswordUserAPI } from '../../api/Usuario/UpdatePasswordUserAPI';
import ReactDOM from 'react-dom';

export const CambiarContrasena = () => {

    // State button edit
    const [disableEditInfo, setDisableEditInfo] = useState(true);


    const divRefSuccessMessage = useRef();
    const divRefErrorMessage = useRef();

    // State passwords
    const [contrasenas, setContrasenas] = useState({
        new_password: '',
        old_password: '',
    })

    const [showPasswords, setShowPasswords] = useState(false)

    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')

    const onChangeContrasenas = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name !== 'new_password2') {
            setContrasenas(
                Object.assign(contrasenas, {
                    [name]: value,
                })
            )
        } else if (name === 'new_password2') {
            setNewPasswordConfirmation(value)
        }
    }

    const handleClickUpdateContrasena = async () => {
        const id_user = localStorage.getItem('id_user');

        if (checkFieldsValidations() === true) {

            const response = await UpdatePasswordUserAPI(id_user, contrasenas);

            if (response) {
                removeClassdivRefSuccessMessage();
                setDisableEditInfo(true);
            }
            else {
                let p_old_password = React.createElement('p', {}, 'Contraseña actual incorrecta');
                const X = React.createElement('div', {}, [p_old_password]);
                ReactDOM.render(X, document.getElementById('error_messages'));
                removeClassdivRefErrorMessage();
            }

        }
        else {
            removeClassdivRefErrorMessage();
        }

    }


    const checkFieldsValidations = () => {

        let p_empty;
        let p_contrasenas;
        let p_strength_password;

        if (
            contrasenas.new_password === "" ||
            contrasenas.old_password === ""
        ) {
            removeClassdivRefErrorMessage();
            p_empty = React.createElement('p', {}, 'Hay campos vacíos');
            const X = React.createElement('div', {}, [p_empty]);
            ReactDOM.render(X, document.getElementById('error_messages'));
            return false;
        }

        if (contrasenas.new_password.length < 6) {
            removeClassdivRefErrorMessage();
            p_strength_password = React.createElement('p', {}, 'La contraseña debe tener al menos 6 carácteres');
            const X = React.createElement('div', {}, [p_strength_password]);
            ReactDOM.render(X, document.getElementById('error_messages'));
            return false;
        }

        else if (contrasenas.new_password !== newPasswordConfirmation) {
            removeClassdivRefErrorMessage();
            p_contrasenas = React.createElement('p', {}, 'Las contraseñas no coinciden');
            const X = React.createElement('div', {}, [p_contrasenas]);
            ReactDOM.render(X, document.getElementById('error_messages'));
            return false;
        }

        // AGREGAR VALIDACIÓN DE FECHA DE NACIMIENTO
        else {
            return true;
        }
    };

    const handleClickEdit = () => {
        if (disableEditInfo) setDisableEditInfo(false);
        if (!disableEditInfo) setDisableEditInfo(true);
    }

    const handleClickShowPasswords = () => {
        if (showPasswords) setShowPasswords(false);
        if (!showPasswords) setShowPasswords(true);
    }

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
        <div className="sm:p-6 p-2 bg-white rounded-lg shadow-md dark:bg-darkColor border dark:border-gray-500">

            <div className="sm:ml-6 ml-2 pt-1">
                <div className="grid grid-cols-12">
                    <h4 className="col-span-8 sm:col-span-10 sm:text-xl text-lg text-gray-900 dark:text-gray-100 leading-tight">Cambiar contraseña</h4>
                    

                    <div className="sm:col-span-1 col-span-2">
                        <button
                            className={
                                showPasswords
                                ? "transition duration-500 hover:bg-green-400 hover:bg-opacity-40 rounded-full w-12 h-12 focus:outline-none dark:text-yellowlight"
                                : "hidden"
                            }
                            onClick={handleClickShowPasswords}
                        >
                            <span className="material-icons-outlined">&#xe8f4;</span>
                        </button>
                        <button
                            className={ 
                                showPasswords
                                ? "hidden"
                                : "transition duration-500 hover:bg-green-400 hover:bg-opacity-40 rounded-full w-12 h-12 focus:outline-none dark:text-yellowlight"
                                
                            }
                            onClick={handleClickShowPasswords}
                        >
                            <span className="material-icons-outlined">&#xe8f5;</span>
                        </button>
                    </div>

                    <div className="sm:col-span-1 col-span-2">
                        <button
                            className="transition duration-500 hover:bg-yellowlight hover:bg-opacity-40 rounded-full w-12 h-12 focus:outline-none dark:text-yellowlight"
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
                            Contraseña nueva
                      </label>
                        <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                            </div>
                            <input
                                type={showPasswords ? "text" : "password"}
                                id="new_password"
                                name="new_password"
                                onChange={onChangeContrasenas}
                                className={
                                    disableEditInfo
                                        ? "bg-gray-200 text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                        : "bg-white text-gray-900 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                }
                                placeholder="Ingresa una contrasena nueva"
                                disabled={disableEditInfo}
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 px-3 mb-3">
                        <label

                            className="grid sm:col-span-4 col-span-12 text-xs font-semibold text-gray-500 dark:text-gray-300 mb-2"
                        >
                            Confirmar contraseña nueva
                      </label>
                        <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                            </div>
                            <input
                                type={showPasswords ? "text" : "password"}
                                id="new_password2"
                                name="new_password2"
                                onChange={onChangeContrasenas}
                                className={
                                    disableEditInfo
                                        ? "bg-gray-200 text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                        : "bg-white text-gray-900 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                }
                                defaultValue=""
                                placeholder="Confirme la contraseña nueva"
                                disabled={disableEditInfo}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmar contraseña nueva */}
            <div className="sm:ml-6 ml-2">
                <label

                    className="text-xs font-semibold px-1 text-gray-500 dark:text-gray-300 self-end py-2"
                >
                    Contraseña actual
                      </label>
                <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                    </div>
                    <input
                        type={showPasswords ? "text" : "password"}
                        id="old_password"
                        name="old_password"
                        onChange={onChangeContrasenas}
                        className={
                            disableEditInfo
                                ? "bg-gray-200 text-gray-500 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                                : "bg-white text-gray-900 transition duration-500 border rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellowlight w-full -ml-10 sm:pl-10 pl-4 pr-3 py-2 border-gray-300 outline-none focus:border-yellow-500 shadow"
                        }
                        defaultValue=""
                        placeholder="Ingrese la contraseña actual"
                        disabled={disableEditInfo}
                    />
                </div>
            </div>

            {/* Success message */}
            <div

                ref={divRefSuccessMessage}
                className="hidden animate-pulse px-4 ml-6 mt-2 relative py-1 pl-4 pr-10 leading-normal text-green-700 bg-green-100 rounded-lg"
                role="alert"
            >

                <p>Contraseña actualizada con éxito</p>
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
                className="hidden animate-pulse px-4 ml-6 mt-2 relative py-1 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg"
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
            <div className="grid grid-cols-12 sm:ml-6 ml-2 mt-8">
                <button
                    type="submit"
                    disabled={disableEditInfo}
                    onClick={handleClickUpdateContrasena}
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
