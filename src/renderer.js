// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const scanner = window.api.scanner;
const PathTxt = document.getElementById("PathTxt");
let path = "C:\\Users\\STEFF\\Desktop\\forzasite";

PathTxt.appendChild(document.createTextNode(path));

function setupTree(nodeDataArray) {
    diagram.nodeTemplate = $(
        go.Node,
        "Auto",
        $(go.Shape, "RoundedRectangle", new go.Binding("fill", "fill")),
        $(go.TextBlock, new go.Binding("text", "key"))
    );

    diagram.linkTemplate = $(
        go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape)
    );

    diagram.model = new go.TreeModel(nodeDataArray);
}

async function getdata() {
    const data = await scanner.GetUML(path);

    setupTree(data);
    // automatic tree layout
    diagram.layout = $(go.TreeLayout, { angle: 0 });
}

// Diagram setup
const diagram = new go.Diagram("Diagram");
const $ = go.GraphObject.make;

getdata();

//var diagram = new go.Diagram("Diagram");
//diagram.model = new go.GraphLinksModel(
//    [
//        { key: "Hello" }, // two node data, in an Array
//        { key: "World!" },
//    ],
//    [{ from: "Hello", to: "World!" }] // one link data, in an Array
//);
