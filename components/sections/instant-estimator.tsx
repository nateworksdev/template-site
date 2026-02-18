"use client";

import { useState, useMemo } from "react";
import { Camera, DollarSign, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site.config";

interface InstantEstimatorData {
  heading: string;
  subheading?: string;
}

interface InstantEstimatorProps {
  data: InstantEstimatorData;
}

const serviceOptions = [
  { id: "trimming", label: "Tree Trimming", baseMin: 150, baseMax: 500 },
  { id: "removal", label: "Tree Removal", baseMin: 400, baseMax: 2500 },
  { id: "stump", label: "Stump Grinding", baseMin: 100, baseMax: 400 },
  { id: "emergency", label: "Emergency Service", baseMin: 500, baseMax: 3000 },
];

export function InstantEstimator({ data }: InstantEstimatorProps) {
  const [selectedService, setSelectedService] = useState(serviceOptions[0].id);
  const [treeSize, setTreeSize] = useState([50]); // 0-100 scale
  const [quantity, setQuantity] = useState([1]);
  const [step, setStep] = useState<"estimate" | "contact" | "done">("estimate");
  const [contactInfo, setContactInfo] = useState({ name: "", phone: "", email: "" });

  const service = serviceOptions.find((s) => s.id === selectedService)!;
  
  // Calculate estimate based on inputs
  const estimate = useMemo(() => {
    const sizeMultiplier = 0.5 + (treeSize[0] / 100) * 1.5; // 0.5x to 2x
    const quantityMultiplier = quantity[0];
    
    const min = Math.round(service.baseMin * sizeMultiplier * quantityMultiplier);
    const max = Math.round(service.baseMax * sizeMultiplier * quantityMultiplier);
    
    return { min, max };
  }, [service, treeSize, quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to backend
    console.log({ service: selectedService, treeSize: treeSize[0], quantity: quantity[0], contactInfo });
    setStep("done");
  };

  if (step === "done") {
    return (
      <section className="relative overflow-hidden bg-muted/30 py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="mb-4">Thank You!</h2>
            <p className="text-lg text-muted-foreground">
              We&apos;ll contact you within 24 hours with a detailed quote for your {service.label.toLowerCase()} project.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background accent */}
      <div className="absolute inset-0 bg-mesh opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      <Container className="relative z-10">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-balance">{data.heading}</h2>
          {data.subheading && (
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
              {data.subheading}
            </p>
          )}
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
            {/* Estimator Controls */}
            <div className="rounded-2xl border bg-card p-6 shadow-lg md:p-8">
              {step === "estimate" ? (
                <div className="space-y-8">
                  {/* Service Selection */}
                  <div>
                    <Label className="mb-4 block text-base font-semibold">
                      What do you need?
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {serviceOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedService(option.id)}
                          className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                            selectedService === option.id
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/50 hover:bg-muted/50"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tree Size Slider */}
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <Label className="text-base font-semibold">Tree/Job Size</Label>
                      <span className="text-sm font-medium text-muted-foreground">
                        {treeSize[0] < 33 ? "Small" : treeSize[0] < 66 ? "Medium" : "Large"}
                      </span>
                    </div>
                    <Slider
                      value={treeSize}
                      onValueChange={setTreeSize}
                      max={100}
                      step={1}
                      className="py-2"
                    />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>Under 30ft</span>
                      <span>30-60ft</span>
                      <span>Over 60ft</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <Label className="text-base font-semibold">How many?</Label>
                      <span className="text-sm font-medium text-muted-foreground">
                        {quantity[0]} {quantity[0] === 1 ? "tree" : "trees"}
                      </span>
                    </div>
                    <Slider
                      value={quantity}
                      onValueChange={setQuantity}
                      min={1}
                      max={10}
                      step={1}
                      className="py-2"
                    />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>5</span>
                      <span>10+</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setStep("contact")} 
                    size="lg" 
                    className="w-full"
                  >
                    Get My Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Almost there!</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter your details and we&apos;ll send you a detailed quote.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        required
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Photo upload prompt */}
                  <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-4 text-center">
                    <Camera className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Have photos?</span> Text them to us at{" "}
                      <span className="font-medium text-primary">{siteConfig.contact.phone}</span>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep("estimate")}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="flex-1">
                      Request Quote
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Price Display Card */}
            <div className="flex flex-col">
              <div className="flex-1 rounded-2xl bg-primary p-6 text-primary-foreground shadow-xl shadow-primary/20">
                <div className="mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase tracking-wide opacity-80">
                    Estimated Range
                  </span>
                </div>
                
                <div className="mb-2">
                  <span className="text-4xl font-bold md:text-5xl">
                    ${estimate.min.toLocaleString()}
                  </span>
                  <span className="mx-2 text-2xl opacity-60">–</span>
                  <span className="text-4xl font-bold md:text-5xl">
                    ${estimate.max.toLocaleString()}
                  </span>
                </div>
                
                <p className="mb-6 text-sm opacity-70">
                  Final price based on site inspection
                </p>

                <div className="space-y-2 border-t border-primary-foreground/20 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-70">Service</span>
                    <span className="font-medium">{service.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Size</span>
                    <span className="font-medium">
                      {treeSize[0] < 33 ? "Small" : treeSize[0] < 66 ? "Medium" : "Large"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Quantity</span>
                    <span className="font-medium">{quantity[0]}</span>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span>✓ Licensed & Insured</span>
                <span>✓ Free Estimates</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
