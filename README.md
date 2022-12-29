# TS Merkle Sum Tree

**This package is a fork of [ZK-KIT](https://github.com/privacy-scaling-explorations/zk-kit)**

## What is a Merkle Sum Tree?

A Merkle Sum Tree is a binary Merkle Tree where each **Leaf Node** contains a hash and a numeric value. Each **Middle Node** contains a hash which is the hash of the concatenation of the hashes of its children and the numeric values of its children and a numeric value which is the sum of the numeric values of its children. 

The **Root Node** represents the committed state of the Tree and contains the sum of all the entries' values.

<div align="center">
<img src="./imgs/mst.png" width="600" align="center" />
</div>
<br>

## Install 

> Yet to be published!!

```npm install ts-merkle-sum-tree``` 

## APIs

\# **new IncrementalMerkleTree**(hash: _HashFunction_, depth: _number_, zero: _Node_, arity: _number_): _IncrementalMerkleTree_

```typescript
import { IncrementalMerkleTree } from "@zk-kit/incremental-merkle-tree"
import { poseidon } from "circomlibjs" // v0.0.8

const tree = new IncrementalMerkleTree(poseidon, 16, BigInt(0), 2) // Binary tree.
```

\# **insert**(leaf: _Node_)

```typescript
tree.insert(BigInt(1))
```

\# **update**(index: _number_, newLeaf: _Node_)

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
```

## Code Quality and Formatting

Run ESLint to analyze the code and catch bugs:

```npm run lint```

Run Prettier to check formatting rules and to fix them:

```npm run format```

## Testing

```npm run test```


## To do 

- [ ] Add new node type, should support both hash and sum
- [ ] Add support for sum
- [ ] Modify hashing for both leaf and middle nodes
- [ ] Create circom proof, contains both sibling hashes and sibling sums
- [ ] Remove arity