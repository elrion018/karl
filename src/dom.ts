type Text = string;

class KarlElement {
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

class KarlNode {
  children: Array<KarlNode>;
  nodeType: Text | KarlElement;

  constructor({ children, nodeType }) {
    this.children = children;
    this.nodeType = nodeType;
  }
}

export function createText(data: string): KarlNode {
  return new KarlNode({ children: [], nodeType: data });
}

export function createElement(
  name: string,
  attrs: object,
  children: Array<KarlNode>
): KarlNode {
  return new KarlNode({
    children,
    nodeType: new KarlElement({ tagName: name, attributes: attrs }),
  });
}
