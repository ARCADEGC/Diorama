"use client";

import { zoomies } from "ldrs";

export default function Loading() {
    zoomies.register();

    return (
        <div className="absolute left-0 top-0 grid h-screen w-screen place-content-center bg-background">
            <l-zoomies
                size="150"
                stroke="2"
                bg-opacity="0.1"
                speed="1.6"
                color="white"
            />
        </div>
    );
}
