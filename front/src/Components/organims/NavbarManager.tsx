

export const NavbarManager = () => {

  return (
    <div className="bg-white">
      <MobileMenu />
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
              </div>
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <div className="flex gap-3">
                    <div className="relative flex">
                      <button type="button" className="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out" aria-expanded="false">Clients</button>
                    </div>
                    <div className="relative flex">
                      <button type="button" className="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out" aria-expanded="false">Gestion Recettes</button>
                    </div>
                  </div>
                </div>
              </div>

              {true ? (
                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</a>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</a>
                  </div>
                </div>
              ) : (
                <div className="ml-auto flex items-center">
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Your Profile</a>
                      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Settings</a>
                      <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">Sign out</a>
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

const MobileMenu = () => {

  return (
    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-25"></div>
      <div className="fixed inset-0 z-40 flex">
        <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
          <div className="flex px-4 pb-2 pt-5">
            <button type="button" className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <a href="#" className="-m-2 block p-2 font-medium text-gray-900">Clients</a>
            </div>
          </div>
          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <a href="#" className="-m-2 block p-2 font-medium text-gray-900">Gestion Recettes</a>
            </div>
          </div>
          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <a href="#" className="-m-2 block p-2 font-medium text-gray-900">Sign in</a>
            </div>
            <div className="flow-root">
              <a href="#" className="-m-2 block p-2 font-medium text-gray-900">Create account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}