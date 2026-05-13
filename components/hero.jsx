"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import React,{ useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
    const imageRef = useRef(null);

    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled");
            }else {
                imageElement.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="w-full px-4 pt-32 pb-16 sm:px-6 md:pt-40 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-10 text-center">
                <div className="mx-auto max-w-5xl space-y-6">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#101916]/80 px-4 py-2 text-sm font-semibold text-[#d7cfc3] shadow-sm backdrop-blur">
                        <Sparkles className="h-4 w-4 text-primary" />
                        AI-powered career operating system
                    </div>
                    <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl gradient-title">
                       Smart guidance. AI tools.
                       <br />
                        Real career growth.
                    </h1>
                    <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground md:text-xl">
                        Take your career to the next level with smart guidance, interview practice, 
                        and AI tools built to help you succeed.
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link href="/dashboard">
                        <Button size ="lg" className="px-8">
                        Get Started <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/interview">
                        <Button size="lg" variant="outline" className="px-8">
                        Practice Interviews
                        </Button>
                    </Link>
                </div>

                <div className="hero-image-wrapper mt-8 md:mt-10">
                    <div ref={imageRef} className="hero-image relative mx-auto max-w-6xl">
                        <Image
                        src={"/banner3.jpeg"}
                        width={1280}
                        height={720}
                        alt="Banner HireMind"
                        className="mx-auto rounded-lg border border-border/70 object-cover shadow-[0_32px_90px_rgba(15,23,42,0.2)]"
                        priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
};

export default HeroSection;
