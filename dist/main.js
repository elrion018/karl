"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlParser_1 = __importDefault(require("./HtmlParser"));
const html = `<html id="sex"><body><h1>Title</h1><div id="main" class="test"><p>Hello<em>world</em>!</p></div></body></html>`;
const htmlParser = new HtmlParser_1.default(html, 0);
console.log(htmlParser.parse());
