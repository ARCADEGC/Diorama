"use client";

import React from "react";
import { atom, useAtom } from "jotai";

import Spline from "@splinetool/react-spline";
import { cubicBezier, motion } from "framer-motion";

import { AuroraBackground } from "@/components/ui/aurora";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const dioramaUrlAtom = atom<string>(
    "https://prod.spline.design/LIqo6h9Covl04HaH/scene.splinecode",
);

export default function Home() {
    const [dioramaUrl] = useAtom(dioramaUrlAtom);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75, ease: cubicBezier(0.4, 0, 0.2, 1) }}
            className="grid !h-svh max-h-svh min-h-svh grid-cols-[inherit] grid-rows-[auto_1fr_auto] overflow-hidden [grid-column:page]"
        >
            <Header />

            <AuroraBackground className="absolute right-0 top-0 -z-10 size-full opacity-25" />

            <main className="absolute left-0 top-0 size-full [grid-column:content]">
                <Spline scene={dioramaUrl} />
            </main>

            <Footer />
        </motion.div>
    );
}
