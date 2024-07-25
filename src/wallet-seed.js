const WalletSeedError = Error

class WalletSeed {
  static Error = WalletSeedError

  _setSeed (seed) {
    if (!Buffer.isBuffer(seed)) throw new WalletSeedError('Seed must be a buffer. We got ' + typeof seed)
    Object.defineProperty(this, 'seed', {
      value: seed,
      writable: false,
      enumerable: true
    })
  }

  isEq (other) {
    if (!(other instanceof WalletSeed)) return false
    return this.seed.equals(other.seed)
  }

  seedToHex () {
    return this.seed.toString('hex')
  }

  seedBuffer () {
    return this.seed
  }
}

module.exports = WalletSeed
