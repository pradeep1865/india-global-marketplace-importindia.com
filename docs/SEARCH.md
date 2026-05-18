# Search Architecture

ImportIndia.com uses Meilisearch for the first production search engine because it provides fast typo-tolerant search, autocomplete, ranking rules, facets, filters, and operational simplicity. Elasticsearch/OpenSearch can replace the adapter later without changing API contracts.

## Marketplace Index Projection

Each indexed document should include:

- `productId`
- `shortName`
- `description`
- `category`
- `manufacturerName`
- `country`
- `moq`
- `basePrice`
- `tags`
- `verified`
- `rating`
- `deliveryTimeline`
- `mediaPreview`

## Ranking

1. Verified manufacturers
2. Exact product/manufacturer matches
3. Conversion and quote response rate
4. Rating and review quality
5. Delivery speed
6. Freshness

## Search UX

- Predictive autocomplete from `/api/v1/search/suggest`.
- Search history persisted for logged-in users.
- Facets for country, category, verified, MOQ, price, delivery, and tags.
- Infinite results use cursor/page continuation at the API layer.
