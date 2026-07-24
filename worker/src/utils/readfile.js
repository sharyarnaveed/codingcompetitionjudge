const fs = require("fs/promises");

async function readFile(filePath) {
    return await fs.readFile(filePath, "utf8");
}

module.exports = readFile;