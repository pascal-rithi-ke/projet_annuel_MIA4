import { Link, useNavigate } from "react-router-dom"
import { Logout } from "../../Modules/Auth/Services/Logout";
import { isAuthentified } from "../../utils/auth";
import { useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { logoutSubmit } = Logout();
  const isAuth = isAuthentified();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <div className="bg-white">
      <MobileMenu isAuth={isAuth} isOpen={isMenuOpen} closeMenu={closeMenu} logoutSubmit={logoutSubmit} />
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </Link>
              </div>
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <div className="flex">
                    <div className="relative flex">
                      <button type="button" onClick={() => navigate("/recettes")} className="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out" aria-expanded="false">Nos recettes</button>
                    </div>
                  </div>
                </div>
              </div>

              {!isAuth ? (
                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                    <Link to="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</Link>
                    <Link to="/panier" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Panier</Link>
                  </div>
                </div>
              ) : (
                <div className="ml-auto flex items-center">
                  <div className="relative flex border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex-shrink-0 hover:opacity-90 transition-opacity">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      </button>
                    </div>
                    <div className={`absolute hidden bg-slate-100 top-14 right-0 rounded-md mt-3 space-y-1 px-2 py-1 transition-all duration-300 ease-in-out ${isMenuOpen ? "lg:flex flex-col opacity-100" : "opacity-0"}`}>
                      <Link to="/panier" className="block rounded-md px-3 py-2 text-base text-center font-medium text-gray-500 hover:text-gray-500/80 transition-opacity">Panier</Link>
                      <Link to="/listcommande" className="block rounded-md px-3 py-2 text-base text-center font-medium text-gray-500 hover:text-gray-500/80 transition-opacity">Commande</Link>
                      <button onClick={logoutSubmit} className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-500/80 transition-opacity">Déconnexion</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

interface MobileMenuProps {
  isAuth: boolean;
  isOpen: boolean;
  closeMenu: () => void;
  logoutSubmit: () => void;
}

const MobileMenu = ({ isAuth, isOpen, closeMenu, logoutSubmit }: MobileMenuProps) => {
  return (
    <div className={`relative z-40 lg:hidden ${isOpen ? "block" : "hidden"}`} role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-25"></div>
      <div className="fixed inset-0 z-40 flex">
        <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
          <div className="flex px-4 pb-2 pt-5">
            <button type="button" onClick={closeMenu} className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <Link to="/recettes" className="-m-2 block p-2 font-medium text-gray-900">Nos recettes</Link>
            </div>
          </div>

          {isAuth ? (
            <>
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <Link to="/panier" className="-m-2 block p-2 font-medium text-gray-900">Panier</Link>
                </div>
                <div className="flow-root">
                  <Link to="/listcommande" className="-m-2 block p-2 font-medium text-gray-900">Commande</Link>
                </div>
              </div>
              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <button onClick={logoutSubmit} className="block text-base font-medium text-gray-900">Déconnexion</button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link to="/login" className="-m-2 block p-2 font-medium text-gray-900">Sign in</Link>
              </div>
              <div className="flow-root">
                <Link to="/register" className="-m-2 block p-2 font-medium text-gray-900">Create account</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}