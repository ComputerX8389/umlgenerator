// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const diagram = new go.Diagram("Diagram");
const $ = go.GraphObject.make;
console.log("api", window.api);

const scanner = window.api.scanner;
const PathTxt = document.getElementById("PathTxt");

const lastPath = localStorage.getItem("path");
PathTxt.value = lastPath;

window.api.receive("ping", (data) => {
    console.log(`Received from main process`, data);
    if (data.canceled == false) {
        StartScan(data.filePaths[0]);
    } else {
        alert("Not a valid folder");
    }
});

async function StartScan(newpath) {
    PathTxt.value = newpath;
    localStorage.setItem("path", newpath);

    const data = await scanner.GetUML(newpath);

    if (data) {
        setupTree(data);
        // automatic tree layout
        diagram.layout = $(go.TreeLayout, { angle: 0 });
    } else {
        alert("nope");
    }
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

if (scanner.VaildFolder(lastPath)) {
    console.log("Loading last path");
    StartScan(lastPath);
} else {
    console.log("Last path not valid");
}
