import checkParameter from './checkParameter';
import { createLeafNodeFromEntry, createMiddleNode } from './createNode';
import { poseidon } from "circomlibjs"
import _createProof from './createProof';
import _createProofWithTargetSum from './createProofWithTargetSum';
import _indexOf from './indexOf';
import _insert from './insert';
import { HashFunction, MerkleProof, Node, MerkleProofWithTargetSum, Entry} from './types';
import _parseCsv from './csv';
import _update from './update';
import _verifyProof from './verifyProof';
import _verifyProofWithTargetSum from './verifyProofWithTargetSum';

/**
 * A Merkle tree is a tree in which every leaf node is labelled with the cryptographic hash of a
 * data block, and every non-leaf node is labelled with the cryptographic hash of the labels of its child nodes.
 * It allows efficient and secure verification of the contents of large data structures.
 * The IncrementalMerkleSumTree class is a TypeScript implementation of Incremental Merkle Sum tree and it
 * provides all the functions to create efficient trees and to generate and verify proofs of membership.
 */

// [x] Use poseidon hash function by default
// [] calculate the depth of the tree by default 
// [] take a csv file as input to create the tree inside the constructor 
// [] add the entries as leaves inside the tree
// [x] add a new type which is entry
export default class IncrementalMerkleSumTree {
  static readonly maxDepth = 32;
  private _root: Node;
  private readonly _nodes: Node[][];
  private readonly _zeroes: Node[];
  private readonly _hash: HashFunction;
  private readonly _depth: number;
  private readonly _arity: number;
  private readonly _entries: Entry[];

    /**
   * Initializes the tree with the csv file containing the entries of the tree.
   * @param path path to the csv file storing the entries.
   */
    constructor(path: string) {
      checkParameter(path, 'path', 'string');

      // Initialize the attributes.
      this._hash = poseidon;
      this._depth = 32;
      this._zeroes = [];
      this._nodes = [];
      this._arity = 2;
      this._entries = _parseCsv(path);
  
      // Init zeroNode
      let zeroNode: Node = createLeafNodeFromEntry(BigInt(0), BigInt(0), this._hash);
      const arity = 2;
  
      checkParameter(arity, 'arity', 'number');
  
      // if (depth < 1 || depth > IncrementalMerkleSumTree.maxDepth) {
      //   throw new Error('The tree depth must be between 1 and 32');
      // }
  
      for (let i = 0; i < this._depth; i += 1) {
        this._zeroes.push(zeroNode);
        this._nodes[i] = [];
        // There must be a zero value for each tree level (except the root).
        // Create next zeroValue by following the hashing rule of the merkle sum tree
        zeroNode = createMiddleNode(zeroNode, zeroNode, this._hash);
      }
  
      // The zero root is the last zero value.
      this._root = zeroNode;
      
      // Freeze the array objects. It prevents unintentional changes.
      Object.freeze(this._zeroes);
      Object.freeze(this._nodes);
    }

  // /**
  //  * Initializes the tree with the hash function, the depth.
  //  * @param hash Hash function.
  //  * @param depth Tree depth.
  //  */
  // constructor(hash: HashFunction, depth: number) {
  //   checkParameter(hash, 'hash', 'function');
  //   checkParameter(depth, 'depth', 'number');

  //   // Init zeroNode
  //   let zeroNode: Node = createLeafNodeFromEntry(BigInt(0), BigInt(0), hash);
  //   const arity = 2;

  //   checkParameter(arity, 'arity', 'number');

  //   if (depth < 1 || depth > IncrementalMerkleSumTree.maxDepth) {
  //     throw new Error('The tree depth must be between 1 and 32');
  //   }

  //   // Initialize the attributes.
  //   this._hash = hash;
  //   this._depth = depth;
  //   this._zeroes = [];
  //   this._nodes = [];
  //   this._arity = arity;

  //   for (let i = 0; i < depth; i += 1) {
  //     this._zeroes.push(zeroNode);
  //     this._nodes[i] = [];
  //     // There must be a zero value for each tree level (except the root).
  //     // Create next zeroValue by following the hashing rule of the merkle sum tree
  //     zeroNode = createMiddleNode(zeroNode, zeroNode, hash);
  //   }

  //   // The zero root is the last zero value.
  //   this._root = zeroNode;

  //   // Freeze the array objects. It prevents unintentional changes.
  //   Object.freeze(this._zeroes);
  //   Object.freeze(this._nodes);
  // }

