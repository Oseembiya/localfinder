export interface ServiceProvider {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  price: string;
  location: string;
  phone: string;
  description: string;
  availability: string;
  services: string[];
  source: string;
  responseTime: string;
  insuranceVerified: boolean;
  backgroundChecked: boolean;
  yearsInBusiness: number;
  neptuneScore?: number;
}

export interface SearchResponse {
  query: string;
  llmResponse: string;
  providers: ServiceProvider[];
  totalResults: number;
  searchTime: number;
}
