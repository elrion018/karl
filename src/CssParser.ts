type Value = string | number | Color;

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
  constructor() {}
}
