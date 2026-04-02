# Trade Module

CRM and commerce: customers, products, invoices, quotations, purchase orders, and suppliers.

## Available Classes

| Class | Resource Path | Description |
|-------|--------------|-------------|
| `CustomersApi` | `/api/trade/customers` | Customer management |
| `ProductsApi` | `/api/trade/products` | Product catalog |
| `InvoicesApi` | `/api/trade/invoices` | Sales invoices |
| `QuotationsApi` | `/api/trade/quotations` | Quotations / estimates |
| `PurchaseOrdersApi` | `/api/trade/purchase-orders` | Purchase orders |
| `SuppliersApi` | `/api/trade/suppliers` | Supplier management |

## CustomersApi

Manages customer records with standard CRUD operations. Create customers with a name, email, phone, and tax ID. List customers with pagination and search, retrieve one by ID, update their details, or soft-delete them. Customer IDs are referenced by invoices, quotations, and payments.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Customer>>
async retrieve(id: string): Promise<Customer>
async create(data: CreateCustomerRequest): Promise<Customer>
async update(id: string, data: UpdateCustomerRequest): Promise<Customer>
async remove(id: string): Promise<void>
```

## ProductsApi

Manages the product catalog with standard CRUD operations. Create products with a name, SKU, price, and currency. Products are referenced by invoice lines and purchase order lines. Supports pagination, searching by name or SKU, and sorting on the list endpoint.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Product>>
async retrieve(id: string): Promise<Product>
async create(data: CreateProductRequest): Promise<Product>
async update(id: string, data: UpdateProductRequest): Promise<Product>
async remove(id: string): Promise<void>
```

## InvoicesApi

Manages sales invoices through their full lifecycle. Create invoices with a customer reference, due date, and line items. The `issue()` method finalizes the invoice and assigns an invoice number. The `markPaid()` method records payment with an optional paid date. The `cancel()` method voids the invoice with a reason. The `duplicate()` method creates a copy. The `sendByEmail()` method delivers the invoice to a specified or default email address.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Invoice>>
async retrieve(id: string): Promise<Invoice>
async create(data: CreateInvoiceRequest): Promise<Invoice>
async update(id: string, data: UpdateInvoiceRequest): Promise<Invoice>
async remove(id: string): Promise<void>

async issue(id: string): Promise<Invoice>
    // POST /api/trade/invoices/{id}/issue

async markPaid(id: string, paidAt?: string): Promise<Invoice>
    // POST /api/trade/invoices/{id}/mark-paid

async cancel(id: string, reason?: string): Promise<Invoice>
    // POST /api/trade/invoices/{id}/cancel

async duplicate(id: string): Promise<Invoice>
    // POST /api/trade/invoices/{id}/duplicate

async sendByEmail(id: string, email?: string): Promise<void>
    // POST /api/trade/invoices/{id}/send
```

## QuotationsApi

Manages quotations (estimates) with CRUD operations and a conversion workflow. Create quotations with a customer, validity date, and line items. The `accept()` method marks the quotation as accepted by the customer. The `reject()` method records a rejection with an optional reason. The `convertToInvoice()` method creates a new invoice from the quotation data and returns the created Invoice. The `sendByEmail()` method delivers the quotation to the customer.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Quotation>>
async retrieve(id: string): Promise<Quotation>
async create(data: CreateQuotationRequest): Promise<Quotation>
async update(id: string, data: UpdateQuotationRequest): Promise<Quotation>
async remove(id: string): Promise<void>

async accept(id: string): Promise<Quotation>
    // POST /api/trade/quotations/{id}/accept

async reject(id: string, reason?: string): Promise<Quotation>
    // POST /api/trade/quotations/{id}/reject

async convertToInvoice(id: string): Promise<Invoice>
    // POST /api/trade/quotations/{id}/convert-to-invoice

async sendByEmail(id: string, email?: string): Promise<void>
    // POST /api/trade/quotations/{id}/send
```

## PurchaseOrdersApi

Manages purchase orders with CRUD operations and an approval workflow. Create purchase orders with a supplier reference and line items specifying product, quantity, and unit price. The `approve()` method transitions the order to approved status for fulfillment. The `receive()` method marks the order as received when goods arrive. The `cancel()` method voids the order with an optional reason.

