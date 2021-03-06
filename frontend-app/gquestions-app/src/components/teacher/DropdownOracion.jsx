import React, { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

const DropdownOracion = props => {
  const optionsOracion = [
    'Aleatorio',
    'Personalizado',
    'Texto completo',
  ];

  const [selectedOracion, setSelectedOracion] = useState(optionsOracion[0]);

  return (
    
      <Listbox
        as='div'
        className='space-y-1'
        value={selectedOracion}
        onChange={setSelectedOracion}
      >
        {({ open }) => (
          <>
            <div className='relative'>
              <span className='block w-full rounded-md shadow-sm'>
                <Listbox.Button
                  className='rounded-lg focus:border-transparent focus:outline-none focus:ring-2
                  focus:ring-yellowlight  border-gray-300 outline-none focus:border-yellow-500 text-left bg-white shadow cursor-default relative w-full border  pl-3 md:pr-10 py-2 transition ease-in-out duration-150 lg:text-base sm:leading-5'>
                  <span className='block truncate py-0.5'>{selectedOracion}</span>
                  <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                    <svg
                      className='h-5 w-5 text-gray-400'
                      viewBox='0 0 20 20'
                      fill='none'
                      stroke='currentColor'
                    >
                      <path
                        d='M7 7l3-3 3 3m0 6l-3 3-3-3'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </span>
                </Listbox.Button>
              </span>

              <Transition
                show={open}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                className='absolute mt-1 w-full rounded-md bg-white shadow-lg'
              >
                <Listbox.Options
                  type="input"
                  static
                  className='text-xs max-h-60 rounded-md outline-none py-0 md:text-base leading-6 shadow-xl overflow-auto focus:outline-none sm:text-base sm:leading-5'
                >
                  {optionsOracion.map(person => (
                    <Listbox.Option key={person} value={person}>
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active ? 'text-gray-900 bg-gray-200' : 'text-gray-900'
                          } cursor-default select-none relative py-2 pl-8 pr-4`}
                        >
                          <span
                            className={`${
                              selected ? 'font-semibold' : 'font-normal'
                            } block truncate`}
                          >
                            {person}
                          </span>
                          {selected && (
                            <span
                              className={`${
                                active ? 'text-gray-900' : 'text-yellow-600'
                              } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                            >
                              <svg
                                className='h-5 w-5'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
  );
};

export default DropdownOracion;
