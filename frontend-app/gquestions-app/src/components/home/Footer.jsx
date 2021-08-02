import React, { useEffect, useRef, useState, Fragment} from 'react';
import '../../assets/styles/tailwind.css';
import LogoGQuestions from '../../assets/images/logo.png';
import { ModalCredits } from './ModalCredits';
import { Dialog, Transition } from '@headlessui/react';

export const Footer = () => {

  const [showModal, setshowModal] = useState(false)

  // Hooks Terminos y condiciones
  const [isOpen, setIsOpen] = useState(false)

  const darkModeRef = useRef();

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      darkModeRef.current.classList.add('dark')
    } else {
      darkModeRef.current.classList.remove('dark')
    }
  }, []);

  const showModalCredits = () => {
    setshowModal(true);
  };

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false);
  }


  if (showModal === false) {
    return (
      <div ref={darkModeRef} className='font-manrope'>
        <div className='bg-gray-50 dark:bg-darkGrayColor2 border-t border-gray-200 dark:border-gray-800'>
          <footer className='flex flex-wrap justify-between p-3 m-auto text-sm md:text-base pb-8'>
            <div className='container mx-auto flex flex-col flex-wrap items-center justify-between'>
              <span className='flex p-4 items-center'>
                <img
                  className='h-16'
                  src={LogoGQuestions}
                  alt='logo GQuestions'
                />
              </span>

              <ul className='flex mx-auto text-darkColor dark:text-gray-300 text-center font-semibold'>
                <li className='p-2 cursor-pointer hover:underline'
                onClick={openModal}>
                  Términos {'&'} Condiciones
                  </li>
                <li className='p-2 text-gray-400 dark:text-darkGrayColor'>
                  Privacidad
                  </li>
                <li
                  className='p-2 cursor-pointer hover:underline'
                  onClick={showModalCredits}
                >
                  Créditos
                  </li>
              </ul>
              <ul className='flex mx-auto text-white text-center'>
                {/* <li className="p-2 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-white" width="24" height="24" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg></li>
                              <li className="p-2 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-white" width="24" height="24" viewBox="0 0 24 24"><path d="M21.231 0h-18.462c-1.529 0-2.769 1.24-2.769 2.769v18.46c0 1.531 1.24 2.771 2.769 2.771h18.463c1.529 0 2.768-1.24 2.768-2.771v-18.46c0-1.529-1.239-2.769-2.769-2.769zm-9.231 7.385c2.549 0 4.616 2.065 4.616 4.615 0 2.549-2.067 4.616-4.616 4.616s-4.615-2.068-4.615-4.616c0-2.55 2.066-4.615 4.615-4.615zm9 12.693c0 .509-.413.922-.924.922h-16.152c-.511 0-.924-.413-.924-.922v-10.078h1.897c-.088.315-.153.64-.2.971-.05.337-.081.679-.081 1.029 0 4.079 3.306 7.385 7.384 7.385s7.384-3.306 7.384-7.385c0-.35-.031-.692-.081-1.028-.047-.331-.112-.656-.2-.971h1.897v10.077zm0-13.98c0 .509-.413.923-.924.923h-2.174c-.511 0-.923-.414-.923-.923v-2.175c0-.51.412-.923.923-.923h2.174c.511 0 .924.413.924.923v2.175z" fillRule="evenodd" clipRule="evenodd"/></svg></li>
                              <li className="p-2 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-white" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></li>
                              */}
              </ul>
              <div className='flex mx-auto text-darkColor dark:text-gray-300 text-center'>
                Copyright GQuestions © 2021
              </div>

              
            </div>
          </footer>
          {/* Términos y condiciones Modal */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
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
                <div className="font- inline-block w-full max-w-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-black font-manrope leading-6 text-gray-900"
                  >
                    Términos y condiciones
                </Dialog.Title>
                  <div className="mt-2">
                    <ul className="bg-gray-100 text-sm shadow rounded-xl list-none space-y-2 md:text-justify">
                      <div className="text-gray-700 p-4 pb-1">
                        <li className="mb-2">
                          <p>
                            Debido a que los modelos de lenguaje a gran escala como GPT-2 no distinguen la realidad de la ficción, el texto generado no debe ser considerado
                            verdadero.
                          </p>
                        </li>
                        <li className="mb-2">
                          <p>
                            El uso de GPT-2 en esta aplicación web tiene el propósito de ayudar en el aprendizaje del idioma Inglés (ayuda gramatical, vocabulario, lectura y escritura).
                          </p>
                        </li>
                        <li className="mb-2">
                          <p>
                            Es importante mencionar que el modelo GPT-2 puede reflejar sesgos inherentes a los sistemas en los que fueron entrenados, sin embargo, se ha implementado una estrategia que intenta reducir los posibles sesgos que pueda presentar el sistema en esta implementación.
                          </p>
                        </li>
                      </div>
                      <li className="list-none">
                        <p className="text-sm text-gray-500 p-4 border-t border-gray-200 bg-gray-100 rounded-b-xl md:text-justify">
                          "No encontramos diferencias estadísticamente significativas en las sondas de sesgo de género, raza y religión entre 774M y 1.5B, lo que implica que todas las versiones de GPT-2 deben abordarse con niveles similares de precaución en los casos de uso que son sensibles a los sesgos en torno a los atributos humanos."
                            <br></br>
                          <a className="outline-none focus:outline-none"
                            href="https://github.com/openai/gpt-2/blob/master/model_card.md#out-of-scope-use-cases"
                            target="_blank" rel="noreferrer">
                            <b>Model card GPT-2: </b><span className="text-blue-600 underline">
                              https://github.com/openai/gpt-2/blob/master/model_card.md
                              </span>
                          </a>
                        </p>
                      </li>
                    </ul>
                    <div className="flex mt-4 justify-end space-x-4">
                      
                      <button
                        type="button"
                        className="shadow transition duration-500 w-full inline-flex justify-center sm:px-12 px-8 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent 
                        rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>

                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
        </div>
        
      </div>
    );
  }
  if (showModal === true) {
    return (
      <div>
        <Footer />
        <ModalCredits />
      </div>
    );
  }
}