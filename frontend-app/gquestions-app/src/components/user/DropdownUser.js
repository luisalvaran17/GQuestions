import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Redirect } from 'react-router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Dropdown = () => {

  const [closeSession, setCloseSession] = useState(false)

    const onClickLogout = async () => {
        await fetch(
          "http://localhost:8000/api/logout/",
          {
            method: "POST",
            headers: {
              Authorization: 'Token ' + localStorage.getItem('token'),
              "Content-Type": "application/json"
            },
          }
        ).then((data => {
          if (data.ok) {
            localStorage.clear();
            setCloseSession(true);
          }
        }))
          .catch(err => err)
      }

  if (closeSession === false) {
    return (
      <div>
        {/* Profile dropdown */}
        <Menu as="div" className="absolute left-5 bottom-5 ml-3">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="outline-none focus:outline-none">
                  <div className='mt-auto flex items-center p-2 text-black bg-yellowlight	dark:text-yellow-500 rounded-full mb-1'>
                    <svg
                      className='fill-current h-4 w-4 m-2 '
                      aria-hidden='true'
                      focusable='false'
                      data-prefix='far'
                      data-icon='user'
                      /* className='svg-inline--fa fa-user fa-w-14' */
                      role='img'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 448 512'
                    >
                      <path
                        fill='currentColor'
                        d='M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z'
                      ></path>
                    </svg>
                  </div>
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute  bottom-0 left-6 mb-10 mt-2 w-72 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <Menu.Item>
                    <div className={
                      'block font-light px-4 py-2 text-sm text-gray-700 border-b'}>
                      <p className="font-bold" >Logueado como</p>
                      <p
                      >
                        {localStorage.getItem('email')}
                      </p>
                    </div>

                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Ajustes de cuenta
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Términos y condiciones
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={onClickLogout}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'w-full outline-none focus:outline-none text-left font-bold px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Cerrar sesión
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    )
  } else {
    return (
      <Redirect to='/' />
    )
  }
}
