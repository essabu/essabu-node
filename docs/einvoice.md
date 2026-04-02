# E-Invoice Module

Electronic invoicing: create, submit to tax authorities, validate, and download in XML/PDF formats.

## Available Classes

| Class | Resource Path | Description |
|-------|--------------|-------------|
| `EInvoicesApi` | `/api/einvoice/einvoices` | E-invoice lifecycle management |

## EInvoicesApi

```typescript
async list(params?: PageRequest): Promise<PageResponse<EInvoice>>
    // GET /api/einvoice/einvoices

async retrieve(id: string): Promise<EInvoice>
    // GET /api/einvoice/einvoices/{id}

async create(data: CreateEInvoiceRequest): Promise<EInvoice>
    // POST /api/einvoice/einvoices

async remove(id: string): Promise<void>
    // DELETE /api/einvoice/einvoices/{id}

async submit(id: string): Promise<EInvoice>
    // POST /api/einvoice/einvoices/{id}/submit

async validate(id: string): Promise<EInvoiceValidationResult>
    // GET /api/einvoice/einvoices/{id}/validate

async downloadXml(id: string): Promise<string>
    // GET /api/einvoice/einvoices/{id}/xml

async downloadPdf(id: string): Promise<string>
    // GET /api/einvoice/einvoices/{id}/pdf
```

## Code Examples

### Create and Submit an E-Invoice

```typescript
import { Essabu } from 'essabu-node';

const client = new Essabu({ apiKey: 'your-api-key' });

// Create an e-invoice
const einvoice = await client.einvoice.einvoices.create({
  invoiceId: 'inv-uuid',
  customerTin: '123456789',
  customerName: 'ACME Corp',
  items: [
    {
      description: 'Consulting services',
      quantity: 10,
      unitPrice: 150.0,
      taxRate: 16.0,
    },
  ],
  currency: 'CDF',
});

// Validate before submission
const validation = await client.einvoice.einvoices.validate(einvoice.id);
console.log(validation.isValid, validation.errors);

// Submit to tax authority
const submitted = await client.einvoice.einvoices.submit(einvoice.id);
console.log(submitted.status); // "submitted"
```

### Download Formats

```typescript
// Download XML representation
const xml = await client.einvoice.einvoices.downloadXml(einvoice.id);

// Download PDF representation
const pdf = await client.einvoice.einvoices.downloadPdf(einvoice.id);
```

### List and Filter

```typescript
// List all e-invoices
const invoices = await client.einvoice.einvoices.list({ page: 1, pageSize: 50 });

// Retrieve a specific e-invoice
const details = await client.einvoice.einvoices.retrieve('einv-uuid');

// Delete a draft e-invoice
await client.einvoice.einvoices.remove('einv-uuid');
```

### Validation Workflow

```typescript
// Create, validate, then submit
const draft = await client.einvoice.einvoices.create({
  invoiceId: 'inv-uuid',
  customerTin: '987654321',
  customerName: 'Beta Corp',
  items: [{ description: 'Product A', quantity: 5, unitPrice: 200, taxRate: 16 }],
  currency: 'USD',
});

const result = await client.einvoice.einvoices.validate(draft.id);
if (result.isValid) {
  await client.einvoice.einvoices.submit(draft.id);
} else {
  console.error('Validation errors:', result.errors);
}
```
