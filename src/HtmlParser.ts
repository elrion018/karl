import { numberCharacters, lowerAlphabet, upperAlphabet } from "./constants";
import { KarlNode } from "./dom";

import { assert } from "./utils";

interface TestFunction {
  (character: string): boolean;
}

interface AttributeObject {
  name: string;
  value: string;
}

class HtmlParser {
  input: string;
  position: number;

  constructor(input: string, position: number) {
    this.input = input;
    this.position = position;
  }

  getCharacter(): string {
    return this.input[this.position];
  }

  isStartWith(str: string): boolean {
    const characterArray = Array.from(str);
    let currentPosition = this.position;

    return characterArray.every((character) => {
      return this.input[currentPosition++] === character;
    });
  }

  isEndOfInput(): boolean {
    return this.position >= this.input.length;
  }

  makeInputIterator = function* (input, start = 0): Generator {
    for (let i = start; i < input.length; i++) {
      yield [i, input[i]];
    }
  };

  consumeCharacter(): string {
    const inputIterator = this.makeInputIterator(this.input, this.position);
    const [currentPosition, currentCharacter] = inputIterator.next().value;
    this.position += 1;

    return currentCharacter;
  }

  consumeWhitespace(): void {
    this.consumeWhile(function (character: string): boolean {
      if (character === " ") return true;

      return false;
    });
  }

  consumeWhile(test: TestFunction): string {
    let result = "";

    interface AttributeObject {
      name: string;
      value: string;
    }
    while (!this.isEndOfInput() && test(this.getCharacter())) {
      result += this.consumeCharacter();
    }

    return result;
  }

  parseNodes(): Array<KarlNode> {
    let nodes = [];

    while (true) {
      this.consumeWhitespace();
    }

    return nodes;
  }

  parseElement(): KarlNode {
    assert(this.consumeCharacter() === "<", "character is not <");

    const tagName = this.parseTagName();
    const attributes = this.parseAttributes();

    assert(this.consumeCharacter() === ">", "character is not >");

    assert(this.consumeCharacter() === "<", "character is not <");
    assert(this.consumeCharacter() === "/", "character is not /");
    assert(this.consumeCharacter() === ">", "character is not >");

    return;
  }

  parseTagName(): string {
    return this.consumeWhile(function (character: string): boolean {
      if (
        numberCharacters.indexOf(character) ||
        lowerAlphabet.indexOf(character) ||
        upperAlphabet.indexOf(character)
      )
        return true;

      return false;
    });
  }

  parseAttrValue() {
    const quote = this.consumeCharacter();

    assert(quote === '"', "open quote error");

    const value = this.consumeWhile(function (character: string): boolean {
      if (character !== quote) return true;

      return false;
    });

    assert(this.consumeCharacter() === quote, "close quote error");

    return value;
  }

  parseAttr(): AttributeObject {
    const name = this.parseTagName();

    assert(
      this.consumeCharacter() === "=",
      "there is no '=' between attribute name and attribute value"
    );

    const value = this.parseAttrValue();

    return { name, value };
  }

  parseAttributes() {
    let attributes = {};

    while (true) {
      this.consumeWhitespace();

      if (this.getCharacter() === ">") break;

      const { name, value } = this.parseAttr();
      attributes[name] = value;
    }

    return attributes;
  }
}

function test(character: string): boolean {
  if (typeof character === "string") return true;

  return false;
}

const htmlParser = new HtmlParser("test", 0);

console.log(htmlParser.getCharacter());
console.log(htmlParser.consumeWhile(test));
