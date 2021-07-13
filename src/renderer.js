// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const diagram = new go.Diagram("Diagram");
const $ = go.GraphObject.make;

const scanner = window.api.scanner;
const PathTxt = document.getElementById("PathTxt");
const ScanBtn = document.getElementById("ScanBtn");

ScanBtn.addEventListener("click", StartScan);

async function StartScan() {
    const data = await scanner.GetUML(PathTxt.value);

    setupTree(data);
    // automatic tree layout
    diagram.layout = $(go.TreeLayout, { angle: 0 });
}

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
        $(go.Shape, { stroke: "lightgray" })
    );

    diagram.model = new go.TreeModel(nodeDataArray);
}
