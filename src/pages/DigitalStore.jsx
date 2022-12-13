import { useParams, Link, NavLink } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

import DigitalProductSale from "../components/digitalProductSale";

import { getTypes } from "../services/digitalProducts";

function DigitalStore() {
  const [isOpen, setIsOpen] = useState(false);

  const { typeCode } = useParams();

  const [types, setTypes] = useState([]);

  const NavOption = ({ type }) => {
    return (
      <div className="ml-10 flex items-baseline">
        <NavLink
          to={`../${type.code}`}
          relative="path"
          className={({ isActive }) =>
            `hover:bg-[#fcb900] text-[#28367B] px-3 py-2 rounded-md text-sm font-bold ${
              isActive ? "bg-[#fcb900]" : ""
            }`
          }
        >
          <div className="items-center justify-center">
            <img
              className="h-12 w-12 mx-0"
              src={type.imageUrl}
              alt="Recargas Celular"
            />
            <div className="lg:whitespace-nowrap">{type.description}</div>
          </div>
        </NavLink>
      </div>
    );
  };

  useEffect(() => {
    getTypes_();
  }, []);

  const getTypes_ = async () => {
    setTypes(await getTypes());
  };

  return (
    <div >
      <nav className="bg-[#EC9D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between lg:h-16">
            <div className="flex items-center">
              <Link to="/" className="block flex-shrink-0" aria-label="Cruip">
                <img
                  className="h-20 w-30"
                  src="https://web.fullmovil.com.co/wp-content/uploads/2022/11/Fullmovil_new_Azul-Blanco.svg"
                  alt="Workflow"
                />
              </Link>
              <div className="hidden md:block">
                <div className="lg:ml-5 flex items-baseline space-x-4">
                  {types.map((type) => (
                    <NavOption key={type.code} type={type} />
                  ))}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="#"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Team
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Projects
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Calendar
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Reports
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <DigitalProductSale typeCode={typeCode} />
        </div>
      </main>
    </div>
  );
}

export default DigitalStore;
