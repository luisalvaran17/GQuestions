import * as React from 'react';
import { Menu, Transition } from '@headlessui/react';

export default function menuUser() {
  return (
    <div className='flex items-center justify-center px-0'>
      <div className='relative inline-block text-left'>
        <Menu>
          {({ open }) => (
            <>
              <span className='rounded-md '>
                <Menu.Button className='inline-flex justify-center w-full px-1 py-1 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800'>
                  <span class='mt-auto flex items-center text-gray-900 dark:text-yellow-500 rounded-xl'>
                    <a href='/'>
                      <svg
                        class='fill-current h-4 w-4 m-2 '
                        aria-hidden='true'
                        focusable='false'
                        data-prefix='far'
                        data-icon='user'
                        /* class='svg-inline--fa fa-user fa-w-14' */
                        role='img'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 448 512'
                      >
                        <path
                          fill='currentColor'
                          d='M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z'
                        ></path>
                      </svg>
                    </a>
                    <span className="hidden md:block">Usuario</span>
                    <svg
                      className='w-5 h-5 ml-2 mr-1'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                </Menu.Button>
              </span>

              <Transition
                show={open}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items
                  static
                  className='absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
                >
                  <div className='px-4 py-3'>
                    <p className='text-sm leading-5'>Signed in as</p>
                    <p className='text-sm font-medium leading-5 text-gray-900 truncate'>
                      tom@example.com
                    </p>
                  </div>

                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#account-settings'
                          className={`${
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Account settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#support'
                          className={`${
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Support
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item
                      as='span'
                      disabled
                      className='flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50'
                    >
                      New feature (soon)
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#license'
                          className={`${
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          License
                        </a>
                      )}
                    </Menu.Item>
                  </div>

                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#sign-out'
                          className={`${
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
}
