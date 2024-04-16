"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";

import Link from "next/link";

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

import { dioramaUrlAtom } from "@/app/page";

const formSchema = z.object({
    url: z.string().min(18, "URL must be at least 18 characters long"),
});

function Header() {
    const [, setDioramaUrl] = useAtom(dioramaUrlAtom);
    const [inputDialogOpen, setInputDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setInputDialogOpen(false);
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
            initial={{ translateY: -100 }}
            animate={{ translateY: 0 }}
            transition={{ duration: 0.5, delay: 1.75, ease: cubicBezier(0.4, 0, 0.2, 1) }}
            className="relative top-0 z-50 grid h-fit grid-cols-[inherit] border-b !bg-background/50 py-3 shadow-2xl shadow-background/50 [grid-column:page]"
        >
            <header className="flex items-center justify-between [grid-column:content]">
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
                                                    placeholder="https://prod.spline.design/TjxcaWAOtjgLkmap/scene.splinecode"
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
    );
}

export { Header };
