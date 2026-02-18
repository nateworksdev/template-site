import { SiteConfig } from "@/lib/types/config";

/**
 * Site configuration
 * Edit this file to customize the site for each client
 */

export const siteConfig: SiteConfig = {
  meta: {
    siteName: "Blue Ridge Tree Care",
    tagline: "Expert Tree Service Since 1995",
    description:
      "Professional tree care services including trimming, removal, stump grinding, and emergency storm cleanup. Serving the greater metro area with certified arborists.",
    url: "https://example.com",
  },

  brand: {
    colors: {
      primary: "#2d5016", // forest green
      secondary: "#8b4513", // saddle brown
      accent: "#f4a460", // sandy brown
    },
  },

  contact: {
    phone: "(555) 123-4567",
    email: "info@blueridgetreecare.com",
    address: {
      street: "123 Oak Street",
      city: "Springfield",
      state: "MA",
      zip: "01101",
    },
    hours: "Mon-Sat: 7am-6pm",
    serviceArea: "Springfield & surrounding 25 miles",
  },

  social: {
    facebook: "https://facebook.com/blueridgetree",
    instagram: "https://instagram.com/blueridgetree",
  },

  pages: {
    home: {
      sections: [
        {
          type: "hero",
          variant: "fullscreen",
          data: {
            heading: "Professional Tree Care You Can Trust",
            subheading:
              "Certified arborists serving your community for over 25 years",
            cta: {
              text: "Get Free Estimate",
              href: "/contact",
            },
            image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&h=900&fit=crop",
          },
        },
        {
          type: "services",
          variant: "grid",
          data: {
            heading: "Our Services",
            subheading: "Complete tree care solutions for residential and commercial properties",
            showAll: false,
          },
        },
        {
          type: "instant-estimator",
          data: {
            heading: "Get an Instant Estimate",
            subheading: "Adjust the sliders to see your estimated price range. No commitment, no pressure.",
          },
        },
        {
          type: "image-band",
          data: {
            image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&h=600&fit=crop",
            heading: "Trusted by Homeowners Since 1995",
            subheading: "Over 10,000 trees cared for across the region",
            height: "md",
            overlay: "gradient",
          },
        },
        {
          type: "process",
          data: {
            heading: "How We Work",
            steps: [
              {
                title: "Free Consultation",
                description:
                  "We assess your trees and provide a detailed estimate at no cost.",
                icon: "clipboard-list",
              },
              {
                title: "Expert Service",
                description:
                  "Our certified arborists handle your job safely and efficiently.",
                icon: "wrench",
              },
              {
                title: "Complete Cleanup",
                description:
                  "We remove all debris and leave your property spotless.",
                icon: "broom",
              },
            ],
          },
        },
        {
          type: "reviews",
          variant: "carousel",
          data: {
            heading: "What Our Customers Say",
            reviews: [
              {
                text: "They removed three large oaks from my backyard quickly and professionally. The crew was courteous and cleaned up everything perfectly.",
                author: "Sarah M.",
                rating: 5,
                source: "google",
              },
              {
                text: "Best tree service in the area. Fair pricing, excellent work, and they really know their stuff. Highly recommend!",
                author: "Mike T.",
                rating: 5,
                source: "yelp",
              },
              {
                text: "Called them for emergency storm damage and they were out within 2 hours. Professional and efficient.",
                author: "Jennifer L.",
                rating: 5,
                source: "facebook",
              },
            ],
          },
        },
        {
          type: "cta",
          data: {
            heading: "Ready to Get Started?",
            subheading: "Contact us today for a free, no-obligation estimate",
            buttonText: "Request Quote",
            buttonHref: "/contact",
          },
        },
      ],
    },
    services: {
      heading: "Our Services",
      subheading: "Professional tree care for every need",
    },
    about: {
      heading: "About Blue Ridge Tree Care",
      story:
        "Founded in 1995, Blue Ridge Tree Care has been serving the Springfield community for over 25 years. Our team of certified arborists combines decades of experience with modern equipment and techniques to provide the highest quality tree care services. We're family-owned and operated, and we treat every property as if it were our own.",
      team: [
        {
          name: "John Anderson",
          role: "Owner & Certified Arborist",
          bio: "30+ years experience, ISA Certified",
        },
        {
          name: "Maria Rodriguez",
          role: "Operations Manager",
          bio: "15 years in tree care industry",
        },
      ],
      certifications: [
        "ISA Certified Arborists",
        "Licensed & Insured",
        "OSHA Compliant",
      ],
    },
    contact: {
      heading: "Get In Touch",
      subheading: "Request a free estimate or ask us a question",
    },
  },

  services: [
    {
      id: "tree-trimming",
      name: "Tree Trimming & Pruning",
      slug: "tree-trimming",
      description:
        "Expert trimming to keep your trees healthy, safe, and beautiful",
      longDescription:
        "Regular trimming and pruning is essential for tree health and safety. Our certified arborists use proper techniques to remove dead or diseased branches, improve tree structure, and enhance appearance while promoting healthy growth.",
      featured: true,
      icon: "scissors",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop",
      pricing: {
        type: "quote",
      },
    },
    {
      id: "tree-removal",
      name: "Tree Removal",
      slug: "tree-removal",
      description:
        "Safe removal of dangerous, diseased, or unwanted trees",
      longDescription:
        "When a tree becomes hazardous or needs to be removed, we handle it safely and efficiently. We use specialized equipment and techniques to remove trees of any size without damaging your property.",
      featured: true,
      icon: "tree-pine",
      image: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=800&h=600&fit=crop",
      pricing: {
        type: "quote",
      },
    },
    {
      id: "stump-grinding",
      name: "Stump Grinding",
      slug: "stump-grinding",
      description: "Complete stump removal and grinding services",
      longDescription:
        "Stumps are unsightly and can be hazardous. Our professional stump grinding service removes stumps below ground level, allowing you to replant or reclaim your space.",
      featured: true,
      icon: "circle-slash",
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&h=600&fit=crop",
      pricing: {
        type: "starting",
        value: 150,
      },
    },
    {
      id: "emergency-removal",
      name: "Emergency Tree Removal",
      slug: "emergency-removal",
      description: "24/7 emergency service for storm damage and fallen trees",
      longDescription:
        "Storms don't wait, and neither do we. Our emergency tree removal service is available 24/7 to handle fallen trees, hanging branches, and other urgent situations quickly and safely.",
      featured: true,
      icon: "siren",
      image: "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&h=600&fit=crop",
      pricing: {
        type: "quote",
      },
    },
    {
      id: "land-clearing",
      name: "Land Clearing",
      slug: "land-clearing",
      description: "Lot clearing for construction and development",
      longDescription:
        "Preparing land for construction or development requires proper tree and brush removal. We provide complete land clearing services with minimal environmental impact.",
      icon: "tractor",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&h=600&fit=crop",
      pricing: {
        type: "quote",
      },
    },
    {
      id: "tree-health",
      name: "Tree Health Care",
      slug: "tree-health",
      description: "Disease diagnosis, treatment, and prevention",
      longDescription:
        "Keep your trees healthy with our comprehensive tree health care services. We diagnose diseases, treat pest infestations, and provide preventative care to protect your investment.",
      icon: "heart-pulse",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      pricing: {
        type: "quote",
      },
    },
  ],
};
