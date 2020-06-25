import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";
import { StaticRouter } from "react-router-dom";

const PORT = process.env.PORT || 8000;
const app = express();

app.use("^/$", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
    const context = {};
    if (context.url) {
      res.writeHead(301, {
        Location: context.url,
      });
      res.end();
    } else {
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          )}</div>`
        )
      );
    }
  });
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => console.log("App started"));
