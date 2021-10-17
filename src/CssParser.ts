import { numberCharacters, upperAlphabet, lowerAlphabet } from "./constants";
import { assert } from "./utils";

type Value = string | number | Color;

interface TestFunction {
  (character: string): boolean;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Selector {
  tagName: string;
  id: string;
  class: Array<string>;
}

export interface Declaraction {
  name: string;
  value: Value;
}

export interface StyleSheet {
  rules: Array<Rule>;
}

export interface Rule {
  selectors: Array<Selector>;
  declarations: Array<Declaraction>;
}

export class CssParser {
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
    let selectors = [];
    let declarations = [];

    return { selectors, declarations };
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
    let selector = { tagName: null, id: null, class: null };

    while (!this.isEndOfInput()) {
      let character = this.getCharacter();

      if (character === "#") {
        this.consumeCharacter();
        selector.id = this.parseIdentifier();
      } else if (character === ".") {
        this.consumeCharacter();
        selector.class.push(this.parseIdentifier());
      } else if (character === "*") this.consumeCharacter();
      else if (isValidIdentifierChar(character))
        selector.tagName = this.parseIdentifier();
      else break;
    }

    return selector;
  }

  parseIdentifier(): string {
    return this.consumeWhile(isValidIdentifierChar);
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
