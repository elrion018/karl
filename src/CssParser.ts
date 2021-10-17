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
  tagName?: string;
  id?: string;
  class?: Array<string>;
}

export interface Declaraction {
  name: string;
  value: Value;
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

  parse_rules() {
    let rules = [];

    while (true) {
      if (this.isEndOfInput()) break;
    }

    return rules;
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
