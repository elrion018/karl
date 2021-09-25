type Text = string;

interface ElementData {
  tagName: string;
  attributes: object;
}

class KarlNode {
  children: Array<KarlNode>;
  nodeType: Text | ElementData;

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
    nodeType: {
      tagName: name,
      attributes: attrs,
    },
  });
}
