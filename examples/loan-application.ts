/**
 * Example: Loan application flow using the Payment module.
 *
 * This demonstrates the complete lending lifecycle:
 * KYC verification -> loan product selection -> application -> approval -> repayment.
 *
 * Run: npx tsx examples/loan-application.ts
 */

import Essabu, { ValidationError, EssabuError } from '@essabu/sdk';

async function main() {
  const essabu = new Essabu({
    apiKey: process.env['ESSABU_API_KEY'] ?? 'sk_test_...',
    tenantId: process.env['ESSABU_TENANT_ID'] ?? 'tenant_...',
    environment: 'sandbox',
  });

  try {
    // 1. Complete KYC verification first
    console.log('Step 1: Creating KYC profile...');
    const kycProfile = await essabu.payment.kycProfiles.create({
      customerId: 'cust_jean_mukendi',
      firstName: 'Jean',
      lastName: 'Mukendi',
      dateOfBirth: '1990-05-15',
      nationalId: 'CD-12345678',
      address: '123 Avenue Lumumba, Lubumbashi',
      phone: '+243810000000',
      email: 'jean.mukendi@example.com',
    });

    console.log('KYC profile created:', kycProfile);
    const kycId = kycProfile['id'] as string;

    // 2. Upload KYC documents
    console.log('\nStep 2: Uploading KYC documents...');
    const kycDoc = await essabu.payment.kycDocuments.create({
      kycProfileId: kycId,
      documentType: 'national_id',
      documentNumber: 'CD-12345678',
      issuedDate: '2020-01-15',
      expiryDate: '2030-01-15',
    });
    console.log('KYC document submitted:', kycDoc);

    // 3. Browse available loan products
    console.log('\nStep 3: Listing available loan products...');
    const products = await essabu.payment.loanProducts.list({
      page: 1,
      perPage: 10,
    });
    console.log(`Found ${products.totalElements} loan products`);

    for (const product of products.data) {
      console.log(
        `  - ${product['name']} | Rate: ${product['interestRate']}% | ` +
        `Max: ${product['maxAmount']} ${product['currency']} | ` +
        `Duration: ${product['minTerm']}-${product['maxTerm']} months`,
      );
    }

    // 4. Submit a loan application
    console.log('\nStep 4: Submitting loan application...');
    const application = await essabu.payment.loanApplications.create({
      customerId: 'cust_jean_mukendi',
      loanProductId: 'prod_business_micro',
      amount: 5000,
      currency: 'USD',
      term: 12,                    // 12 months
      purpose: 'Business expansion - purchasing inventory',
      monthlyIncome: 2500,
      employmentStatus: 'employed',
      employer: 'Essabu Technologies',
    });

    console.log('Loan application submitted:', application);
    const applicationId = application['id'] as string;

    // 5. Add collateral (if required)
    console.log('\nStep 5: Adding collateral...');
    const collateral = await essabu.payment.collaterals.create({
      loanApplicationId: applicationId,
      type: 'vehicle',
      description: 'Toyota Hilux 2022',
      estimatedValue: 15000,
      currency: 'USD',
    });
    console.log('Collateral added:', collateral);

    // 6. Check application status
    console.log('\nStep 6: Checking application status...');
    const status = await essabu.payment.loanApplications.get(applicationId);
    console.log(`Application status: ${status['statusLabel']}`);

    // 7. After approval, check repayment schedule
    console.log('\nStep 7: Listing loan repayments...');
    const repayments = await essabu.payment.loanRepayments.list({
      page: 1,
      perPage: 12,
    });
    console.log(`Found ${repayments.totalElements} scheduled repayments`);

    for (const repayment of repayments.data) {
      console.log(
        `  - Due: ${repayment['dueDate']} | Amount: ${repayment['amount']} | ` +
        `Status: ${repayment['statusLabel']}`,
      );
    }

    // 8. Make a repayment
    console.log('\nStep 8: Making a repayment...');
    const repaymentResult = await essabu.payment.loanRepayments.update(
      repayments.data[0]?.['id'] as string,
      {
        paidAmount: 500,
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'mobile_money',
        reference: 'MM-2024-0001',
      },
    );
    console.log('Repayment recorded:', repaymentResult);
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
