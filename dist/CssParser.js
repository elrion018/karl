"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const utils_1 = require("./utils");
class CssParser {
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
        const rules = this.parseRules();
        return { rules };
    }
    parseRules() {
        let rules = [];
        while (true) {
            this.consumeWhitespace();
            if (this.isEndOfInput())
                break;
            rules.push(this.parseRule());
        }
        return rules;
    }
    parseRule() {
        return {
            selectors: this.parseSelectors(),
            declarations: this.parseDeclarations(),
        };
    }
    parseSelectors() {
        let selectors = [];
        while (true) {
            selectors.push(this.parseSelector());
            this.consumeWhitespace();
            let character = this.getCharacter();
            if (character === "{")
                break;
            else if (character === ",") {
                this.consumeCharacter();
                this.consumeWhitespace();
            }
            else
                (0, utils_1.assert)(false, `Unexpected Character ${character}`);
        }
        return selectors;
    }
    parseSelector() {
        let selector = { tagName: null, id: null, class: [] };
        while (!this.isEndOfInput()) {
            let character = this.getCharacter();
            if (character === "#") {
                this.consumeCharacter();
                selector.id = this.parseIdentifier();
            }
            else if (character === ".") {
                this.consumeCharacter();
                selector.class.push(this.parseIdentifier());
            }
            else if (character === "*")
                this.consumeCharacter();
            else if (isValidIdentifierChar(character))
                selector.tagName = this.parseIdentifier();
            else
                break;
        }
        return selector;
    }
    parseIdentifier() {
        return this.consumeWhile(isValidIdentifierChar);
    }
    parseDeclaration() {
        const name = this.parseIdentifier();
        this.consumeWhitespace();
        (0, utils_1.assert)(this.consumeCharacter() === ":", 'There is no ":" character between property and value');
        this.consumeWhitespace();
        const value = this.parseValue();
        this.consumeWhitespace();
        (0, utils_1.assert)(this.consumeCharacter() === ";", 'There is no ";" character at end of declaration');
        return {
            name,
            value,
        };
    }
    parseDeclarations() {
        (0, utils_1.assert)(this.consumeCharacter() === "{", "Declarations start with { character");
        const declarations = [];
        while (true) {
            this.consumeWhitespace();
            if (this.getCharacter() === "}") {
                this.consumeCharacter();
                break;
            }
            declarations.push(this.parseDeclaration());
        }
        return declarations;
    }
    parseValue() {
        const character = this.getCharacter();
        if (constants_1.numberCharacters.indexOf(character) !== -1)
            return this.parseNumberValue();
        else if (character === "#")
            return this.parseColor();
        else
            return this.parseIdentifier();
    }
    parseNumberValue() {
        return `${this.parseNumber()}${this.parseUnit()}`;
    }
    parseNumber() {
        return Number(this.consumeWhile(function (character) {
            return constants_1.numberCharacters.indexOf(character) !== -1;
        }));
    }
    parseUnit() {
        const unit = this.parseIdentifier();
        if (unit === "px")
            return unit;
        (0, utils_1.assert)(false, "Unrecognized unit!");
    }
    parseColor() {
        this.consumeCharacter();
        return {
            r: this.parseHexPairToDecimal(),
            g: this.parseHexPairToDecimal(),
            b: this.parseHexPairToDecimal(),
            a: 255,
        };
    }
    parseHexPairToDecimal() {
        const hexPair = this.input.slice(this.position, this.position + 2);
        this.position += 2;
        return parseInt(hexPair, 16);
    }
    consumeCharacter() {
        const inputIterator = this.makeInputIterator(this.input, this.position);
        const [currentPosition, currentCharacter] = inputIterator.next().value;
        this.position += 1;
        console.log(currentCharacter);
        return currentCharacter;
    }
    consumeWhile(test) {
        let result = "";
        while (!this.isEndOfInput() && test(this.getCharacter())) {
            result += this.consumeCharacter();
        }
        return result;
    }
    consumeWhitespace() {
        this.consumeWhile(function (character) {
            if (character === " ")
                return true;
            return false;
        });
    }
    isEndOfInput() {
        return this.position >= this.input.length;
    }
    getCharacter() {
        return this.input[this.position];
    }
}
exports.default = CssParser;
function isValidIdentifierChar(character) {
    if (constants_1.numberCharacters.indexOf(character) !== -1 ||
        constants_1.upperAlphabet.indexOf(character) !== -1 ||
        constants_1.lowerAlphabet.indexOf(character) !== -1 ||
        character === "-")
        return true;
    return false;
}
