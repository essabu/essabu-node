# Asset Module

Fixed asset management: assets, categories, and depreciation tracking.

## Available Classes

| Class | Resource Path | Description |
|-------|--------------|-------------|
| `AssetsApi` | `/api/asset/assets` | Fixed asset registry |
| `AssetCategoriesApi` | `/api/asset/categories` | Asset categories |
| `DepreciationsApi` | `/api/asset/depreciations` | Depreciation records and runs |

## AssetsApi

Provides full CRUD operations for fixed assets along with lifecycle actions. List assets with pagination, retrieve a single asset by ID, create assets with purchase details, update asset metadata, or soft-delete them. The `dispose()` method records asset disposal with a date, sale price, and reason. The `activate()` method transitions a draft asset to active status, enabling depreciation.

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

Manages asset categories that define shared depreciation rules. Each category specifies a depreciation method (e.g., straight_line, declining_balance) and a useful life in months. Assets inherit these settings from their assigned category. Standard CRUD operations are supported with pagination on the list endpoint.

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

Handles depreciation records and batch depreciation runs. List and retrieve individual depreciation entries. The `run()` method calculates and creates depreciation entries for all active assets in a category for a given period. The `post_()` method posts a depreciation entry to the accounting ledger, creating the corresponding journal entry.

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

Create an asset category with depreciation settings, then register a fixed asset under it. Activate the asset to enable depreciation tracking. Update asset metadata such as location, and list all assets with pagination. Each asset stores purchase date, price, serial number, and current location.

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

Record the disposal of a fixed asset by providing the disposal date, sale price, and reason. The method updates the asset status to "disposed" and records the disposal details. Returns the updated Asset object. Throws a `ValidationError` if the asset is not in an active state.

```typescript
await client.asset.assets.dispose(asset.id, {
  disposalDate: '2031-01-15',
  disposalPrice: 500,
  reason: 'End of useful life',
});
```

### Depreciation

Run a batch depreciation calculation for all active assets in a category for a given accounting period. The `run()` method returns an array of created Depreciation entries. List all depreciation records with pagination, post individual entries to the accounting ledger, and retrieve detailed information about a specific depreciation entry.

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

List all asset categories, update a category's name or useful life, and delete a category. The `list()` method returns a paginated response with all categories. The `remove()` method throws a `ConflictError` if the category still has associated assets.

```typescript
const categories = await client.asset.categories.list();
await client.asset.categories.update(category.id, {
  name: 'IT Equipment (Updated)',
  usefulLifeMonths: 48,
});
await client.asset.categories.remove(category.id);
```
