import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "jotai";

export const metadata: Metadata = {
    title: "Diorama",
    description: "Diorama 3D models web view created by ARCADE for a school project",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://api.fontshare.com/v2/css?f[]=satoshi@400,401,500,501,700,701,900,901,1,2&display=swap"
                    rel="stylesheet"
                ></link>
            </head>
            <body className="grid grid-cols-[[page-start]_minmax(var(--inline-padding),_1fr)_[content-start]_min(100%_-_var(--inline-padding)_*_2,_1400px)_[content-end]_minmax(var(--inline-padding),_1fr)_[page-end]] bg-background font-serif [--inline-padding:_1rem]">
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
