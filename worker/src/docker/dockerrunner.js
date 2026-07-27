const { spawn } = require("child_process");

const uid = process.getuid();
const gid = process.getgid();

function dockerRunner(image, workspace, command, memoryLimit = "256m") {
    return new Promise((resolve, reject) => {

        const docker = spawn("docker", [
            "run",
            "--rm",

            "--memory",
            memoryLimit,

            "--memory-swap",
            memoryLimit,

            "--user",
            `${uid}:${gid}`,

            "-v",
            `${workspace}:/code`,

            image,

            ...command
        ]);

        docker.on("close", (code) => {
            resolve({
                exitCode: code
            });
        });

        docker.on("error", reject);
    });
}

module.exports = dockerRunner;