"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowerAlphabet = exports.upperAlphabet = exports.numbers = void 0;
const utils_1 = require("../utils");
exports.numbers = (0, utils_1.generateSeq)(0, 9, 1);
exports.upperAlphabet = (0, utils_1.generateSeq)("A".charCodeAt(0), "Z".charCodeAt(0), 1);
exports.lowerAlphabet = (0, utils_1.generateSeq)("a".charCodeAt(0), "z".charCodeAt(0), 1);
