"use client"

import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";

const urlEndPoint = process.env.PUBLIC_URL_ENDPOINT!;

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ImageKitProvider urlEndpoint={urlEndPoint}>{children}</ImageKitProvider>
        </SessionProvider>
    )
}