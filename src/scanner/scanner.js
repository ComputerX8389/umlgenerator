const files = require("./files.js");
const convertor = require("./convertor.js");
const fs = require("fs");

async function GetUML(path) {
    if (fs.existsSync(path)) {
        const data = await files.GetFileTree(path);

        return { type: "tree", data: convertor.ConvertFileTreeToGraph(data) };
    } else {
        return null;
    }
}

function VaildFolder(path) {
    return fs.existsSync(path);
}

module.exports = {
    GetUML,
    VaildFolder,
};
