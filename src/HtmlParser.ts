import { numberCharacters, lowerAlphabet, upperAlphabet } from "./constants";

interface testFunction {
  (character: string): boolean;
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
    return this.input[this.position] === str ? true : false;
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

  consumeWhile(test: testFunction): string {
    let result = "";

    while (!this.isEndOfInput() && test(this.getCharacter())) {
      result += this.consumeCharacter();
    }

    return result;
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
}

function test(character: string): boolean {
  if (typeof character === "string") return true;

  return false;
}

const htmlParser = new HtmlParser("test", 0);

console.log(htmlParser.getCharacter());
console.log(htmlParser.consumeWhile(test));
