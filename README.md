# Local Service Finder

A modern web application that helps users find and compare local service providers using natural language queries. Built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

### Natural Language Search

- Accept queries like: "Who are the best-rated dishwasher repair technicians in San Francisco, CA USA and what do they charge? How do I book?"
- AI-powered analysis and response generation
- Real-time search with loading states

### Multi-Source Data Integration

The app simulates data from multiple sources:

- **Yelp** - Customer reviews and ratings
- **Google Local** - Business listings and verification
- **Angie's List** - Premium service providers
- **HomeAdvisor** - Affordable service options
- **Thumbtack** - Professional contractors

### Neptune Score System

Our proprietary scoring algorithm ranks service providers from 0-100 based on:

- **Rating & Reviews (55%)**: Customer satisfaction and review volume
- **Response Time (15%)**: How quickly providers respond to inquiries
- **Verification (15%)**: Insurance and background check status
- **Experience (10%)**: Years in business
- **Availability (5%)**: Current availability status

### Modern UI/UX

- Clean, responsive design with gradient backgrounds
- Interactive service provider cards
- Real-time search with loading animations
- Color-coded Neptune Scores
- Mobile-friendly responsive layout

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd local-service-finder

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 How to Use

1. **Enter a Query**: Type a natural language query in the search box
2. **Get AI Analysis**: Receive a comprehensive analysis from our AI system
3. **Review Providers**: Browse ranked service providers with Neptune Scores
4. **Compare Details**: See ratings, prices, availability, and verification status
5. **Contact Providers**: Use the contact information to book services

### Example Queries

- "Find the best dishwasher repair services in San Francisco"
- "Who are affordable plumbers near me with good reviews?"
- "I need emergency HVAC repair - who's available today?"

## 🏗️ Technical Architecture

### Frontend

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hooks** for state management

### Backend

- **Next.js API Routes** for serverless functions
- **Mock data** simulating scraped sources
- **Custom scoring algorithm** for Neptune Scores

### Key Components

- `page.tsx` - Main search interface
- `api/search/route.ts` - Search API endpoint
- `types/index.ts` - TypeScript type definitions

## 🎯 Neptune Score Algorithm

The Neptune Score is calculated using a weighted scoring system:

```typescript
Score = (Rating/5 × 40) +
        (ReviewCount/200 × 15) +
        (ResponseTimeScore × 15) +
        (VerificationScore × 15) +
        (Experience/25 × 10) +
        (AvailabilityScore × 5)
```

### Score Ranges

- **85-100**: Excellent (Green)
- **70-84**: Great (Blue)
- **55-69**: Good (Yellow)
- **0-54**: Fair (Orange)

## 🔧 API Endpoints

### POST /api/search

Search for service providers based on natural language query.

**Request:**

```json
{
  "query": "Find dishwasher repair in San Francisco"
}
```

**Response:**

```json
{
  "query": "Find dishwasher repair in San Francisco",
  "llmResponse": "AI-generated analysis...",
  "providers": [...],
  "totalResults": 5,
  "searchTime": 1234567890
}
```

## 🎨 Design Decisions

### UI/UX Choices

- **Gradient background**: Creates a modern, professional look
- **Card-based layout**: Easy to scan and compare providers
- **Color-coded scores**: Quick visual assessment of quality
- **Responsive design**: Works on all device sizes

### Technical Choices

- **Next.js**: Full-stack React framework with API routes
- **TypeScript**: Better developer experience and fewer bugs
- **Tailwind CSS**: Rapid UI development with utility classes
- **Mock data**: Simulates real scraped data for demonstration

## 🔄 Future Enhancements

- **Real LLM integration**: Connect to OpenAI, Claude, or other providers
- **Live data scraping**: Integrate with real service provider APIs
- **User authentication**: Save searches and favorite providers
- **Booking integration**: Direct booking through the platform
- **Reviews system**: Allow users to leave reviews and ratings
- **Map integration**: Show provider locations on interactive maps

## 📝 Demo Script

For screen recording demonstration:

1. **Introduction** (30 seconds)

   - "Welcome to Local Service Finder, an AI-powered platform for finding local services"
   - Show the homepage and explain the concept

2. **Search Demo** (60 seconds)

   - Enter the example query about dishwasher repair in San Francisco
   - Show the loading state and explain the process
   - Highlight the AI analysis section

3. **Results Explanation** (90 seconds)

   - Explain the Neptune Score system and methodology
   - Walk through each service provider card
   - Show the different data sources and verification status
   - Highlight key features like pricing, availability, and contact info

4. **Additional Features** (30 seconds)
   - Show responsive design on different screen sizes
   - Demonstrate error handling with an invalid query
   - Explain the extensibility for real API integration

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is for demonstration purposes. Feel free to use and modify as needed.
