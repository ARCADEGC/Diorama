"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";

import { Code } from "lucide-react";
import Spline from "@splinetool/react-spline";
import { cubicBezier, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { AuroraBackground } from "@/components/ui/aurora";

const formSchema = z.object({
    url: z.string().min(18, "URL must be at least 18 characters long"),
});

export default function Home() {
    const [inputDialogOpen, setInputDialogOpen] = useState(false);
    const [dioramaUrl, setDioramaUrl] = useState<string>(
        "https://prod.spline.design/LIqo6h9Covl04HaH/scene.splinecode",
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setDioramaUrl(values.url);
    }

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setInputDialogOpen((open) => !open);
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
            className="grid !h-svh max-h-svh min-h-svh grid-cols-[inherit] grid-rows-[auto_1fr_auto] overflow-hidden [grid-column:page]"
        >
            <motion.div
                initial={{ translateY: -100 }}
                animate={{ translateY: 0 }}
                transition={{ duration: 0.5, delay: 1.75, ease: cubicBezier(0.4, 0, 0.2, 1) }}
                className="relative top-0 z-50 grid h-fit grid-cols-[inherit] border-b !bg-background/50 py-3 shadow-2xl shadow-background/50 [grid-column:page]"
            >
                <header className="flex items-end justify-between [grid-column:content]">
                    <Typography variant="h1">Diorama</Typography>

                    <Dialog
                        open={inputDialogOpen}
                        onOpenChange={setInputDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button variant={"ghost"}>
                                <Typography
                                    variant="code"
                                    className="mx-1"
                                    asChild
                                >
                                    <kbd>
                                        <span className="text-xs">
                                            {typeof window !== "undefined" ?
                                                /Mac/.test(navigator.userAgent) ?
                                                    "⌘"
                                                :   "ctrl"
                                            :   "ctrl"}
                                        </span>{" "}
                                        K
                                    </kbd>
                                </Typography>
                                <Typography variant="muted">for custom dioramas</Typography>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Enter custom{" "}
                                    <Typography variant="anchor">
                                        <Link href={"https://spline.design/"}>spline</Link>
                                    </Typography>{" "}
                                    URL
                                </DialogTitle>
                            </DialogHeader>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="url"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Spline model URL</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="URL"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Make sure your model is public
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="mt-4"
                                    >
                                        Submit
                                    </Button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </header>
            </motion.div>

            <AuroraBackground className="absolute right-0 top-0 -z-10 size-full opacity-25" />

            <main className="absolute left-0 top-0 size-full [grid-column:content]">
                <Spline scene={dioramaUrl} />
            </main>

            <motion.div
                initial={{ translateY: 100 }}
                animate={{ translateY: 0 }}
                transition={{ duration: 0.5, delay: 2.25, ease: cubicBezier(0.4, 0, 0.2, 1) }}
                className="grid grid-cols-[inherit] border-t [grid-column:page]"
            >
                <footer className="bottom-0 mt-auto flex h-fit items-center justify-between bg-background/50 py-4 shadow-2xl shadow-background/50 backdrop-blur-lg [grid-column:content]">
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
