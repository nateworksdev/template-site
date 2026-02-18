"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  EstimatorQuestion,
  EstimatorData,
} from "@/lib/types/estimator";
import { defaultEstimatorQuestions } from "@/lib/types/estimator";

interface ServiceEstimatorProps {
  serviceId: string;
  serviceName: string;
  basePriceRange?: {
    min: number;
    max: number;
  };
}

export function ServiceEstimator({
  serviceId,
  serviceName,
  basePriceRange,
}: ServiceEstimatorProps) {
  const [step, setStep] = useState<"questions" | "contact" | "complete">(
    "questions"
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Get questions for this service type
  const questions: EstimatorQuestion[] =
    defaultEstimatorQuestions[serviceId] || defaultEstimatorQuestions.default;

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const isQuestionsComplete = questions.every(
    (q) => !q.required || answers[q.id]
  );

  const handleContinueToContact = () => {
    setStep("contact");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: EstimatorData = {
      serviceId,
      answers,
      contactInfo,
    };

    // TODO: Send to backend/email
    console.log("Estimator submission:", data);

    setStep("complete");
  };

  const calculateEstimate = () => {
    if (!basePriceRange) return null;

    let multiplier = 1;

    // Calculate based on pricing impact from answers
    questions.forEach((question) => {
      const answer = answers[question.id];
      const option = question.options?.find((opt) => opt.value === answer);
      if (option?.pricingImpact !== undefined) {
        multiplier += option.pricingImpact;
      }
    });

    const estimatedMin = Math.round(basePriceRange.min * multiplier);
    const estimatedMax = Math.round(basePriceRange.max * multiplier);

    return { min: estimatedMin, max: estimatedMax };
  };

  const estimate = calculateEstimate();

  if (step === "complete") {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-center">
        <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-2xl font-semibold">Thank You!</h3>
        <p className="text-muted-foreground">
          We&apos;ve received your request for <strong>{serviceName}</strong>.
          We&apos;ll contact you shortly with a detailed quote.
        </p>
      </div>
    );
  }

  if (step === "contact") {
    return (
      <div className="rounded-lg border bg-card p-6">
        <h3 className="mb-4 text-xl font-semibold">
          Get Your Free Estimate
        </h3>

        {estimate && (
          <div className="mb-6 rounded-lg bg-primary/10 p-4">
            <p className="mb-1 text-sm font-medium text-primary">
              Estimated Range
            </p>
            <p className="text-2xl font-bold">
              ${estimate.min.toLocaleString()} - $
              {estimate.max.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Final price depends on site inspection
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              required
              value={contactInfo.name}
              onChange={(e) =>
                setContactInfo((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="John Doe"
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={contactInfo.email}
              onChange={(e) =>
                setContactInfo((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="john@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={contactInfo.phone}
              onChange={(e) =>
                setContactInfo((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("questions")}
            >
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Get Free Estimate
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="mb-2 text-xl font-semibold">Get Instant Estimate</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Answer a few quick questions to receive an estimated price range
      </p>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id}>
            <Label className="mb-3 block text-base">
              {index + 1}. {question.question}
              {question.required && <span className="text-destructive"> *</span>}
            </Label>

            {question.type === "radio" && question.options && (
              <div className="space-y-2">
                {question.options.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={answers[question.id] === option.value}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      className="h-4 w-4 accent-primary"
                      aria-label={option.label}
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === "select" && question.options && (
              <select
                value={answers[question.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select an option...</option>
                {question.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {question.type === "input" && (
              <Input
                value={answers[question.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                placeholder={question.placeholder}
              />
            )}

            {question.type === "textarea" && (
              <Textarea
                value={answers[question.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                placeholder={question.placeholder}
                rows={4}
              />
            )}
          </div>
        ))}

        <Button
          onClick={handleContinueToContact}
          disabled={!isQuestionsComplete}
          className="w-full"
          size="lg"
        >
          Continue to Get Estimate
        </Button>
      </div>
    </div>
  );
}
