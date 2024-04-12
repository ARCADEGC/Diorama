"use client";

import React from "react";

import Link from "next/link";

import { Code } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { cubicBezier, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { AuroraBackground } from "@/components/ui/aurora";

export default function Home() {
    const [commandOpen, setCommandOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setCommandOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75, ease: cubicBezier(0.4, 0, 0.2, 1) }}
            className="grid !h-svh max-h-svh min-h-svh grid-cols-[inherit] overflow-hidden [grid-column:page]"
        >
            <motion.div
                initial={{ translateY: -100 }}
                animate={{ translateY: 0 }}
                transition={{ duration: 0.5, delay: 1, ease: cubicBezier(0.4, 0, 0.2, 1) }}
                className="relative top-0 z-50 grid h-fit grid-cols-[inherit] border-b bg-background/50 py-3 shadow-2xl shadow-background/50 backdrop-blur-xl [grid-column:page]"
            >
                <header className="flex items-end justify-between [grid-column:content]">
                    <Typography variant="h1">Diorama</Typography>

                    <Button
                        variant={"ghost"}
                        onClick={() => setCommandOpen(true)}
                    >
                        <Typography variant="muted">Press</Typography>
                        <Typography
                            variant="code"
                            className="mx-1"
                            asChild
                        >
                            <kbd>
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </Typography>
                        <Typography variant="muted">to search dioramas</Typography>
                    </Button>
                    <CommandDialog
                        open={commandOpen}
                        onOpenChange={setCommandOpen}
                    >
                        <CommandInput placeholder="Search diorama..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                <CommandItem>
                                    <span>Calendar</span>
                                </CommandItem>
                                <CommandItem>
                                    <span>Calendar2</span>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </CommandDialog>
                </header>
            </motion.div>

            <AuroraBackground className="absolute right-0 top-0 -z-10 size-full opacity-25" />

            <main className="[grid-column:content]">
                <Spline scene="https://prod.spline.design/LIqo6h9Covl04HaH/scene.splinecode" />
            </main>

            <motion.div
                initial={{ translateY: 100 }}
                animate={{ translateY: 0 }}
                transition={{ duration: 0.5, delay: 1.5, ease: cubicBezier(0.4, 0, 0.2, 1) }}
                className="grid grid-cols-[inherit] border-t [grid-column:page]"
            >
                <footer className="bottom-0 mt-auto flex h-fit items-center justify-between bg-background/75 py-4 shadow-2xl shadow-background/75 backdrop-blur-3xl [grid-column:content]">
                    <Typography variant="muted">This project is under the MIT license.</Typography>
                    <Typography
                        variant="muted"
                        className="text-xs"
                        asChild
                    >
                        <Button
                            variant={"link"}
                            size={"sm"}
                            className="flex items-center gap-2 p-0"
                            asChild
                        >
                            <Link href="https://github.com/ARCADEGC">
                                <Code className="size-3" />
                                <address>ARCADE</address>
                            </Link>
                        </Button>
                    </Typography>
                </footer>
            </motion.div>
        </motion.div>
    );
}
