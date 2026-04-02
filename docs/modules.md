# Modules Reference

## HR (`essabu.hr`)

| Resource | Access | Methods |
|----------|--------|---------|
| Employees | `.employees` | `list`, `get`, `create`, `update`, `delete`, `getLeaveBalances`, `getHistory`, `getDocuments`, `getOrgTree`, `getOrgChart` |
| Departments | `.departments` | `list`, `get`, `create`, `update`, `delete` |
| Positions | `.positions` | `list`, `get`, `create`, `update`, `delete` |
| Contracts | `.contracts` | `list`, `get`, `create`, `update`, `delete` |
| Attendance | `.attendance` | `list`, `get`, `create`, `update`, `delete` |
| Leaves | `.leaves` | `list`, `get`, `create`, `update`, `delete` |
| Shifts | `.shifts` | `list`, `get`, `create`, `update`, `delete` |
| Shift Schedules | `.shiftSchedules` | `list`, `get`, `create`, `update`, `delete` |
| Training | `.training` | `list`, `get`, `create`, `update`, `delete` |
| Payrolls | `.payrolls` | `list`, `get`, `create`, `calculate`, `approve`, `downloadPdf`, `getPayslips`, `downloadPayslipPdf`, `getYearToDate` |
| Expenses | `.expenses` | `list`, `get`, `create`, `update`, `delete` |
| Recruitment | `.recruitment` | `createJobPosting`, `getJobPosting`, `listJobPostings`, `updateJobPosting`, `deleteJobPosting`, `createApplication`, `getApplication`, `listApplications`, `updateApplication` |
| Performance | `.performance` | `createReview`, `getReview`, `listReviews`, `updateReview`, `createGoal`, `getGoal`, `listGoals`, `updateGoal` |
| Onboarding | `.onboarding` | `list`, `get`, `create`, `update`, `delete` |
| Documents | `.documents` | `list`, `get`, `create`, `update`, `delete`, `download` |
| Disciplinary | `.disciplinary` | `list`, `get`, `create`, `update`, `delete` |
| Benefits | `.benefits` | `list`, `get`, `create`, `update`, `delete` |
| Loans | `.loans` | `list`, `get`, `create`, `update`, `delete` |
| Timesheets | `.timesheets` | `list`, `get`, `create`, `update`, `delete` |
| Skills | `.skills` | `list`, `get`, `create`, `update`, `delete` |
| Reports | `.reports` | `list`, `get`, `generate`, `download` |
| Webhooks | `.webhooks` | `list`, `get`, `create`, `update`, `delete` |
| Config | `.config` | `get`, `update` |
| History | `.history` | `list`, `get` |

## Accounting (`essabu.accounting`)

| Resource | Access |
|----------|--------|
| Accounts | `.accounts` |
| Balances | `.balances` |
| Invoices | `.invoices` |
| Quotes | `.quotes` |
| Journals | `.journals` |
| Payments | `.payments` |
| Credit Notes | `.creditNotes` |
| Journal Entries | `.journalEntries` |
| Payment Terms | `.paymentTerms` |
| Fiscal Years | `.fiscalYears` |
| Periods | `.periods` |
| Currencies | `.currencies` |
| Tax Rates | `.taxRates` |
| Exchange Rates | `.exchangeRates` |
| Exchange Rate Providers | `.exchangeRateProviders` |
| Wallets | `.wallets` |
| Wallet Transactions | `.walletTransactions` |
| Reports | `.reports` |
| Inventory Items | `.inventoryItems` |
| Purchase Orders | `.purchaseOrders` |
| Suppliers | `.suppliers` |
| Stock Locations | `.stockLocations` |
| Stock Counts | `.stockCounts` |
| Stock Movements | `.stockMovements` |
| Batches | `.batches` |
| Price Lists | `.priceLists` |
| Price List Overrides | `.priceListOverrides` |
| Insurance Partners | `.insurancePartners` |
| Insurance Contracts | `.insuranceContracts` |
| Insurance Claims | `.insuranceClaims` |
| Config | `.config` |
| Webhooks | `.webhooks` |

All accounting resources support: `list`, `get`, `create`, `update`, `delete`.

## Identity (`essabu.identity`)

