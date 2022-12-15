const path = require("path");
const fs = require("fs");
const http = require("http");
const express = require("express");

const app = express();
app.use(express.static("../frontend/styles"));
// ####################
// ####################
// ####################
const startServer = () =>
  http.createServer((request, response) => {
    let filePath = path.join(
      __dirname,
      "frontend/static",
      request.url === "/"
        ? "landingpage.html"
        : request.url
    );
    let contentType = getContentType(filePath);
    let emptyPage = path.join(__dirname, "frontend", "404.html");
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
          fs.readFile(emptyPage, "utf8", (err, content) => {
            response.writeHead(200, { "Content-Type": emptyPage });
            response.end(content);
          });
        } else {
          response.writeHead(500);
          response.end("A server error has occured");
        }
      } else {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(content);
      }
    });
  });

// A function to load files dynamically. Other file extension could be added
const getContentType = (filePath) => {
  let extname = path.extname(filePath);
  if (extname === ".html") {
    return "text/html";
  }
  if (extname === ".js") {
    return "text/javascript";
  }
  if (extname === "css") {
    return "style/css";
  }
};

module.exports = startServer();
