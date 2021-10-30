import HtmlParser from "./HtmlParser";
import CssParser from "./CssParser";

const html = `<html><body><h1>Title</h1><div id="main" class="test"><p>Hello<em>world</em>!</p></div></body></html>`;
const css = `h1, h2, h3 { margin: auto; color: #cc0000; } div.note { margin-bottom: 20px; padding: 10px; } #answer { display: none; }`;

const htmlParser = new HtmlParser(html, 0);
const cssParser = new CssParser(css, 0);

console.log(htmlParser.parse());
console.dir(cssParser.parse());
