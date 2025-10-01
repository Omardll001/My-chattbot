import { useEffect } from "react";

export const MobileMenu = ({menuOpen, setMenuOpen}) => {

    return (
        <div
            className={
                'fixed top-0 left-0 w-full z-50 flex flex-col items-center justify-center transition-all duration-300 ease-in-out' +
                (menuOpen
                    ? ' h-screen opacity-100 bg-gradient-to-br from-black via-blue-500 to-black'
                    : ' h-0 opacity-0 overflow-hidden bg-transparent')
            }
            style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
        >
            <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-7 text-3xl text-white focus:outline-none cursor-pointer"
                aria-label="Close Menu">
                &times;
            </button>

            <a href="#home" onClick={() => setMenuOpen(false)} className={'text-2xl font-semibold text-white my-4 transform transition-transform duration-300' + (menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0")}>
                Home
            </a>

            <a href="#projects" onClick={() => setMenuOpen(false)} className={'text-2xl font-semibold text-white my-4 transform transition-transform duration-300' + (menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0")}>
                Projects
            </a>

            <a href="#Mini_Chatbot" onClick={() => setMenuOpen(false)} className={'text-2xl font-semibold text-white my-4 transform transition-transform duration-300' + (menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0")}>
                Mini Chatbot
            </a>

            <a href="#about" onClick={() => setMenuOpen(false)} className={'text-2xl font-semibold text-white my-4 transform transition-transform duration-300' + (menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0")}>
                About
            </a>
        </div>
    );
}