```typescript
async list(params?: PageRequest): Promise<PageResponse<PurchaseOrder>>
async retrieve(id: string): Promise<PurchaseOrder>
async create(data: CreatePurchaseOrderRequest): Promise<PurchaseOrder>
async update(id: string, data: UpdatePurchaseOrderRequest): Promise<PurchaseOrder>
async remove(id: string): Promise<void>

async approve(id: string): Promise<PurchaseOrder>
    // POST /api/trade/purchase-orders/{id}/approve

async receive(id: string): Promise<PurchaseOrder>
    // POST /api/trade/purchase-orders/{id}/receive

async cancel(id: string, reason?: string): Promise<PurchaseOrder>
    // POST /api/trade/purchase-orders/{id}/cancel
```

## SuppliersApi

Manages supplier records with standard CRUD operations. Create suppliers with a name, email, and contact details. Supplier IDs are referenced by purchase orders. Supports pagination and search on the list endpoint.

```typescript
async list(params?: PageRequest): Promise<PageResponse<Supplier>>
async retrieve(id: string): Promise<Supplier>
async create(data: CreateSupplierRequest): Promise<Supplier>
async update(id: string, data: UpdateSupplierRequest): Promise<Supplier>
async remove(id: string): Promise<void>
```

## Code Examples

### Customer Management

List customers with pagination, then create a new customer with a name, email, and phone number. The `create()` method returns the Customer object with its generated UUID. Customer records are referenced by invoices, quotations, and payments throughout the trade module.

```typescript
import { Essabu } from 'essabu-node';

const client = new Essabu({ apiKey: 'your-api-key' });

const customers = await client.trade.customers.list({ page: 1, pageSize: 20 });
const customer = await client.trade.customers.create({
  name: 'ACME Corp',
  email: 'contact@acme.com',
  phone: '+243 812345678',
});
```

### Invoices

Create a sales invoice with a customer reference, due date, and line items. Issue the invoice to finalize it and assign an invoice number, then send it to the client by email. Mark the invoice as paid when payment is received. Each lifecycle method returns the updated Invoice object with the new status.

```typescript
const invoice = await client.trade.invoices.create({
  customerId: 'cust-uuid',
  dueDate: '2026-04-30',
  lines: [{ description: 'Consulting', quantity: 10, unitPrice: 150 }],
});
await client.trade.invoices.issue(invoice.id);
await client.trade.invoices.sendByEmail(invoice.id, 'client@acme.com');
await client.trade.invoices.markPaid(invoice.id);
```

### Quotations

Create a quotation with a customer reference, validity date, and line items. Send it to the customer by email for review. When the customer agrees, accept the quotation, then convert it directly into a sales invoice. The `convertToInvoice()` method returns the newly created Invoice object with all line items copied from the quotation.

```typescript
const quote = await client.trade.quotations.create({
  customerId: 'cust-uuid',
  validUntil: '2026-05-01',
  lines: [{ description: 'Widget Pro x100', quantity: 100, unitPrice: 25 }],
});
await client.trade.quotations.sendByEmail(quote.id);
await client.trade.quotations.accept(quote.id);
const invoice = await client.trade.quotations.convertToInvoice(quote.id);
```

### Purchase Orders

Create a purchase order with a supplier reference and line items specifying the product, quantity, and unit price. Approve the order to authorize procurement, then mark it as received when goods arrive at the warehouse. Returns the updated PurchaseOrder object with the current status.

```typescript
const po = await client.trade.purchaseOrders.create({
  supplierId: 'sup-uuid',
  lines: [{ productId: 'prod-uuid', quantity: 500, unitPrice: 12 }],
});
await client.trade.purchaseOrders.approve(po.id);
await client.trade.purchaseOrders.receive(po.id);
```

### Products and Suppliers

Create products with a name, SKU, price, and currency for the product catalog. Create suppliers with a name and email for procurement management. Both are referenced by other trade resources -- products by invoice and purchase order lines, suppliers by purchase orders.

```typescript
const product = await client.trade.products.create({
  name: 'Widget Pro',
  sku: 'WGT-PRO-001',
  price: 29.99,
  currency: 'USD',
});
const supplier = await client.trade.suppliers.create({
  name: 'Parts Inc.',
  email: 'orders@parts.com',
});
```
