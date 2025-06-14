"use client";

import { useState } from "react";
import { SearchResponse, ServiceProvider } from "@/types/index";
import { performSearch } from "@/lib/searchUtils";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await performSearch(query.trim());
      setResults(data);
    } catch (err) {
      setError("Failed to search. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getNeptuneScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-100";
    if (score >= 70) return "text-blue-600 bg-blue-100";
    if (score >= 55) return "text-yellow-600 bg-yellow-100";
    return "text-orange-600 bg-orange-100";
  };

  const formatPhoneNumber = (phone: string) => {
    return phone
      .replace(/[^\d]/g, "")
      .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Local Service Finder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the best local service providers using natural language
            queries. Powered by AI and ranked with our exclusive Neptune Score.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: 'Who are the best-rated dishwasher repair technicians in San Francisco'"
                className="w-full px-6 py-4 text-lg text-gray-900 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 top-2 px-8 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* LLM Response */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  🤖
                </div>
                AI Analysis
              </h2>
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {results.llmResponse}
                </div>
              </div>
            </div>

            {/* Neptune Score Explanation */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  ⭐
                </div>
                Neptune Score Explained
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="mb-3">
                    Our proprietary Neptune Score rates service providers from
                    0-100 based on:
                  </p>
                  <ul className="space-y-1 text-blue-100">
                    <li>
                      • <strong>Rating & Reviews (55%):</strong> Customer
                      satisfaction & volume
                    </li>
                    <li>
                      • <strong>Response Time (15%):</strong> How quickly they
                      respond
                    </li>
                    <li>
                      • <strong>Verification (15%):</strong> Insurance &
                      background checks
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1 text-blue-100 mt-8 md:mt-0">
                    <li>
                      • <strong>Experience (10%):</strong> Years in business
                    </li>
                    <li>
                      • <strong>Availability (5%):</strong> How soon they can
                      help
                    </li>
                  </ul>
                  <div className="mt-4 flex space-x-4 text-xs">
                    <span className="bg-green-500 px-2 py-1 rounded">
                      85+: Excellent
                    </span>
                    <span className="bg-blue-500 px-2 py-1 rounded">
                      70+: Great
                    </span>
                    <span className="bg-yellow-500 px-2 py-1 rounded">
                      55+: Good
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Providers */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Service Providers ({results.totalResults} found)
              </h3>
              <div className="grid gap-6">
                {results.providers.map(
                  (provider: ServiceProvider, index: number) => (
                    <div
                      key={provider.id}
                      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="text-xl font-bold text-gray-900">
                                  {provider.name}
                                </h4>
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  #{index + 1}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                  ⭐ {provider.rating}/5 ({provider.reviewCount}{" "}
                                  reviews)
                                </span>
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                                  Source: {provider.source}
                                </span>
                              </div>
                            </div>
                            {provider.neptuneScore && (
                              <div
                                className={`px-3 py-2 rounded-full font-bold text-sm ${getNeptuneScoreColor(
                                  provider.neptuneScore
                                )}`}
                              >
                                Neptune Score: {provider.neptuneScore}
                              </div>
                            )}
                          </div>

                          <p className="text-gray-700 mb-4">
                            {provider.description}
                          </p>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <span className="font-semibold text-gray-700 w-20">
                                  Price:
                                </span>
                                <span className="text-green-600 font-semibold">
                                  {provider.price}
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <span className="font-semibold text-gray-700 w-20">
                                  Location:
                                </span>
                                <span className="text-gray-900">
                                  {provider.location}
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <span className="font-semibold text-gray-700 w-20">
                                  Phone:
                                </span>
                                <a
                                  href={`tel:${provider.phone}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {formatPhoneNumber(provider.phone)}
                                </a>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <span className="font-semibold text-gray-700 w-24">
                                  Available:
                                </span>
                                <span className="text-blue-600">
                                  {provider.availability}
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <span className="font-semibold text-gray-700 w-24">
                                  Response:
                                </span>
                                <span className="text-gray-700 ">
                                  {provider.responseTime}
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <span className="font-semibold text-gray-700 w-24">
                                  Experience:
                                </span>
                                <span className="text-gray-700 ">
                                  {provider.yearsInBusiness} years
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {provider.services.map((service, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                              >
                                {service}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <span
                                className={`w-3 h-3 rounded-full ${
                                  provider.insuranceVerified
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></span>
                              <span
                                className={
                                  provider.insuranceVerified
                                    ? "text-green-700"
                                    : "text-red-700"
                                }
                              >
                                {provider.insuranceVerified
                                  ? "Insured"
                                  : "Not Insured"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`w-3 h-3 rounded-full ${
                                  provider.backgroundChecked
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></span>
                              <span
                                className={
                                  provider.backgroundChecked
                                    ? "text-green-700"
                                    : "text-red-700"
                                }
                              >
                                {provider.backgroundChecked
                                  ? "Background Checked"
                                  : "Not Verified"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 lg:mt-0 lg:ml-6">
                          <button className="w-full lg:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                            Contact Now
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!results && !loading && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Find Local Services?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Enter a natural language query above to find and compare local
                service providers. Our AI will analyze your request and provide
                ranked recommendations with detailed information.
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Example Queries:
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    &quot;Find the best dishwasher repair services in San
                    Francisco&quot;
                  </div>
                  <div>
                    &quot;Who are affordable plumbers near me with good
                    reviews?&quot;
                  </div>
                  <div>
                    &quot;I need emergency HVAC repair - who&apos;s available
                    today?&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
