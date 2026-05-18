# Deployment Strategy

## Environments

- Preview: Vercel for web, Fly.io/Render/ECS for API, managed Postgres, managed Redis, Meilisearch Cloud.
- Production: AWS ECS Fargate or Kubernetes, RDS PostgreSQL, ElastiCache Redis, OpenSearch/Meilisearch, S3 + CloudFront, WAF, ACM TLS.

## Pipeline

1. Pull request runs lint, typecheck, tests, Prisma schema validation, and Docker build.
2. Merge to `main` deploys staging.
3. Tagged release deploys production with database migration approval.
4. Rollback uses immutable container tags and backward-compatible migrations.

## Observability

- Structured JSON logs.
- OpenTelemetry traces.
- API latency, search latency, payment failure, login failure, cart conversion, checkout conversion dashboards.
- Alerting on 5xx, webhook failures, queue lag, and suspicious account lock events.
