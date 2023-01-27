"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function createProof(index, entries, depth, nodes, root) {
    if (index < 0 || index >= nodes[0].length) {
        throw new Error('The leaf does not exist in this tree');
    }
    var siblingsHashes = [];
    var siblingsSums = [];
    var pathIndices = [];
    var leafIndex = index;
    for (var level = 0; level < depth; level += 1) {
        var position = index % 2;
        var levelStartIndex = index - position;
        var levelEndIndex = levelStartIndex + 2;
        pathIndices[level] = position;
        for (var i = levelStartIndex; i < levelEndIndex; i += 1) {
            if (i !== index) {
                siblingsHashes[level] = nodes[level][i].hash;
                siblingsSums[level] = nodes[level][i].sum;
            }
        }
        index = Math.floor(index / 2);
    }
    return {
        rootHash: root.hash,
        username: utils_1.default.parseUsername(entries[leafIndex].username),
        balance: entries[leafIndex].balance,
        pathIndices: pathIndices,
        siblingsHashes: siblingsHashes,
        siblingsSums: siblingsSums,
    };
}
exports.default = createProof;
