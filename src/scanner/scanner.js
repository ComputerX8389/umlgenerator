const files = require("./files.js");
const convertor = require("./convertor.js");

async function GetUML(path) {
    const data = await files.GetFileTree(path);
    return convertor.ConvertFileTreeToGraph(data);
}

module.exports = {
    GetUML,
};
