"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var circomlibjs_1 = require("circomlibjs");
var createProof_1 = require("./createProof");
var buildMerkleTreeFromEntries_1 = require("./buildMerkleTreeFromEntries");
var indexOf_1 = require("./indexOf");
var utils_1 = require("./utils");
var verifyProof_1 = require("./verifyProof");
/**
 * A Merkle Sum Tree is a binary Merkle Tree with the following properties:
 * - Each entry of a Merkle Sum Tree is a pair of a username and a balance.
 * - Each Leaf Node contains a hash and a sum. The hash is equal to H(username, balance). The sum is equal to the balance itself.
 * - Each Middle Node contains a hash and a sum. The hash is equal to H(LeftChild.hash, LeftChild.sum, RightChild.hash, RightChild.sum). The sum is equal to the sum of the sums of its children.
 * - The Root Node represents the committed state of the Tree and contains the sum of all the entries' balances.
 * The MerkleSumTree class is a TypeScript implementation of a Merkle Sum tree and it
 * provides all the functions to create a tree starting from a csv file that contains a list of entries in the format  `username -> balance`.
 */
var MerkleSumTree = /** @class */ (function () {
    /**
     * Initializes the tree with the csv file containing the entries of the tree.
     * @param path path to the csv file storing the entries.
     */
    function MerkleSumTree(path) {
        this._nodes = [];
        this._entries = utils_1.default.parseCsvToEntries(path);
        // get the depth of the tree from the log base 2 of the number of entries rounded to the next integer
        this._depth = Math.ceil(Math.log2(this._entries.length));
        if (this._depth < 1 || this._depth > MerkleSumTree.maxDepth) {
            throw new Error('The tree depth must be between 1 and 32');
        }
        // Build the tree from the entries.
        this._root = (0, buildMerkleTreeFromEntries_1.default)(this._entries, this._depth, this._nodes, circomlibjs_1.poseidon);
        // Freeze the entries and the tree. It prevents unintentional changes.
        Object.freeze(this._entries);
        Object.freeze(this._root);
        Object.freeze(this._nodes);
    }
    Object.defineProperty(MerkleSumTree.prototype, "root", {
        /**
         * Returns the root node of the tree.
         * @returns Root Node.
         */
        get: function () {
            return this._root;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MerkleSumTree.prototype, "depth", {
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
    Object.defineProperty(MerkleSumTree.prototype, "leaves", {
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
    Object.defineProperty(MerkleSumTree.prototype, "entries", {
        /**
         * Returns the entries of the tree.
         * @returns List of entries.
         */
        get: function () {
            return this._entries;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the index of a leaf. If the leaf does not exist it returns -1.
     * @param username username of the queried entry.
     * @param balance balance of the queried entry.
     * @returns Index of the leaf.
     */
    MerkleSumTree.prototype.indexOf = function (username, balance) {
        return (0, indexOf_1.default)(username, balance, this._nodes, circomlibjs_1.poseidon);
    };
    /**
     * Creates a proof of membership. The MerkleProof contains the path from the leaf to the root.
     * @param index Index of the proof's leaf.
     * @returns MerkleProof object.
     */
    MerkleSumTree.prototype.createProof = function (index) {
        return (0, createProof_1.default)(index, this._entries, this._depth, this._nodes, this._root);
    };
    /**
     * Verifies a proof and return true or false.
     * It verifies that a leaf is included in the tree and that the sum computed from the leaf to the root is equal to the total sum of the tree.
     * @param proof Proof to be verified.
     * @returns True or false.
     */
    MerkleSumTree.prototype.verifyProof = function (proof) {
        return (0, verifyProof_1.default)(proof, circomlibjs_1.poseidon);
    };
    MerkleSumTree.maxDepth = 32;
    return MerkleSumTree;
}());
exports.default = MerkleSumTree;
