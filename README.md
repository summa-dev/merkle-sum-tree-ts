# TS Merkle Sum Tree

**This package is a fork of [ZK-KIT](https://github.com/privacy-scaling-explorations/zk-kit)**

## What is a Merkle Sum Tree?

A Merkle Sum Tree is a binary Merkle Tree with the following properties:

- Each entry of a Merkle Sum Tree is a pair of a value and a sum. 
- Each Leaf Node contains a hash and a sum. The hash is equal to H(value, sum). The sum is equal to the sum itself.
- Each Middle Node contains a hash and a sum. The hash is equal to H(LeftChild.hash, LeftChild.sum, RightChild.hash, RightChild.sum). The sum is equal to the sum of the sums of its children.
- The Root Node represents the committed state of the Tree and contains the sum of all the entries' sums.

<div align="center">
<img src="./imgs/mst.png" width="600" align="center" />
</div>
<br>

## Setup  

- ```npm install ts-merkle-sum-tree``` 

- Import your database of users and their balances to a csv file, for example [entry-16-valid.csv](.test/entries/entry-16-valid.csv).

## APIs tree

\# **new IncrementalMerkleSumTree**(pathToCsv: _string_): _IncrementalMerkleSumTree_

```typescript
import { IncrementalMerkleSumTree } from "ts-merkle-sum-tree"

const pathToCsv = "test/entries/entry-16-valid.csv" 

const tree = new IncrementalMerkleSumTree(pathToCsv) // Init a tree from the entries in the csv file
```

\# **indexOf**(entryValue: _bigint_, entrySum: _bigint_): _number_

```typescript
const index = tree.indexOf(BigInt(2), BigInt(50)) // 0
```

\# **createProof**(index: _number_): _MerkleProof_

Creates a proof of membership. The MerkleProof contains the path from the leaf to the root.

```typescript
const proof = tree.createProof(0)
```

\# **verifyProof**(proof: _MerkleProof_): _boolean_

Verifies a proof and returns true or false.
It verifies that a leaf is included in the tree and that the sum computed from the leaf to the root is equal to the total sum of the tree.

```typescript
console.log(tree.verifyProof(proof)) // true
```

## APIs utils

\# **parseCsv**(pathToCsv: _string_): _Entry[]_

```typescript
import { Utils } from "ts-merkle-sum-tree"

const pathToCsv = "test/entries/entry-16-valid.csv" 

const entries = Utils.parseCsv(pathToCsv)
//  [{ username: 'gAdsIaKy', balance: 7534n }, { username: 'SbuqOZGg', balance: 2060n }, ...]
```

\# **parseUsernameToBigInt**(username: _string_): _bigint_

```typescript
const username = "alice" 

const usernameToBigInt = Utils.parseUsernameToBigInt(username) // 418430673765n
```

\# **parseBigIntToUsername**(bigIntUsername: _bigint_): _string_

```typescript
const usernameToBigInt = 418430673765n

const username = Utils.parseBigIntToUsername(bigIntUsername) // alice
```

## Code Quality and Formatting

Run ESLint to analyze the code and catch bugs:

```npm run lint```

Run Prettier to check formatting rules and to fix them:

```npm run format```

## Testing

```npm run test```

## Benchmark

To build a Merkle Sum Tree with 262144 (2**18 leaves) it takes 154s on a Macbook Air M1, 2020 AWS, 8GB memory