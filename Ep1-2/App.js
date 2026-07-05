import React from "react";
import ReactDOM from "react-dom/client";

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child1", key: "child1" }, [
    React.createElement("h1", { key: "h1-1" }, "I am h1 tag"),
    React.createElement("h2", { key: "h2-1" }, "I am h2 tag"),
  ]),

  React.createElement("div", { id: "child2", key: "child2" }, [
    React.createElement("h1", { key: "h1-2" }, "I am h1 tag"),
    React.createElement("h2", { key: "h2-2" }, "I am h2 tag"),
  ]),
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
