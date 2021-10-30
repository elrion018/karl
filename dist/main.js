"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HtmlParser_1 = __importDefault(require("./HtmlParser"));
const CssParser_1 = __importDefault(require("./CssParser"));
const html = `<html><body><h1>Title</h1><div id="main" class="test"><p>Hello<em>world</em>!</p></div></body></html>`;
const css = `h1, h2, h3 { margin: auto; color: #cc0000; } div.note { margin-bottom: 20px; padding: 10px; } #answer { display: none; }`;
const htmlParser = new HtmlParser_1.default(html, 0);
const cssParser = new CssParser_1.default(css, 0);
console.log(htmlParser.parse());
console.dir(cssParser.parse());
