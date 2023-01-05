"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import checkParameter from './checkParameter';
var createNode_1 = require("./createNode");
var checkParameter_1 = require("./checkParameter");
function verifyProof(merkleProofWithTargetSum, hash) {
    (0, checkParameter_1.default)(merkleProofWithTargetSum, 'merkleProofWithTargetSum', 'object');
    (0, checkParameter_1.default)(merkleProofWithTargetSum.rootHash, 'merkleProofWithTargetSum.rootHash', 'bigint');
    (0, checkParameter_1.default)(merkleProofWithTargetSum.targetSum, 'merkleProofWithTargetSum.targetSum', 'bigint');
    (0, checkParameter_1.default)(merkleProofWithTargetSum.leafHash, 'merkleProofWithTargetSum.leafHash', 'bigint');
    (0, checkParameter_1.default)(merkleProofWithTargetSum.leafSum, 'merkleProofWithTargetSum.leafSum', 'bigint');
    (0, checkParameter_1.default)(merkleProofWithTargetSum.siblingsHashes, 'merkleProofWithTargetSum.siblingsHashes', 'object');
    (0, checkParameter_1.default)(merkleProofWithTargetSum.siblingsSums, 'merkleProofWithTargetSum.siblingsSums', 'object');
    (0, checkParameter_1.default)(merkleProofWithTargetSum.pathIndices, 'merkleProofWithTargetSum.pathElements', 'object');
    var node = { hash: merkleProofWithTargetSum.leafHash, sum: merkleProofWithTargetSum.leafSum };
    var sum = merkleProofWithTargetSum.leafSum;
    for (var i = 0; i < merkleProofWithTargetSum.siblingsHashes.length; i += 1) {
        var siblingNode = {
            hash: merkleProofWithTargetSum.siblingsHashes[i],
            sum: merkleProofWithTargetSum.siblingsSums[i],
        };
        if (merkleProofWithTargetSum.pathIndices[i] === 0) {
            node = (0, createNode_1.createMiddleNode)(node, siblingNode, hash);
        }
        else {
            node = (0, createNode_1.createMiddleNode)(siblingNode, node, hash);
        }
        sum += siblingNode.sum;
    }
    return (merkleProofWithTargetSum.rootHash === node.hash &&
        sum === node.sum &&
        merkleProofWithTargetSum.targetSum >= node.sum);
}
exports.default = verifyProof;
