import React from "react";

const Hero = () => {
    return (
        <div className="mb-8">
            <h1 className="text-6xl font-bold md:text-8xl">Galleria</h1>
            <p className="mt-2 text-lg md:text-2xl">
                A Portfolio Viewer from{" "}
                <a
                    href="https://www.helius.dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-primary transition-color duration-200 ease-in-out hover:cursor-pointer hover:text-accent"
                >
                    Helius Labs
                </a>
            </p>
        </div>
    );
};

export default Hero;