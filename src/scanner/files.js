const fs = require("fs");
const fsPromises = fs.promises;
const pathLib = require("path");

async function GetProjectType(path) {
    const everything = await fsPromises.readdir(path, { withFileTypes: true });

    for (let i = 0; i < everything.length; i++) {
        const element = everything[i];
        if (element.name.toLowerCase() == "package.json") {
            return "node";
        }
    }

    return "noclue";
}

async function GetFileTree(path) {
    console.log("Scanning files in", path);
    const data = await ScanDir(path);
    console.log("Found", data);

    return { type: "folder", name: "root", files: data };
}

async function ScanDir(path) {
    const output = [];
    const everything = await fsPromises.readdir(path, { withFileTypes: true });

    for (let i = 0; i < everything.length; i++) {
        const file = everything[i];

        if (file.isDirectory()) {
            const newpath = pathLib.join(path, file.name);
            const next = await ScanDir(newpath);
            output.push({ type: "folder", name: file.name, files: next });
        } else {
            output.push({
                type: "file",
                name: file.name,
                fullname: pathLib.join(path, file.name),
            });
        }
    }

    return output;
}

module.exports = {
    GetProjectType,
    GetFileTree,
};
