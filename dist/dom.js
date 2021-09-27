"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = exports.createText = exports.KarlNode = exports.KarlElement = void 0;
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
exports.KarlElement = KarlElement;
class KarlNode {
    constructor({ children, nodeType }) {
        this.children = children;
        this.nodeType = nodeType;
    }
}
exports.KarlNode = KarlNode;
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
