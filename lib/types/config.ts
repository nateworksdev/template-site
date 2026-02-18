/**
 * Site configuration type definitions
 * Used to drive content, branding, and section ordering across client sites
 */

export interface SiteConfig {
  /** Site metadata */
  meta: {
    siteName: string;
    tagline: string;
    description: string;
    url: string;
    ogImage?: string;
  };

  /** Brand identity */
  brand: {
    logo?: string;
    colors: {
      primary: string;
      secondary?: string;
      accent?: string;
    };
    font?: {
      heading?: string;
      body?: string;
    };
  };

  /** Contact information */
  contact: {
    phone: string;
    email: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    hours?: string;
    serviceArea?: string;
  };

  /** Social links */
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    yelp?: string;
    google?: string;
  };

  /** Page configurations */
  pages: {
    home: HomePageConfig;
    services: ServicesPageConfig;
    about: AboutPageConfig;
    contact: ContactPageConfig;
  };

  /** Services offered */
  services: Service[];
}

export interface HomePageConfig {
  sections: HomeSection[];
}

export type HomeSection =
  | { type: "hero"; variant: "minimal" | "split" | "fullscreen"; data: HeroData }
  | { type: "services"; variant: "grid" | "cards"; data: ServicesGridData }
  | { type: "featured-service"; data: FeaturedServiceData }
  | { type: "gallery"; variant: "masonry" | "before-after"; data: GalleryData }
  | { type: "reviews"; variant: "carousel" | "grid"; data: ReviewsData }
  | { type: "process"; data: ProcessData }
  | { type: "faq"; data: FAQData }
  | { type: "cta"; data: CTAData }
  | { type: "instant-estimator"; data: InstantEstimatorData }
  | { type: "image-band"; data: ImageBandData };

export interface InstantEstimatorData {
  heading: string;
  subheading?: string;
}

export interface ImageBandData {
  image: string;
  heading?: string;
  subheading?: string;
  cta?: {
    text: string;
    href: string;
  };
  overlay?: "light" | "dark" | "gradient";
  height?: "sm" | "md" | "lg";
}

export interface HeroData {
  heading: string;
  subheading?: string;
  cta?: {
    text: string;
    href: string;
  };
  image?: string;
  video?: string;
}

export interface ServicesGridData {
  heading: string;
  subheading?: string;
  showAll?: boolean; // if false, limit to featured services
}

export interface FeaturedServiceData {
  serviceId: string; // reference to services array
  heading?: string;
  description?: string;
  cta?: {
    text: string;
    href: string;
  };
}

export interface GalleryData {
  heading: string;
  subheading?: string;
  images: {
    src: string;
    alt: string;
    before?: string; // for before-after variant
  }[];
}

export interface ReviewsData {
  heading: string;
  reviews: {
    text: string;
    author: string;
    rating: number;
    source?: "google" | "yelp" | "facebook";
    date?: string;
  }[];
}

export interface ProcessData {
  heading: string;
  steps: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

export interface FAQData {
  heading: string;
  items: {
    question: string;
    answer: string;
  }[];
}

export interface CTAData {
  heading: string;
  subheading?: string;
  buttonText: string;
  buttonHref: string;
}

export interface ServicesPageConfig {
  heading: string;
  subheading?: string;
}

export interface AboutPageConfig {
  heading: string;
  story: string;
  team?: {
    name: string;
    role: string;
    bio?: string;
    photo?: string;
  }[];
  certifications?: string[];
}

export interface ContactPageConfig {
  heading: string;
  subheading?: string;
  mapEmbed?: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  featured?: boolean;
  icon?: string;
  image?: string;
  pricing?: {
    type: "fixed" | "starting" | "quote";
    value?: number;
  };
}
