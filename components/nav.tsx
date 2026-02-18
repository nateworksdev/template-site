"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" aria-label="Main navigation">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          {siteConfig.meta.siteName}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
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
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </Drawer.Trigger>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
            <Drawer.Content 
              className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[85vh] flex-col rounded-t-[10px] bg-background"
              aria-label="Mobile navigation menu"
            >
              <div className="flex-1 overflow-y-auto rounded-t-[10px] bg-background p-4">
                <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-muted" aria-hidden="true" />
                <nav className="flex flex-col gap-4" aria-label="Primary navigation">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring rounded-md px-2 py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="mt-4 w-full" size="lg">
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}
                      onClick={() => setOpen(false)}
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      {siteConfig.contact.phone}
                    </a>
                  </Button>
                </nav>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </nav>
  );
}
