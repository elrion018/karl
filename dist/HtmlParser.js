"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const dom_1 = require("./dom");
const utils_1 = require("./utils");
class HtmlParser {
    constructor(input, position) {
        this.makeInputIterator = function* (input, start = 0) {
            for (let i = start; i < input.length; i++) {
                yield [i, input[i]];
            }
        };
        this.input = input;
        this.position = position;
    }
    parse() {
        const nodes = this.parseNodes();
        if (nodes.length === 1)
            return nodes.pop();
        return (0, dom_1.createElement)("html", {}, nodes);
    }
    parseNodes() {
        let nodes = [];
        while (true) {
            this.consumeWhitespace();
            if (this.isEndOfInput() || this.isStartWith("</"))
                break;
            nodes.push(this.parseNode());
        }
        return nodes;
    }
    parseNode() {
        if (this.getCharacter() === "<")
            return this.parseElement();
        return this.parseText();
    }
    parseElement() {
        (0, utils_1.assert)(this.consumeCharacter() === "<", "character is not <");
        const tagName = this.parseTagName();
        const attributes = this.parseAttributes();
        (0, utils_1.assert)(this.consumeCharacter() === ">", "character is not >");
        const children = this.parseNodes();
        (0, utils_1.assert)(this.consumeCharacter() === "<", "character is not <");
        (0, utils_1.assert)(this.consumeCharacter() === "/", "character is not /");
        (0, utils_1.assert)(this.parseTagName() === tagName, "There is no tag name in closing tag");
        (0, utils_1.assert)(this.consumeCharacter() === ">", "character is not >");
        return (0, dom_1.createElement)(tagName, attributes, children);
    }
    parseText() {
        return (0, dom_1.createText)(this.consumeWhile(function (character) {
            if (character !== "<")
                return true;
            return false;
        }));
    }
    parseTagName() {
        return this.consumeWhile(function (character) {
            if (constants_1.numberCharacters.indexOf(character) !== -1 ||
                constants_1.lowerAlphabet.indexOf(character) !== -1 ||
                constants_1.upperAlphabet.indexOf(character) !== -1)
                return true;
            return false;
        });
    }
    parseAttrValue() {
        const quote = this.consumeCharacter();
        (0, utils_1.assert)(quote === '"', "open quote error");
        const value = this.consumeWhile(function (character) {
            if (character !== quote)
                return true;
            return false;
        });
        (0, utils_1.assert)(this.consumeCharacter() === quote, "close quote error");
        return value;
    }
    parseAttr() {
        const name = this.parseTagName();
        (0, utils_1.assert)(this.consumeCharacter() === "=", "there is no '=' between attribute name and attribute value");
        const value = this.parseAttrValue();
        return { name, value };
    }
    parseAttributes() {
        let attributes = {};
        while (true) {
            this.consumeWhitespace();
            if (this.getCharacter() === ">")
                break;
            const { name, value } = this.parseAttr();
            attributes[name] = value;
        }
        return attributes;
    }
    consumeCharacter() {
        const inputIterator = this.makeInputIterator(this.input, this.position);
        const [currentPosition, currentCharacter] = inputIterator.next().value;
        this.position += 1;
        return currentCharacter;
    }
    consumeWhitespace() {
        this.consumeWhile(function (character) {
            if (character === " ")
                return true;
            return false;
        });
    }
    consumeWhile(test) {
        let result = "";
        while (!this.isEndOfInput() && test(this.getCharacter())) {
            result += this.consumeCharacter();
        }
        return result;
    }
    getCharacter() {
        return this.input[this.position];
    }
    isStartWith(str) {
        const characterArray = Array.from(str);
        let currentPosition = this.position;
        return characterArray.every((character) => {
            return this.input[currentPosition++] === character;
        });
    }
    isEndOfInput() {
        return this.position >= this.input.length;
    }
}
exports.default = HtmlParser;
