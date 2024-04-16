import Link from "next/link";

import { motion, cubicBezier } from "framer-motion";

import { Code } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";

function Footer() {
    return (
        <motion.div
            initial={{ translateY: 100 }}
            animate={{ translateY: 0 }}
            transition={{
                duration: 0.5,
                delay: 2.25,
                ease: cubicBezier(0.4, 0, 0.2, 1),
            }}
            className="bottom-0 mt-auto grid h-fit grid-cols-[inherit] border-t bg-background/50 py-4 shadow-2xl shadow-background/50 backdrop-blur-lg [grid-column:page]"
        >
            <footer className="flex items-center justify-between [grid-column:content]">
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
    );
}

export { Footer };
