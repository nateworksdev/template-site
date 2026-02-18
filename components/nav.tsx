"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80" aria-label="Main navigation">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          {siteConfig.meta.siteName}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}>
              <Phone className="mr-2 h-4 w-4" />
              {siteConfig.contact.phone}
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger asChild>
            <Button variant="ghost" size="icon-sm" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-50 bg-black/50" />
            <Drawer.Content 
              className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-auto max-h-[85vh] flex-col rounded-t-2xl bg-background"
              aria-label="Mobile navigation menu"
            >
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mx-auto mb-6 h-1.5 w-12 flex-shrink-0 rounded-full bg-muted" aria-hidden="true" />
                <nav className="flex flex-col gap-2" aria-label="Primary navigation">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 text-lg font-medium transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 border-t pt-4">
                    <Button asChild className="w-full" size="lg">
                      <a
                        href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}
                        onClick={() => setOpen(false)}
                      >
                        <Phone className="mr-2 h-5 w-5" />
                        {siteConfig.contact.phone}
                      </a>
                    </Button>
                  </div>
                </nav>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </Container>
    </nav>
  );
}
