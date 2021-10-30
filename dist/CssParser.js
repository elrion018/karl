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
        const selectors = [];
        while (true) {
            selectors.push(this.parseSelector());
            this.consumeWhitespace();
            const character = this.getCharacter();
            if (character === "{")
                break;
            else if (character === ",") {
                this.consumeCharacter();
                this.consumeWhitespace();
            }
            else
                (0, utils_1.assert)(false, `Unexpected Character ${character}`);
        }
        selectors.sort(function (a, b) {
            return b.specificity - a.specificity;
        });
        return selectors;
    }
    parseSelector() {
        const selector = { tagNames: [], ids: [], classes: [], specificity: 0 };
        while (!this.isEndOfInput()) {
            const character = this.getCharacter();
            if (character === "#") {
                this.consumeCharacter();
                selector.ids.push(this.parseIdentifier());
            }
            else if (character === ".") {
                this.consumeCharacter();
                selector.classes.push(this.parseIdentifier());
            }
            else if (character === "*")
                this.consumeCharacter();
            else if (isValidIdentifierChar(character))
                selector.tagNames.push(this.parseIdentifier());
            else if (character === "{")
                break;
            else
                this.consumeCharacter();
        }
        selector.specificity =
            selector.ids.length * 100 +
                selector.classes.length * 10 +
                selector.tagNames.length;
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