  /**
   * Returns the root hash of the tree.
   * @returns Root hash.
   */
  public get root(): Node {
    return this._root;
  }

  /**
   * Returns the depth of the tree.
   * @returns Tree depth.
   */
  public get depth(): number {
    return this._depth;
  }

  /**
   * Returns the leaves of the tree.
   * @returns List of leaves.
   */
  public get leaves(): Node[] {
    return this._nodes[0].slice();
  }

  /**
   * Returns the zeroes nodes of the tree.
   * @returns List of zeroes.
   */
  public get zeroes(): Node[] {
    return this._zeroes;
  }

  /**
   * Returns the number of children for each node.
   * @returns Number of children per node.
   */
  public get arity(): number {
    return this._arity;
  }

  /**
   * Returns the entries of the tree.
   * @returns List of entries.
   */
    public get entries(): Entry[] {
      return this._entries;
    }

  // [] Add a function to return the entries of the tree

  /**
   * Returns the index of a leaf. If the leaf does not exist it returns -1.
   * @param entryValue value of the entry of the queried leaf.
   * @param entrySum sum of the entry of the queried leaf.
   * @returns Index of the leaf.
   */
  public indexOf(entryValue: bigint, entrySum: bigint): number {
    const leaf: Node = createLeafNodeFromEntry(entryValue, entrySum, this._hash);
    return _indexOf(leaf, this._nodes);
  }

  // [] It takes an entry as input
  /**
   * Inserts a new leaf in the tree.
   * @param entryValue value of the entry to be added to the tree.
   * @param entrySum sum of the entry to be added to the tree.
   */
  public insert(entryValue: bigint, entrySum: bigint) {
    const leaf: Node = createLeafNodeFromEntry(entryValue, entrySum, this._hash);
    this._root = _insert(leaf, this.depth, this.arity, this._nodes, this.zeroes, this._hash);
  }

  // [] remove this function

  /**
   * Deletes a leaf from the tree. It does not remove the leaf from
   * the data structure. It set the leaf to be deleted to a zero value.
   * @param index Index of the leaf to be deleted.
   */
  public delete(index: number) {
    this._root = _update(index, this.zeroes[0], this.depth, this.arity, this._nodes, this.zeroes, this._hash);
  }

  // [] remove this function

  /**
   * Updates a leaf in the tree.
   * @param index Index of the leaf to be updated.
   * @param newEntryValue New value of the entry to be updated.
   * @param newEntrySum New sum of the entry to be updated.
   */
  public update(index: number, newEntryValue: bigint, newEntrySum: bigint) {
    const newLeaf: Node = createLeafNodeFromEntry(newEntryValue, newEntrySum, this._hash);
    this._root = _update(index, newLeaf, this.depth, this.arity, this._nodes, this.zeroes, this._hash);
  }

  /**
   * Creates a proof of membership. The MerkleProof contains the path from the leaf to the root.
   * @param index Index of the proof's leaf.
   * @returns MerkleProof object.
   */
  public createProof(index: number): MerkleProof {
    return _createProof(index, this.depth, this.arity, this._nodes, this.zeroes, this.root);
  }

  // [] Remove this function

  /**
   * Creates a proof of membership with target Sum. The MerkleProofWithTargetSum contains the path from the leaf to the root and the target sum of the tree.
   * @param index Index of the proof's leaf.
   * @param targetSum value which the tree sum should be less or equal than.
   * @returns Proof object.
   */
  public createProofWithTargetSum(index: number, targetSum: bigint): MerkleProofWithTargetSum {
    return _createProofWithTargetSum(index, targetSum, this.depth, this.arity, this._nodes, this.zeroes, this.root);
  }

  /**
   * Verifies a proof and return true or false.
   * It verifies that a leaf is included in the tree and that the sum computed from the leaf to the root is equal to the total sum of the tree.
   * @param proof Proof to be verified.
   * @returns True or false.
   */
  public verifyProof(proof: MerkleProof): boolean {
    return _verifyProof(proof, this._hash);
  }

  // [] Remove this function
  /**
   * Verifies a proofWithTargetSum and return true or false.
   * In addition to the verifyProof, it verifies that the sum of the tree is less or equal to the target sum.
   * @param proof Proof to be verified.
   * @returns True or false.
   */
  public verifyProofWithTargetSum(merkleProofWithTargetSum: MerkleProofWithTargetSum): boolean {
    return _verifyProofWithTargetSum(merkleProofWithTargetSum, this._hash);
  }
}
