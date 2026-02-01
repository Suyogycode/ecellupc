import React from "react";

export const Header = () => {
    return (
        <header className="z-10 p-4 md:p-6 bg-primary/50 backdrop-blur-md">
            <div className="container relative mx-auto md:gap-4">
                <img src="public/assets/Ecell_Logo.png" alt="E-Cell UPC Logo" className="absolute w-12 h-12 md:h-30 md:w-30 left-6 top-2" />
                <div className="flex flex-col items-center gap-0.5 md:gap-1 flex-1 min-w-0">
                    <h1 className="text-lg font-bold tracking-wide text-center sm:text-2xl md:text-3xl lg:text-4xl md:tracking-wider">Entrepreneurship Cell</h1>
                    <h3 className="text-xs font-bold text-center sm:text-sm md:text-lg lg:text-xl">(Student's Running Cell)</h3>
                    <h3 className="text-xs font-bold tracking-wide text-center sm:text-sm md:text-base lg:text-lg md:tracking-widest">Udai Pratap College, Varanasi</h3>
                </div>
                <img src="public/assets/upc_logo.webp" alt="UPC Logo" className="absolute w-12 h-12 md:w-30 md:h-30 right-6 top-2" />
            </div>
        </header>
    );
}