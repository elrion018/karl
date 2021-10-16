export interface Selector {
  tagName: string;
  id: string;
  class: Array<string>;
}

export interface Rule {
  selectors: Array<Selector>;
  declarations: "";
}

export class CssParser {
  constructor() {}
}