| Resource | Access | Methods |
|----------|--------|---------|
| Auth | `.auth` | `login`, `register`, `refresh`, `logout`, `verifyEmail`, `resetPassword`, `enable2fa` |
| Users | `.users` | `list`, `get`, `create`, `update`, `delete` |
| Profiles | `.profiles` | `list`, `get`, `create`, `update`, `delete` |
| Companies | `.companies` | `list`, `get`, `create`, `update`, `delete` |
| Tenants | `.tenants` | `list`, `get`, `create`, `update`, `delete` |
| Roles | `.roles` | `list`, `get`, `create`, `update`, `delete` |
| Permissions | `.permissions` | `list`, `get`, `create`, `update`, `delete` |
| Branches | `.branches` | `list`, `get`, `create`, `update`, `delete` |
| API Keys | `.apiKeys` | `list`, `get`, `create`, `update`, `delete` |
| Sessions | `.sessions` | `list`, `get`, `revoke`, `revokeAll` |

## Trade (`essabu.trade`)

| Resource | Access |
|----------|--------|
| Customers | `.customers` |
| Products | `.products` |
| Sales Orders | `.salesOrders` |
| Deliveries | `.deliveries` |
| Receipts | `.receipts` |
| Suppliers | `.suppliers` |
| Purchase Orders | `.purchaseOrders` |
| Inventory | `.inventory` |
| Stock | `.stock` |
| Warehouses | `.warehouses` |
| Contacts | `.contacts` |
| Opportunities | `.opportunities` |
| Activities | `.activities` |
| Campaigns | `.campaigns` |
| Contracts | `.contracts` |
| Documents | `.documents` |

All trade resources support: `list`, `get`, `create`, `update`, `delete`.

## Payment (`essabu.payment`)

| Resource | Access |
|----------|--------|
| Payment Intents | `.paymentIntents` |
| Payment Accounts | `.paymentAccounts` |
| Transactions | `.transactions` |
| Refunds | `.refunds` |
| Subscriptions | `.subscriptions` |
| Subscription Plans | `.subscriptionPlans` |
| Financial Accounts | `.financialAccounts` |
| Loan Products | `.loanProducts` |
| Loan Applications | `.loanApplications` |
| Loan Repayments | `.loanRepayments` |
| Collaterals | `.collaterals` |
| KYC Profiles | `.kycProfiles` |
| KYC Documents | `.kycDocuments` |
| Reports | `.reports` |

All payment resources support: `list`, `get`, `create`, `update`, `delete`.

## E-Invoice (`essabu.einvoice`)

| Resource | Access | Methods |
|----------|--------|---------|
| Invoices | `.invoices` | `normalize` |
| Submissions | `.submissions` | `submit`, `checkStatus`, `list` |
| Verification | `.verification` | `verify` |
| Compliance | `.compliance` | `generateReport` |
| Statistics | `.statistics` | `get` |

## Project (`essabu.project`)

| Resource | Access | Methods |
|----------|--------|---------|
| Projects | `.projects` | `list`, `get`, `create`, `update`, `delete` |
| Milestones | `.milestones` | `list(projectId)`, `get(projectId, id)`, `create(projectId, data)`, `update(projectId, id, data)`, `delete(projectId, id)` |
| Tasks | `.tasks` | `list(projectId)`, `get(projectId, id)`, `create(projectId, data)`, `update(projectId, id, data)`, `delete(projectId, id)` |
| Task Comments | `.taskComments` | `list(taskId)`, `get(taskId, id)`, `create(taskId, data)`, `update(taskId, id, data)`, `delete(taskId, id)` |
| Resource Allocations | `.resourceAllocations` | `list(projectId)`, `get(projectId, id)`, `create(projectId, data)`, `update(projectId, id, data)`, `delete(projectId, id)` |
| Reports | `.reports` | `list(projectId)`, `get(projectId, id)`, `create(projectId, data)` |

## Asset (`essabu.asset`)

| Resource | Access | Methods |
|----------|--------|---------|
| Assets | `.assets` | `list`, `get`, `create`, `update`, `delete` |
| Depreciations | `.depreciations` | `list(assetId)`, `get(assetId, id)`, `create(assetId, data)` |
| Maintenance Schedules | `.maintenanceSchedules` | `list(assetId)`, `get(assetId, id)`, `create(assetId, data)`, `update(assetId, id, data)`, `delete(assetId, id)` |
| Maintenance Logs | `.maintenanceLogs` | `list(assetId)`, `get(assetId, id)`, `create(assetId, data)` |
| Vehicles | `.vehicles` | `list`, `get`, `create`, `update`, `delete` |
| Fuel Logs | `.fuelLogs` | `list(vehicleId)`, `get(vehicleId, id)`, `create(vehicleId, data)` |
| Trip Logs | `.tripLogs` | `list(vehicleId)`, `get(vehicleId, id)`, `create(vehicleId, data)` |
