import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/data/faqs";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonial";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";


export default function Home() {
  return ( 
  <div className="overflow-hidden">
    <div className="grid-background"></div>

    <HeroSection />

    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Powerful features for your career growth
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need to prepare, package, and present yourself with confidence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl
        mx-auto">
          {features.map((feature, index) => {
          return (
            <Card key={index}
            className="group hover:border-primary/60 hover:-translate-y-1 transition-all duration-300"
            >
              <CardContent className="pt-2 text-center flex flex-col items-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-5 rounded-lg border border-border/70 bg-accent p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {feature.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {feature.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}</div>
      </div>
    </section>

    <section className="w-full py-12 md:py-18">
      <div className="container mx-auto px-4 md:px-6">
        <div className="surface-panel grid grid-cols-2 gap-4 rounded-lg p-4 md:grid-cols-4 md:p-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-2 rounded-lg p-4 text-center">
            <h3 className="text-3xl font-bold text-primary md:text-4xl">50+</h3>
            <p className="text-muted-foreground">Industries Covered</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 rounded-lg p-4 text-center">
            <h3 className="text-3xl font-bold text-primary md:text-4xl">1000+</h3>
            <p className="text-muted-foreground">Interview Questions</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 rounded-lg p-4 text-center">
            <h3 className="text-3xl font-bold text-primary md:text-4xl">95+</h3>
            <p className="text-muted-foreground">Success Rate</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2 rounded-lg p-4 text-center">
            <h3 className="text-3xl font-bold text-primary md:text-4xl">24/7</h3>
            <p className="text-muted-foreground">AI Support</p>
          </div>
        </div>
      </div>
    </section>

    <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">How it works</h2>
            <p className="text-muted-foreground">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 rounded-lg border border-border/70 bg-card/55 p-6 shadow-sm backdrop-blur"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    

    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 md:text-4xl">
          What our users say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl
        mx-auto">
          {testimonial.map((testimonial, index) => {
          return (
            <Card key={index} className="bg-card/80">
              <CardContent className="pt-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                    width={40}
                    height={40}
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="rounded-full object-cover border-2 border-primary/20"
                    />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-primary">{testimonial.company}</p>
                    </div>
                    </div>
                    <blockquote className="relative">
                      <p className="text-muted-foreground leading-7">
                          {testimonial.quote}
                          </p>
                       </blockquote>
                      </div>
                    </CardContent>
                 </Card>
                );
            })}</div>
          </div>
        </section>

        
    <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">
              Frequently Asked Questions
              </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about our platform
            </p>
          </div>

           <div className="surface-panel max-w-3xl mx-auto rounded-lg px-5 sm:px-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

         <section className="w-full px-4 pb-16 md:px-6">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-lg gradient px-6 py-16 shadow-2xl md:py-20">
          <div className="flex flex-col items-center justify-center space-y-5 text-center max-w-3xl mx-auto">
            <CheckCircle2 className="h-10 w-10 text-primary-foreground/90" />
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="h-11 mt-3"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
     );
}
