import { ServiceProvider } from "@/types";

// Mock data for service providers
export const mockServiceProviders: ServiceProvider[] = [
  // source 1 from yelp
  {
    id: 1,
    name: "Golden Gate Appliance Experts",
    rating: 4.9,
    reviewCount: 234,
    price: "$90-$180",
    location: "San Francisco, CA",
    phone: "(415) 555-0789",
    description:
      "Premium appliance repair service with lifetime warranty on parts.",
    availability: "Available now",
    services: ["Dishwasher repair", "Premium service", "Emergency calls"],
    source: "Yelp",
    responseTime: "< 1 hour",
    insuranceVerified: true,
    backgroundChecked: true,
    yearsInBusiness: 25,
  },
  // source 2 from angies list
  {
    id: 2,
    name: "San Francisco Appliance Repair Pros",
    rating: 4.5,
    reviewCount: 89,
    price: "$75-$150",
    location: "San Francisco, CA",
    phone: "(415) 555-0123",
    description:
      "Expert dishwasher repair with same-day service. 15+ years experience.",
    availability: "Available today",
    services: ["Dishwasher repair", "Installation", "Maintenance"],
    source: "Angie's List",
    responseTime: "< 3 hours",
    insuranceVerified: true,
    backgroundChecked: true,
    yearsInBusiness: 15,
  },
  // source 3 from thumbtack
  {
    id: 3,
    name: "Budget Appliance Repair",
    rating: 4.1,
    reviewCount: 45,
    price: "$50-$90",
    location: "San Francisco, CA",
    phone: "(415) 555-0654",
    description:
      "Affordable appliance repair service for budget-conscious customers.",
    availability: "Available in 2 days",
    services: ["Dishwasher repair", "Basic service"],
    source: "Thumbtack",
    responseTime: "< 6 hours",
    insuranceVerified: false,
    backgroundChecked: true,
    yearsInBusiness: 5,
  },
];

// Calculate Neptune Score (custom scoring algorithm)
export function calculateNeptuneScore(provider: ServiceProvider): number {
  let score = 0;

  // Rating component (40% weight) - max 40 points
  score += (provider.rating / 5) * 40;

  // Review count component (15% weight) - max 15 points
  const reviewScore = Math.min(provider.reviewCount / 200, 1) * 15;
  score += reviewScore;

  // Response time component (15% weight) - max 15 points
  const responseTimeScore = provider.responseTime.includes("< 1 hour")
    ? 15
    : provider.responseTime.includes("< 2 hours")
    ? 12
    : provider.responseTime.includes("< 3 hours")
    ? 8
    : 5;
  score += responseTimeScore;

  // Verification component (15% weight) - max 15 points
  let verificationScore = 0;
  if (provider.insuranceVerified) verificationScore += 7;
  if (provider.backgroundChecked) verificationScore += 8;
  score += verificationScore;

  // Experience component (10% weight) - max 10 points
  const experienceScore = Math.min(provider.yearsInBusiness / 25, 1) * 10;
  score += experienceScore;

  // Availability component (5% weight) - max 5 points
  const availabilityScore = provider.availability.includes("now")
    ? 5
    : provider.availability.includes("today")
    ? 4
    : provider.availability.includes("tomorrow")
    ? 2
    : 1;
  score += availabilityScore;

  return Math.round(score * 10) / 10; // Round to 1 decimal place
}

// Process providers: add Neptune scores and sort
export function processProviders(
  providers: ServiceProvider[]
): (ServiceProvider & { neptuneScore: number })[] {
  // Add Neptune Score to each provider
  const providersWithScores = providers.map((provider) => ({
    ...provider,
    neptuneScore: calculateNeptuneScore(provider),
  }));
  // Sort by Neptune Score (highest first)
  providersWithScores.sort((a, b) => b.neptuneScore - a.neptuneScore);

  return providersWithScores.slice(0, 3);
}

// Simulate LLM response
export function generateLLMResponse(
  query: string,
  providers: (ServiceProvider & { neptuneScore: number })[]
): string {
  // Check if query is service-related
  const serviceKeywords = [
    "repair",
    "service",
    "fix",
    "install",
    "maintenance",
    "plumber",
    "electrician",
    "technician",
  ];
  const isServiceQuery = serviceKeywords.some((keyword) =>
    query.toLowerCase().includes(keyword)
  );

  if (!isServiceQuery) {
    return `I'm designed to help you find local service providers. Your query "${query}" doesn't appear to be related to finding local services. 

Try searching for things like:
- "Find dishwasher repair in San Francisco"
- "Best plumbers near me"
- "Emergency HVAC repair services"

For general questions like yours, you might want to try a search engine or AI assistant instead.`;
  }

  return `Based on your query "${query}", I found ${providers.length} highly-rated dishwasher repair technicians in San Francisco.

**How to Book:**
- Call directly using the phone numbers provided
- Most providers offer online booking through their websites
- Many offer same-day or next-day service
- Always verify insurance and get a written estimate before work begins

The Neptune Scores shown help you compare providers based on ratings, reviews, response time, verification status, experience, and availability.`;
}

// Add this function to detect service-related queries
export function isServiceQuery(query: string): boolean {
  const serviceKeywords = [
    "repair",
    "service",
    "fix",
    "install",
    "maintenance",
    "plumber",
    "electrician",
    "technician",
    "contractor",
    "cleaning",
    "landscaping",
    "handyman",
    "appliance",
  ];

  return serviceKeywords.some((keyword) =>
    query.toLowerCase().includes(keyword)
  );
}

// Client-side search function
export async function performSearch(query: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!isServiceQuery(query)) {
    return {
      query,
      llmResponse: `I'm designed to help you find local service providers. Your query "${query}" doesn't appear to be related to finding local services. 

Try searching for things like:
- "Find dishwasher repair in San Francisco"
- "Best plumbers near me" 
- "Emergency HVAC repair services"`,
      providers: [],
      totalResults: 0,
      searchTime: Date.now(),
    };
  }

  const processedProviders = processProviders(mockServiceProviders);
  const llmResponse = generateLLMResponse(query, processedProviders);

  return {
    query,
    llmResponse,
    providers: processedProviders,
    totalResults: processedProviders.length,
    searchTime: Date.now(),
  };
}
