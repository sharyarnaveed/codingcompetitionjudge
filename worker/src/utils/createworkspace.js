const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");

const WORKSPACE_ROOT = "/var/codeclash/jobs";

async function createWorkspace() {
    const jobId = randomUUID();

    const workspace = path.join(WORKSPACE_ROOT, jobId);

    await fs.mkdir(workspace, {
        recursive: true,
    });

    return {
        jobId,
        workspace,
    };
}

module.exports = createWorkspace;