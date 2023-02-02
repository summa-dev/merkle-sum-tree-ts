"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMiddleNode = void 0;
function createMiddleNode(childL, childR, hash) {
    var middleNode = { hash: hash([childL.hash, childL.sum, childR.hash, childR.sum]), sum: childL.sum + childR.sum };
    if (middleNode.sum < BigInt(0)) {
        throw new Error('middleNode.sum cant be negative');
    }
    return middleNode;
}
exports.createMiddleNode = createMiddleNode;
