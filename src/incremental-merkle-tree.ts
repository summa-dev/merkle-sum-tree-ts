import checkParameter from './checkParameter';
import _createProof from './createProof';
import _indexOf from './indexOf';
import _insert from './insert';
import { HashFunction, MerkleProof, Node } from './types';
import _update from './update';
import _verifyProof from './verifyProof';

/**
 * A Merkle tree is a tree in which every leaf node is labelled with the cryptographic hash of a
 * data block, and every non-leaf node is labelled with the cryptographic hash of the labels of its child nodes.
 * It allows efficient and secure verification of the contents of large data structures.
 * The IncrementalMerkleTree class is a TypeScript implementation of Incremental Merkle tree and it
 * provides all the functions to create efficient trees and to generate and verify proofs of membership.
 */
export default class IncrementalMerkleTree {
  static readonly maxDepth = 32;

  private _root: Node;
  private readonly _nodes: Node[][];
  private readonly _zeroes: Node[];
  private readonly _hash: HashFunction;
  private readonly _depth: number;
  private readonly _arity: number;

  /**
   * Initializes the tree with the hash function, the depth, the zero value to use for zeroes
   * and the arity (i.e. the number of children for each node).
   * @param hash Hash function.
   * @param depth Tree depth.
   * @param zeroValue Zero values for zeroes.
   * @param arity The number of children for each node.
   */

  // => Modify it : zeroValue should have also a zero sum. Hashing of further level should involve the sum too. Take care about how to handle the zeroValue node!
  // => Modify it : should support Node2 type. Create Node2 type inside the function itself. ZeroValue should not be taken as paramenter. But executed inside the constructuror.
  // => Modify it : remove arity from constructor
  constructor(hash: HashFunction, depth: number, zeroValue: Node, arity = 2) {
    checkParameter(hash, 'hash', 'function');
    checkParameter(depth, 'depth', 'number');
    checkParameter(zeroValue, 'zeroValue', 'number', 'string', 'bigint');
    checkParameter(arity, 'arity', 'number');

    if (depth < 1 || depth > IncrementalMerkleTree.maxDepth) {
      throw new Error('The tree depth must be between 1 and 32');
    }

    // Initialize the attributes.
    this._hash = hash;
    this._depth = depth;
    this._zeroes = [];
    this._nodes = [];
    this._arity = arity;

    for (let i = 0; i < depth; i += 1) {
      this._zeroes.push(zeroValue);
      this._nodes[i] = [];
      // There must be a zero value for each tree level (except the root).
      // Fill a binary array with the zero value and get the hash, which will be the zero value for the next level in the tree.
      zeroValue = hash(Array(this._arity).fill(zeroValue));
    }

    // The zero root is the last zero value.
    this._root = zeroValue;

    // Freeze the array objects. It prevents unintentional changes.
    Object.freeze(this._zeroes);
    Object.freeze(this._nodes);
  }

  /**
   * Returns the root hash of the tree.
   * @returns Root hash.
   */

  // => Modify it : should support Node2 type
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
  // // => Modify it : should support Node2 type
  // public get leaves(): Node[] {
  //   return this._nodes[0].slice();
  // }

  /**
   * Returns the zeroes nodes of the tree.
   * @returns List of zeroes.
   */
  // => Modify it : should support Node2 type
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
   * Returns the index of a leaf. If the leaf does not exist it returns -1.
   * @param leaf Tree leaf.
   * @returns Index of the leaf.
   */
  // // => Modify it : create a new Entry Type which is the value to be added in the tree before hashing. 
  // public indexOf(leaf: Node): number {
  //   return _indexOf(leaf, this._nodes);
  // }

  /**
   * Inserts a new leaf in the tree.
   * @param leaf New leaf.
   */
  // => Modify it : create a new Entry Type which is the value to be added in the tree before hashing.
  // public insert(leaf: Node) {
  //   this._root = _insert(leaf, this.depth, this.arity, this._nodes, this.zeroes, this._hash);
  // }

  /**
   * Deletes a leaf from the tree. It does not remove the leaf from
   * the data structure. It set the leaf to be deleted to a zero value.
   * @param index Index of the leaf to be deleted.
   */
  // public delete(index: number) {
  //   this._root = _update(index, this.zeroes[0], this.depth, this.arity, this._nodes, this.zeroes, this._hash);
  // }

  /**
   * Updates a leaf in the tree.
   * @param index Index of the leaf to be updated.
   * @param newLeaf New leaf value.
   */
  // // => Modify it : create a new Entry Type which is the value to be added in the tree before hashing. Replace it to newLeaf
  // public update(index: number, newLeaf: Node) {
  //   this._root = _update(index, newLeaf, this.depth, this.arity, this._nodes, this.zeroes, this._hash);
  // }

  /**
   * Creates a proof of membership.
   * @param index Index of the proof's leaf.
   * @returns Proof object.
   */
  // public createProof(index: number): MerkleProof {
  //   return _createProof(index, this.depth, this.arity, this._nodes, this.zeroes, this.root);
  // }

 /**
   * Creates a proof of membership in a format that can be used as input for circom circuits.
   * @param index Index of the proof's leaf.
   * @returns Proof object in circom format.
   */
  // public createCircomProof(index: number): MerkleProof {    
  //     const merkleProof = this.createProof(index)
  //     merkleProof.siblings = merkleProof.siblings.map((s) => s[0])
  //     return merkleProof
  // }

  /**
   * Verifies a proof and return true or false.
   * @param proof Proof to be verified.
   * @returns True or false.
   */
  // public verifyProof(proof: MerkleProof): boolean {
  //   return _verifyProof(proof, this._hash);
  // }
}
