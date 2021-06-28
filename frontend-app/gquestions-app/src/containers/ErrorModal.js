import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import React from 'react'

export const ErrorModal = (props) => {

    // Hooks 
    const [isOpen, setIsOpen] = useState(props.isOpen)

    useEffect(() => {
        
    }, []);

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto font-manrope"
                    onClose={closeModal}
                >
                    {/* Use the overlay to style a dim backdrop for your dialog */}
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-3xl px-6 py-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-2xl font-bold leading-6 text-gray-900 select-none"
                                >
                                    Ha ocurrido un error, por favor reinténtelo
                                </Dialog.Title>

                                <div className='bg-white dark:bg-darkColor border-b border-gray-200 pt-5 pb-4 sm:pb-4'>
                                    <div className='sm:flex sm:items-start'>
                                        <div className='mt-3 text-center sm:mt-0 sm:text-left'>
                                            <div className='mt-2'>
                                                <p className='text-base font-semibold text-gray-600 dark:text-gray-400'>
                                                    Ocurrió un error en la generación, por favor revise su conexión e intente nuevamente
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='sm:ml-64 ml-0 grid grid-col-12 dark:bg-darkColor px-4 pt-4 sm:px-6 sm:flex sm:flex-row-reverse'>
                                    <button
                                        type='button'
                                        onClick={closeModal}
                                        className=" transition duration-500 inline-flex justify-center px-20 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent 
                                        rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                      >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}
