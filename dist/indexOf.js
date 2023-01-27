"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createNode_1 = require("./createNode");
var createEntry_1 = require("./createEntry");
function indexOf(username, balance, nodes, hash) {
    var entry = (0, createEntry_1.createEntry)(username, balance);
    var leaf = (0, createNode_1.createLeafNodeFromEntry)(entry, hash);
    return nodes[0].map(function (x) { return x.hash; }).indexOf(leaf.hash);
}
exports.default = indexOf;
