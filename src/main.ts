import HtmlParser from "./HtmlParser";

const html = `<html><body><h1>Title</h1><div id="main" class="test"><p>Hello<em>world</em>!</p></div></body></html>`;

const htmlParser = new HtmlParser(html, 0);

console.log(htmlParser.parse());
