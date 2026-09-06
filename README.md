# GitHub Actions CI/CD

A production-oriented CI/CD portfolio project demonstrating how to validate, test, build, package and promote a Node.js service with GitHub Actions.

## Project Status

Implemented as a working TypeScript service with automated CI, Docker image validation and a gated deployment workflow. Deployment is intentionally represented as a controlled simulation rather than claiming that a real production environment exists.

## What This Repository Demonstrates

- Pull-request validation
- Type checking and automated tests
- Reproducible Node.js builds
- Docker image builds
- Dependency installation with deterministic lockfile support
- Artifact generation
- Branch-based delivery rules
- Manual production promotion
- Environment-based deployment gates
- Least-privilege workflow permissions
- Concurrency controls
- Separation of CI and CD responsibilities

## Pipeline Architecture

```text
Developer Push / Pull Request
          |
          v
+----------------------------+
| Continuous Integration     |
|----------------------------|
| Checkout                   |
| Setup Node                 |
| Install Dependencies       |
| Type Check                 |
| Test                       |
| Build                      |
| Upload Build Artifact      |
| Build Docker Image         |
+----------------------------+
          |
          | main branch
          v
+----------------------------+
| Delivery / Promotion       |
|----------------------------|
| Download Artifact          |
| Validate Release           |
| Staging Simulation         |
| Manual Production Gate     |
+----------------------------+
```

## Stack

| Area | Technology |
| --- | --- |
| Runtime | Node.js 22 |
| Language | TypeScript |
| API | Express |
| Tests | Vitest / Supertest |
| Packaging | Docker |
| Automation | GitHub Actions |

## Repository Structure

```text
github-actions-cicd/
├── src/
│   ├── app.ts
│   └── server.ts
├── tests/
│   └── app.test.ts
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── Dockerfile
├── .dockerignore
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Continuous Integration

The CI workflow runs on pushes to `main` and on pull requests. It validates the codebase before changes can be promoted.

Pipeline stages:

```text
checkout -> setup -> install -> typecheck -> test -> build -> artifact -> docker build
```

The workflow uses `npm ci` so dependency installation is reproducible when a lockfile is present.

## Continuous Delivery

The delivery workflow is triggered after CI succeeds on the `main` branch or manually through `workflow_dispatch`.

This repository intentionally does not claim deployment to AWS, Azure, GCP or another live environment. Instead it demonstrates the mechanics of promotion, release validation and environment gates in a way that can be inspected safely by recruiters.

## Environment Promotion

The delivery workflow models two stages:

```text
main
  |
  v
staging
  |
  v
production
```

The `production` job is associated with a GitHub Environment so repository owners can configure required reviewers and protection rules in GitHub.

## Security Considerations

Workflow permissions are explicitly minimized rather than relying on broad defaults. The pipeline does not expose secrets in logs and avoids embedding cloud credentials in repository files.

For real deployment, short-lived identity federation such as GitHub OIDC should be preferred over long-lived cloud access keys.

## Local Development

```bash
npm install
npm run dev
```

Run validation locally:

```bash
npm run typecheck
npm test
npm run build
```

## Docker

Build:

```bash
docker build -t github-actions-cicd .
```

Run:

```bash
docker run --rm -p 3000:3000 github-actions-cicd
```

Then open:

```text
GET http://localhost:3000/health
```

## Engineering Roadmap

- [x] Add TypeScript service
- [x] Add automated tests
- [x] Add CI workflow
- [x] Add build artifact generation
- [x] Add Docker build validation
- [x] Add staged delivery workflow
- [x] Add production environment gate
- [ ] Add container registry publishing
- [ ] Add OIDC-based cloud authentication example
- [ ] Add SBOM generation
- [ ] Add dependency and container vulnerability scanning
- [ ] Add signed release artifacts
- [ ] Add rollback demonstration

## Portfolio Context

This repository is intentionally focused on delivery engineering rather than application complexity. It demonstrates practical CI/CD design, workflow security, release discipline and automation patterns that complement backend and cloud-native engineering projects elsewhere in this portfolio.
