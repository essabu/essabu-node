/**
 * Example: CRM pipeline flow using the Trade module.
 *
 * This demonstrates the complete CRM lifecycle:
 * create contact -> create opportunity -> add activities -> close deal -> create sales order.
 *
 * Run: npx tsx examples/crm-pipeline.ts
 */

import Essabu, { ValidationError, EssabuError } from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? 'sk_test_...',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? 'tenant_...',
    environment: 'sandbox',
  });

  try {
    // 1. Create a contact (lead)
    console.log('Step 1: Creating contact...');
    const contact = await essabu.trade.contacts.create({
      firstName: 'Marie',
      lastName: 'Kabongo',
      email: 'marie.kabongo@acme.cd',
      phone: '+243810000000',
      company: 'Acme Corporation',
      title: 'Chief Technology Officer',
      source: 'conference',
      tags: ['tech', 'enterprise', 'hot-lead'],
    });

    console.log('Contact created:', contact);
    const contactId = contact['id'] as string;

    // 2. Create a customer account
    console.log('\nStep 2: Creating customer account...');
    const customer = await essabu.trade.customers.create({
      name: 'Acme Corporation',
      email: 'accounts@acme.cd',
      phone: '+243820000000',
      address: '12 Boulevard du 30 Juin, Kinshasa, DRC',
      tin: 'B7654321',
      contactId,
      industry: 'technology',
      tier: 'enterprise',
    });

    console.log('Customer created:', customer);
    const customerId = customer['id'] as string;

    // 3. Create an opportunity
    console.log('\nStep 3: Creating opportunity...');
    const opportunity = await essabu.trade.opportunities.create({
      name: 'Acme Corp - ERP Implementation',
      customerId,
      contactId,
      stage: 'qualification',
      value: 75000,
      currency: 'USD',
      probability: 30,
      expectedCloseDate: '2024-06-30',
      description: 'Full ERP implementation with HR, Accounting, and Trade modules',
    });

    console.log('Opportunity created:', opportunity);
    const opportunityId = opportunity['id'] as string;

    // 4. Log activities (calls, meetings, emails)
    console.log('\nStep 4: Logging activities...');

    const discoveryCall = await essabu.trade.activities.create({
      type: 'call',
      subject: 'Discovery call with CTO',
      description: 'Discussed pain points with current system. Interested in full ERP suite.',
      contactId,
      opportunityId,
      date: '2024-03-15',
      duration: 45,    // minutes
      outcome: 'positive',
    });
    console.log('Activity logged:', discoveryCall);

    const demoMeeting = await essabu.trade.activities.create({
      type: 'meeting',
      subject: 'Product demo for Acme Corp',
      description: 'Live demo of HR, Accounting, and Trade modules. Very impressed with e-invoicing.',
      contactId,
      opportunityId,
      date: '2024-03-22',
      duration: 90,
      outcome: 'positive',
    });
    console.log('Activity logged:', demoMeeting);

    // 5. Move opportunity through pipeline stages
    console.log('\nStep 5: Advancing opportunity to proposal stage...');
    const proposalStage = await essabu.trade.opportunities.update(opportunityId, {
      stage: 'proposal',
      probability: 60,
      value: 82000,    // Updated after detailed scoping
      notes: 'Sent detailed proposal with implementation timeline',
    });
    console.log('Opportunity updated:', proposalStage);

    // 6. Move to negotiation
    console.log('\nStep 6: Advancing to negotiation...');
    const negotiation = await essabu.trade.opportunities.update(opportunityId, {
      stage: 'negotiation',
      probability: 80,
      notes: 'Negotiating payment terms. Requested 10% discount.',
    });
    console.log('Opportunity updated:', negotiation);

    // 7. Close the deal
    console.log('\nStep 7: Closing the deal...');
    const closedWon = await essabu.trade.opportunities.update(opportunityId, {
      stage: 'closed_won',
      probability: 100,
      value: 73800,    // After 10% discount
      closedDate: '2024-04-10',
      notes: 'Deal closed with 10% discount. Annual contract.',
    });
    console.log('Deal closed:', closedWon);

    // 8. Create a sales order from the won opportunity
    console.log('\nStep 8: Creating sales order...');
    const salesOrder = await essabu.trade.salesOrders.create({
      customerId,
      opportunityId,
      orderDate: '2024-04-10',
      currency: 'USD',
      items: [
        {
          productId: 'prod_erp_license',
          description: 'ERP SaaS License - Enterprise (Annual)',
          quantity: 1,
          unitPrice: 36000,
        },
        {
          productId: 'prod_implementation',
          description: 'Implementation & Training (200 hours)',
          quantity: 200,
          unitPrice: 150,
        },
        {
          productId: 'prod_support',
          description: 'Premium Support (12 months)',
          quantity: 1,
          unitPrice: 7800,
        },
      ],
      paymentTerms: 'net30',
      notes: 'Annual contract with 10% enterprise discount applied',
    });

    console.log('Sales order created:', salesOrder);

    // 9. Create a contract
    console.log('\nStep 9: Creating contract...');
    const contract = await essabu.trade.contracts.create({
      customerId,
      salesOrderId: salesOrder['id'] as string,
      name: 'Acme Corp - Annual ERP License',
      startDate: '2024-05-01',
      endDate: '2025-04-30',
      value: 73800,
      currency: 'USD',
      autoRenew: true,
    });
    console.log('Contract created:', contract);

    // 10. Run a campaign for upselling
    console.log('\nStep 10: Creating upsell campaign...');
    const campaign = await essabu.trade.campaigns.create({
      name: 'Q2 2024 - Enterprise Upsell',
      type: 'email',
      status: 'draft',
      startDate: '2024-07-01',
      endDate: '2024-07-31',
      targetSegment: 'enterprise_customers',
      description: 'Upsell e-invoicing and advanced analytics modules to enterprise customers',
    });
    console.log('Campaign created:', campaign);

    // 11. Summary
    console.log('\n--- Pipeline Summary ---');
    console.log(`Contact: ${contact['firstName']} ${contact['lastName']}`);
    console.log(`Customer: ${customer['name']}`);
    console.log(`Opportunity: ${opportunity['name']}`);
    console.log(`Deal value: $${closedWon['value']}`);
    console.log(`Sales order: ${salesOrder['id']}`);
    console.log(`Contract: ${contract['name']}`);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation failed:');
      for (const [field, message] of Object.entries(error.fieldErrors)) {
        console.error(`  ${field}: ${message}`);
      }
    } else if (error instanceof EssabuError) {
      console.error(`API error (${error.statusCode}): ${error.message}`);
    } else {
      throw error;
    }
  }
}

main();
