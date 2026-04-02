# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-03-15

### Added

- Initial release of @essabu/sdk
- Unified client with 8 modules: HR, Accounting, Identity, Trade, Payment, E-Invoice, Project, Asset
- API with lazy module initialization
- Native fetch HTTP client (Node 18+)
- Automatic retry with exponential backoff and jitter
- Typed error hierarchy: EssabuError, NotFoundError, ValidationError, etc.
- Paginated list responses with PageResponse/PageMeta
- Full TypeScript strict mode support
- Zero runtime dependencies
- 5 GitHub Actions workflows (CI, Test, Lint, Publish, Release)
- 8 usage examples
