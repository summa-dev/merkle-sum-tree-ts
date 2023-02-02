"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var entry_1 = require("./entry");
function indexOf(username, balance, nodes, hash) {
    var usernameToBigInt = utils_1.default.parseUsername(username);
    var entry = new entry_1.default(usernameToBigInt, balance);
    var leaf = entry.computeLeaf();
    return nodes[0].map(function (x) { return x.hash; }).indexOf(leaf.hash);
}
exports.default = indexOf;
