"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = exports.createText = void 0;
class KarlElement {
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
    constructor({ children, nodeType }) {
        this.children = children;
        this.nodeType = nodeType;
    }
}
function createText(data) {
    return new KarlNode({ children: [], nodeType: data });
}
exports.createText = createText;
function createElement(name, attrs, children) {
    return new KarlNode({
        children,
        nodeType: new KarlElement({ tagName: name, attributes: attrs }),
    });
}
exports.createElement = createElement;
