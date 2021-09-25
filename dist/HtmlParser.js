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
    getCharacter() {
        return this.input[this.position];
    }
    isStartWith(str) {
        return this.input[this.position] === str ? true : false;
    }
    isEndOfInput() {
        return this.position >= this.input.length;
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
}
function test(character) {
    if (typeof character === "string")
        return true;
    return false;
}
const htmlParser = new HtmlParser("test", 0);
console.log(htmlParser.getCharacter());
console.log(htmlParser.consumeWhile(test));
