"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkParameter_1 = require("./checkParameter");
var createProof_1 = require("./createProof");
var indexOf_1 = require("./indexOf");
var insert_1 = require("./insert");
var update_1 = require("./update");
var verifyProof_1 = require("./verifyProof");
/**
 * A Merkle tree is a tree in which every leaf node is labelled with the cryptographic hash of a
 * data block, and every non-leaf node is labelled with the cryptographic hash of the labels of its child nodes.
 * It allows efficient and secure verification of the contents of large data structures.
 * The IncrementalMerkleTree class is a TypeScript implementation of Incremental Merkle tree and it
 * provides all the functions to create efficient trees and to generate and verify proofs of membership.
 */
var IncrementalMerkleTree = /** @class */ (function () {
    /**
     * Initializes the tree with the hash function, the depth, the zero value to use for zeroes
     * and the arity (i.e. the number of children for each node).
     * @param hash Hash function.
     * @param depth Tree depth.
     * @param zeroValue Zero values for zeroes.
     * @param arity The number of children for each node.
     */
    function IncrementalMerkleTree(hash, depth, zeroValue, arity) {
        if (arity === void 0) { arity = 2; }
        (0, checkParameter_1.default)(hash, "hash", "function");
        (0, checkParameter_1.default)(depth, "depth", "number");
        (0, checkParameter_1.default)(zeroValue, "zeroValue", "number", "string", "bigint");
        (0, checkParameter_1.default)(arity, "arity", "number");
        if (depth < 1 || depth > IncrementalMerkleTree.maxDepth) {
            throw new Error("The tree depth must be between 1 and 32");
        }
        // Initialize the attributes.
        this._hash = hash;
        this._depth = depth;
        this._zeroes = [];
        this._nodes = [];
        this._arity = arity;
        for (var i = 0; i < depth; i += 1) {
            this._zeroes.push(zeroValue);
            this._nodes[i] = [];
            // There must be a zero value for each tree level (except the root).
            zeroValue = hash(Array(this._arity).fill(zeroValue));
        }
        // The default root is the last zero value.
        this._root = zeroValue;
        // Freeze the array objects. It prevents unintentional changes.
        Object.freeze(this._zeroes);
        Object.freeze(this._nodes);
    }
    Object.defineProperty(IncrementalMerkleTree.prototype, "root", {
        /**
         * Returns the root hash of the tree.
         * @returns Root hash.
         */
        get: function () {
            return this._root;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IncrementalMerkleTree.prototype, "depth", {
        /**
         * Returns the depth of the tree.
         * @returns Tree depth.
         */
        get: function () {
            return this._depth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IncrementalMerkleTree.prototype, "leaves", {
        /**
         * Returns the leaves of the tree.
         * @returns List of leaves.
         */
        get: function () {
            return this._nodes[0].slice();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IncrementalMerkleTree.prototype, "zeroes", {
        /**
         * Returns the zeroes nodes of the tree.
         * @returns List of zeroes.
         */
        get: function () {
            return this._zeroes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IncrementalMerkleTree.prototype, "arity", {
        /**
         * Returns the number of children for each node.
         * @returns Number of children per node.
         */
        get: function () {
            return this._arity;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the index of a leaf. If the leaf does not exist it returns -1.
     * @param leaf Tree leaf.
     * @returns Index of the leaf.
     */
    IncrementalMerkleTree.prototype.indexOf = function (leaf) {
        return (0, indexOf_1.default)(leaf, this._nodes);
    };
    /**
     * Inserts a new leaf in the tree.
     * @param leaf New leaf.
     */
    IncrementalMerkleTree.prototype.insert = function (leaf) {
        this._root = (0, insert_1.default)(leaf, this.depth, this.arity, this._nodes, this.zeroes, this._hash);
    };
    /**
     * Deletes a leaf from the tree. It does not remove the leaf from
     * the data structure. It set the leaf to be deleted to a zero value.
     * @param index Index of the leaf to be deleted.
     */
    IncrementalMerkleTree.prototype.delete = function (index) {
        this._root = (0, update_1.default)(index, this.zeroes[0], this.depth, this.arity, this._nodes, this.zeroes, this._hash);
    };
    /**
     * Updates a leaf in the tree.
     * @param index Index of the leaf to be updated.
     * @param newLeaf New leaf value.
     */
    IncrementalMerkleTree.prototype.update = function (index, newLeaf) {
        this._root = (0, update_1.default)(index, newLeaf, this.depth, this.arity, this._nodes, this.zeroes, this._hash);
    };
    /**
     * Creates a proof of membership.
     * @param index Index of the proof's leaf.
     * @returns Proof object.
     */
    IncrementalMerkleTree.prototype.createProof = function (index) {
        return (0, createProof_1.default)(index, this.depth, this.arity, this._nodes, this.zeroes, this.root);
    };
    /**
     * Verifies a proof and return true or false.
     * @param proof Proof to be verified.
     * @returns True or false.
     */
    IncrementalMerkleTree.prototype.verifyProof = function (proof) {
        return (0, verifyProof_1.default)(proof, this._hash);
    };
    IncrementalMerkleTree.maxDepth = 32;
    return IncrementalMerkleTree;
}());
exports.default = IncrementalMerkleTree;
