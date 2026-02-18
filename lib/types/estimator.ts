/**
 * Smart Service Estimator types
 * Adapts questions based on service type
 */

export interface EstimatorQuestion {
  id: string;
  question: string;
  type: "select" | "radio" | "input" | "textarea";
  options?: { value: string; label: string; pricingImpact?: number }[];
  placeholder?: string;
  required?: boolean;
}

export interface EstimatorConfig {
  serviceId: string;
  questions: EstimatorQuestion[];
  basePriceRange?: {
    min: number;
    max: number;
  };
}

export interface EstimatorData {
  serviceId: string;
  answers: Record<string, string>;
  contactInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

// Default question sets for common service types
export const defaultEstimatorQuestions: Record<string, EstimatorQuestion[]> = {
  "tree-trimming": [
    {
      id: "tree-size",
      question: "What size is the tree?",
      type: "radio",
      required: true,
      options: [
        { value: "small", label: "Small (under 30 ft)", pricingImpact: 0 },
        { value: "medium", label: "Medium (30-60 ft)", pricingImpact: 0.5 },
        { value: "large", label: "Large (over 60 ft)", pricingImpact: 1 },
      ],
    },
    {
      id: "access",
      question: "How accessible is the tree?",
      type: "radio",
      required: true,
      options: [
        { value: "easy", label: "Easy access, open area", pricingImpact: 0 },
        { value: "moderate", label: "Moderate (near structures)", pricingImpact: 0.3 },
        { value: "difficult", label: "Difficult (tight space, overhead wires)", pricingImpact: 0.6 },
      ],
    },
    {
      id: "urgency",
      question: "When do you need this done?",
      type: "radio",
      required: true,
      options: [
        { value: "flexible", label: "Flexible (next 2-4 weeks)" },
        { value: "soon", label: "Soon (within 1 week)" },
        { value: "urgent", label: "Urgent (within 2-3 days)" },
      ],
    },
  ],
  "tree-removal": [
    {
      id: "tree-size",
      question: "What size is the tree?",
      type: "radio",
      required: true,
      options: [
        { value: "small", label: "Small (under 30 ft)", pricingImpact: 0 },
        { value: "medium", label: "Medium (30-60 ft)", pricingImpact: 0.7 },
        { value: "large", label: "Large (over 60 ft)", pricingImpact: 1.5 },
      ],
    },
    {
      id: "stump",
      question: "Do you need the stump removed?",
      type: "radio",
      required: true,
      options: [
        { value: "no", label: "No, leave the stump", pricingImpact: 0 },
        { value: "yes", label: "Yes, grind the stump", pricingImpact: 0.4 },
      ],
    },
    {
      id: "access",
      question: "How accessible is the tree?",
      type: "radio",
      required: true,
      options: [
        { value: "easy", label: "Easy access, open area", pricingImpact: 0 },
        { value: "moderate", label: "Moderate (near structures)", pricingImpact: 0.4 },
        { value: "difficult", label: "Difficult (tight space, overhead wires)", pricingImpact: 0.8 },
      ],
    },
  ],
  "stump-grinding": [
    {
      id: "stump-size",
      question: "What's the diameter of the stump?",
      type: "radio",
      required: true,
      options: [
        { value: "small", label: "Small (under 12 inches)", pricingImpact: 0 },
        { value: "medium", label: "Medium (12-24 inches)", pricingImpact: 0.5 },
        { value: "large", label: "Large (over 24 inches)", pricingImpact: 1 },
      ],
    },
    {
      id: "quantity",
      question: "How many stumps?",
      type: "select",
      required: true,
      options: [
        { value: "1", label: "1 stump" },
        { value: "2-3", label: "2-3 stumps" },
        { value: "4-5", label: "4-5 stumps" },
        { value: "6+", label: "6 or more stumps" },
      ],
    },
  ],
  emergency: [
    {
      id: "situation",
      question: "What's the situation?",
      type: "radio",
      required: true,
      options: [
        { value: "fallen", label: "Tree has fallen" },
        { value: "hanging", label: "Branch hanging/broken" },
        { value: "leaning", label: "Tree leaning dangerously" },
        { value: "blocking", label: "Blocking road/driveway" },
      ],
    },
    {
      id: "property-damage",
      question: "Is there property damage?",
      type: "radio",
      required: true,
      options: [
        { value: "none", label: "No damage" },
        { value: "minor", label: "Minor damage" },
        { value: "major", label: "Major damage (roof, vehicle, etc.)" },
      ],
    },
  ],
  default: [
    {
      id: "scope",
      question: "Tell us about your project",
      type: "textarea",
      placeholder: "Describe what you need...",
      required: true,
    },
    {
      id: "property-type",
      question: "Property type",
      type: "radio",
      required: true,
      options: [
        { value: "residential", label: "Residential" },
        { value: "commercial", label: "Commercial" },
      ],
    },
  ],
};
