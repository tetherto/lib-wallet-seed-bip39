// Copyright 2024 Tether Operations Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
'use strict'
const bip39 = require('bip39')
const WalletSeed = require('./wallet-seed.js')
const inspect = Symbol.for('nodejs.util.inspect.custom')

class Bip39Seed extends WalletSeed {
  constructor (config = {}) {
    super(config)

    if (config.seed) {
      super._setSeed(config.seed)
    }
    if (!config.mnemonic) {
      throw new Error('mnemonic is required')
    }

    this.mnemonic = config.mnemonic
  }

  [inspect] () {
    return `${this.constructor.name} (${this.seed
      ? `\n Seed: ${this.seed.toString('hex').slice(0, 10)}... \n Mnemonic: ${this.mnemonic.slice(0, 10)}...`
      : '❌Seed not loaded'})`
  }

  /**
   * Generate a new seed
   * @param {String} mnemonic - optional mnemonic
   * @returns {Bip39Seed}
   */
  static async generate (mnemonic) {
    if (!mnemonic) {
      mnemonic = bip39.generateMnemonic()
    }
    const seed = await bip39.mnemonicToSeed(mnemonic)
    return new Bip39Seed({ seed, mnemonic })
  }

  exportSeed (opts = {}) {
    const data = {
      seed: this.seedToHex(),
      mnemonic: this.mnemonic
    }
    return opts.string === false ? data : JSON.stringify(data, null, 2)
  }
}

module.exports = Bip39Seed
