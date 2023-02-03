# pyt-merkle-sum-tree

TypeScript library to create Merkle Sum Trees starting from `username -> balance` entries. The root of the tree contains the sum of all the entries, representing the total liabilities of a CEX.

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

\# **entries**: _[]Entry_

```typescript
const entries = tree.entries
// [
//       Entry {
//         _usernameToBigInt: 7440338505707899769n,
//         _balance: 7534n,
//         _username: 'gAdsIaKy'
//       },
//       Entry {
//         _usernameToBigInt: 6008493982388733799n,
//         _balance: 2060n,
//         _username: 'SbuqOZGg'
//       },
//       ...
// ]
```

\# **leaves**: _[]Node_

```typescript
const leaves = tree.leaves 
    // [
    //   {
    //     hash: 937608857767727606133996830760270048555279161038903523915984285975854603703n,
    //     sum: 7534n
    //   },
    //   {
    //     hash: 3405497655013061136502768874542176491465275092205995841574082657535821212714n,
    //     sum: 2060n
    //   },
    //   ...
    // ]
```

\# **root**: _Node_

```typescript
const root = tree.root 
    // {
    //   hash: 5256203632563331423195629050622063453704745190370457907459595269961493651429n,
    //   sum: 84359n
    // }
```

\# **indexOf**(username: _string_, balance: _bigint_): _number_

Returns the index of an entry in the tree. If the entry is not in the tree, it returns -1.

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
tree.verifyProof(proof) // true
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
