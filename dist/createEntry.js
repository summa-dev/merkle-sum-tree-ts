"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZERO_ENTRY = exports.createEntry = void 0;
var utils_1 = require("./utils");
function createEntry(username, balance) {
    if (typeof username === 'bigint') {
        username = utils_1.default.stringifyUsername(username);
    }
    return { username: username, balance: balance };
}
exports.createEntry = createEntry;
// export a constant 
exports.ZERO_ENTRY = createEntry('0', BigInt(0));
