"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowerAlphabet = exports.upperAlphabet = exports.numberCharacters = void 0;
const utils_1 = require("../utils");
exports.numberCharacters = (0, utils_1.generateSeq)("0".charCodeAt(0), "9".charCodeAt(0), 1).map((x) => String.fromCharCode(x));
exports.upperAlphabet = (0, utils_1.generateSeq)("A".charCodeAt(0), "Z".charCodeAt(0), 1).map((x) => String.fromCharCode(x));
exports.lowerAlphabet = (0, utils_1.generateSeq)("a".charCodeAt(0), "z".charCodeAt(0), 1).map((x) => String.fromCharCode(x));
