# lib-wallet-seed-bip39

Library for generating BIP39 keys using [bip39](https://github.com/bitcoinjs/bip39) lib

### API

```javascript
const seed = await BIP39Seed.generate(/** seed phrase or leave empty to generate one */)

// Seed to HEX

const hex = seed.toHex()

// Seed Phrase
const mnemonic = seed.mnemonic

// Get seed phrase and key in JSON string
const string = seed.exportSeed()

```

