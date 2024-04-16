"use client";

export default function Loading() {
    return (
        <div className="absolute left-0 top-0 grid h-screen w-screen place-content-center bg-background">
            <div className="after:animate-ldrs-zoomies relative flex h-px w-40 items-center justify-center overflow-hidden rounded-full bg-background [transform:translate3d(0,0,0)] before:absolute before:left-0 before:top-0 before:size-full before:bg-foreground before:opacity-10 before:content-[''] after:size-full after:rounded-full after:bg-foreground after:transition-colors after:content-['']"></div>
        </div>
    );
}
