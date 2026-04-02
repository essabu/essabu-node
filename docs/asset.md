# Asset Module

Fixed asset management: assets, categories, and depreciation tracking.

## Available Classes

| Class | Resource Path | Description |
|-------|--------------|-------------|
| `AssetsApi` | `/api/asset/assets` | Fixed asset registry |
| `AssetCategoriesApi` | `/api/asset/categories` | Asset categories |
| `DepreciationsApi` | `/api/asset/depreciations` | Depreciation records and runs |

## AssetsApi

```typescript
async list(params?: PageRequest): Promise<PageResponse<Asset>>
    // GET /api/asset/assets

async retrieve(id: string): Promise<Asset>
    // GET /api/asset/assets/{id}

async create(data: CreateAssetRequest): Promise<Asset>
    // POST /api/asset/assets

async update(id: string, data: UpdateAssetRequest): Promise<Asset>
    // PATCH /api/asset/assets/{id}

async remove(id: string): Promise<void>
    // DELETE /api/asset/assets/{id}

async dispose(id: string, data: DisposeAssetRequest): Promise<Asset>
    // POST /api/asset/assets/{id}/dispose

async activate(id: string): Promise<Asset>
    // POST /api/asset/assets/{id}/activate
```

## AssetCategoriesApi

```typescript
async list(params?: PageRequest): Promise<PageResponse<AssetCategory>>
    // GET /api/asset/categories

async retrieve(id: string): Promise<AssetCategory>
    // GET /api/asset/categories/{id}

async create(data: CreateAssetCategoryRequest): Promise<AssetCategory>
    // POST /api/asset/categories

async update(id: string, data: UpdateAssetCategoryRequest): Promise<AssetCategory>
    // PATCH /api/asset/categories/{id}

async remove(id: string): Promise<void>
    // DELETE /api/asset/categories/{id}
```

## DepreciationsApi

```typescript
async list(params?: PageRequest): Promise<PageResponse<Depreciation>>
    // GET /api/asset/depreciations

async retrieve(id: string): Promise<Depreciation>
    // GET /api/asset/depreciations/{id}

async run(data: RunDepreciationRequest): Promise<Depreciation[]>
    // POST /api/asset/depreciations/run

async post_(id: string): Promise<Depreciation>
    // POST /api/asset/depreciations/{id}/post
```

## Code Examples

### Asset Registry

```typescript
import { Essabu } from 'essabu-node';

const client = new Essabu({ apiKey: 'your-api-key' });

// Create a category
const category = await client.asset.categories.create({
  name: 'IT Equipment',
  depreciationMethod: 'straight_line',
  usefulLifeMonths: 60,
});

// Create an asset
const asset = await client.asset.assets.create({
  name: 'Dell PowerEdge R750',
  categoryId: category.id,
  purchaseDate: '2026-01-15',
  purchasePrice: 8500,
  currency: 'USD',
  serialNumber: 'SRV-2026-001',
  location: 'Server Room A',
});

// Activate an asset
await client.asset.assets.activate(asset.id);

// Update
await client.asset.assets.update(asset.id, { location: 'Server Room B' });

// List assets
const assets = await client.asset.assets.list({ page: 1, pageSize: 50 });
```

### Asset Disposal

```typescript
await client.asset.assets.dispose(asset.id, {
  disposalDate: '2031-01-15',
  disposalPrice: 500,
  reason: 'End of useful life',
});
```

### Depreciation

```typescript
// Run depreciation for a period
const entries = await client.asset.depreciations.run({
  period: '2026-03',
  categoryId: category.id,
});

// List depreciation records
const depreciations = await client.asset.depreciations.list({ page: 1, pageSize: 50 });

// Post a depreciation entry to the ledger
await client.asset.depreciations.post_(entries[0].id);

// Retrieve details
const entry = await client.asset.depreciations.retrieve(entries[0].id);
```

### Categories

```typescript
const categories = await client.asset.categories.list();
await client.asset.categories.update(category.id, {
  name: 'IT Equipment (Updated)',
  usefulLifeMonths: 48,
});
await client.asset.categories.remove(category.id);
```
