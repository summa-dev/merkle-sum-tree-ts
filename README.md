# pyt-merkle-sum-tree

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

- ```npm install pyt-merkle-sum-tree``` 

- Import your database of users and their balances to a csv file, for example [entry-16-valid.csv](.test/entries/entry-16-valid.csv).

## APIs - Merkle Sum Tree

\# **new IncrementalMerkleSumTree**(pathToCsv: _string_): _IncrementalMerkleSumTree_

```typescript
import { IncrementalMerkleSumTree } from "pyt-merkle-sum-tree"

const pathToCsv = "test/entries/entry-16-valid.csv" 

const tree = new IncrementalMerkleSumTree(pathToCsv) // Init a tree from the entries in the csv file
```



\# **indexOf**(username: _string_, balance: _bigint_): _number_

```typescript
const index = tree.indexOf("gAdsIaKy", BigInt(7543)) // 0
```

\# **createProof**(index: _number_): _MerkleProof_

Creates a proof of membership for an entry identified by its index. The MerkleProof contains the path from the leaf to the root.

```typescript
const proof = tree.createProof(0)
```

\# **verifyProof**(proof: _MerkleProof_): _boolean_

Verifies a proof and returns true or false.
It verifies that a leaf is included in the tree and that the sum computed from the leaf to the root is equal to the total sum of the tree.

```typescript
console.log(tree.verifyProof(proof)) // true
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
