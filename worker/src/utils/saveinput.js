const fs = require("fs/promises");
const path = require("path");

async function saveInput(workspace, input) {
    const inputPath = path.join(workspace, "input.txt");

    await fs.writeFile(inputPath, input, "utf8");

    return inputPath;
}

module.exports = saveInput;