# lib-wallet-seed-bip39

i# 🌱 Bip39Seed

A robust implementation of BIP39 seed generation and management for [Wallet SDK]()

## 💼 Wallet SDK
This library is part of the [Wallet SDK](https://github.com/tetherto/lib-wallet)

## 📚 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

Install the package using npm:

```bash
npm install bip39-seed
```

## 🔧 Usage

Here's a quick example of how to use Bip39Seed:

```javascript
const Bip39Seed = require('bip39-seed');

async function example() {
  // Generate a new seed with a random mnemonic
  const newSeed = await Bip39Seed.generate();
  console.log(newSeed);

  // Generate a seed with a specific mnemonic
  const mnemonic = 'your twelve word mnemonic phrase goes here';
  const specificSeed = await Bip39Seed.generate(mnemonic);
  console.log(specificSeed);

  // Export the seed
  const exportedSeed = specificSeed.exportSeed();
  console.log(exportedSeed);
}

example();
```

## 📘 API

### `Bip39Seed`

#### Constructor

- `new Bip39Seed(config)`
  - `config.seed`: (optional) The seed buffer
  - `config.mnemonic`: (required) The mnemonic phrase

#### Static Methods

- `Bip39Seed.generate(mnemonic)`
  - Generates a new Bip39Seed instance
  - `mnemonic`: (optional) A specific mnemonic phrase to use

#### Instance Methods

- `exportSeed(opts)`
  - Exports the seed and mnemonic
  - `opts.string`: (optional) If false, returns an object instead of a JSON string

## 🧪 Testing

We use the [Brittle](https://github.com/holepunchto/brittle) testing framework for our unit tests.
To run the tests for this package, use the following command:

```bash
npm run test
```

This will execute the test suite and provide you with the results.

