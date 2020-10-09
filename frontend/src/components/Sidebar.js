import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar({ children }) {
  const [activeTab, setActiveTab] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { pathname } = useLocation();
  const { userInfo } = userLogin;
  const activeTabClassNames =
    "group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-blue-900 focus:outline-none focus:bg-blue-700 transition ease-in-out duration-150";
  const inactiveTabClassNames =
    "group flex items-center px-2 py-2 text-sm leading-5 font-medium text-blue-300 rounded-md hover:text-white hover:bg-blue-700 focus:outline-none focus:text-white focus:bg-blue-700 transition ease-in-out duration-150";

  useEffect(() => {
    if (pathname === "/") setActiveTab("home");
    else if (pathname === "/cart") setActiveTab("cart");
    else if (pathname === "/login") setActiveTab("login");
    else setActiveTab("");
  }, [pathname]);

  return (
    <div className="flex overflow-hidden bg-gray-50" style={{ height: "calc(100vh - 32px)" }}>
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-blue-800">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="h-8 w-auto text-white tracking-widest text-xl">XIONI</div>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                <Link
                  to="/"
                  onClick={() => setActiveTab("home")}
                  className={activeTab === "home" ? activeTabClassNames : inactiveTabClassNames}
                >
                  <svg
                    className="mr-3 h-6 w-6 text-blue-400 group-focus:text-blue-300 transition ease-in-out duration-150"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setActiveTab("cart")}
                  className={activeTab === "cart" ? activeTabClassNames : inactiveTabClassNames}
                >
                  <svg
                    className="mr-3 h-6 w-6 text-blue-400 group-hover:text-blue-300 group-focus:text-blue-300 transition ease-in-out duration-150"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Cart
                </Link>

                {userInfo ? (
                  <Link
                    to="/profile"
                    onClick={() => setActiveTab("login")}
                    className={activeTab === "login" ? activeTabClassNames : inactiveTabClassNames}
                  >
                    <svg
                      className="mr-3 h-6 w-6 text-blue-400 group-hover:text-blue-300 group-focus:text-blue-300 transition ease-in-out duration-150"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="truncate">{userInfo.email}</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setActiveTab("login")}
                    className={activeTab === "login" ? activeTabClassNames : inactiveTabClassNames}
                  >
                    <svg
                      className="mr-3 h-6 w-6 text-blue-400 group-hover:text-blue-300 group-focus:text-blue-300 transition ease-in-out duration-150"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Sign In
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
            aria-label="Open sidebar"
          >
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search_field" className="sr-only">
                  Search products
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="search_field"
                    className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                    placeholder="Search products"
                    type="search"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Sidebar;
