"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site.config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { heading, subheading } = siteConfig.pages.contact;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Implement form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="bg-muted/30 py-20">
          <Container className="text-center">
            <h1 className="mb-4 text-balance">{heading}</h1>
            {subheading && (
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
                {subheading}
              </p>
            )}
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Info */}
              <div>
                <h2 className="mb-8 text-2xl font-semibold">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Phone</h3>
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Email</h3>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  {siteConfig.contact.address && (
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
                    <div className="rounded-xl border bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold">Business Hours</h3>
                      <p className="text-muted-foreground">
                        {siteConfig.contact.hours}
                      </p>
                    </div>
                  )}

                  {siteConfig.contact.serviceArea && (
                    <div className="rounded-xl border bg-muted/30 p-4">
                      <h3 className="mb-1 font-semibold">Service Area</h3>
                      <p className="text-muted-foreground">
                        {siteConfig.contact.serviceArea}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
                <h2 className="mb-6 text-2xl font-semibold">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="mt-1.5"
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
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="mt-1.5"
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
                      className="mt-1.5"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading || submitted}>
                    {loading ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
                  </Button>
                </form>

                <p className="mt-4 text-center text-sm text-muted-foreground">
                  We typically respond within 24 hours.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
