import { MeiliSearch } from "meilisearch";
import { env } from "../../config/env.js";

export const searchClient = new MeiliSearch({
  host: env.MEILISEARCH_HOST,
  apiKey: env.MEILISEARCH_API_KEY
});

export async function searchMarketplace(query: string, filters: string[] = []) {
  const index = searchClient.index("marketplace");
  return index.search(query, {
    limit: 24,
    matchingStrategy: "all",
    filter: filters,
    facets: ["category", "country", "verified", "tags"]
  });
}
