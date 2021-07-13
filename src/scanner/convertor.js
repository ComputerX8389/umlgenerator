function ConvertFileTreeToGraph(filetree) {
    console.log("converting filetree to graph", filetree);
    const output = [{ key: filetree.name, fill: "grey" }];
    FileTreeToGraph(output, filetree.files, filetree.name);
    console.log("graph done", output);
    return output;
}

function FileTreeToGraph(output, filetree, parent) {
    filetree.forEach((element) => {
        if (element.type == "folder") {
            FileTreeToGraph(output, element.files, element.name);
            var fil = "lightgrey";
        } else {
            var fil = "lightblue";
        }
        output.push({ key: element.name, parent: parent, fill: fil });
    });
}

// var nodeDataArray = [
//     { key: "Alpha" },
//     { key: "Beta", parent: "Alpha" },
//     { key: "Gamma", parent: "Beta" },
//     { key: "Delta", parent: "Beta" },
//     { key: "Epsilon", parent: "Alpha" },
//     { key: "Zeta", parent: "Epsilon" },
//     { key: "Eta", parent: "Epsilon" },
//     { key: "Theta", parent: "Epsilon" },
// ];

module.exports = {
    ConvertFileTreeToGraph,
};
