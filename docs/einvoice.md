# E-Invoice Module

Electronic invoicing: create, submit to tax authorities, validate, and download in XML/PDF formats.

## Available Classes

| Class | Resource Path | Description |
|-------|--------------|-------------|
| `EInvoicesApi` | `/api/einvoice/einvoices` | E-invoice lifecycle management |

## EInvoicesApi

Manages the full e-invoice lifecycle from creation through submission to tax authorities. List e-invoices with pagination, retrieve one by ID, create a new e-invoice linked to a trade invoice, or delete a draft. The `submit()` method sends the e-invoice to the tax authority and returns the updated status. The `validate()` method checks compliance before submission. Download the e-invoice in XML or PDF format for archiving or sharing.

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

Create an e-invoice by providing the linked trade invoice ID, the customer's tax identification number (TIN), the customer name, an array of line items with descriptions, quantities, unit prices and tax rates, and the currency. After creation, validate the e-invoice to check for compliance errors, then submit it to the tax authority. The `submit()` method transitions the e-invoice status to "submitted".

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

Download the e-invoice in XML format for machine-readable archiving and tax authority integration, or in PDF format for human-readable printing and email distribution. Both methods accept the e-invoice ID and return the file content as a string. Throws a `NotFoundError` if the e-invoice does not exist.

```typescript
// Download XML representation
const xml = await client.einvoice.einvoices.downloadXml(einvoice.id);

// Download PDF representation
const pdf = await client.einvoice.einvoices.downloadPdf(einvoice.id);
```

### List and Filter

Retrieve a paginated list of all e-invoices, fetch a specific e-invoice by its UUID, or delete a draft e-invoice that has not yet been submitted. The `list()` method supports standard pagination parameters. The `remove()` method throws a `ValidationError` if the e-invoice has already been submitted to the tax authority.

```typescript
// List all e-invoices
const invoices = await client.einvoice.einvoices.list({ page: 1, pageSize: 50 });

// Retrieve a specific e-invoice
const details = await client.einvoice.einvoices.retrieve('einv-uuid');

// Delete a draft e-invoice
await client.einvoice.einvoices.remove('einv-uuid');
```

### Validation Workflow

Implement a safe submission workflow by validating the e-invoice before sending it to the tax authority. Create the e-invoice as a draft, call `validate()` to check for compliance errors, and only proceed with `submit()` if the validation result is valid. If validation fails, inspect the `errors` array for details about what needs to be corrected.

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
