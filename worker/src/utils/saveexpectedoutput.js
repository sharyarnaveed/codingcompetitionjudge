const fs = require("fs/promises");
const path = require("path");

async function saveExpectedOutput(workspace, expectedOutput) {
    const outputPath = path.join(workspace, "expected.txt");

    await fs.writeFile(outputPath, expectedOutput, "utf8");

    return outputPath;
}

module.exports = saveExpectedOutput;