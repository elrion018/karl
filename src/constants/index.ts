import { generateSeq } from "../utils";

export const numberCharacters: Array<string> = generateSeq(
  "1".charCodeAt(0),
  "9".charCodeAt(0),
  1
);
export const upperAlphabet: Array<string> = generateSeq(
  "A".charCodeAt(0),
  "Z".charCodeAt(0),
  1
);
export const lowerAlphabet: Array<string> = generateSeq(
  "a".charCodeAt(0),
  "z".charCodeAt(0),
  1
);
