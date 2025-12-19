# Warranty Hub Contracts

This library serves as the single source of truth for all data contracts, validation schemas, and type definitions within the Warranty Hub ecosystem. It utilizes **Zod** for runtime validation and **TypeScript** for static type inference.

## Architecture

This package adheres to **Dependency Level 0** constraints:
- Zero dependencies on internal application code.
- Pure TypeScript/Zod implementation.
- Framework agnostic (usable in NestJS, React Native, Next.js, etc.).

## Installation

```bash
npm install @warranty-hub/contracts
```

## Usage

### Validation

```typescript
import { BrandCreateSchema } from '@warranty-hub/contracts/dist/domains/catalog/brand.schema';

const input = { ... };
const result = BrandCreateSchema.safeParse(input);

if (!result.success) {
  console.error(result.error);
}
```

### Type Inference

```typescript
import { type BrandCreate } from '@warranty-hub/contracts/dist/domains/catalog/brand.schema';

const newBrand: BrandCreate = {
  name: 'Acme Corp',
  // ...
};
```

## Structure

- `src/shared`: Reusable value objects (Money, GeoJSON, Audit).
- `src/domains`: Business domain schemas (Identity, Catalog, Inventory, Service).
- `src/events`: Integration event schemas for the message bus.