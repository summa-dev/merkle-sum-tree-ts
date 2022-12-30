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

## Install 

> Yet to be published!!

```npm install ts-merkle-sum-tree``` 

## APIs

\# **new IncrementalMerkleTree**(hash: _HashFunction_, depth: _number_): _IncrementalMerkleTree_

```typescript
import { IncrementalMerkleTree } from "@zk-kit/incremental-merkle-tree"
import { poseidon } from "circomlibjs" // v0.0.8

const tree = new IncrementalMerkleTree(poseidon, 16) // Binary tree with 16 levels and poseidon hash function
```

\# **insert**(entryValue: _number_, entrySum: _number_)

```typescript
tree.insert(BigInt(1), BigInt(25))
```

<!-- \# **update**(index: _number_, newLeaf: _Node_)

```typescript
tree.update(0, BigInt(2))
```

\# **delete**(index: _number_)

```typescript
tree.delete(0)
```

\# **indexOf**(leaf: _Node_): _number_

```typescript
tree.insert(BigInt(2))

const index = tree.indexOf(BigInt(2))
```

\# **createProof**(index: _number_): _Proof_

```typescript
const proof = tree.createProof(1)
```

\# **createCircomProof**(index: _number_): _Proof_

```typescript
const proof = tree.createCircomProof(1)
```


\# **verifyProof**(proof: _Proof_): _boolean_

```typescript
console.log(tree.verifyProof(proof)) // true
``` -->

## Code Quality and Formatting

Run ESLint to analyze the code and catch bugs:

```npm run lint```

Run Prettier to check formatting rules and to fix them:

```npm run format```

## Testing

```npm run test```


## To do 

- [x] Add new node type, should support both hash and sum
- [x] Add support for sum
- [x] Modify hashing for both leaf and middle nodes
- [ ] Create circom proof, contains both sibling hashes and sibling sums
- [x] Remove arity
- [ ] Modify create tree api to support new package name
- [ ] Create leaf from entry function (hidden)