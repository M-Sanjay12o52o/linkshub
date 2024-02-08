import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export const Header = async () => {
    const session = await getServerSession(authOptions)

    return (
        <nav className="bg-blue-800 p-4">
            <ul className="flex justify-evenly text-2xl font-bold">
                <li><Link href="/">Home</Link></li>
                {!session && (
                    <div>
                        <li><Link href="/signup">Sign Up</Link></li>
                        <li><Link href="/api/auth/signin">Sign In</Link></li>
                    </div>
                )}
                {session && (
                    <li><Link href="/api/auth/signout">Sign Out</Link></li>
                )}
                <li><Link href="/server">Server</Link></li>
                <li><Link href="/client">Client</Link></li>
                <li><Link href="/extra">Extra</Link></li>
            </ul>
        </nav>
    );
};
