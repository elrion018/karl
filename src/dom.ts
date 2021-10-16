type Text = string;

export class KarlElement {
  tagName: string;
  attributes: object;

  constructor({ tagName, attributes }) {
    this.tagName = tagName;
    this.attributes = attributes;
  }

  getID() {
    return this.attributes["id"];
  }

  getClasses() {
    return this.attributes["class"];
  }
}

export class KarlNode {
  children: Array<KarlNode>;
  nodeDetail: Text | KarlElement;

  constructor({ children, nodeDetail }) {
    this.children = children;
    this.nodeDetail = nodeDetail;
  }
}

export function createText(data: string): KarlNode {
  return new KarlNode({ children: [], nodeDetail: data });
}

export function createElement(
  name: string,
  attrs: object,
  children: Array<KarlNode>
): KarlNode {
  return new KarlNode({
    children,
    nodeDetail: new KarlElement({ tagName: name, attributes: attrs }),
  });
}
