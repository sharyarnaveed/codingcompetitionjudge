const fs = require("fs/promises");

async function cleanupWorkspace(workspace) {
    await fs.rm(workspace, {
        recursive: true,
        force: true,
    });
}

module.exports = cleanupWorkspace;