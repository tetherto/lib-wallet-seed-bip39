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
const test = require('brittle')
const assert = require('assert')
const Bip39Seed = require('../src/wallet-seed-bip39')

test('Bip39Seed', function (t) {
  t.test('must create expected key for phrase', async function (t) {
    // When testing against Vectors, this library does not support BIP39 passphrase
    const phrase = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const seed = await Bip39Seed.generate(phrase)
    t.ok(seed.seed.toString('hex') === '5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4')
  })

  t.test('Must generate key when no seed is passed', async function (t) {
    const walletPay = await Bip39Seed.generate()
    t.ok(walletPay.seedToHex(), 'seed exists')

    let err
    try {
      walletPay.seed = 1
    } catch (e) {
      err = e
    }
    t.ok(err, 'seed is readonly, error is thrown')
    t.ok(walletPay.seed !== 1, 'seed has not changed')
  })

  t.test('Must create instance when a seed is passed', async function (t) {
    const w1 = await Bip39Seed.generate()
    const walletPay = new Bip39Seed({
      seed: w1.seed,
      mnemonic: w1.mnemonic
    })
    t.ok(w1.seedToHex() === walletPay.seedToHex(), 'seed matches')
  })

  t.test('Make sure seeds are random', async function (t) {
    const count = 10
    const seeds = []
    const mnemonics = new Set()

    for (let i = 0; i < count; i++) {
      const s = await Bip39Seed.generate()
      t.ok(s.mnemonic.split(' ').length === 12, 'Has 12 words')
      seeds.push(s.seedToHex())
      mnemonics.add(s.mnemonic)
    }

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        if (i === j) continue
        assert(seeds[i] !== seeds[j], 'seeds are different')
      }
    }
  })
  t.test('exportSeed', async function (t) {
    const bip39 = await Bip39Seed.generate()
    const seed = bip39.exportSeed()
    t.ok(bip39.seedToHex() === JSON.parse(seed).seed, 'seed matches')
    t.ok(bip39.mnemonic === JSON.parse(seed).mnemonic, 'mnemonic matches')
  })
})
