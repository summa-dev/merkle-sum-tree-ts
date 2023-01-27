"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMiddleNode = exports.createLeafNodeFromEntry = void 0;
var utils_1 = require("./utils");
function createLeafNodeFromEntry(entry, hash) {
    if (entry.balance < BigInt(0)) {
        throw new Error('entrySum cant be negative');
    }
    var hashPreimage = [utils_1.default.parseUsername(entry.username), entry.balance];
    var leaf = { hash: hash(hashPreimage), sum: entry.balance };
    return leaf;
}
exports.createLeafNodeFromEntry = createLeafNodeFromEntry;
function createMiddleNode(childL, childR, hash) {
    var middleNode = { hash: hash([childL.hash, childL.sum, childR.hash, childR.sum]), sum: childL.sum + childR.sum };
    if (middleNode.sum < BigInt(0)) {
        throw new Error('middleNode.sum cant be negative');
    }
    return middleNode;
}
exports.createMiddleNode = createMiddleNode;
