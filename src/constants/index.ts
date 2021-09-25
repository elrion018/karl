import { generateSeq } from "../utils";

export const numbers = generateSeq(0, 9, 1);
export const upperAlphabet = generateSeq(
  "A".charCodeAt(0),
  "Z".charCodeAt(0),
  1
);
export const lowerAlphabet = generateSeq(
  "a".charCodeAt(0),
  "z".charCodeAt(0),
  1
);
