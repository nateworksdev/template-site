"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site.config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const { heading, subheading } = siteConfig.pages.contact;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <Nav />
      <main>
        <section className="bg-muted/50 py-16">
          <div className="container text-center">
            <h1 className="mb-4">{heading}</h1>
            {subheading && (
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                {subheading}
              </p>
            )}
          </div>
        </section>

        <section className="container py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Phone</h3>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">Email</h3>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {siteConfig.contact.address && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Address</h3>
                      <p className="text-muted-foreground">
                        {siteConfig.contact.address.street}
                        <br />
                        {siteConfig.contact.address.city},{" "}
                        {siteConfig.contact.address.state}{" "}
                        {siteConfig.contact.address.zip}
                      </p>
                    </div>
                  </div>
                )}

                {siteConfig.contact.hours && (
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h3 className="mb-1 font-semibold">Business Hours</h3>
                    <p className="text-muted-foreground">
                      {siteConfig.contact.hours}
                    </p>
                  </div>
                )}

                {siteConfig.contact.serviceArea && (
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <h3 className="mb-1 font-semibold">Service Area</h3>
                    <p className="text-muted-foreground">
                      {siteConfig.contact.serviceArea}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell us about your project..."
                    rows={5}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {submitted ? "Message Sent!" : "Send Message"}
                </Button>
              </form>

              <p className="mt-4 text-sm text-muted-foreground">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
