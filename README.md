# Partpay SDK

Partpay SDK is a powerful and easy-to-use toolkit for integrating Partpay's financing solutions into your applications. This SDK provides a seamless way to interact with the Partpay protocol, allowing developers to manage vendors, equipment, and payments efficiently.

## Features

- Vendor management
- Equipment listing and management
- Payment processing with Solana Pay integration

## Installation

You can install the Partpay SDK using npm or yarn:

```bash
npm install @equippay/sdk
```

or

```bash
yarn add @equippay/sdk
```

## Usage

### Initialization

First, wrap your application with the `PartpayProvider`:

```jsx
import { PartpayProvider } from '@partpay/sdk';

function App() {
  return (
    <PartpayProvider apiKey="your-api-key">
      {/* Your app components */}
    </PartpayProvider>
  );
}
```

### Using the SDK in your components
You can then use the `usePartpay` hook in your components to access the SDK:

# Example
```jsx
import { usePartpay } from '@partpay/sdk';

function MyComponent() {
  const sdk = usePartpay();

  // Example: Create a new vendor
  async function createVendor() {
    try {
      const newVendor = await sdk.vendor.createVendor({
        fullName: 'John Doe',
        description: 'Equipment supplier',
        wallet: 'vendor-wallet-address',
        status: true
      });
      console.log('New vendor created:', newVendor);
    } catch (error) {
      console.error('Error creating vendor:', error);
    }
  }

}
```

## API Reference

## Contributing

We welcome contributions to the Partpay SDK!

## Support

If you encounter any issues or have questions, please file an issue on our [GitHub issue tracker](https://github.com/partpay-foundation/sdk/issues).

## About Partpay

Partpay Enable developers to build Buy Now Pay Later Apps on Solana. Our protocol enables seamless, transparent, and efficient financing solutions for businesses of all sizes. Learn more at [equippay.io](https://equippay.io).
