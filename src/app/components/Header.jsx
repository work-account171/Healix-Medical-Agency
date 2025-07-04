"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../images/logo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/logout");
        router.push("/login");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userRes = await fetch("/api/me");
                const data = await userRes.json();
                setUser(data.user || null); // Assuming { user: {...} } is returned
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setUser(null);
            }
        };

        fetchUser();
    }, []);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="header flex justify-between px-6 sm:px-24 p-4 border-b">
            <Link href="/">
                <h1 className="logoTxt flex gap-2 items-center text-black font-bold">
                    <span className="logoImg w-10">
                        <Image src={logo} />
                    </span>
                    <span className="text-[#EC7FA9]">Healix</span>
                </h1>
            </Link>

            {/* Hamburger Menu for Small and Medium Screens (Visible only below 1100px) */}
            <div className="lg:hidden flex items-center" onClick={toggleMenu}>
                {isOpen ? (
                    // Cross icon when the menu is open
                    <svg
                        className="w-6 h-6 text-gray-700 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    // Hamburger icon when the menu is closed
                    <svg
                        className="w-6 h-6 text-gray-700 cursor-pointer"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                )}
            </div>

            {/* Desktop Navbar Links (Visible on Screens Larger than 1100px) */}
            <div className="hidden lg:flex justify-center items-center gap-10">
                {
                    user?.role == "patient" &&
                    <Link href="/doctors">
                        <h1 className="link font-semibold text-gray-500 hover:text-gray-700 relative group">
                            Doctors
                        </h1>
                    </Link>
                }
                {
                    user?.role == "doctor" &&
                    <Link href="/doctor-appointments" className="link font-semibold text-gray-500 hover:text-gray-700 relative group">
                        Appointments
                    </Link>
                }
                {
                    user?.role == "patient" &&
                    <Link href="/appointments" className="link font-semibold text-gray-500 hover:text-gray-700 relative group">
                        Appointments
                    </Link>
                }
                {
                    user ? <button onClick={handleLogout} className="bg-[#EC7FA9] text-white hover:bg-[#BE5985] hover:text-white px-4 py-1.5 rounded-md font-bold">
                        Logout
                    </button> :
                        <Link href="/login">
                            <button className="bg-[#EC7FA9] text-white hover:bg-[#BE5985] hover:text-white px-4 py-1.5 rounded-md font-bold">
                                Login
                            </button>
                        </Link>
                }
            </div>

            {/* Mobile Dropdown Menu (Visible on Smaller Screens) */}
            {isOpen && (
                <div className="flex flex-col items-center justify-center lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
                    {
                        user?.role == "patient" &&
                        <Link href="/doctors">
                            <h1 className="link font-semibold text-gray-500 hover:text-gray-700 p-3 relative group">
                                Doctors
                            </h1>
                        </Link>
                    }
                    {
                        user?.role == "doctor" &&
                        <Link href="/doctor-appointments" className="link font-semibold text-gray-500 hover:text-gray-700 relative group">
                            Appointments
                        </Link>
                    }
                    {
                        user?.role == "patient" &&
                        <Link href={'/appointments'} className="link font-semibold text-gray-500 hover:text-gray-700 p-3 relative group">
                            Appointments
                        </Link>
                    }
                    {
                        user ? (<button onClick={handleLogout} className="bg-[#EC7FA9] text-white hover:bg-[#BE5985] hover:text-white w-32 py-3 rounded-md font-bold mt-3 mb-3">
                            Logout
                        </button>) :
                            (<Link href="/login">
                                <button className="bg-[#EC7FA9] text-white hover:bg-[#BE5985] hover:text-white w-32 py-3 rounded-md font-bold mt-3 mb-3">
                                    Login
                                </button>
                            </Link>)
                    }
                </div>
            )}

        </div>
    );
}
