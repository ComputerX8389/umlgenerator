function ConvertFileTreeToGraph(filetree) {
    const output = [{ key: filetree.name }];
    FileTreeToGraph(output, filetree.files, filetree.name);
    return output;
}

function FileTreeToGraph(output, filetree, parent) {
    console.log("convert @", filetree);

    filetree.forEach((element) => {
        output.push({ key: element.name, parent: parent });

        if (element.type == "folder") {
            FileTreeToGraph(output, element.files, element.name);
        }
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
