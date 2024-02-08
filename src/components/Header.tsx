import React from "react";
export const Header = () => {
    return (
        <nav className="flex flex-col p-2 max-w-5xl mx-auto">
            <h1 className="text-5xl text-white text-center">
                Your{" "}
                <span className="underline underline-offset-8 decoration-red-500">
                    all-time {" "}
                </span>
                Posts
            </h1>
        </nav>
    );
};
