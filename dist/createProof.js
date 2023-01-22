"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkParameter_1 = require("./checkParameter");
var utils_1 = require("./utils");
function createProof(index, entries, depth, arity, nodes, root) {
    (0, checkParameter_1.default)(index, 'index', 'number');
    if (index < 0 || index >= nodes[0].length) {
        throw new Error('The leaf does not exist in this tree');
    }
    var siblingsHashes = [];
    var siblingsSums = [];
    var pathIndices = [];
    var leafIndex = index;
    for (var level = 0; level < depth; level += 1) {
        var position = index % arity;
        var levelStartIndex = index - position;
        var levelEndIndex = levelStartIndex + arity;
        pathIndices[level] = position;
        for (var i = levelStartIndex; i < levelEndIndex; i += 1) {
            if (i !== index) {
                siblingsHashes[level] = nodes[level][i].hash;
                siblingsSums[level] = nodes[level][i].sum;
            }
        }
        index = Math.floor(index / arity);
    }
    return {
        rootHash: root.hash,
        username: utils_1.default.parseUsernameToBigInt(entries[leafIndex].username),
        balance: nodes[0][leafIndex].sum,
        pathIndices: pathIndices,
        siblingsHashes: siblingsHashes,
        siblingsSums: siblingsSums,
    };
}
exports.default = createProof;
