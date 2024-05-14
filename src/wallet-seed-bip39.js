'use strict'
const bip39 = require('bip39')
const WalletSeed = require('../../wallet-keys/src/wallet-seed.js')

class Bip39Seed extends WalletSeed {
 
 constructor(config = {}) {
    super(config)

    if(config.seed) {
      super._setSeed(config.seed)
    }
    if(!config.mnemonic) {
      throw new WalletSeed.Error('mnemonic is required')
    }

    Object.defineProperty(this, 'mnemonic', {
      value: config.mnemonic,
      writable: false,
      enumerable: true,
    })
  }

  static async generate(mnemonic) {
    
    if(!mnemonic) {
      mnemonic = bip39.generateMnemonic()
    }
    const seed = await bip39.mnemonicToSeed(mnemonic)
    return new Bip39Seed({ seed, mnemonic })
  }

  exportSeed() {
    return JSON.stringify({
      seed: this.seedToHex(),
      mnemonic: this.mnemonic
    })
  }
}

module.exports = Bip39Seed
