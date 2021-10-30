import { numberCharacters, upperAlphabet, lowerAlphabet } from "./constants";
import { assert } from "./utils";

type Value = string | number | Color;

interface TestFunction {
  (character: string): boolean;
}

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

class Selector {
  tagNames: Array<string>;
  ids: Array<string>;
  classes: Array<string>;
}

interface Declaraction {
  name: string;
  value: Value;
}

interface StyleSheet {
  rules: Array<Rule>;
}

interface Rule {
  selectors: Array<Selector>;
  declarations: Array<Declaraction>;
}

export default class CssParser {
  input: string;
  position: number;

  constructor(input: string, position: number) {
    this.input = input;
    this.position = position;
  }

  parse(): StyleSheet {
    const rules = this.parseRules();

    return { rules };
  }

  parseRules() {
    let rules = [];

    while (true) {
      this.consumeWhitespace();

      if (this.isEndOfInput()) break;

      rules.push(this.parseRule());
    }

    return rules;
  }

  parseRule(): Rule {
    return {
      selectors: this.parseSelectors(),
      declarations: this.parseDeclarations(),
    };
  }

  parseSelectors(): Array<Selector> {
    let selectors = [];

    while (true) {
      selectors.push(this.parseSelector());
      this.consumeWhitespace();

      let character = this.getCharacter();

      if (character === "{") break;
      else if (character === ",") {
        this.consumeCharacter();
        this.consumeWhitespace();
      } else assert(false, `Unexpected Character ${character}`);
    }

    return selectors;
  }

  parseSelector(): Selector {
    const selector = { tagNames: [], ids: [], classes: [] };

    while (!this.isEndOfInput()) {
      const character = this.getCharacter();

      if (character === "#") {
        this.consumeCharacter();
        selector.ids.push(this.parseIdentifier());
      } else if (character === ".") {
        this.consumeCharacter();
        selector.classes.push(this.parseIdentifier());
      } else if (character === "*") this.consumeCharacter();
      else if (isValidIdentifierChar(character))
        selector.tagNames.push(this.parseIdentifier());
      else if (character === "{") break;
      else this.consumeCharacter();
    }

    return selector;
  }

  parseIdentifier(): string {
    return this.consumeWhile(isValidIdentifierChar);
  }

  parseDeclaration(): Declaraction {
    const name = this.parseIdentifier();

    this.consumeWhitespace();
    assert(
      this.consumeCharacter() === ":",
      'There is no ":" character between property and value'
    );
    this.consumeWhitespace();

    const value = this.parseValue();

    this.consumeWhitespace();
    assert(
      this.consumeCharacter() === ";",
      'There is no ";" character at end of declaration'
    );

    return {
      name,
      value,
    };
  }

  parseDeclarations(): Array<Declaraction> {
    assert(
      this.consumeCharacter() === "{",
      "Declarations start with { character"
    );
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

  parseValue(): Value {
    const character = this.getCharacter();

    if (numberCharacters.indexOf(character) !== -1)
      return this.parseNumberValue();
    else if (character === "#") return this.parseColor();
    else return this.parseIdentifier();
  }

  parseNumberValue(): Value {
    return `${this.parseNumber()}${this.parseUnit()}`;
  }

  parseNumber(): number {
    return Number(
      this.consumeWhile(function (character) {
        return numberCharacters.indexOf(character) !== -1;
      })
    );
  }

  parseUnit(): string {
    const unit = this.parseIdentifier();

    if (unit === "px") return unit;

    assert(false, "Unrecognized unit!");
  }

  parseColor(): Color {
    this.consumeCharacter();

    return {
      r: this.parseHexPairToDecimal(),
      g: this.parseHexPairToDecimal(),
      b: this.parseHexPairToDecimal(),
      a: 255,
    };
  }

  parseHexPairToDecimal(): number {
    const hexPair = this.input.slice(this.position, this.position + 2);
    this.position += 2;

    return parseInt(hexPair, 16);
  }

  consumeCharacter(): string {
    const inputIterator = this.makeInputIterator(this.input, this.position);
    const [currentPosition, currentCharacter] = inputIterator.next().value;
    this.position += 1;

    return currentCharacter;
  }

  consumeWhile(test: TestFunction): string {
    let result = "";

    while (!this.isEndOfInput() && test(this.getCharacter())) {
      result += this.consumeCharacter();
    }

    return result;
  }

  consumeWhitespace(): void {
    this.consumeWhile(function (character: string): boolean {
      if (character === " ") return true;

      return false;
    });
  }

  isEndOfInput(): boolean {
    return this.position >= this.input.length;
  }

  getCharacter(): string {
    return this.input[this.position];
  }

  makeInputIterator = function* (input, start = 0): Generator {
    for (let i = start; i < input.length; i++) {
      yield [i, input[i]];
    }
  };
}

function isValidIdentifierChar(character: string): boolean {
  if (
    numberCharacters.indexOf(character) !== -1 ||
    upperAlphabet.indexOf(character) !== -1 ||
    lowerAlphabet.indexOf(character) !== -1 ||
    character === "-"
  )
    return true;

  return false;
}
