import { Iterator } from "typescript";

class HtmlParser {
  position: number;
  input: string;

  constructor({ position, input }) {
    this.position = position;
    this.input = input;
  }

  getChar(): string {
    return this.input[this.position];
  }

  isStartWith(str: string): boolean {
    return this.input[this.position] === str ? true : false;
  }

  isEndOfInput(): boolean {
    return this.position >= this.input.length;
  }

  consumeCharacter(): string {
    const inputIterator = this.makeInputIterator(this.input, this.position);
    const [currentPosition, currentCharacter] = inputIterator.next().value;
    this.position += 1;

    return currentCharacter;
  }

  makeInputIterator = function* (input, start = 0): Generator {
    for (let i = start; i < input.length; i++) {
      yield [i, input[i]];
    }
  };
}
