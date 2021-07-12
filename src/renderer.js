// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

var diagram = new go.Diagram("Diagram");
diagram.model = new go.GraphLinksModel(
    [
        { key: "Hello" }, // two node data, in an Array
        { key: "World!" },
    ],
    [{ from: "Hello", to: "World!" }] // one link data, in an Array
);
