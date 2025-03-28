import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* NAV SUPERIOR CON DEGRADADO */}
            <nav className="bg-gradient-to-r from-[#1F4271] to-[#88B1D5] shadow-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo + Título */}
                        <div className="flex items-center">
                            <div className="flex shrink-0 items-center space-x-3">
                                <Link href="/">
                                    {/* Logo con color blanco */}
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                                </Link>
                                <span className="hidden text-lg font-bold sm:inline-block">
                                    TRAVELTUNNEL
                                </span>
                            </div>

                            
                        </div>

                        {/* Dropdown de Usuario (versión escritorio) */}
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <div className="relative ml-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-transparent px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50"
                                            >
                                                {user.name}
                                                <svg
                                                    className="-mr-0.5 ml-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Botón Hamburguesa (versión móvil) */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:bg-white/20 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu desplegable versión móvil */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2 px-4">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                           
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-white/20 pb-1 pt-4 px-4">
                        <div>
                            <div className="text-base font-medium text-white">{user.name}</div>
                            <div className="text-sm font-medium text-white/80">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* SEGUNDO HEADER (si lo usas para "VR Store - Expo 2025", puedes quitarlo o personalizarlo) */}
            {header && (
                <header className="bg-gradient-to-r from-[#1F4271] to-[#88B1D5] shadow-md">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-white">
                        {header}
                    </div>
                </header>
            )}

            {/* CONTENIDO PRINCIPAL */}
            <main>{children}</main>
        </div>
    );
}
