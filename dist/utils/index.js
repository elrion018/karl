"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = exports.generateSeq = void 0;
function generateSeq(start, stop, step) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}
exports.generateSeq = generateSeq;
function assert(condition, message) {
    if (!condition)
        throw new Error(message);
}
exports.assert = assert;
